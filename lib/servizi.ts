import fs from "fs";
import type { Servizio } from "./content-types";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";
import { CONTENT_FILE_PATH } from "./content";

const TABLE = "servizi";

/**
 * Fallback: legge i servizi dal file JSON locale e li mappa nella struttura
 * della tabella `servizi`. Usato quando Supabase non è configurato.
 */
export function getServiziFromFile(): Servizio[] {
  try {
    const raw = fs.readFileSync(CONTENT_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    const items = parsed?.servizi?.items ?? [];
    return items.map((item: Record<string, unknown>, i: number) => {
      const gallery = Array.isArray(item.gallery)
        ? (item.gallery as { src: string }[]).map((g) => g.src)
        : [];
      const image = typeof item.image === "string" ? item.image : "";
      const foto = [image, ...gallery].filter(Boolean);
      return {
        id: (item.slug as string) || `servizio-${i}`,
        nome: (item.title as string) || "",
        descrizione: (item.longDesc as string) || (item.desc as string) || "",
        icona: "",
        ordine: i,
        foto,
      } as Servizio;
    });
  } catch {
    return [];
  }
}

/**
 * Restituisce tutti i servizi ordinati per campo `ordine`.
 */
export async function getServizi(): Promise<Servizio[]> {
  if (!isSupabaseConfigured()) {
    return getServiziFromFile();
  }
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from(TABLE)
      .select("*")
      .order("ordine", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) {
      // Nessun servizio in DB: fallback ai dati locali (utile prima del seed).
      return getServiziFromFile();
    }
    return data as Servizio[];
  } catch (err) {
    console.error("Errore nel leggere i servizi da Supabase, uso il file locale:", err);
    return getServiziFromFile();
  }
}

/**
 * Restituisce un singolo servizio per id.
 */
export async function getServizioById(id: string): Promise<Servizio | null> {
  if (!isSupabaseConfigured()) {
    return getServiziFromFile().find((s) => s.id === id) ?? null;
  }
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Servizio) ?? null;
}

export interface ServizioInput {
  nome: string;
  descrizione: string;
  icona?: string;
  ordine?: number;
  foto?: string[];
}

/**
 * Crea un nuovo servizio.
 */
export async function createServizio(input: ServizioInput): Promise<Servizio> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      nome: input.nome,
      descrizione: input.descrizione,
      icona: input.icona ?? "",
      ordine: input.ordine ?? 0,
      foto: input.foto ?? [],
    })
    .select()
    .single();

  if (error) throw error;
  return data as Servizio;
}

/**
 * Aggiorna un servizio esistente.
 */
export async function updateServizio(
  id: string,
  input: Partial<ServizioInput>
): Promise<Servizio> {
  const supabase = getSupabaseAdmin();
  const patch: Record<string, unknown> = {};
  if (input.nome !== undefined) patch.nome = input.nome;
  if (input.descrizione !== undefined) patch.descrizione = input.descrizione;
  if (input.icona !== undefined) patch.icona = input.icona;
  if (input.ordine !== undefined) patch.ordine = input.ordine;
  if (input.foto !== undefined) patch.foto = input.foto;

  const { data, error } = await supabase
    .from(TABLE)
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Servizio;
}

/**
 * Elimina un servizio.
 */
export async function deleteServizio(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
