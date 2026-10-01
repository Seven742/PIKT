import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { protect } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { readBody } from "@/lib/form";
import { fail, ok, serverError } from "@/lib/http";

// GET /api/cooperations   (public)
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM cooperations ORDER BY id ASC");
    return ok({ count: rows.length, data: rows });
  } catch (err) {
    return fail(500, err instanceof Error ? err.message : "Error");
  }
}

// POST /api/cooperations   (admin)
export async function POST(req: Request) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { fields, file } = await readBody(req, "logo");
    const { name, country, type, description } = fields;
    if (!name) return fail(400, "ឈ្មោះ មិនអាចទទេ!");

    const logo = file ? await uploadImage(file, "pikt/cooperations") : null;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO cooperations (name, country, type, description, logo) VALUES (?, ?, ?, ?, ?)",
      [name, country || "កម្ពុជា", type || "ដៃគូ", description || null, logo]
    );
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM cooperations WHERE id = ?", [result.insertId]);
    return ok({ message: "បន្ថែមដោយជោគជ័យ!", data: rows[0] }, 201);
  } catch (err) {
    return serverError(err, err instanceof Error ? err.message : "Error");
  }
}
