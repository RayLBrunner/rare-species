import os
import json
from PIL import Image

LICENSE_SUFFIXES = {
    ("CC", "BY", "NC"),
    ("CC", "BY"),
    ("CC", "0"),
}


def _is_attribution_token(token):
    return bool(token) and (token[0].isupper() or token.isupper())


def _species_token_count(parts):
    if len(parts) >= 3:
        rank_token = parts[1].lower().rstrip(".")
        if rank_token in {"sp", "ssp", "subsp"} and parts[2].isdigit():
            return 3

    return 2


def parse_filename(filename):
    """
    Parses the binomial name and the attribution from the filename.
    Correctly handles the tuple returned by os.path.splitext.
    """
    name_parts = os.path.splitext(filename)
    base_name = name_parts[0]
    
    # Standardize separators to hyphens for consistent parsing [Source 212]
    normalized_base = base_name.replace("_", "-")
    parts = normalized_base.split("-")
    
    if len(parts) < 2:
        return None, None
        
    species_token_count = _species_token_count(parts)
    binomial = " ".join(parts[:species_token_count]).replace("_", "-").lower().replace("sp ", "sp. ").replace("ssp ", "ssp. ")
    
    suffix_len = 0
    for suffix in LICENSE_SUFFIXES:
        suffix_size = len(suffix)
        if tuple(parts[-suffix_size:]) == suffix:
            suffix_len = suffix_size
            break

    # Trailing parts before the license are the photographer attribution.
    attribution_parts = parts[species_token_count:len(parts) - suffix_len] if suffix_len else parts[species_token_count:]
    while attribution_parts and not _is_attribution_token(attribution_parts[0]):
        attribution_parts = attribution_parts[1:]
    attribution = " ".join(segment for segment in attribution_parts if segment)
    if not attribution:
        attribution = "Unknown"
    
    return binomial, attribution

def process_species_images(raw_dir, species_json_path, output_dir, attr_json_path):
    os.makedirs(output_dir, exist_ok=True)

    try:
        with open(species_json_path, 'r') as f:
            data = json.load(f)
            species_list = data if isinstance(data, list) else data.get('species', [])
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error loading JSON: {e}")
        return

    # Map binomials to elementGlobalId with safety check for null values
    species_map = {}
    for s in species_list:
        genus_species = s.get('genusSpecies')
        element_id = s.get('elementGlobalId')
        
        if genus_species and element_id:
            key = str(genus_species).strip().lower()
            species_map[key] = element_id

    results = {"success": 0, "failed": 0, "unmatched_list": []}
    photo_attributions = {}

    # Iterate through taxonomic folders (VertebrateAnimals, VascularPlants, etc.)
    for root, _, files in os.walk(raw_dir):
        for filename in files:
            if not filename.lower().endswith(('.jpeg', '.jpg', '.png', '.jfif')):
                continue
            
            sci_name_key, attribution = parse_filename(filename)
            
            if sci_name_key and sci_name_key in species_map:
                element_global_id = species_map[sci_name_key]
                src_path = os.path.join(root, filename)
                dest_path = os.path.join(output_dir, f"{element_global_id}.webp")

                try:
                    # Step 5: Resize to 800px and convert to .webp [Source 1, 3]
                    img = Image.open(src_path)
                    img.thumbnail((800, 800))
                    img.save(dest_path, "WEBP", quality=80)

                    # Step 4: Map attribution to the elementGlobalId [Source 2, 3]
                    photo_attributions[str(element_global_id)] = attribution
                    results["success"] += 1
                except Exception as e:
                    print(f"Error processing {filename}: {e}")
                    results["failed"] += 1
            else:
                results["failed"] += 1
                results["unmatched_list"].append(filename)

    # Save attributions to separate JSON file
    with open(attr_json_path, 'w') as f:
        json.dump(photo_attributions, f, indent=2)

    print("\n--- Image Processing Match Report ---")
    print(f"Successfully matched and processed: {results['success']}")
    print(f"Failed to match: {results['failed']}")
    
    if results["unmatched_list"]:
        with open("unmatched_species_photos.txt", "w") as f:
            for name in results["unmatched_list"]:
                f.write(f"{name}\n")
        print("Unmatched filenames saved to unmatched_species_photos.txt.")

if __name__ == "__main__":
    process_species_images(
        raw_dir="raw_images", 
        species_json_path="src/data/species.json", 
        output_dir="public/images/species", 
        attr_json_path="src/data/photoAttribution.json"
    )