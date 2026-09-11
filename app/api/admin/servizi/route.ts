import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getServizi, createServizio } from "@/lib/servizi";
import { isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  return session !== null;
}

// GET: lista di tutti i servizi (protetta).
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Non autorizzato." }, { status: 401 });
  }
  try {
    const servizi = await getServizi();
    return NextResponse.json({ success: true, servizi });
  } catch {
    return NextResponse.json(
      { success: false, message: "Impossibile leggere i servizi." },
      { status: 500 }
    );
  }
}

// POST: crea un nuovo servizio (protetta).
export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Non autorizzato." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, message: "Supabase non è configurato: impossibile salvare i servizi." },
      { status: 500 }
    );
  }
  try {
    const body = await request.json();
    if (!body?.nome || !body?.descrizione) {
      return NextResponse.json(
        { success: false, message: "Nome e descrizione sono obbligatori." },
        { status: 400 }
      );
    }
    const servizio = await createServizio({
      nome: body.nome,
      descrizione: body.descrizione,
      icona: body.icona ?? "",
      ordine: typeof body.ordine === "number" ? body.ordine : 0,
      foto: Array.isArray(body.foto) ? body.foto : [],
    });
    return NextResponse.json({ success: true, servizio, message: "Servizio creato con successo." });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore durante la creazione del servizio.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
