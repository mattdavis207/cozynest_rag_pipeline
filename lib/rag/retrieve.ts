// TODO: Implement retrieval against Supabase/Postgres pgvector.
// Start with vector similarity search, then experiment with hybrid search or
// reranking after the basic path works.

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createSupabaseServerClient();

export async function retrieveRelevantChunks(message_embedding: number[]) {
  
  const { data, error } = await supabase
    .rpc("match_document_chunks",
      {
        question_embedding: message_embedding,
        match_count: 3
      }
    )
  
  if (error){
    throw new Error("Failed to match document chunks", error);
  }

  return data;
}
