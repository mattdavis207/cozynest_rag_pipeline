import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import * as z from 'zod';
import { documentsRowSchema } from "@/schemas/schemas";

const supabase: SupabaseClient = createSupabaseServerClient();

export async function GET() {
  try { 
    const { data, error  } = await supabase
      .from('documents')
      .select("*")
      .order("doc_id", {ascending: true})
      .order("created_at", {ascending: false})
      .order("updated_at", {ascending: false});

    // error handling for fetching
    if (error){
      console.error("Failed to fetch documents:", error);

      return NextResponse.json(
        {
          error: "Failed to fetch Documents",
          message: error.message,
          code: error.code,
        }, 
        {
          status: 500
        }
      )
    }

    // check schema type
    const result = documentsRowSchema.safeParse(data);

    if (!result.success){
      return NextResponse.json({
          error: 'Invalid schema type',
          code: 400
      })
  }

    return NextResponse.json({ documents: data })
  
  } catch (error){
    return NextResponse.json(
      { error: "Could not get document records" },
      { status: 501 },
    );
  }


 
}
