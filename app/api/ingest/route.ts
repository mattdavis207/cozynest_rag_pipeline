import { NextResponse, NextRequest } from "next/server";
import { ingestDocument } from "@/lib/rag/ingest";


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    await Promise.all(
      files.map((file) => ingestDocument(file))
    );

    return NextResponse.json({
       status: 200,
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