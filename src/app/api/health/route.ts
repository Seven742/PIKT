import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET /api/health — quick check that env vars are set and MySQL is reachable.
export async function GET() {
  const env = Object.fromEntries(
    ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "JWT_SECRET", "CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"].map(
      (k) => [k, Boolean(process.env[k])]
    )
  );

  let db: { ok: boolean; tables?: string[]; error?: string };
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SHOW TABLES");
    db = { ok: true, tables: rows.map((r) => String(Object.values(r)[0])) };
  } catch (err) {
    db = { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  const healthy = db.ok && Object.values(env).every(Boolean);
  return NextResponse.json({ healthy, env, db }, { status: healthy ? 200 : 503 });
}
