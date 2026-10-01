import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { protect } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { readBody } from "@/lib/form";
import { fail, ok, serverError } from "@/lib/http";

// GET /api/news?category=&published=   (public)
export async function GET(req: Request) {
  try {
    const sp = new URL(req.url).searchParams;
    const category = sp.get("category");
    const published = sp.get("published");

    let query = "SELECT * FROM news";
    const params: string[] = [];
    const conditions: string[] = [];
    if (category) { conditions.push("category = ?"); params.push(category); }
    if (published !== null) { conditions.push("published = ?"); params.push(published); }
    if (conditions.length) query += " WHERE " + conditions.join(" AND ");
    query += " ORDER BY created_at DESC";

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return ok({ count: rows.length, data: rows });
  } catch (err) {
    return fail(500, "Error getting news", err);
  }
}

// POST /api/news   (admin)
export async function POST(req: Request) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { fields, file } = await readBody(req, "image");
    const { title, content, category, author, published } = fields;
    if (!title || !content) return fail(400, "Title and content are required");

    const image = file ? await uploadImage(file, "pikt/news") : null;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO news (title, content, category, author, image, published) VALUES (?, ?, ?, ?, ?, ?)",
      [title, content, category || "ផ្សេងៗ", author || "Admin PIKT", image, published !== undefined ? published : 1]
    );
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM news WHERE id = ?", [result.insertId]);
    return ok({ message: "News created successfully", data: rows[0] }, 201);
  } catch (err) {
    return serverError(err, "Error creating news");
  }
}
