import { existsSync } from "fs";
import path from "path";
import { create } from "youtube-dl-exec";

type JsonRecord = Record<string, unknown>;

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

const YOUTUBE_DL_BINARY_PATH = path.join(
  process.cwd(),
  "node_modules",
  "youtube-dl-exec",
  "bin",
  process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp"
);

const youtubeDl = create(YOUTUBE_DL_BINARY_PATH);

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function getStringValue(record: JsonRecord, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }

  return "";
}

function getNumberValue(record: JsonRecord, keys: string[]): number | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }

  return null;
}

function getErrorDiagnostics(err: unknown): { message: string; status?: unknown; code?: unknown; stack?: string } {
  const message = err instanceof Error ? err.message : "YouTube is temporarily unavailable on this server.";
  const stack = err instanceof Error ? err.stack : undefined;

  if (!isRecord(err)) return { message, stack };

  return {
    message,
    status: err.exitCode ?? err.status ?? err.code,
    code: err.code ?? err.exitCode,
    stack,
  };
}

function normalizeHeight(format: JsonRecord): number | null {
  const height = getNumberValue(format, ["height"]);
  if (height) return height;

  const quality = getStringValue(format, ["format_note", "resolution", "format"]);
  const match = quality.match(/(\d{3,4})p?/);
  return match ? Number(match[1]) : null;
}

function isProgressiveMp4(format: JsonRecord): boolean {
  const url = getStringValue(format, ["url"]);
  const ext = getStringValue(format, ["ext"]);
  const acodec = getStringValue(format, ["acodec"]);
  const vcodec = getStringValue(format, ["vcodec"]);
  const protocol = getStringValue(format, ["protocol"]);
  const height = normalizeHeight(format);

  return Boolean(
    url &&
    ext === "mp4" &&
    acodec &&
    acodec !== "none" &&
    vcodec &&
    vcodec !== "none" &&
    (!protocol || protocol === "https") &&
    height &&
    [360, 720].includes(height)
  );
}

function normalizeYouTubeResponse(data: unknown, source: string): YouTubeVideoResponse {
  if (!isRecord(data)) {
    throw new YouTubeDownloadError();
  }

  const duration = getNumberValue(data, ["duration"]);
  if (duration && duration > 10 * 60) {
    throw new YouTubeDownloadError("YouTube videos longer than 10 minutes are not supported yet.", 400, "YOUTUBE_DURATION_LIMIT");
  }

  const formats = Array.isArray(data.formats) ? data.formats : [];
  const medias = formats
    .filter(isRecord)
    .filter(isProgressiveMp4)
    .sort((a, b) => (normalizeHeight(b) || 0) - (normalizeHeight(a) || 0))
    .map((format): YouTubeMediaItem => {
      const height = normalizeHeight(format) || 360;

      return {
        quality: `${height}p`,
        extension: "mp4",
        url: getStringValue(format, ["url"]),
        videoAvailable: true,
        audioAvailable: true,
        formattedSize: "-",
      };
    });

  const uniqueMedias = medias.filter((media, index, items) =>
    items.findIndex((item) => item.quality === media.quality && item.url === media.url) === index
  );

  if (!uniqueMedias.length) {
    throw new YouTubeDownloadError("YouTube is temporarily unavailable on this server.", 404, "NO_PROGRESSIVE_MP4");
  }

  return {
    title: getStringValue(data, ["title", "fulltitle"]) || "YouTube Video",
    thumbnail: getStringValue(data, ["thumbnail"]) || "",
    source,
    medias: uniqueMedias,
  };
}

export async function fetchYouTubeVideo(url: string): Promise<YouTubeVideoResponse> {
  try {
    if (!existsSync(YOUTUBE_DL_BINARY_PATH)) {
      throw new YouTubeDownloadError("YouTube is temporarily unavailable on this server.", 502, "YTDLP_BINARY_MISSING");
    }

    const data = await youtubeDl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      callHome: false,
      noCheckCertificates: true,
      skipDownload: true,
      format: "best[ext=mp4][height<=720][acodec!=none][vcodec!=none]/best[ext=mp4][height<=360][acodec!=none][vcodec!=none]",
    });

    console.log("YOUTUBE_INFO", {
      platform: "youtube",
      method: "youtube-dl-exec:dumpSingleJson",
      binary: "package-provided",
    });

    return normalizeYouTubeResponse(data, url);
  } catch (err: unknown) {
    const diagnostics = getErrorDiagnostics(err);

    console.error("YOUTUBE_ERROR", {
      platform: "youtube",
      method: "youtube-dl-exec",
      message: diagnostics.message,
      status: diagnostics.status,
      code: diagnostics.code,
      binary: "package-provided",
    });

    if (err instanceof YouTubeDownloadError) {
      throw err;
    }

    throw new YouTubeDownloadError("YouTube is temporarily unavailable on this server.", 502, diagnostics.code);
  }
}
