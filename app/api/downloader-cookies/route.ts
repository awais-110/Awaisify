import { NextRequest, NextResponse } from "next/server";
import {
  clearDownloaderCookie,
  encryptDownloaderCookies,
  getDownloaderCookies,
  setDownloaderCookie,
  validateDownloaderCookies,
} from "@/lib/downloader-cookies";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return NextResponse.json({ saved: Boolean(getDownloaderCookies(req)) });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cookies = validateDownloaderCookies(String(body?.cookies || ""));
    const res = NextResponse.json({ saved: true });

    setDownloaderCookie(res, encryptDownloaderCookies(cookies));
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save cookies." },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ saved: false });

  clearDownloaderCookie(res);
  return res;
}
