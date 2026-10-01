import { NextResponse } from "next/server";
import { UploadTooLargeError } from "./form";

export const ok = (body: Record<string, unknown>, status = 200) =>
  NextResponse.json({ success: true, ...body }, { status });

export const fail = (status: number, message: string, error?: unknown) =>
  NextResponse.json(
    {
      success: false,
      message,
      ...(error !== undefined && { error: error instanceof Error ? error.message : JSON.stringify(error) }),
    },
    { status }
  );

/** 413 for oversized uploads, otherwise 500 with the given message. */
export const serverError = (err: unknown, message: string) =>
  err instanceof UploadTooLargeError ? fail(413, err.message) : fail(500, message, err);
