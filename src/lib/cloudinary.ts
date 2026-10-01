import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** Upload an image buffer to Cloudinary and return its secure URL. */
export function uploadImage(file: File, folder: string): Promise<string> {
  return file.arrayBuffer().then(
    (ab) =>
      new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
          if (error || !result) {
            // Cloudinary rejects with a plain object ({ message, http_code }), not an Error.
            const msg = (error as { message?: string } | undefined)?.message ?? "Cloudinary upload failed";
            reject(new Error(`Cloudinary: ${msg}`));
          } else resolve(result.secure_url);
        });
        stream.end(Buffer.from(ab));
      })
  );
}
