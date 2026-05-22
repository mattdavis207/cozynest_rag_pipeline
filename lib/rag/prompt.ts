// TODO: Implement prompt construction for grounded customer-support answers.
// Include instructions for using only retrieved context and returning sources.
import { MatchingDocumentChunk } from "@/types/ingest";

type GroqSourceChunk = {
  title: string;
  content: string;
  source_type: 'csv' | 'pdf' | 'txt';
  source_uri: string;
  chunk_index: number;
  similarity_score: number;
  metadata: Record<string, unknown>;
}

export type ContextDocument = {
  id: string,
  source: {
    data: GroqSourceChunk,
    type: 'json'
  }
}

export function buildSupportPrompt(message: string, data: MatchingDocumentChunk[]) {
  

  const documents = data.map((chunk) => (
    {
      id: `${chunk.document_id}-${chunk.chunk_index}`,
      source: {
        data: {
          title: chunk.title,
          content: chunk.content,
          source_type: chunk.source_type,
          source_uri: chunk.source_uri,
          chunk_index: chunk.chunk_index,
          similarity_score: chunk.similarity_score,
          metadata: chunk.metadata,
        },
        type: 'json' 
      }
    }
  ))

  
  



}
