import mysql from "mysql2/promise";

// Reuse one pool across hot reloads (dev) and warm serverless invocations.
const g = globalThis as unknown as { __piktPool?: mysql.Pool };

export const pool: mysql.Pool =
  g.__piktPool ??
  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    waitForConnections: true,
    connectionLimit: 5,
  });

g.__piktPool = pool;
