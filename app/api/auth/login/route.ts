import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSessionToken, SESSION_COOKIE, SESSION_COOKIE_OPTIONS } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = (body?.username ?? "").toString();
    const password = (body?.password ?? "").toString();

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const passwordHash = process.env.ADMIN_PASSWORD || "";

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Inserisci nome utente e password." },
        { status: 400 }
      );
    }

    let passwordOk = false;
    if (passwordHash) {
      // La password in .env.local è memorizzata come hash bcrypt.
      if (passwordHash.startsWith("$2")) {
        passwordOk = await bcrypt.compare(password, passwordHash);
      } else {
        // Fallback: confronto in chiaro (sconsigliato, solo se non è un hash).
        passwordOk = password === passwordHash;
      }
    }

    if (username !== expectedUsername || !passwordOk) {
      return NextResponse.json(
        { success: false, message: "Nome utente o password non corretti." },
        { status: 401 }
      );
    }

    const token = await createSessionToken(username);
    const response = NextResponse.json({ success: true, message: "Accesso effettuato." });
    response.cookies.set(SESSION_COOKIE, token, SESSION_COOKIE_OPTIONS);
    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Si è verificato un errore. Riprova." },
      { status: 500 }
    );
  }
}
