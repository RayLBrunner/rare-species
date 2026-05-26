import csv
import json

# Paths are defined as constants so they can be easily updated
# if the project structure changes or Ray provides a new data file
INPUT_CSV = "raw_data/MergedBooks2026.csv"
OUTPUT_JSON = "src/data/species.json"

records = []

with open(INPUT_CSV, newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        records.append(row)

with open(OUTPUT_JSON, "w", encoding="utf-8") as jsonfile:
    json.dump(records, jsonfile, indent=2)

print(f"Done! {len(records)} records written to {OUTPUT_JSON}")