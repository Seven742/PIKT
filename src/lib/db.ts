import mysql from "mysql2/promise";

// Reuse one pool across hot reloads (dev) and warm serverless invocations.
const g = globalThis as unknown as { __piktPool?: mysql.Pool };

const isLocalhost =
  !process.env.DB_HOST ||
  process.env.DB_HOST === "localhost" ||
  process.env.DB_HOST === "127.0.0.1";

const useSSL =
  process.env.DB_SSL === "true" ||
  (process.env.DB_SSL !== "false" && !isLocalhost);

// If pool already exists but was unencrypted on a host that requires SSL, close it
if (g.__piktPool && useSSL) {
  try {
    g.__piktPool.end();
  } catch { }
  delete g.__piktPool;
}

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
    ...(useSSL
      ? {
        ssl: {
          minVersion: "TLSv1.2",
          rejectUnauthorized: true,
        },
      }
      : {}),
  });

g.__piktPool = pool;
