from pypdf import PdfReader, PdfWriter
from glob import glob
import os

def merge_pdfs(input_paths, output_path):
    writer = PdfWriter()

    # Ensure output directory exists
    out_dir = os.path.dirname(output_path) or "."
    os.makedirs(out_dir, exist_ok=True)

    for pdf in input_paths:
        reader = PdfReader(pdf)
        for page in reader.pages:
            writer.add_page(page)

    with open(output_path, "wb") as out_f:
        writer.write(out_f)

    return output_path

if __name__ == "__main__":
    input_paths = glob(r"C:\coding_1\99999\WEB__DEV\HTMLS\hello\*.pdf")
    output_path = r"C:\coding_1\99999\WEB__DEV\HTMLS\hi\merged.pdf"
    print(f"Merged into: {merge_pdfs(input_paths, output_path)}")
