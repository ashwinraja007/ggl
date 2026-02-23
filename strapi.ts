export const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL || "http://localhost:1337";
export const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || "";

export async function fetchStrapi(path: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  const res = await fetch(`${STRAPI_API_URL}/api${path}`, { headers });

  if (!res.ok) {
    throw new Error(`Failed to fetch from Strapi: ${res.statusText}`);
  }

  return res.json();
}

export function getStrapiMedia(url: string | undefined | null) {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_API_URL}${url}`;
}