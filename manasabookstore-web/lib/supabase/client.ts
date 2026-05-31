"use client";

import { createClient } from "@supabase/supabase-js";

import { Database } from "./database.types";
import { getSupabasePublicEnv } from "./env";

export function createSupabaseBrowserClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  return createClient<Database>(env.url, env.anonKey);
}

