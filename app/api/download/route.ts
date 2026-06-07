import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function cleanExtension(extension: string | null): string {
  const clean = (extension || "mp4").replace(/[^a-z0-9]/gi, "").toLowerCase();
  return clean || "mp4";
}

function isGenericTitle(title: string) {
  return /^-?\s*(video|download|reel|facebook reel|instagram reel|youtube video|untitled video)\s*$/i.test(title);
}

function titleFromSource(source: string | null) {
  if (!source) return "";

  try {
    const parsed = new URL(source);
    const host = parsed.hostname.replace(/^www\./, "").split(".")[0] || "video";
    const id = parsed.pathname.split("/").filter(Boolean).pop() || parsed.searchParams.get("v") || "";
    return `${host} ${id}`.trim();
  } catch {
    return "";
  }
}

function safeFilename(title: string | null, source: string | null, extension: string): string {
  const cleanTitle = (title || "").trim();
  const fallbackTitle = titleFromSource(source) || "download";
  const baseTitle = cleanTitle && !isGenericTitle(cleanTitle) ? cleanTitle : fallbackTitle;
  const safeTitle = baseTitle
    .normalize("NFKD")
    .replace(/[^\w\s.-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);

  return `${safeTitle || "download"}.${extension}`;
}

function contentDisposition(filename: string) {
  const asciiName = filename.replace(/[^\x20-\x7E]/g, "").replace(/"/g, "");
  return `attachment; filename="${asciiName || "download.mp4"}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

function isInstagramMediaUrl(url: string) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    return hostname.includes("cdninstagram.com") || hostname.endsWith("fbcdn.net");
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const source = searchParams.get("source");
  const extension = cleanExtension(searchParams.get("extension"));
  const title = searchParams.get("title") || searchParams.get("filename");
  const filename = safeFilename(title, source || url, extension);

  if (!url) {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }

  try {
    const isInstagram = isInstagramMediaUrl(url);
    const headers: HeadersInit = {
      "Accept": "*/*",
      "User-Agent": isInstagram
        ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0"
        : "Mozilla/5.0 AwaisifyDown/1.0",
    };

    if (isInstagram) {
      headers.Referer = "https://www.instagram.com/";
    }

    const response = await fetch(url, {
      cache: "no-store",
      headers,
    });

    if (!response.ok || !response.body) {
      const text = await response.text().catch(() => "");
      console.error("Download upstream failed:", response.status, text.slice(0, 300));
      if (isInstagram) {
        return NextResponse.redirect(url);
      }

      return NextResponse.json({ error: "Download failed" }, { status: 502 });
    }

    const contentType = response.headers.get("content-type") || "video/mp4";
    const buffer = await response.arrayBuffer();

    if (isInstagram && !contentType.toLowerCase().startsWith("video/")) {
      console.error("Instagram download returned non-video content:", contentType);
      return NextResponse.redirect(url);
    }

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
        "Content-Disposition": contentDisposition(filename),
      },
    });
  } catch (err) {
    console.error("Download failed:", err);
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
