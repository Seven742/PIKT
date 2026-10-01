import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { signToken } from "@/lib/auth";
import { fail, ok } from "@/lib/http";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json().catch(() => ({}));
    if (!username || !password) return fail(400, "ត្រូវការ Username និង Password!");

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM admins WHERE username = ? LIMIT 1",
      [username]
    );
    if (rows.length === 0) return fail(401, "Username ឬ Password មិនត្រឹមត្រូវ!");

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return fail(401, "Username ឬ Password មិនត្រឹមត្រូវ!");

    const token = signToken({ id: admin.id, username: admin.username, role: admin.role });

    return ok({
      message: "ចូលប្រព័ន្ធដោយជោគជ័យ!",
      token,
      admin: { id: admin.id, username: admin.username, name: admin.name, role: admin.role },
    });
  } catch (err) {
    return fail(500, "Server Error", err);
  }
}
