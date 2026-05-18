export type SourceType = "csv" | "pdf" | "txt";

export type ExtractedDocument = {
  title: string;
  source_type: SourceType;
  source_uri: string;
  content_hash: string;
  status: string;
  metadata: Record<string, unknown>;
};

export type ParsedCsvRow = Record<string, string>;
