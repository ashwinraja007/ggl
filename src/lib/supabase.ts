import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to get public URL for images stored in Supabase Storage
export function getSupabaseMedia(bucket: string, path: string | null) {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("//")) return path;
  
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}