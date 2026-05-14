import { NextResponse } from "next/server";

export async function POST() {
  // TODO: Build the chat pipeline here:
  // 1. Validate the incoming customer question.
  // 2. Embed the query.
  // 3. Retrieve relevant document chunks from Supabase/pgvector.
  // 4. Build a grounded prompt.
  // 5. Call Groq and return the answer plus sources.
  return NextResponse.json(
    { error: "TODO: implement chat route" },
    { status: 501 },
  );
}
