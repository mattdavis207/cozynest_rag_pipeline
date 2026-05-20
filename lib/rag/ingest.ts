// TODO: Orchestrate ingestion here after chunking, embedding, and Supabase
// storage are implemented. n8n can call the API route later to automate this.
import { extractTXT } from "@/lib/ingest/extract-txt";
import { extractCSV } from "@/lib/ingest/extract-csv";
import { extractPDF } from "@/lib/ingest/extract-pdf";
import { chunkDocument } from "./chunk";
import { embedTexts } from "./embed";
import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ExtractedDocument } from "@/types/ingest";
import { hashContent } from "../ingest/hash";
import type { DocumentChunk } from "@/types/ingest";


const parsers = {'csv': extractCSV, 'pdf': extractPDF, 'txt': extractTXT};
const supabase: SupabaseClient = createSupabaseServerClient();

type ParserExtension = keyof typeof parsers;

// helper function to get file extension
function getExtension(fileName: string): ParserExtension {
  const extension = fileName.split(".").pop();

  if (!extension || !(extension in parsers)) {
    throw new Error(`Unsupported file type: ${fileName}`);
  }

  return extension as ParserExtension;
}


export async function ingestDocument(file: File) {
  
  const extension = getExtension(file.name);
  const parser = parsers[extension];

  // use parser to extract data
  const data = await parser(file);
  const content = data.content;
  const metadata = data.metadata;

  const sourceUri= `upload://${file.name}`;

  // first create ingestion log
  const { data: log, error: logError } = await supabase 
    .from('ingestion_logs')
    .insert({
      source_type: extension,
      source_uri: sourceUri,
      status: "Processing"
    })
    .select('ingestion_id')
    .single();

  if (logError){
    throw logError;
  }

  // format document information
  const ed = {
    title: file.name, 
    source_type: extension,
    source_uri: sourceUri,
    content_hash: hashContent(content),
    status: 'Pending',
    metadata: metadata
  } as ExtractedDocument
  
  // insert document into supabase 
  const { data: document, error: documentError }  = await supabase
    .from('documents')
    .insert( ed )
    .select('doc_id')
    .single(); // this makes sure only selecting a single record

  if (documentError){
    throw documentError;
  }

  // then update ingestion log with document id
  await supabase
    .from("ingestion_logs")
    .update({
      document_id: document.doc_id
    })
    .eq("ingestion_id", log.ingestion_id);

  
  try{
    // chunk document
    const chunks = chunkDocument(content);
    
    // get content chunks 
    const content_chunks = chunks.map((chunk) => chunk.content);

    // now get all the embeddings for 
    const embeddings = await embedTexts(content_chunks);

    if (!embeddings || embeddings.length === 0){
      throw new Error("Embedding count does not match chunk count.");
    }

    const dcFormatted: DocumentChunk[] = chunks.map((chunk, index) => {
      const embedding = embeddings[index];

      if (!embedding || embedding.length !== 768) {
        throw new Error(
          `Invalid embedding at chunk ${index} for document ${file.name}. Expected 768 dimensions, got ${embedding?.length ?? 0}`
        );
      }
      return {
        document_id: document.doc_id,
        chunk_index: index,
        content: content_chunks[index],
        token_count: chunks[index].token_count,
        metadata: chunks[index].metadata,
        embedding: embeddings[index] ?? [],
        embedding_model: 'gemini-embedding-2'
      }
    }); 

    const { error: chunkError} = await supabase 
      .from('document_chunks')
      .insert(dcFormatted)

    if (chunkError){
      throw chunkError;
    }

    // update document and ingestion status with complete
    await supabase
      .from("documents")
      .update({ status: "Ready"})
      .eq("doc_id", document.doc_id);

    await supabase 
      .from("ingestion_logs")
      .update({ 
        status: "Complete",
        finished_at: new Date().toISOString()
      })
      .eq("ingestion_id", log.ingestion_id);

    return {
      documentId: document.doc_id,
      ingestionId: log.ingestion_id,
      title: file.name,
      sourceType: extension,
      sourceUri,
      chunkCount: chunks.length,
      status: "Complete",
    }
  } catch (error){
    // update document and ingestion log with failed error status
    const message = error instanceof Error ? error.message: "Unknown Ingestion error";
    
    if(document?.doc_id){
      await supabase 
        .from("documents")
        .update({ status: "Failed"})
        .eq("doc_id", document.doc_id);
    }

    await supabase 
      .from("ingestion_logs")
      .update({ 
        status: "Failed", 
        finished_at: new Date().toISOString(),
        error_message: message
      })
      .eq("ingestion_id", log.ingestion_id);
    
    throw error; 
  }
}
