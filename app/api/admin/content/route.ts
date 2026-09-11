import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getContent, saveContent } from "@/lib/content";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import type { ContentData } from "@/lib/content-types";

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
    const content = await getContent();
    return NextResponse.json({ success: true, content });
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossibile leggere i contenuti." },
      { status: 500 }
    );
  }
}

// POST: salva i contenuti (Home, Chi Siamo, Contatti) su Supabase (protetta).
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Non autorizzato." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as { content?: ContentData };
    if (!body?.content) {
      return NextResponse.json({ success: false, message: "Dati mancanti." }, { status: 400 });
    }
    await saveContent(body.content);
    return NextResponse.json({ success: true, message: "Modifiche salvate con successo." });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Errore durante il salvataggio delle modifiche.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
