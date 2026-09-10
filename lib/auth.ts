import { SignJWT, jwtVerify } from "jose";

// Nome del cookie di sessione dell'admin.
export const SESSION_COOKIE = "caretti_admin_session";

// Durata della sessione: 8 ore.
const SESSION_MAX_AGE = 60 * 60 * 8;

function getSecretKey(): Uint8Array {
  const secret =
    process.env.NEXTAUTH_SECRET ||
    process.env.ADMIN_JWT_SECRET ||
    "caretti-fratelli-fallback-secret-change-me";
  return new TextEncoder().encode(secret);
}

/**
 * Crea un token di sessione firmato (JWT) per l'utente admin.
 */
export async function createSessionToken(username: string): Promise<string> {
  return await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());
}

/**
 * Verifica un token di sessione. Ritorna il payload se valido, altrimenti null.
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<{ username: string; role: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    if (payload && payload.role === "admin" && typeof payload.username === "string") {
      return { username: payload.username as string, role: "admin" };
    }
    return null;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE,
  secure: process.env.NODE_ENV === "production",
};
