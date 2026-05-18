import { metadata } from "@/app/layout";


// helper function to extract text from .txt file
export function extractTXT(fileName: string){
    const fs = require('fs');
    const content = fs.readFileSync(`test_files/${fileName}`, 'utf-8');
    return { content: content , metadata: {}};
}
