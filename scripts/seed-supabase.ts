/**
 * Script di seed per Supabase.
 *
 * Cosa fa:
 *  1. Legge i contenuti da src/data/content.json.
 *  2. Carica su Supabase Storage (bucket "immagini-sito") tutte le immagini
 *     locali referenziate dai servizi (cartella /public).
 *  3. Inserisce/aggiorna la riga "main" nella tabella `site_content`
 *     (home, chi_siamo, contatti).
 *  4. Inserisce i servizi nella tabella `servizi` con gli URL pubblici
 *     permanenti delle immagini caricate.
 *
 * Prerequisiti:
 *  - Aver eseguito sql/schema.sql sul progetto Supabase.
 *  - Aver creato il bucket PUBBLICO "immagini-sito".
 *  - Variabili d'ambiente in .env.local:
 *      NEXT_PUBLIC_SUPABASE_URL
 *      SUPABASE_SERVICE_KEY
 *
 * Come eseguirlo (dalla cartella del progetto):
 *      npx tsx scripts/seed-supabase.ts
 *
 * Nota: lo script è idempotente per site_content (upsert su id 'main') e per
 * i servizi svuota la tabella prima di reinserire, così puoi rilanciarlo.
 */

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Carica le variabili da .env.local (senza dipendenze extra).
function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    // Rimuove eventuali virgolette e l'escape dei $ (usato solo da Next).
    val = val.replace(/^["']|["']$/g, "").replace(/\\\$/g, "$");
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvLocal();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const BUCKET = "immagini-sito";

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    "\nERRORE: mancano NEXT_PUBLIC_SUPABASE_URL e/o SUPABASE_SERVICE_KEY in .env.local\n"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

// Cache dei percorsi già caricati per evitare doppioni.
const uploadedCache = new Map<string, string>();

/**
 * Carica su Storage un'immagine locale (percorso tipo "/servizi/foto.jpg")
 * e restituisce l'URL pubblico permanente. Se il percorso è già un URL
 * (http...) viene restituito invariato.
 */
async function uploadLocalImage(localPath: string): Promise<string> {
  if (!localPath) return "";
  if (localPath.startsWith("http://") || localPath.startsWith("https://")) {
    return localPath; // già remoto
  }
  if (uploadedCache.has(localPath)) return uploadedCache.get(localPath)!;

  const fsPath = path.join(process.cwd(), "public", localPath.replace(/^\//, ""));
  if (!fs.existsSync(fsPath)) {
    console.warn(`  ! File non trovato, salto: ${fsPath}`);
    return localPath;
  }

  const ext = path.extname(fsPath).toLowerCase();
  const contentType = CONTENT_TYPES[ext] || "application/octet-stream";
  const fileBuffer = fs.readFileSync(fsPath);
  // Percorso di destinazione dentro al bucket (mantiene la struttura servizi/).
  const destPath = localPath.replace(/^\//, "");

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(destPath, fileBuffer, { contentType, upsert: true });

  if (error) {
    console.warn(`  ! Errore upload ${destPath}: ${error.message}`);
    return localPath;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(destPath);
  const publicUrl = data.publicUrl;
  uploadedCache.set(localPath, publicUrl);
  console.log(`  ✓ ${destPath}`);
  return publicUrl;
}

async function seed() {
  const contentPath = path.join(process.cwd(), "src", "data", "content.json");
  const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));

  console.log("\n[1/3] Caricamento immagini dei servizi su Storage...");
  const items = content?.servizi?.items ?? [];

  const serviziRows: {
    nome: string;
    descrizione: string;
    icona: string;
    ordine: number;
    foto: string[];
  }[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const foto: string[] = [];
    // Immagine principale + galleria.
    if (item.image) foto.push(await uploadLocalImage(item.image));
    if (Array.isArray(item.gallery)) {
      for (const g of item.gallery) {
        if (g?.src) foto.push(await uploadLocalImage(g.src));
      }
    }
    serviziRows.push({
      nome: item.title || "",
      descrizione: item.longDesc || item.desc || "",
      icona: "",
      ordine: i,
      foto: foto.filter(Boolean),
    });
  }

  console.log("\n[2/3] Upsert dei contenuti (site_content, riga 'main')...");
  const { error: contentError } = await supabase.from("site_content").upsert(
    {
      id: "main",
      home: content.home,
      chi_siamo: content.chiSiamo,
      contatti: content.contatti,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );
  if (contentError) {
    console.error("  ! Errore upsert site_content:", contentError.message);
  } else {
    console.log("  ✓ site_content aggiornato.");
  }

  console.log("\n[3/3] Inserimento dei servizi...");
  // Svuota la tabella per rendere lo script rilanciabile.
  const { error: delError } = await supabase
    .from("servizi")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (delError) {
    console.warn("  ! Impossibile svuotare la tabella servizi:", delError.message);
  }

  const { error: insError } = await supabase.from("servizi").insert(serviziRows);
  if (insError) {
    console.error("  ! Errore inserimento servizi:", insError.message);
  } else {
    console.log(`  ✓ ${serviziRows.length} servizi inseriti.`);
  }

  console.log("\nSeed completato.\n");
}

seed().catch((err) => {
  console.error("Errore durante il seed:", err);
  process.exit(1);
});
