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
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM courses WHERE id = ?", [id]);
    if (rows.length === 0) return fail(404, "Course not found");
    return ok({ data: rows[0] });
  } catch (err) {
    return fail(500, "Error getting course", err);
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const [existing] = await pool.query<RowDataPacket[]>("SELECT * FROM courses WHERE id = ?", [id]);
    if (existing.length === 0) return fail(404, "Course not found");
    const cur = existing[0];

    const { fields, file } = await readBody(req, "image");
    const { name, category, duration, level, description } = fields;
    const image = file ? await uploadImage(file, "pikt/courses") : cur.image;

    await pool.query(
      "UPDATE courses SET name=?, category=?, duration=?, level=?, description=?, image=?, updated_at=NOW() WHERE id=?",
      [
        name || cur.name,
        category || cur.category,
        duration || cur.duration,
        level || cur.level,
        description !== undefined ? description : cur.description,
        image,
        id,
      ]
    );
    const [updated] = await pool.query<RowDataPacket[]>("SELECT * FROM courses WHERE id = ?", [id]);
    return ok({ message: "Course updated successfully", data: updated[0] });
  } catch (err) {
    return serverError(err, "Error updating course");
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM courses WHERE id = ?", [id]);
    if (result.affectedRows === 0) return fail(404, "Course not found");
    return ok({ message: "Course deleted successfully" });
  } catch (err) {
    return fail(500, "Error deleting course", err);
  }
}
