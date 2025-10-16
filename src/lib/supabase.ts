const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ?? "https://hsryyprixivyqjnxtjdo.supabase.co";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzcnl5cHJpeGl2eXFqbnh0amRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjM1NjYsImV4cCI6MjA3NjEzOTU2Nn0.p0fj8ahdDwEqDNlnRm4aofR5d-XX5bsSbYw86iMsnFs";

const REST_URL = `${SUPABASE_URL}/rest/v1`;

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface SupabaseRequestInit extends Omit<RequestInit, "headers" | "method"> {
  method?: HttpMethod;
  headers?: HeadersInit;
}

export async function supabaseRequest<T>(
  endpoint: string,
  { method = "GET", headers, body, ...rest }: SupabaseRequestInit = {}
): Promise<T> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase credentials are not configured");
  }

  const requestHeaders = new Headers(headers);
  requestHeaders.set("apikey", SUPABASE_ANON_KEY);
  requestHeaders.set("Authorization", `Bearer ${SUPABASE_ANON_KEY}`);
  if (!requestHeaders.has("Content-Type") && method !== "GET") {
    requestHeaders.set("Content-Type", "application/json");
  }
  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  if (method !== "GET") {
    requestHeaders.set("Prefer", "return=representation");
  }

  const response = await fetch(`${REST_URL}/${endpoint}`, {
    method,
    headers: requestHeaders,
    body,
    ...rest,
  });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const error = await response.json();
      message = error.message || JSON.stringify(error);
    } catch (error) {
      const text = await response.text();
      if (text) {
        message = text;
      }
    }
    throw new Error(message || "Supabase request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export { SUPABASE_URL, SUPABASE_ANON_KEY };
