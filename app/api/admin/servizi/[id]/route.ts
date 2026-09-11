import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { updateServizio, deleteServizio } from "@/lib/servizi";
import { isSupabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = await verifySessionToken(token);
  return session !== null;
}

// PUT: modifica un servizio esistente (protetta).
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params;
    const body = await request.json();
    const servizio = await updateServizio(id, {
      nome: body.nome,
      descrizione: body.descrizione,
      icona: body.icona,
      ordine: body.ordine,
      foto: body.foto,
    });
    return NextResponse.json({
      success: true,
      servizio,
      message: "Servizio aggiornato con successo.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore durante l'aggiornamento del servizio.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// DELETE: elimina un servizio (protetta).
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: "Non autorizzato." }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, message: "Supabase non è configurato: impossibile eliminare i servizi." },
      { status: 500 }
    );
  }
  try {
    const { id } = await params;
    await deleteServizio(id);
    return NextResponse.json({ success: true, message: "Servizio eliminato con successo." });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore durante l'eliminazione del servizio.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
