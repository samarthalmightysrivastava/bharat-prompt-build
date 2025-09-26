"use client";

import { createClient } from "@supabase/supabase-js";

let supabaseSingleton: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (supabaseSingleton) return supabaseSingleton;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !anon) {
    console.warn("Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }

  supabaseSingleton = createClient(url || "", anon || "", {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return supabaseSingleton;
}