import jwt from "jsonwebtoken";
import type { NextResponse } from "next/server";
import { fail } from "./http";

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is not set");
  }
  return "pikt_secret"; // dev-only fallback
}

export const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "7d";

export type AdminToken = { id: number; username: string; role: string };

export function signToken(payload: AdminToken): string {
  return jwt.sign(payload, getSecret(), { expiresIn: JWT_EXPIRES as jwt.SignOptions["expiresIn"] });
}

/** Equivalent of the old Express `protect` middleware. */
export function protect(req: Request): { admin: AdminToken; error?: undefined } | { admin?: undefined; error: NextResponse } {
  try {
    const header = req.headers.get("authorization");
    if (!header || !header.startsWith("Bearer ")) {
      return { error: fail(401, "មិនមាន Token! សូម Login ជាមុន") };
    }
    const decoded = jwt.verify(header.split(" ")[1], getSecret()) as AdminToken;
    return { admin: decoded };
  } catch (err) {
    if (err instanceof Error && err.name === "TokenExpiredError") {
      return { error: fail(401, "Token ផុតកំណត់! សូម Login ម្ដងទៀត") };
    }
    return { error: fail(401, "Token មិនត្រឹមត្រូវ!") };
  }
}
