
import { readFileSync } from "node:fs";
import path from "node:path";
import { PDFParse }from "pdf-parse";

export async function extractPDFLocal(fileName: string, ){

    let dataBuffer = readFileSync(`test_files/${fileName}`);

    const parser = new PDFParse({data: dataBuffer});
    const content = await parser.getText();

    await parser.destroy();

    return { content: content.text, metadata: {} };
}

export async function extractPDF(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
  
    await parser.destroy();
  
    return {
      content: result.text,
      metadata: {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      },
    };
  }