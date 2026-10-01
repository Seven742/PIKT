import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { protect } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { readBody } from "@/lib/form";
import { fail, ok, serverError } from "@/lib/http";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM teachers WHERE id = ?", [id]);
    if (rows.length === 0) return fail(404, "Teacher not found");
    return ok({ data: rows[0] });
  } catch (err) {
    return fail(500, "Error getting teacher", err);
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const [existing] = await pool.query<RowDataPacket[]>("SELECT * FROM teachers WHERE id = ?", [id]);
    if (existing.length === 0) return fail(404, "Teacher not found");
    const cur = existing[0];

    const { fields, file } = await readBody(req, "photo");
    const { name, gender, phone, email, position, subject } = fields;
    const photo = file ? await uploadImage(file, "pikt/teachers") : cur.photo;

    await pool.query(
      "UPDATE teachers SET name=?, gender=?, phone=?, email=?, position=?, subject=?, photo=?, updated_at=NOW() WHERE id=?",
      [
        name || cur.name,
        gender || cur.gender,
        phone !== undefined ? phone : cur.phone,
        email !== undefined ? email : cur.email,
        position || cur.position,
        subject !== undefined ? subject : cur.subject,
        photo,
        id,
      ]
    );
    const [updated] = await pool.query<RowDataPacket[]>("SELECT * FROM teachers WHERE id = ?", [id]);
    return ok({ message: "Teacher updated successfully", data: updated[0] });
  } catch (err) {
    return serverError(err, "Error updating teacher");
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM teachers WHERE id = ?", [id]);
    if (result.affectedRows === 0) return fail(404, "Teacher not found");
    return ok({ message: "Teacher deleted successfully" });
  } catch (err) {
    return fail(500, "Error deleting teacher", err);
  }
}
