import { MatchingDocumentChunk } from "@/types/ingest";

export type PromptMessage = {
  role: "system" | "user";
  content: string;
};

export type AnswerSource = {
  id: string;
  title: string;
  source_type: MatchingDocumentChunk["source_type"];
  source_uri: string;
  chunk_index: number;
  similarity_score: number;
  metadata: Record<string, unknown>;
  content: string;
};

export type SupportPrompt = {
  messages: PromptMessage[];
  sources: AnswerSource[];
};

function formatMetadata(metadata: Record<string, unknown>) {
  const entries = Object.entries(metadata);

  if (entries.length === 0) {
    return "None";
  }

  return entries
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");
}

function formatRetrievedContext(chunks: MatchingDocumentChunk[]) {
  if (chunks.length === 0) {
    return "No retrieved context was found.";
  }

  return chunks
    .map((chunk) => {
      const sourceId = `${chunk.document_id}-${chunk.chunk_index}`;

      return [
        `[source: ${sourceId}]`,
        `Title: ${chunk.title}`,
        `Source type: ${chunk.source_type}`,
        `Source URI: ${chunk.source_uri}`,
        `Chunk index: ${chunk.chunk_index}`,
        `Similarity score: ${chunk.similarity_score}`,
        "Metadata:",
        formatMetadata(chunk.metadata),
        "Content:",
        chunk.content,
      ].join("\n");
    })
    .join("\n\n---\n\n");
}

export function buildSupportPrompt(
  message: string,
  chunks: MatchingDocumentChunk[],
): SupportPrompt {
  const sources = chunks.map((chunk) => ({
    id: `${chunk.document_id}-${chunk.chunk_index}`,
    title: chunk.title,
    source_type: chunk.source_type,
    source_uri: chunk.source_uri,
    chunk_index: chunk.chunk_index,
    similarity_score: chunk.similarity_score,
    metadata: chunk.metadata,
    content: chunk.content
  }));
  const retrievedContext = formatRetrievedContext(chunks);

  return {
    messages: [
      {
        role: "system",
        content: [
          "You are CozyNest's customer support assistant.",
          "Answer the customer using only the retrieved context below.",
          "If the answer is not in the retrieved context, say you do not have enough information from the provided documents.",
          "Do not make up policies, product details, prices, shipping times, or return rules.",
          "Keep the answer concise and helpful.",
          "When you use a source, cite it by source id, for example: [source: 12-0].",
        ].join("\n"),
      },
      {
        role: "user",
        content: [
          "Retrieved context:",
          retrievedContext,
          "",
          "Customer message:",
          message,
          "",
          "Use only the retrieved context above to answer.",
          "Return the answer in plain text and include source citations for factual claims.",
        ].join("\n"),
      },
    ],
    sources,
  };
}
