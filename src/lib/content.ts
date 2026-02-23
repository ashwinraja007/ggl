import { supabaseRequest } from "./supabase";

export interface PageContent {
  id: number;
  page_path: string;
  section_key: string;
  content: Record<string, any>;
  images: Record<string, any>;
}

export async function fetchPageContent(pagePath: string): Promise<PageContent[]> {
  const encodedPath = encodeURIComponent(pagePath);
  const query = `page_content?select=*&page_path=eq.${encodedPath}`;
  const data = await supabaseRequest<PageContent[]>(query);
  return data ?? [];
}