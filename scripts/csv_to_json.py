import csv
import json

# Paths are defined as constants so they can be easily updated
# if the project structure changes or Ray provides a new data file
INPUT_CSV = "raw_data/ORBIC_List_06072026.csv"
OUTPUT_JSON = "src/data/species.json"

def generate_slug(element_id):
    return element_id

def parse_or_endemic(value):
    # CSV stores orEndemic as "Yes"/"No" string, convert to boolean
    return value.strip().lower() == "yes"

def parse_int(value):
    # CSV stores numeric fields as strings, convert to integer
    # Returns None if value is empty or not a valid integer
    try:
        return int(value.strip())
    except (ValueError, AttributeError):
        return None

records = []

with open(INPUT_CSV, newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        row['slug'] = generate_slug(row['elementGlobalId'])
        row['orEndemic'] = parse_or_endemic(row['orEndemic'])
        row['orbicList'] = parse_int(row['orbicList'])
        row['nEo'] = parse_int(row['nEo'])
        row['nEoPre2000'] = parse_int(row['nEoPre2000'])
        row['nEoPost2000'] = parse_int(row['nEoPost2000'])
        records.append(row)

with open(OUTPUT_JSON, "w", encoding="utf-8") as jsonfile:
    json.dump(records, jsonfile, indent=2)

print(f"Done! {len(records)} records written to {OUTPUT_JSON}")