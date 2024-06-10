import { createClient } from "@supabase/supabase-js";

import { env } from "@/env";

import { Database } from "./types";

export const supabase = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
