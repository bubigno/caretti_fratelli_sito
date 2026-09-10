import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, saveContent } from "@/lib/content";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import type { SiteContent } from "@/lib/content-types";

export const runtime = "nodejs";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  return session !== null;
}

// GET: restituisce i contenuti correnti (protetta).
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Non autorizzato." }, { status: 401 });
  }
  try {
    const content = getContent();
    return NextResponse.json({ success: true, content });
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossibile leggere i contenuti." },
      { status: 500 }
    );
  }
}

// POST: salva l'intero oggetto contenuti (protetta).
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Non autorizzato." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as { content?: SiteContent };
    if (!body?.content) {
      return NextResponse.json(
        { success: false, message: "Dati mancanti." },
        { status: 400 }
      );
    }
    saveContent(body.content);
    return NextResponse.json({ success: true, message: "Modifiche salvate con successo." });
  } catch {
    return NextResponse.json(
      { success: false, message: "Errore durante il salvataggio delle modifiche." },
      { status: 500 }
    );
  }
}
