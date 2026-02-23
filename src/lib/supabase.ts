import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to get public URL for images stored in Supabase Storage
export function getSupabaseMedia(bucket: string, path: string | null) {
  if (!path) return null;
  if (path.startsWith("http") || path.startsWith("//")) return path;
  
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function supabaseRequest<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  if (supabaseUrl === "https://placeholder.supabase.co" || supabaseKey === "placeholder") {
    return null;
  }

  const url = `${supabaseUrl}/rest/v1/${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "apikey": supabaseKey,
    "Authorization": `Bearer ${supabaseKey}`,
    "Prefer": "return=representation",
    ...(options?.headers as Record<string, string>),
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${errorText}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}