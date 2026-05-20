// helper function to extract text from .txt file
export function extractTXTLocal(fileName: string){
    const fs = require('fs');
    const content = fs.readFileSync(`test_files/${fileName}`, 'utf-8');
    return { content: content , metadata: {}};
}

export async function extractTXT(file: File) {
    return {
      content: await file.text(),
      metadata: {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      },
    };
  }
