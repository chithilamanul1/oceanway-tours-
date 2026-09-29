import os
from PyPDF2 import PdfReader

pdf_dir = r"D:\desktop\oceanway tours internaries\pdf\done"
output_file = "all_tours_extracted.txt"

with open(output_file, "w", encoding="utf-8") as out_f:
    for filename in os.listdir(pdf_dir):
        if filename.endswith(".pdf"):
            filepath = os.path.join(pdf_dir, filename)
            out_f.write(f"\n\n==================== {filename} ====================\n\n")
            try:
                reader = PdfReader(filepath)
                for page in reader.pages:
                    text = page.extract_text()
                    if text:
                        out_f.write(text + "\n")
            except Exception as e:
                out_f.write(f"Error reading {filename}: {e}\n")

    # Also read the HTML
    html_path = r"D:\desktop\oceanway tours internaries\Working_Tours\young europe\young europe.html"
    out_f.write("\n\n==================== young europe.html ====================\n\n")
    try:
        with open(html_path, "r", encoding="utf-8") as hf:
            out_f.write(hf.read())
    except Exception as e:
        out_f.write(f"Error reading html: {e}")

print("Done extracting to", output_file)
