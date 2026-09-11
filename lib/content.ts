import fs from "fs";
import path from "path";
import type { ContentData } from "./content-types";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase";

// Percorso del file JSON con i contenuti iniziali (usato come fallback e per il seed).
export const CONTENT_FILE_PATH = path.join(process.cwd(), "src", "data", "content.json");

// ID fisso della riga dei contenuti nella tabella site_content.
const CONTENT_ROW_ID = "main";

/**
 * Legge i contenuti iniziali dal file JSON locale (fallback / seed).
 */
export function getContentFromFile(): ContentData {
  const raw = fs.readFileSync(CONTENT_FILE_PATH, "utf8");
  const parsed = JSON.parse(raw);
  return {
    home: parsed.home,
    chiSiamo: parsed.chiSiamo,
    contatti: parsed.contatti,
  };
}

/**
 * Legge l'intestazione della pagina Servizi dal file locale.
 * (I singoli servizi sono gestiti nella tabella `servizi` di Supabase.)
 */
export function getServiziHeaderFromFile(): { eyebrow: string; title: string; description: string } {
  try {
    const raw = fs.readFileSync(CONTENT_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return (
      parsed?.servizi?.header ?? {
        eyebrow: "Le Nostre Competenze",
        title: "I Nostri Servizi",
        description: "",
      }
    );
  } catch {
    return { eyebrow: "Le Nostre Competenze", title: "I Nostri Servizi", description: "" };
  }
}

/**
 * Legge i contenuti del sito (Home, Chi Siamo, Contatti).
 * Usa Supabase se configurato, altrimenti fa fallback al file JSON locale.
 */
export async function getContent(): Promise<ContentData> {
  if (!isSupabaseConfigured()) {
    return getContentFromFile();
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("site_content")
      .select("home, chi_siamo, contatti")
      .eq("id", CONTENT_ROW_ID)
      .maybeSingle();

    if (error) throw error;

    // Se la riga non esiste ancora o è vuota, usa i contenuti del file locale.
    const fileContent = getContentFromFile();
    if (!data || !data.home || Object.keys(data.home).length === 0) {
      return fileContent;
    }

    return {
      home: data.home,
      chiSiamo: data.chi_siamo,
      contatti: data.contatti,
    } as ContentData;
  } catch (err) {
    console.error("Errore nel leggere i contenuti da Supabase, uso il file locale:", err);
    return getContentFromFile();
  }
}

/**
 * Salva i contenuti del sito su Supabase (tabella site_content).
 */
export async function saveContent(content: ContentData): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase non è configurato: impossibile salvare i contenuti in modo permanente."
    );
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("site_content").upsert(
    {
      id: CONTENT_ROW_ID,
      home: content.home,
      chi_siamo: content.chiSiamo,
      contatti: content.contatti,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );

  if (error) throw error;
}
