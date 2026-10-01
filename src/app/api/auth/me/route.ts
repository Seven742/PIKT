import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { protect } from "@/lib/auth";
import { fail, ok } from "@/lib/http";

export async function GET(req: Request) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, username, name, role, created_at FROM admins WHERE id = ?",
      [auth.admin.id]
    );
    if (rows.length === 0) return fail(404, "Admin not found");
    return ok({ data: rows[0] });
  } catch (err) {
    return fail(500, "Server Error", err);
  }
}
