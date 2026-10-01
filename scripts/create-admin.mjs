/**
 * Create the admin (or reset its password):
 *   npm run create-admin
 *   npm run create-admin -- newpassword123
 * Reads DB_* and ADMIN_* from .env.local
 */
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

const USERNAME = process.env.ADMIN_USERNAME || "admin";
const PASSWORD = process.argv[2] || process.env.ADMIN_PASSWORD || "pikt2024";
const NAME = "Admin PIKT";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
});

try {
  const hashed = await bcrypt.hash(PASSWORD, 12);
  const [existing] = await pool.query("SELECT id FROM admins WHERE username = ?", [USERNAME]);
  if (existing.length > 0) {
    await pool.query("UPDATE admins SET password = ?, updated_at = NOW() WHERE username = ?", [hashed, USERNAME]);
    console.log(`✅ Password updated for "${USERNAME}"`);
  } else {
    await pool.query("INSERT INTO admins (username, password, name, role) VALUES (?, ?, ?, ?)", [USERNAME, hashed, NAME, "admin"]);
    console.log(`✅ Admin created: username="${USERNAME}"`);
  }
  console.log("👉 Login at: http://localhost:3000/admin/login");
} catch (err) {
  console.error("❌ Error:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
