import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  SUPABASE_BUCKET,
  getPublicUrl,
} from "@/lib/supabase";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE = 8 * 1024 * 1024; // 8 MB

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  return session !== null;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// POST: carica un'immagine su Supabase Storage e restituisce l'URL pubblico permanente.
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Non autorizzato." }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Supabase non è configurato. Imposta le variabili d'ambiente per caricare le immagini in modo permanente.",
      },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    // Supporta sia un singolo file ("file") sia più file ("files").
    const single = formData.get("file");
    const multiple = formData.getAll("files");
    const files: File[] = [];
    if (single && typeof single !== "string") files.push(single as File);
    for (const f of multiple) {
      if (f && typeof f !== "string") files.push(f as File);
    }

    if (files.length === 0) {
      return NextResponse.json(
        { success: false, message: "Nessun file ricevuto." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    const uploaded: string[] = [];

    for (const blob of files) {
      if (!ALLOWED_TYPES.includes(blob.type)) {
        return NextResponse.json(
          { success: false, message: "Formato non supportato. Usa JPG, PNG, WEBP, GIF o SVG." },
          { status: 400 }
        );
      }
      if (blob.size > MAX_SIZE) {
        return NextResponse.json(
          { success: false, message: "Un file è troppo grande (massimo 8 MB)." },
          { status: 400 }
        );
      }

      const bytes = await blob.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const original = slugify(blob.name || "immagine");
      const dot = original.lastIndexOf(".");
      const ext = dot >= 0 ? original.slice(dot) : ".jpg";
      const base = (dot >= 0 ? original.slice(0, dot) : original) || "immagine";
      const fileName = `${base}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
      const storagePath = `servizi/${fileName}`;

      const { error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(storagePath, buffer, {
          contentType: blob.type,
          upsert: false,
        });

      if (error) {
        return NextResponse.json(
          { success: false, message: `Errore durante il caricamento: ${error.message}` },
          { status: 500 }
        );
      }

      uploaded.push(getPublicUrl(storagePath));
    }

    return NextResponse.json({
      success: true,
      message: "Immagine caricata con successo.",
      path: uploaded[0],
      paths: uploaded,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Errore durante il caricamento dell'immagine." },
      { status: 500 }
    );
  }
}
