
import { readFileSync } from "node:fs";
import path from "node:path";
import { PDFParse }from "pdf-parse";

export async function extractPDF(fileName: string, ){

    let dataBuffer = readFileSync(`test_files/${fileName}`);

    const parser = new PDFParse({data: dataBuffer});
    const content = await parser.getText();

    await parser.destroy();

    return { content: content.text, metadata: {} };
}
