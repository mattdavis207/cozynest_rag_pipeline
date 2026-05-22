import * as z from 'zod';

export const sourceTypeSchema = z.enum(["csv", "pdf", "txt"]);

export const documentStatusSchema = z.enum([
  "Pending",
  "Processing",
  "Ready",
  "Failed",
]);

export const ingestionStatusSchema = z.enum([
  "Queued",
  "Processing",
  "Complete",
  "Failed",
]);

export const documentRowSchema = z.object({
  doc_id: z.number(),
  title: z.string(),
  source_type: sourceTypeSchema,
  source_uri: z.string(),
  content_hash: z.string(),
  status: documentStatusSchema,
  metadata: z.record(z.string(), z.unknown()),
  created_at: z.string(),
  updated_at: z.string(),
});

export const documentsRowSchema = z.array(documentRowSchema);

export type DocumentRowSchema = z.infer<typeof documentRowSchema>;

export const documentTableRowSchema = documentRowSchema.pick({
  doc_id: true,
  title: true,
  source_type: true,
  status: true,
  metadata: true,
  created_at: true,
  updated_at: true,
});

export const documentTableRowsSchema = z.array(documentTableRowSchema);

export type DocumentTableRow = z.infer<typeof documentTableRowSchema>;

// ---------------------------------------

// Ingestion Log Schemas/Types

export const ingestionLogRowSchema = z.object({
  ingestion_id: z.number(),
  document_id: z.number().nullable(),
  source_type: sourceTypeSchema,
  source_uri: z.string(),
  status: ingestionStatusSchema,
  error_message: z.string().nullable(),
  started_at: z.string().nullable(),
  finished_at: z.string().nullable(),
  created_at: z.string(),
});

export const ingestionLogRowsSchema = z.array(ingestionLogRowSchema);

export type IngestionLogRowSchema = z.infer<typeof ingestionLogRowSchema>;

export const ingestionLogTableRowSchema = ingestionLogRowSchema.pick({
  document_id: true,
  source_type: true,
  status: true,
  error_message: true,
  started_at: true,
  finished_at: true,
  created_at: true,
});

export const ingestionLogTableRowsSchema = z.array(ingestionLogTableRowSchema);

export type IngestionLogTableRow = z.infer<typeof ingestionLogTableRowSchema>;

// ----------------------------------------

export const userMessageSchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

