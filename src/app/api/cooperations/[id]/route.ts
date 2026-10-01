import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { protect } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { readBody } from "@/lib/form";
import { fail, ok, serverError } from "@/lib/http";

type Ctx = { params: Promise<{ id: string }> };
const msg = (err: unknown) => (err instanceof Error ? err.message : "Error");

export async function GET(_req: Request, { params }: Ctx) {
  try {
    const { id } = await params;
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM cooperations WHERE id = ?", [id]);
    if (!rows.length) return fail(404, "Not found");
    return ok({ data: rows[0] });
  } catch (err) {
    return fail(500, msg(err));
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const [existing] = await pool.query<RowDataPacket[]>("SELECT * FROM cooperations WHERE id = ?", [id]);
    if (!existing.length) return fail(404, "Not found");
    const cur = existing[0];

    const { fields, file } = await readBody(req, "logo");
    const { name, country, type, description } = fields;
    const logo = file ? await uploadImage(file, "pikt/cooperations") : cur.logo;

    await pool.query(
      "UPDATE cooperations SET name=?, country=?, type=?, description=?, logo=?, updated_at=NOW() WHERE id=?",
      [
        name || cur.name,
        country || cur.country,
        type || cur.type,
        description !== undefined ? description : cur.description,
        logo,
        id,
      ]
    );
    const [updated] = await pool.query<RowDataPacket[]>("SELECT * FROM cooperations WHERE id = ?", [id]);
    return ok({ message: "កែប្រែដោយជោគជ័យ!", data: updated[0] });
  } catch (err) {
    return serverError(err, msg(err));
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { id } = await params;
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM cooperations WHERE id = ?", [id]);
    if (!result.affectedRows) return fail(404, "Not found");
    return ok({ message: "លុបដោយជោគជ័យ!" });
  } catch (err) {
    return fail(500, msg(err));
  }
}
