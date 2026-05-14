import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Query Supabase for document metadata to power the admin table.
  // Keep this route focused on document records, not retrieval logic.
  return NextResponse.json(
    { error: "TODO: implement documents route" },
    { status: 501 },
  );
}
