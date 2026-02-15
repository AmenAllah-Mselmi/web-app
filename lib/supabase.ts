import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : "https://placeholder.supabase.co";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    "placeholder-key";

if (supabaseUrl === "https://placeholder.supabase.co") {
    console.warn("⚠️ Supabase URL is missing. Using placeholder to prevent crash. Please update .env.local");
}

export const isSupabaseConfigured = supabaseUrl !== "https://placeholder.supabase.co";
export const supabase = createClient(supabaseUrl, supabaseKey);
