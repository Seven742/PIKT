import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { protect } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { readBody } from "@/lib/form";
import { fail, ok, serverError } from "@/lib/http";

// GET /api/courses?category=   (public)
export async function GET(req: Request) {
  try {
    const category = new URL(req.url).searchParams.get("category");
    let query = "SELECT * FROM courses";
    const params: string[] = [];
    if (category) { query += " WHERE category = ?"; params.push(category); }
    query += " ORDER BY category, name";

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return ok({ count: rows.length, data: rows });
  } catch (err) {
    return fail(500, "Error getting courses", err);
  }
}

// POST /api/courses   (admin)
export async function POST(req: Request) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { fields, file } = await readBody(req, "image");
    const { name, category, duration, level, description } = fields;
    if (!name) return fail(400, "Course name is required");

    const image = file ? await uploadImage(file, "pikt/courses") : null;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO courses (name, category, duration, level, description, image) VALUES (?, ?, ?, ?, ?, ?)",
      [name, category || "ផ្សេងៗ", duration || "3 ឆ្នាំ", level || "AD", description || null, image]
    );
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM courses WHERE id = ?", [result.insertId]);
    return ok({ message: "Course created successfully", data: rows[0] }, 201);
  } catch (err) {
    return serverError(err, "Error creating course");
  }
}
