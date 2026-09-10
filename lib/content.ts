import fs from "fs";
import path from "path";
import type { SiteContent } from "./content-types";

// Percorso del file JSON che contiene i contenuti editabili del sito.
export const CONTENT_FILE_PATH = path.join(process.cwd(), "src", "data", "content.json");

/**
 * Legge i contenuti del sito dal file JSON.
 * Usata sia dalle pagine pubbliche (server components) sia dalle API route.
 */
export function getContent(): SiteContent {
  const raw = fs.readFileSync(CONTENT_FILE_PATH, "utf8");
  return JSON.parse(raw) as SiteContent;
}

/**
 * Scrive i contenuti aggiornati sul file JSON (usata dalle API route dell'admin).
 */
export function saveContent(content: SiteContent): void {
  fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), "utf8");
}
