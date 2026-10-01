// Vercel serverless functions reject request bodies larger than ~4.5 MB.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export class UploadTooLargeError extends Error {
  constructor() {
    super(`File too large (max ${MAX_UPLOAD_BYTES / 1024 / 1024} MB)`);
  }
}

/**
 * Read a request body that may be multipart/form-data (admin forms) or JSON.
 * Replaces express.json() + multer for the routes.
 */
export async function readBody(
  req: Request,
  fileField: string
): Promise<{ fields: Record<string, string>; file: File | null }> {
  const type = req.headers.get("content-type") || "";
  const fields: Record<string, string> = {};
  let file: File | null = null;

  if (type.includes("multipart/form-data")) {
    const fd = await req.formData();
    for (const [key, value] of fd.entries()) {
      if (typeof value === "string") fields[key] = value;
      else if (key === fileField && value.size > 0) file = value;
    }
    if (file && file.size > MAX_UPLOAD_BYTES) throw new UploadTooLargeError();
  } else if (type.includes("application/json")) {
    const json = await req.json().catch(() => ({}));
    for (const [k, v] of Object.entries(json ?? {})) if (v != null) fields[k] = String(v);
  }
  return { fields, file };
}
