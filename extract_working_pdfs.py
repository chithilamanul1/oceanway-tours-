import os
from PyPDF2 import PdfReader

working_dir = r"D:\desktop\oceanway tours internaries\Working_Tours"
output_file = "working_tours_extracted.txt"

with open(output_file, "w", encoding="utf-8") as out_f:
    for root, dirs, files in os.walk(working_dir):
        for filename in files:
            if filename.endswith(".pdf"):
                filepath = os.path.join(root, filename)
                out_f.write(f"\n\n==================== {filename} ====================\n\n")
                try:
                    reader = PdfReader(filepath)
                    for page in reader.pages:
                        text = page.extract_text()
                        if text:
                            out_f.write(text + "\n")
                except Exception as e:
                    out_f.write(f"Error reading {filename}: {e}\n")

print("Done extracting to", output_file)
