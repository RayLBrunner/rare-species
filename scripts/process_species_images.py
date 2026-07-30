import os
import json
import pandas as pd

# Configuration
IMAGE_DIR = "public/images/species"
INDEX_FILE = "TaxonImagesIndex.xlsx"
ATTR_JSON_PATH = "src/data/photoAttribution.json"
LOG_DIR = "logs"

def process_attributions():
    os.makedirs(LOG_DIR, exist_ok=True)

    # 1. Read TaxonImagesIndex.xlsx and build lookup by ELEMENT_GLOBAL_ID
    try:
        index_df = pd.read_excel(INDEX_FILE)

        # Clean IDs: ensure they are strings and remove any trailing '.0' from Excel
        index_df['ELEMENT_GLOBAL_ID'] = (
            index_df['ELEMENT_GLOBAL_ID']
            .astype(str)
            .str.replace(r'\.0$', '', regex=True)
            .str.strip()
        )

        # Convert dataframe to a dictionary keyed by the ID for O(1) lookup
        image_index = index_df.set_index("ELEMENT_GLOBAL_ID").to_dict("index")
    except Exception as e:
        print(f"Error reading index file: {e}")
        return

    attributions = {}
    matched_ids = set()
    unmatched_images = []

    # 2. Pull attribution fields from the index for each matched ID
    if not os.path.exists(IMAGE_DIR):
        print(f"Error: Directory {IMAGE_DIR} not found.")
        return

    for filename in os.listdir(IMAGE_DIR):
        if not filename.lower().endswith('.webp'):
            continue

        # Isolate the ID from the filename (e.g., '13025.webp' -> '13025')
        element_id = os.path.splitext(filename)[0]

        if element_id not in image_index:
            unmatched_images.append(filename)
            continue

        meta = image_index[element_id]
        matched_ids.add(element_id)

        # Capture the SNAME for taxonomic stability and accessibility
        sname = str(meta.get("SNAME", "rare species")).strip()

        attributions[element_id] = {
            "license": str(meta.get("License", "Unknown")),
            "photographer": str(meta.get("Photographer", "Unknown")),
            "source": str(meta.get("Source", "Unknown")),
            "sourceImageId": str(meta.get("SourceImageID", "")),
            "sourceImageUrl": str(meta.get("SourceImageURL", "")),
            "permissionType": str(meta.get("PermissionType", "")),
            "sciNameAtCapture": sname,
            # Generate accessible alt text from SNAME
            "altText": f"Photo of {sname}"
        }

    # 3. Save photoAttribution.json
    with open(ATTR_JSON_PATH, 'w') as f:
        json.dump(attributions, f, indent=2)

    # 4. Log mismatches both ways
    # Images in folder with no matching row in the index
    with open(os.path.join(LOG_DIR, "images_without_index_rows.txt"), "w") as f:
        f.write("\n".join(unmatched_images))

    # Rows in the index with no corresponding image file in the folder
    index_ids = set(image_index.keys())
    missing_images = index_ids - matched_ids
    valid_missing = sorted([str(i) for i in missing_images if i and i.lower() != 'nan'])
    with open(os.path.join(LOG_DIR, "index_rows_without_images.txt"), "w") as f:
        f.write("\n".join(valid_missing))

    print("\n--- Attribution Processing Report ---")
    print(f"Matched successfully: {len(matched_ids)}")
    print(f"Images without index rows: {len(unmatched_images)} (logged)")
    print(f"Index rows without images: {len(valid_missing)} (logged)")

if __name__ == "__main__":
    process_attributions()