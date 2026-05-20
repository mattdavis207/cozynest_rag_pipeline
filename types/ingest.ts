export type SourceType = "csv" | "pdf" | "txt";
export type DocumentStatus = "Pending" | "Processing" | "Ready" | "Failed";
export type IngestionStatus = "Queued" | "Processing" | "Complete" | "Failed";

export type ExtractedDocument = {
  title: string;
  source_type: SourceType;
  source_uri: string;
  content_hash: string;
  status: DocumentStatus;
  metadata: Record<string, unknown>;
};

export type ParsedCsvRow = Record<string, string>;

export type DocumentChunk = {
  document_id: number;
  chunk_index: number;
  content: string;
  token_count: number;
  metadata: Record<string, unknown>;
  embedding: number[],
  embedding_model: string,
}

export type IngestionLog = {
  ingestion_id?: number;
  document_id?: number | null;
  source_type: SourceType;
  source_uri: string;
  status: IngestionStatus;
  error_message?: string | null;
  started_at?: string;
  finished_at?: string | null;
  created_at?: string;
};

export type IngestDocumentResult = {
  documentId: number;
  ingestionId: number;
  title: string;
  sourceType: SourceType;
  sourceUri: string;
  chunkCount: number;
  status: "Complete";
};
