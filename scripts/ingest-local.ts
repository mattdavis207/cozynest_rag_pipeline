import { extractCSVLocal } from "@/lib/ingest/extract-csv";
import { extractPDFLocal } from "@/lib/ingest/extract-pdf";
import { extractTXTLocal } from "@/lib/ingest/extract-txt";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import type { ExtractedDocument } from "@/types/ingest";
import { hashContent } from "@/lib/ingest/hash";


config({ path: ".env.local" });

const fileNames = ['product_descriptions.txt', 'cozynest_products.csv', 
    'return_policy.pdf', 'shipping_faq.pdf'] as const 

const parsers = {'csv': extractCSVLocal, 'pdf': extractPDFLocal, 'txt': extractTXTLocal};

const supabase: SupabaseClient = createSupabaseServerClient();

// typing for the key of parsers
type ParserExtension = keyof typeof parsers;

function getExtension(fileName: string): ParserExtension {
  const extension = fileName.split(".").pop();

  if (!extension || !(extension in parsers)) {
    throw new Error(`Unsupported file type: ${fileName}`);
  }

  return extension as ParserExtension;
}

async function main() {

    for (const fileName of fileNames){
        const extension = getExtension(fileName);
        const parser = parsers[extension];

        const data = await parser(fileName);
        const content = typeof data === "string" ? data : data.content;
        const metadata = typeof data === "string" ? {} : data.metadata;

        const formattedDocument: ExtractedDocument = {
            title: fileName.split('.')[0],
            source_type: extension,
            source_uri: `test_files/${fileName}`,
            content_hash: hashContent(content),
            status: 'Pending',
            metadata: metadata,
        };

        const { data: ExtractedDocument, error: documentError } = await supabase
            .from('documents')
            .insert(formattedDocument)
            .select('doc_id')
            .single();

        if (documentError){
            console.log('document error', documentError);
            continue;
        }

        console.log("formatted document", formattedDocument);
    };
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
