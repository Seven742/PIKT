import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "@/lib/db";
import { protect } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import { readBody } from "@/lib/form";
import { fail, ok, serverError } from "@/lib/http";

// GET /api/teachers?position=&gender=   (public)
export async function GET(req: Request) {
  try {
    const sp = new URL(req.url).searchParams;
    const position = sp.get("position");
    const gender = sp.get("gender");

    let query = "SELECT * FROM teachers";
    const params: string[] = [];
    const conditions: string[] = [];
    if (position) { conditions.push("position = ?"); params.push(position); }
    if (gender) { conditions.push("gender = ?"); params.push(gender); }
    if (conditions.length) query += " WHERE " + conditions.join(" AND ");
    query += " ORDER BY id ASC";

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return ok({ count: rows.length, data: rows });
  } catch (err) {
    return fail(500, "Error getting teachers", err);
  }
}

// POST /api/teachers   (admin)
export async function POST(req: Request) {
  const auth = protect(req);
  if (auth.error) return auth.error;
  try {
    const { fields, file } = await readBody(req, "photo");
    const { name, gender, phone, email, position, subject } = fields;
    if (!name) return fail(400, "Name is required");

    const photo = file ? await uploadImage(file, "pikt/teachers") : null;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO teachers (name, gender, phone, email, position, subject, photo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, gender || "male", phone || null, email || null, position || "គ្រូបង្រៀន", subject || null, photo]
    );
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM teachers WHERE id = ?", [result.insertId]);
    return ok({ message: "Teacher created successfully", data: rows[0] }, 201);
  } catch (err) {
    return serverError(err, "Error creating teacher");
  }
}
