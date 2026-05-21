import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import * as z from 'zod';
import { IngestionLogRowSchema, ingestionLogRowsSchema } from "@/schemas/schemas";



const supabase: SupabaseClient = createSupabaseServerClient();

export async function GET() {
  try {
    const { data, error } = await supabase
        .from('ingestion_logs')
        .select("*")
        .order("ingestion_id", {ascending: true})
        .order("created_at", {ascending: false})
        .order("started_at", {ascending: false});

    if (error){
        console.error("Failed to fetch ingestion logs", error);

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
    const result = ingestionLogRowsSchema.safeParse(data);

    if (!result.success){
        return NextResponse.json({
            error: 'Invalid schema type',
            code: 400
        })
    }
    
    return NextResponse.json({ logs: data })
        
  } catch (error){
    return NextResponse.json(
        { error: "Could not get ingestion log records" },
        { status: 501 },
      );
  }
}