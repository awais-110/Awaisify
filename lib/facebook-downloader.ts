type JsonRecord = Record<string, unknown>;

interface FacebookMediaItem {
  quality: string;
  extension: string;
  url: string;
  videoAvailable: boolean;
  audioAvailable: boolean;
  formattedSize: string;
}

export interface FacebookVideoResponse {
  title: string;
  thumbnail: string;
  source: string;
  medias: FacebookMediaItem[];
}

export class FacebookDownloadError extends Error {
  status: number;

  constructor(message: string, status = 502) {
    super(message);
    this.status = status;
  }
}

const FACEBOOK_API_URL = (process.env.FACEBOOK_API_URL || "https://fdown.isuru.eu.org").replace(/\/+$/, "");
const FACEBOOK_CACHE_TTL_MS = 5 * 60 * 1000;
const facebookCache = new Map<string, { expiresAt: number; response: FacebookVideoResponse }>();

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

async function readJsonSafe(response: Response): Promise<unknown> {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

function getErrorMessage(data: unknown, fallback: string): string {
  if (!isRecord(data)) return fallback;

  return getStringValue(data, ["detail", "message", "error"]) || fallback;
}

async function requestFacebookApi(path: "/info" | "/download", url: string): Promise<unknown> {
  const response = await fetch(`${FACEBOOK_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      url,
      quality: "best",
    }),
    cache: "no-store",
  });

  const data = await readJsonSafe(response);

  if (!response.ok) {
    if (response.status === 429) {
      throw new FacebookDownloadError("Facebook service is busy. Please try again in 1 minute.", 429);
    }

    throw new FacebookDownloadError(
      getErrorMessage(data, "Failed to fetch Facebook video. Please try a public Facebook video link."),
      response.status
    );
  }

  return data;
}

function normalizeFacebookApiResponse(data: unknown, source: string): FacebookVideoResponse | null {
  if (!isRecord(data)) return null;

  const downloadUrl = getStringValue(data, ["download_url", "downloadUrl", "url"]);
  if (!downloadUrl) return null;

  const videoInfo = isRecord(data.video_info) ? data.video_info : {};

  return {
    title: getStringValue(videoInfo, ["title"]) || "Facebook Video",
    thumbnail: getStringValue(videoInfo, ["thumbnail"]) || "",
    source,
    medias: [
      {
        quality: "Best",
        extension: "mp4",
        url: downloadUrl,
        videoAvailable: true,
        audioAvailable: true,
        formattedSize: "-",
      },
    ],
  };
}

function getCachedFacebookResponse(url: string): FacebookVideoResponse | null {
  const cached = facebookCache.get(url);

  if (!cached) return null;

  if (cached.expiresAt <= Date.now()) {
    facebookCache.delete(url);
    return null;
  }

  return {
    ...cached.response,
    medias: cached.response.medias.map((media) => ({ ...media })),
  };
}

function setCachedFacebookResponse(url: string, response: FacebookVideoResponse) {
  facebookCache.set(url, {
    expiresAt: Date.now() + FACEBOOK_CACHE_TTL_MS,
    response: {
      ...response,
      medias: response.medias.map((media) => ({ ...media })),
    },
  });
}

export async function fetchFacebookVideo(url: string): Promise<FacebookVideoResponse> {
  const cached = getCachedFacebookResponse(url);

  if (cached) {
    return cached;
  }

  const infoData = await requestFacebookApi("/info", url);
  const infoResult = normalizeFacebookApiResponse(infoData, url);

  if (infoResult) {
    setCachedFacebookResponse(url, infoResult);
    return infoResult;
  }

  const downloadData = await requestFacebookApi("/download", url);
  const downloadResult = normalizeFacebookApiResponse(downloadData, url);

  if (downloadResult) {
    setCachedFacebookResponse(url, downloadResult);
    return downloadResult;
  }

  throw new FacebookDownloadError("Facebook API did not return a downloadable video URL.", 404);
}
