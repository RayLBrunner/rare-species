from PIL import Image
import os

INPUT_DIR = "public/images/eco-region"
OUTPUT_FORMAT = "webp"
QUALITY = 80

def convert_to_webp(input_dir):
    for root, dirs, files in os.walk(input_dir):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.heic')):
                input_path = os.path.join(root, file)
                output_path = os.path.splitext(input_path)[0] + ".webp"
                try:
                    img = Image.open(input_path)
                    img.save(output_path, OUTPUT_FORMAT, quality=QUALITY)
                    os.remove(input_path)  # delete original after successful conversion
                    print(f"Converted and replaced: {input_path} -> {output_path}")
                except Exception as e:
                    print(f"Failed: {input_path} — {e}")

convert_to_webp(INPUT_DIR)
print("Done!")