import { createClient, SupabaseClient } from "@supabase/supabase-js";

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let browserClient: SupabaseClient<any, any, any> | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createBrowserClient();
  }
  return browserClient;
}
