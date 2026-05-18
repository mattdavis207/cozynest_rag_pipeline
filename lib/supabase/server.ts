
import { createClient, type WebSocketLikeConstructor } from "@supabase/supabase-js"
import ws from "ws"

export function createSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing NEXT_SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
      realtime: {
        transport: ws as unknown as WebSocketLikeConstructor,
      },
    }
  );
  
}
