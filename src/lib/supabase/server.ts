import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client (uses service role key)
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase server environment variables");
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Singleton for server client
let serverClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseServerClient() {
  if (!serverClient) {
    serverClient = createServerClient();
  }
  return serverClient;
}
