import Papa from 'papaparse';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { ParsedCsvRow } from '@/types/ingest';

export function extractCSV(fileName: string){
    const filePath = path.join (process.cwd(), "test_files", fileName);
    const csvText = readFileSync(filePath, "utf-8");
    const data = Papa.parse(csvText, {header: true, delimiter: ','});
    
    const rows = data.data as ParsedCsvRow[];
    const columns = data.meta.fields ?? [];

    const content = rows
        .map((row, index) => {
            const fields = Object.entries(row)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n");
            return `Row ${index + 1}\n${fields}`
        })
        .join('\n\n');

    return {
        content: content,
        metadata: {
            rowCount: rows.length,
            columns,
            delimiter: data.meta.delimiter,
        },
    };
}       
