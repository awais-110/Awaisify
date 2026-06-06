import { NextRequest, NextResponse } from "next/server";
import Tiktok from "@tobyg74/tiktok-api-dl";
import { FacebookDownloadError, fetchFacebookVideo } from "@/lib/facebook-downloader";

type JsonRecord = Record<string, unknown>;

interface MediaItem {
  quality: string;
  extension: string;
  url: string;
  videoAvailable: boolean;
  audioAvailable: boolean;
  formattedSize: string;
}

interface VideoResponse {
  title: string;
  thumbnail: string;
  source: string;
  medias: MediaItem[];
}

interface ErrorDiagnostics {
  response?: {
    status?: unknown;
    data?: unknown;
  };
  status?: unknown;
  data?: unknown;
}

class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function getUrlPlatform(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");

    if (hostname.includes("tiktok.com")) return "tiktok";
    if (hostname.includes("facebook.com") || hostname.includes("fb.watch")) return "facebook";
    if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) return "youtube";
    if (hostname.includes("instagram.com")) return "instagram";
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) return "x";
    if (hostname.includes("vimeo.com")) return "vimeo";
    if (hostname.includes("dailymotion.com")) return "dailymotion";

    return "unknown";
  } catch {
    return "invalid";
  }
}

function getErrorDiagnostics(err: unknown): Pick<ErrorDiagnostics, "status" | "data"> {
  if (!isRecord(err)) return {};

  const response = isRecord(err.response) ? err.response : undefined;
  const status = response?.status ?? err.status;
  const data = response?.data ?? err.data;

  return { status, data };
}

function isTikTokUrl(url: string): boolean {
  return url.includes("tiktok.com");
}

function isFacebookUrl(url: string): boolean {
  return url.includes("facebook.com") || url.includes("fb.watch");
}

function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function getVideoId(url: string): string | null {
  try {
    if (url.includes("youtu.be/")) return url.split("youtu.be/")[1]?.split("?")[0] || null;
    return new URL(url).searchParams.get("v");
  } catch { return null; }
}

async function readJsonSafe<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  try { return text ? (JSON.parse(text) as T) : null; } catch { return null; }
}

function getStringValue(record: JsonRecord, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function getStringArray(record: JsonRecord, keys: string[]): string[] {
  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
    }
    if (typeof value === "string" && value.trim()) return [value.trim()];
  }
  return [];
}

function getMediaUrl(media: unknown): string {
  if (!isRecord(media)) return "";
  return getStringValue(media, ["url","download_url","downloadUrl","link","video","video_url","src"]);
}

function inferExtension(url: string, fallback = "mp4"): string {
  try {
    const pathname = new URL(url).pathname;
    const ext = (pathname.split("/").pop() || "").split(".").pop() || "";
    return ext ? ext.toLowerCase() : fallback;
  } catch { return fallback; }
}

function normalizeMedia(media: unknown): MediaItem | null {
  if (!isRecord(media)) return null;
  const url = getMediaUrl(media);
  if (!url) return null;
  const rawExt = getStringValue(media, ["extension","ext","type"]) || inferExtension(url, url.includes(".mp3") ? "mp3" : "mp4");
  const extension = rawExt.toLowerCase();
  return {
    quality: getStringValue(media, ["quality","label","resolution"]) || "HD",
    extension,
    url,
    videoAvailable: extension !== "mp3",
    audioAvailable: extension === "mp3",
    formattedSize: getStringValue(media, ["formattedSize","size","filesize"]) || "-",
  };
}

function normalizeResponse(data: unknown, url: string): VideoResponse {
  if (!isRecord(data)) throw new ApiError("Failed to read video info", 502);

  const payload = (isRecord(data["data"]) ? data["data"] : data) as JsonRecord;

  const getCaption = (d: JsonRecord) => getStringValue(d, ["caption","description","title","desc","text"]);
  const getThumbnail = (d: JsonRecord) => getStringValue(d, ["thumbnail","thumb","image","picture"]);

  const title = getCaption(payload) || getCaption(data) || getStringValue(payload, ["title"]) || "Video";
  const thumbnail = getThumbnail(payload) || getThumbnail(data);
  const source = getStringValue(payload, ["source"]) || getStringValue(data, ["source"]) || url;

  const rawMedias = payload["medias"] ?? payload["media"] ?? payload["videos"] ?? payload["links"] ?? data["medias"] ?? [];
  const mediaList = Array.isArray(rawMedias) ? rawMedias : [rawMedias];
  const medias = mediaList.map(normalizeMedia).filter((m): m is MediaItem => m !== null);

  if (!medias.length) {
    const direct = normalizeMedia(payload);
    if (direct) medias.push(direct);
  }

  return { title, thumbnail, source, medias };
}

function addTikTokMedia(
  medias: MediaItem[],
  urls: string[],
  quality: string,
  extension: string,
  videoAvailable: boolean,
  audioAvailable: boolean
) {
  for (const url of urls) {
    if (!url || medias.some((media) => media.url === url)) continue;

    medias.push({
      quality,
      extension,
      url,
      videoAvailable,
      audioAvailable,
      formattedSize: "-",
    });
  }
}

