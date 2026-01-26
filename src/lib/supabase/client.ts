import { createClient } from "@supabase/supabase-js";

// Client-side Supabase client (uses anon key)
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

// Singleton for browser client
let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createBrowserClient();
  }
  return browserClient;
}
