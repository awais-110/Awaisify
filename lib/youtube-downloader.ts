import { Innertube } from "youtubei.js";

type JsonRecord = Record<string, unknown>;
type InnertubeClient = Awaited<ReturnType<typeof Innertube.create>>;

interface YouTubeFetchOptions {
  cookies?: string;
}

interface YouTubeMediaItem {
  quality: string;
  extension: "mp4";
  url: string;
  videoAvailable: true;
  audioAvailable: true;
  formattedSize: string;
}

export interface YouTubeVideoResponse {
  title: string;
  thumbnail: string;
  source: string;
  medias: YouTubeMediaItem[];
}

export class YouTubeDownloadError extends Error {
  status: number;
  code?: unknown;

  constructor(message = "YouTube is temporarily unavailable on this server.", status = 502, code?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

let innertubePromise: Promise<InnertubeClient> | null = null;

function getInnertube(): Promise<InnertubeClient> {
  if (!innertubePromise) {
    innertubePromise = Innertube.create();
  }

  return innertubePromise;
}

function createInnertubeWithCookies(cookies: string): Promise<InnertubeClient> {
  return Innertube.create({ cookie: cookies });
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function getStringValue(record: JsonRecord, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }

  return "";
}

function getNumberValue(record: JsonRecord, keys: string[]): number | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) return Number(value);
  }

  return null;
}

function getErrorDiagnostics(err: unknown): { message: string; status?: unknown; code?: unknown; stack?: string } {
  const message = err instanceof Error ? err.message : "YouTube is temporarily unavailable on this server.";
  const stack = err instanceof Error ? err.stack : undefined;

  if (!isRecord(err)) return { message, stack };

  return {
    message,
    status: err.status ?? err.statusCode ?? err.code,
    code: err.code ?? err.statusCode,
    stack,
  };
}

function getYouTubeVideoId(url: string): string {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase().replace(/^www\./, "");

    if (hostname === "youtu.be") {
      const id = parsedUrl.pathname.split("/").filter(Boolean)[0];
      if (id) return id;
    }

    if (hostname === "youtube.com" || hostname.endsWith(".youtube.com")) {
      const watchId = parsedUrl.searchParams.get("v");
      if (watchId) return watchId;

      const parts = parsedUrl.pathname.split("/").filter(Boolean);
      if (["shorts", "embed", "live"].includes(parts[0]) && parts[1]) return parts[1];
    }
  } catch {
    throw new YouTubeDownloadError("Invalid YouTube URL", 400, "INVALID_YOUTUBE_URL");
  }

  throw new YouTubeDownloadError("Invalid YouTube URL", 400, "INVALID_YOUTUBE_URL");
}

function getHeight(format: JsonRecord): number | null {
  const height = getNumberValue(format, ["height"]);
  if (height) return height;

  const quality = getStringValue(format, ["quality_label", "qualityLabel", "quality"]);
  const match = quality.match(/(\d{3,4})p?/);
  return match ? Number(match[1]) : null;
}

function isProgressiveMp4(format: JsonRecord): boolean {
  const url = getStringValue(format, ["url"]);
  const mimeType = getStringValue(format, ["mime_type", "mimeType"]);
  const quality = getStringValue(format, ["quality_label", "qualityLabel", "quality"]);
  const height = getHeight(format);

  return Boolean(
    url &&
    mimeType.includes("video/mp4") &&
    mimeType.includes("mp4a") &&
    quality &&
    height
  );
}

function getThumbnail(basicInfo: JsonRecord): string {
  const thumbnail = basicInfo.thumbnail;

  if (Array.isArray(thumbnail)) {
    const last = thumbnail.filter(isRecord).at(-1);
    return last ? getStringValue(last, ["url"]) : "";
  }

  if (isRecord(thumbnail)) {
    const thumbnails = thumbnail.thumbnails;
    if (Array.isArray(thumbnails)) {
      const last = thumbnails.filter(isRecord).at(-1);
      return last ? getStringValue(last, ["url"]) : "";
    }

    return getStringValue(thumbnail, ["url"]);
  }

  return "";
}

function normalizeYouTubeResponse(data: unknown, source: string): YouTubeVideoResponse {
  if (!isRecord(data)) {
    throw new YouTubeDownloadError();
  }

  const basicInfo = isRecord(data.basic_info) ? data.basic_info : {};
  const streamingData = isRecord(data.streaming_data) ? data.streaming_data : {};
  const duration = getNumberValue(basicInfo, ["duration"]);

  if (duration && duration > 10 * 60) {
    throw new YouTubeDownloadError("YouTube videos longer than 10 minutes are not supported yet.", 400, "YOUTUBE_DURATION_LIMIT");
  }

  const formats = Array.isArray(streamingData.formats) ? streamingData.formats.filter(isRecord) : [];
  const preferredHeights = new Set([720, 360]);
  const progressiveFormats = formats.filter(isProgressiveMp4);
  const preferredFormats = progressiveFormats.filter((format) => {
    const height = getHeight(format);
    return Boolean(height && preferredHeights.has(height));
  });

  const selectedFormats = (preferredFormats.length ? preferredFormats : progressiveFormats)
    .sort((a, b) => (getHeight(b) || 0) - (getHeight(a) || 0));

  const medias = selectedFormats.map((format): YouTubeMediaItem => {
    const height = getHeight(format) || 360;
    const contentLength = getStringValue(format, ["content_length", "contentLength"]);

    return {
      quality: `${height}p`,
      extension: "mp4",
      url: getStringValue(format, ["url"]),
      videoAvailable: true,
      audioAvailable: true,
      formattedSize: contentLength ? `${contentLength} bytes` : "-",
    };
  });

  const uniqueMedias = medias.filter((media, index, items) =>
    items.findIndex((item) => item.quality === media.quality && item.url === media.url) === index
  );

  if (!uniqueMedias.length) {
    throw new YouTubeDownloadError("YouTube is temporarily unavailable on this server.", 404, "NO_PROGRESSIVE_MP4");
  }

  return {
    title: getStringValue(basicInfo, ["title"]) || "YouTube Video",
    thumbnail: getThumbnail(basicInfo),
    source,
    medias: uniqueMedias,
  };
}

export async function fetchYouTubeVideo(url: string, options: YouTubeFetchOptions = {}): Promise<YouTubeVideoResponse> {
  try {
    const videoId = getYouTubeVideoId(url);
    const innertube = options.cookies
      ? await createInnertubeWithCookies(options.cookies)
      : await getInnertube();
    const data = await innertube.getInfo(videoId);

    console.log("YOUTUBE_INFO", {
      platform: "youtube",
      method: "youtubei.js:getInfo",
    });

    return normalizeYouTubeResponse(data, url);
  } catch (err: unknown) {
    const diagnostics = getErrorDiagnostics(err);

    console.error("YOUTUBE_ERROR", {
      platform: "youtube",
      method: "youtubei.js",
      message: diagnostics.message,
      status: diagnostics.status,
      code: diagnostics.code,
    });

    if (err instanceof YouTubeDownloadError) {
      throw err;
    }

    throw new YouTubeDownloadError("YouTube is temporarily unavailable on this server.", 502, diagnostics.code);
  }
}
