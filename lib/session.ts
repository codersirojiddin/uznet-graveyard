import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "uznet_admin_session";

const SECRET = process.env.SESSION_SECRET || "dev-secret-change-me";

function sign(value: string): string {
  const hmac = crypto.createHmac("sha256", SECRET).update(value).digest("hex");
  return `${value}.${hmac}`;
}

function verify(token: string): string | null {
  const idx = token.lastIndexOf(".");
  if (idx === -1) return null;

  const value = token.slice(0, idx);
  const signature = token.slice(idx + 1);
  const expected = crypto.createHmac("sha256", SECRET).update(value).digest("hex");

  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return null;

  return crypto.timingSafeEqual(sigBuf, expBuf) ? value : null;
}

export function createSessionToken(username: string): string {
  return sign(`${username}:${Date.now()}`);
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  return verify(token) !== null;
}

/** Server komponentlar ichida joriy sessiya haqiqiyligini tekshiradi */
export function getSession(): boolean {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return isValidSessionToken(token);
}
