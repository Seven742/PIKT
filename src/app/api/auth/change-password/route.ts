import bcrypt from "bcryptjs";
import type { RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { protect } from "@/lib/auth";
import { fail, ok } from "@/lib/http";

export async function PATCH(req: Request) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { currentPassword, newPassword } = await req.json().catch(() => ({}));
    if (!currentPassword || !newPassword) return fail(400, "ត្រូវការ Password ចាស់ និងថ្មី!");
    if (String(newPassword).length < 6)
      return fail(400, "Password ថ្មី ត្រូវតែ ៦ តួអក្សរ ឬ ច្រើនជាងនេះ!");

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM admins WHERE id = ?", [auth.admin.id]);
    if (rows.length === 0) return fail(404, "Admin not found");

    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
    if (!isMatch) return fail(401, "Password ចាស់ មិនត្រឹមត្រូវ!");

    const hashed = await bcrypt.hash(newPassword, 12);
    await pool.query("UPDATE admins SET password = ?, updated_at = NOW() WHERE id = ?", [hashed, auth.admin.id]);

    return ok({ message: "ផ្លាស់ប្ដូរ Password ដោយជោគជ័យ!" });
  } catch (err) {
    return fail(500, "Server Error", err);
  }
}
