import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

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

// POST: carica un'immagine in /public/uploads e restituisce il percorso pubblico.
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Non autorizzato." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { success: false, message: "Nessun file ricevuto." },
        { status: 400 }
      );
    }

    const blob = file as File;

    if (!ALLOWED_TYPES.includes(blob.type)) {
      return NextResponse.json(
        { success: false, message: "Formato non supportato. Usa JPG, PNG, WEBP, GIF o SVG." },
        { status: 400 }
      );
    }

    if (blob.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "Il file è troppo grande (massimo 8 MB)." },
        { status: 400 }
      );
    }

    const bytes = await blob.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const original = slugify(blob.name || "immagine");
    const ext = path.extname(original) || ".jpg";
    const base = path.basename(original, ext) || "immagine";
    const fileName = `${base}-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const publicPath = `/uploads/${fileName}`;
    return NextResponse.json({
      success: true,
      message: "Immagine caricata con successo.",
      path: publicPath,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Errore durante il caricamento dell'immagine." },
      { status: 500 }
    );
  }
}
