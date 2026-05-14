import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Build document ingestion here:
  // 1. Accept uploaded or automation-provided files.
  // 2. Extract text.
  // 3. Chunk content.
  // 4. Generate Gemini embeddings.
  // 5. Store documents/chunks/embeddings in Supabase.
  return NextResponse.json(
    { error: "TODO: implement ingest route" },
    { status: 501 },
  );
}
