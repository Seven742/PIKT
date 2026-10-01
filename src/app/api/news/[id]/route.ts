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
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM news WHERE id = ?", [id]);
    if (rows.length === 0) return fail(404, "News not found");
    return ok({ data: rows[0] });
  } catch (err) {
    return fail(500, "Error getting news", err);
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const [existing] = await pool.query<RowDataPacket[]>("SELECT * FROM news WHERE id = ?", [id]);
    if (existing.length === 0) return fail(404, "News not found");
    const cur = existing[0];

    const { fields, file } = await readBody(req, "image");
    const { title, content, category, author, published } = fields;
    const image = file ? await uploadImage(file, "pikt/news") : cur.image;

    await pool.query(
      "UPDATE news SET title=?, content=?, category=?, author=?, image=?, published=?, updated_at=NOW() WHERE id=?",
      [
        title || cur.title,
        content || cur.content,
        category || cur.category,
        author || cur.author,
        image,
        published !== undefined ? published : cur.published,
        id,
      ]
    );
    const [updated] = await pool.query<RowDataPacket[]>("SELECT * FROM news WHERE id = ?", [id]);
    return ok({ message: "News updated successfully", data: updated[0] });
  } catch (err) {
    return serverError(err, "Error updating news");
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM news WHERE id = ?", [id]);
    if (result.affectedRows === 0) return fail(404, "News not found");
    return ok({ message: "News deleted successfully" });
  } catch (err) {
    return fail(500, "Error deleting news", err);
  }
}
