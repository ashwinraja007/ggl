import { supabaseRequest } from "./supabase";

export interface PageContent {
  id: number;
  page_path: string;
  section_key: string;
  content: Record<string, any>;
  images: Record<string, any>;
}

export async function fetchPageContent(pagePath?: string): Promise<PageContent[]> {
  let query = `page_content?select=*`;
  if (pagePath) {
    const encodedPath = encodeURIComponent(pagePath);
    query += `&page_path=eq.${encodedPath}`;
  }
  const data = await supabaseRequest<PageContent[]>(query);
  return data ?? [];
}

export async function createPageContent(payload: Omit<PageContent, "id">): Promise<PageContent> {
  const data = await supabaseRequest<PageContent[]>("page_content", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!data || data.length === 0) {
    throw new Error("Failed to create page content");
  }
  return data[0];
}

export async function updatePageContent(id: number, payload: Partial<PageContent>): Promise<PageContent> {
  const data = await supabaseRequest<PageContent[]>(`page_content?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!data || data.length === 0) {
    throw new Error("Failed to update page content");
  }
  return data[0];
}

export async function deletePageContent(id: number): Promise<void> {
  await supabaseRequest(`page_content?id=eq.${id}`, {
    method: "DELETE",
  });
}