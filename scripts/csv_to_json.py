import csv
import json
import re

# Paths are defined as constants so they can be easily updated
# if the project structure changes or Ray provides a new data file
INPUT_CSV = "raw_data/ORBIC_List_04082026.csv"
OUTPUT_JSON = "src/data/species.json"

def generate_slug(element_id, scientific_name):
    if not scientific_name or scientific_name.strip() == "":
        return element_id
    
    name = scientific_name.lower()
    name = re.sub(r'[^a-z0-9\s-]', '', name)
    name = re.sub(r'\s+', '-', name.strip())
    
    return f"{element_id}-{name}"

def parse_empty(value):
    # Empty strings should be None so TypeScript can handle them as null
    stripped = value.strip()
    return None if stripped == "" else stripped

def parse_int(value):
    # CSV stores numeric fields as strings, convert to integer
    # Returns None if value is empty or not a valid integer
    try:
        return int(value.strip())
    except (ValueError, AttributeError):
        return None
    
def parse_feature_me(value):
    return value.strip() == "1"

def to_camel_case(text):
    if not text or text.strip() == "":
        return None
    words = re.split(r'[ -]', text.strip())
    return words[0].lower() + ''.join(w.capitalize() for w in words[1:])

records = []

with open(INPUT_CSV, newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        row['slug'] = generate_slug(row['elementGlobalId'], row['scientificName'])
        row['list'] = to_camel_case(row['list'])
        row['orEndemic'] = parse_empty(row['orEndemic'])
        row['featureMe'] = parse_feature_me(row['featureMe'])
        row['category1'] = to_camel_case(row['category1'])
        row['category2'] = to_camel_case(row['category2'])
        row['nEo'] = parse_int(row['nEo'])
        row['nEoPre2000'] = parse_int(row['nEoPre2000'])
        row['nEoPost2000'] = parse_int(row['nEoPost2000'])

        # Set all remaining empty strings to None
        for key in row:
            if isinstance(row[key], str) and row[key].strip() == "":
                row[key] = None
        records.append(row)

seen_slugs = set()
deduped = []
removed = []
for record in records:
    if record["slug"] not in seen_slugs:
        seen_slugs.add(record["slug"])
        deduped.append(record)
    else:
        removed.append(record)

with open(OUTPUT_JSON, "w", encoding="utf-8") as jsonfile:
    json.dump(deduped, jsonfile, indent=2)

if removed:
    print(f"Warning: {len(removed)} duplicate(s) removed:")
    for r in removed:
        print(f"  - {r['scientificName']} (elementGlobalId: {r['elementGlobalId']})")
print(f"Done! {len(deduped)} records written to {OUTPUT_JSON}")