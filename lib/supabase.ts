import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Nome del bucket di Supabase Storage per le immagini del sito.
export const SUPABASE_BUCKET = "immagini-sito";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || "";

/**
 * Indica se le variabili d'ambiente di Supabase sono configurate.
 * Usato per fare fallback ai dati locali (src/data/content.json) quando
 * Supabase non è ancora stato configurato (es. build senza credenziali).
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseServiceKey);
}

export function isSupabasePublicConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

let adminClient: SupabaseClient | null = null;
let publicClient: SupabaseClient | null = null;

/**
 * Client con la SERVICE ROLE KEY: usato lato server per lettura e scrittura
 * (bypassa la Row Level Security). NON esporre mai al browser.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase non è configurato. Imposta NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_KEY."
    );
  }
  if (!adminClient) {
    adminClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

/**
 * Client con la ANON KEY: usato per operazioni di sola lettura pubbliche.
 */
export function getSupabasePublic(): SupabaseClient {
  if (!isSupabasePublicConfigured()) {
    throw new Error(
      "Supabase pubblico non è configurato. Imposta NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  if (!publicClient) {
    publicClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return publicClient;
}

/**
 * Restituisce l'URL pubblico di un file nel bucket delle immagini.
 */
export function getPublicUrl(path: string): string {
  if (!supabaseUrl) return path;
  return `${supabaseUrl}/storage/v1/object/public/${SUPABASE_BUCKET}/${path}`;
}
