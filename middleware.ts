import { NextRequest, NextResponse } from "next/server";

const rateLimit = new Map<string, { count: number; ts: number }>();

export function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (req.nextUrl.pathname.startsWith("/api/")) {
    const now = Date.now();
    const entry = rateLimit.get(ip);

    if (entry && now - entry.ts < 60_000) {
      if (entry.count >= 15) {
        return NextResponse.json(
          { error: "Too many requests. Wait a minute." },
          { status: 429 }
        );
      }
      entry.count++;
    } else {
      rateLimit.set(ip, { count: 1, ts: now });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};