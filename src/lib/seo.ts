import { supabaseRequest } from "./supabase";

export interface SeoRecord {
  id: number;
  path: string;
  title: string | null;
  description: string | null;
  keywords: string | null;
  extra_meta: Record<string, string> | null;
  created_at?: string;
  updated_at?: string;
}

export interface SeoPayload {
  path: string;
  title?: string;
  description?: string;
  keywords?: string;
  extra_meta?: Record<string, string> | null;
}

const TABLE_NAME = "seo_gglsgog";

export async function fetchSeoRecords(): Promise<SeoRecord[]> {
  try {
    const query = `${TABLE_NAME}?select=*&order=path.asc`;
    const data = await supabaseRequest<SeoRecord[]>(query);
    return data ?? [];
  } catch (error) {
    console.error("Failed to fetch SEO records", error);
    throw error;
  }
}

export async function fetchSeoRecordByPath(path: string): Promise<SeoRecord | null> {
  const encodedPath = encodeURIComponent(path);
  const query = `${TABLE_NAME}?select=*&path=eq.${encodedPath}`;
  const data = await supabaseRequest<SeoRecord[]>(query);
  if (!data || data.length === 0) {
    return null;
  }
  return data[0];
}

export async function createSeoRecord(payload: SeoPayload): Promise<SeoRecord> {
  const data = await supabaseRequest<SeoRecord[]>(TABLE_NAME, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!data || data.length === 0) {
    throw new Error("Failed to create SEO record");
  }
  return data[0];
}

export async function updateSeoRecord(id: number, payload: SeoPayload): Promise<SeoRecord> {
  const data = await supabaseRequest<SeoRecord[]>(`${TABLE_NAME}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!data || data.length === 0) {
    throw new Error("Failed to update SEO record");
  }
  return data[0];
}

export async function deleteSeoRecord(id: number): Promise<void> {
  await supabaseRequest(`${TABLE_NAME}?id=eq.${id}`, {
    method: "DELETE",
  });
}
