import { NextResponse, NextRequest } from "next/server";
import { ingestDocument } from "@/lib/rag/ingest";


export async function POST(request: NextRequest) {
  // TODO: Build document ingestion here:
  // 1. Accept uploaded or automation-provided files.
  // 2. Extract text.
  // 3. Chunk content.
  // 4. Generate Gemini embeddings.
  // 5. Store documents/chunks/embeddings in Supabase.

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    const results = await Promise.all(
      files.map((file) => ingestDocument(file))
    );

    return NextResponse.json({
       status: 200,
       results: results
  });


  } catch (err){
    console.error("Ingestion route failed:", err);

    return NextResponse.json({
      error: "Internal Server Error",
      message: err instanceof Error ? err.message : "Unknown ingestion error",
      code: 500
    }, { status: 500 })
  }


  
}


export const runtime = "nodejs";