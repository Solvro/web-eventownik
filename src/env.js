import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .url()
      .default("https://kmiyeqcynkremenbffvl.supabase.co"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z
      .string()
      .min(1)
      .default(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttaXllcWN5bmtyZW1lbmJmZnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5OTkzMTksImV4cCI6MjAzMjU3NTMxOX0.x4Hj7My-4RJHo3r1UdXC_4oWUUm_keg1Ld2sdWjIIWg",
      ),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
});
