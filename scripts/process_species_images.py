import os
import json
import re
import pandas as pd
from PIL import Image

# Configuration
RAW_DIR="raw_images/ForWeb"
OUTPUT_DIR = "public/images/species"
INDEX_FILE = "TaxonImagesIndex.xlsx"
ATTR_JSON_PATH = "src/data/photoAttribution.json"
LOG_DIR = "logs"
VALID_EXTENSIONS = ('.jpeg', '.jpg', '.png', '.jfif')

def normalize_id(raw_id: str) -> str:
    """
    Normalize an ID (from either the Excel index or a filename) so that
    trivial formatting differences don't cause a mismatch:
      - strip whitespace (including a stray trailing space before the extension)
      - drop a trailing '.0' left over from float coercion (e.g. Excel storing 91 as 91.0)
      - strip leading zeros (e.g. '091' -> '91'), but keep a single '0' as '0'
    """
    if raw_id is None:
        return ""
    s = str(raw_id).strip()
    s = re.sub(r'\.0$', '', s)
    s = s.lstrip('0')
    return s if s else '0'
 
 
def process_species_images():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs("logs", exist_ok=True)
 
    try:
        index_df = pd.read_excel(INDEX_FILE)
    except Exception as e:
        print(f"Error loading index: {e}")
        return
 
    if "ELEMENT_GLOBAL_ID" not in index_df.columns:
        print("Error: INDEX_FILE has no 'ELEMENT_GLOBAL_ID' column.")
        return
 
    # Build normalized-ID -> row lookup, tracking duplicates and blank IDs
    image_index = {}
    duplicate_index_ids = {}
    blank_index_rows = 0
 
    for _, row in index_df.iterrows():
        raw_val = row["ELEMENT_GLOBAL_ID"]
        if pd.isna(raw_val):
            blank_index_rows += 1
            continue
        norm_id = normalize_id(raw_val)
        if not norm_id:
            blank_index_rows += 1
            continue
        if norm_id in image_index:
            duplicate_index_ids.setdefault(norm_id, [image_index[norm_id]['_raw_id']])
            duplicate_index_ids[norm_id].append(str(raw_val))
        image_index[norm_id] = dict(row)
        image_index[norm_id]['_raw_id'] = str(raw_val)
 
    attributions = {}
    processed_ids = set()
    unmatched_files = []       # files with no matching index row
    skipped_extension = []     # files ignored because of unsupported extension
    conversion_failures = []   # files that matched but failed image processing
    file_id_map = {}           # normalized_id -> list of source filenames (to catch dupes)
 
    for filename in sorted(os.listdir(RAW_DIR)):
        src_path = os.path.join(RAW_DIR, filename)
        if not os.path.isfile(src_path):
            continue
 
        name_part, ext = os.path.splitext(filename)
        if ext.lower() not in VALID_EXTENSIONS:
            skipped_extension.append(filename)
            continue
 
        element_id = normalize_id(name_part)
        file_id_map.setdefault(element_id, []).append(filename)
 
        if element_id not in image_index:
            unmatched_files.append(filename)
            continue
 
        meta = image_index[element_id]
 
        try:
            dest_path = os.path.join(OUTPUT_DIR, f"{element_id}.webp")
            img = Image.open(src_path)
            img.thumbnail((800, 800))  # Resize to max 800px width/height
            img.save(dest_path, "WEBP", quality=80)  # Convert to WebP at 80 quality
        except Exception as e:
            conversion_failures.append(f"{filename}: {e}")
            continue
 
        processed_ids.add(element_id)
 
        sname = str(meta.get("SNAME", "rare species"))
        attributions[element_id] = {
            "license": str(meta.get("License", "Unknown")),
            "photographer": str(meta.get("Photographer", "Unknown")),
            "source": str(meta.get("Source", "Unknown")),
            "sourceImageId": str(meta.get("SourceImageID", "")),
            "sourceImageUrl": str(meta.get("SourceImageURL", "")),
            "permissionType": str(meta.get("PermissionType", "")),
            "sciNameAtCapture": sname,
            "altText": f"Photo of {sname}",  # Automated accessible alt text
            "sourceFilename": filename,       # kept for traceability/debugging
        }
 
    with open(ATTR_JSON_PATH, 'w') as f:
        json.dump(attributions, f, indent=2)
 
    index_ids = set(image_index.keys())
    missing_images = sorted(index_ids - processed_ids, key=lambda x: (len(x), x))
 
    with open("logs/images_without_index_rows.txt", "w") as f:
        f.write("\n".join(unmatched_files))
 
    with open("logs/index_rows_without_images.txt", "w") as f:
        f.write("\n".join(missing_images))
 
    with open("logs/skipped_bad_extension.txt", "w") as f:
        f.write("\n".join(skipped_extension))
 
    with open("logs/conversion_failures.txt", "w") as f:
        f.write("\n".join(conversion_failures))
 
    dupe_files_lines = []
    for eid, files in file_id_map.items():
        if len(files) > 1:
            dupe_files_lines.append(f"{eid}: {', '.join(files)}")
    with open("logs/duplicate_filename_ids.txt", "w") as f:
        f.write("\n".join(dupe_files_lines))
 
    dupe_index_lines = [f"{eid}: {', '.join(vals)}" for eid, vals in duplicate_index_ids.items()]
    with open("logs/duplicate_index_ids.txt", "w") as f:
        f.write("\n".join(dupe_index_lines))
 
    print(f"Match Results: {len(processed_ids)} matched | {len(unmatched_files)} unmatched files "
          f"| {len(missing_images)} missing images | {len(skipped_extension)} skipped (bad extension) "
          f"| {len(conversion_failures)} conversion failures")
    if blank_index_rows:
        print(f"Note: {blank_index_rows} index rows had a blank/NaN ELEMENT_GLOBAL_ID and were skipped.")
    if dupe_files_lines:
        print(f"Warning: {len(dupe_files_lines)} element ID(s) had more than one local file mapping to them "
              f"(see logs/duplicate_filename_ids.txt) — only the last one processed wins.")
    if dupe_index_lines:
        print(f"Warning: {len(dupe_index_lines)} ELEMENT_GLOBAL_ID(s) appear more than once in the index "
              f"(see logs/duplicate_index_ids.txt) — only the last row wins.")
 
 
if __name__ == "__main__":
    process_species_images()