function normalizeTikTokResponse(data: unknown, source: string): VideoResponse {
  if (!isRecord(data)) throw new ApiError("Failed to read TikTok video info", 502);

  if (data.status === "error") {
    const message = getStringValue(data, ["message"]) || "Failed to fetch TikTok video";
    throw new ApiError(message, 502);
  }

  const result = data.result;
  if (!isRecord(result)) throw new ApiError("No TikTok video data found", 404);

  const video = isRecord(result.video) ? result.video : {};
  const music = isRecord(result.music) ? result.music : {};
  const medias: MediaItem[] = [];

  addTikTokMedia(
    medias,
    getStringArray(video, ["playAddr", "playUrl", "url"]),
    "No watermark",
    "mp4",
    true,
    true
  );

  addTikTokMedia(
    medias,
    getStringArray(video, ["downloadAddr", "downloadUrl"]),
    "Original",
    "mp4",
    true,
    true
  );

  addTikTokMedia(
    medias,
    getStringArray(music, ["playUrl", "url"]),
    "Music / Audio",
    "mp3",
    false,
    true
  );

  if (!medias.length) throw new ApiError("No downloadable TikTok media found", 404);

  const thumbnail =
    getStringArray(video, ["cover", "originCover", "dynamicCover"])[0] ||
    getStringArray(music, ["coverLarge", "coverMedium", "coverThumb"])[0] ||
    "";

  return {
    title: getStringValue(result, ["desc", "title"]) || getStringValue(music, ["title"]) || "TikTok Video",
    thumbnail,
    source,
    medias,
  };
}

async function fetchTikTok(url: string): Promise<VideoResponse> {
  try {
    const data = await Tiktok.Downloader(url, { version: "v1" });
    return normalizeTikTokResponse(data, url);
  } catch (err: unknown) {
    if (err instanceof ApiError) throw err;

    const message = err instanceof Error && err.message
      ? err.message
      : "Failed to fetch TikTok video";

    throw new ApiError(message, 502);
  }
}

async function fetchYouTube(url: string): Promise<VideoResponse> {
  const videoId = getVideoId(url);
  if (!videoId) throw new ApiError("Invalid YouTube URL", 400);

  const res = await fetch(
    `https://youtube-video-fast-downloader-24-7.p.rapidapi.com/get_video_details_and_quality?id=${videoId}`,
    {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
        "x-rapidapi-host": "youtube-video-fast-downloader-24-7.p.rapidapi.com",
      },
      cache: "no-store",
    }
  );

  const details = await readJsonSafe<JsonRecord>(res);
  if (!res.ok || !details) return fetchOther(url);

  const qualitiesRaw = details["qualities"] ?? details["formats"] ?? details["videos"] ?? details["links"] ?? [];
  const qualities = Array.isArray(qualitiesRaw) ? qualitiesRaw : [];
  const medias = qualities.map(normalizeMedia).filter((m): m is MediaItem => m !== null);

  const title = getStringValue(details, ["title"]) || "YouTube Video";
  const thumbnail = getStringValue(details, ["thumbnail","thumb","image"]) || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!medias.length) {
    const fallback = await fetchOther(url);
    return { title, thumbnail, source: url, medias: fallback.medias };
  }

  return { title, thumbnail, source: url, medias };
}

async function fetchOther(url: string): Promise<VideoResponse> {
  const res = await fetch(process.env.RAPIDAPI_URL || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      "x-rapidapi-host": process.env.RAPIDAPI_HOST || "",
    },
    body: JSON.stringify({ url }),
    cache: "no-store",
  });

  if (!res.ok) {
    const errData = await readJsonSafe<JsonRecord>(res);
    const message = res.status === 429
      ? "Too many requests. Please wait a moment."
      : (isRecord(errData) ? getStringValue(errData as JsonRecord, ["message","error","msg"]) : "") || "Failed to fetch video info";
    throw new ApiError(message, res.status);
  }

  const data = await readJsonSafe<unknown>(res);
  if (!data) throw new ApiError("Failed to read video info", 502);
  return normalizeResponse(data, url);
}

const ALLOWED_DOMAINS = [
  "youtube.com","youtu.be","tiktok.com","instagram.com",
  "facebook.com","fb.watch","twitter.com","x.com",
  "vimeo.com","dailymotion.com",
];

export async function POST(req: NextRequest) {
  let requestPlatform = "unknown";

  try {
    const body = await req.json();
    const url = body?.url?.trim();

    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });
    if (url.length > 500) return NextResponse.json({ error: "URL too long" }, { status: 400 });

    let parsedUrl: URL;
    try { parsedUrl = new URL(url); } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (parsedUrl.protocol !== "https:") return NextResponse.json({ error: "Only HTTPS URLs allowed" }, { status: 400 });

    const isAllowed = ALLOWED_DOMAINS.some(d => parsedUrl.hostname.includes(d));
    if (!isAllowed) return NextResponse.json({ error: "Platform not supported" }, { status: 400 });

    requestPlatform = getUrlPlatform(url);

    const data = isTikTokUrl(url)
      ? await fetchTikTok(url)
      : isFacebookUrl(url)
        ? await fetchFacebookVideo(url)
      : isYouTubeUrl(url)
        ? await fetchYouTube(url)
        : await fetchOther(url);
    return NextResponse.json(data);

  } catch (err: unknown) {
    const status = err instanceof ApiError || err instanceof FacebookDownloadError ? err.status : 500;
    const message = err instanceof Error ? err.message : "Internal server error";
    const stack = err instanceof Error ? err.stack : undefined;
    const diagnostics = getErrorDiagnostics(err);

    console.error("FETCH_VIDEO_ERROR", {
      message,
      status: diagnostics.status ?? status,
      data: diagnostics.data,
      stack,
      platform: requestPlatform,
    });

    return NextResponse.json({ error: message }, { status });
  }
}
