import * as cheerio from "cheerio";

type JsonRecord = Record<string, unknown>;

interface InstagramMediaItem {
  quality: string;
  extension: string;
  url: string;
  videoAvailable: boolean;
  audioAvailable: boolean;
  formattedSize: string;
}

export interface InstagramVideoResponse {
  title: string;
  thumbnail: string;
  source: string;
  medias: InstagramMediaItem[];
}

export class InstagramDownloadError extends Error {
  status: number;
  data?: unknown;

  constructor(message = "Instagram video not found, private, or temporarily blocked.", status = 404, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

const INSTAGRAM_ERROR_MESSAGE = "Instagram video not found, private, or temporarily blocked.";
const INSTAGRAM_HEADERS = {
  "Accept": "*/*",
  "Accept-Language": "en-US,en;q=0.9",
  "DNT": "1",
  "Host": "www.instagram.com",
  "Referer": "https://www.instagram.com/",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "same-origin",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
};

const INSTAGRAM_MEDIA_HEADERS = {
  "Accept": "video/mp4,video/*,*/*;q=0.8",
  "Referer": "https://www.instagram.com/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0",
};

function encodeGraphqlRequestData(shortcode: string): string {
  return new URLSearchParams({
    av: "0",
    __d: "www",
    __user: "0",
    __a: "1",
    __req: "3",
    __hs: "19624.HYP:instagram_web_pkg.2.1..0.0",
    dpr: "3",
    __ccg: "UNKNOWN",
    __rev: "1008824440",
    __s: "xf44ne:zhh75g:xr51e7",
    __hsi: "7282217488877343271",
    __dyn:
      "7xeUmwlEnwn8K2WnFw9-2i5U4e0yoW3q32360CEbo1nEhw2nVE4W0om78b87C0yE5ufz81s8hwGwQwoEcE7O2l0Fwqo31w9a9x-0z8-U2zxe2GewGwso88cobEaU2eUlwhEe87q7-0iK2S3qazo7u1xwIw8O321LwTwKG1pg661pwr86C1mwraCg",
    __csr:
      "gZ3yFmJkillQvV6ybimnG8AmhqujGbLADgjyEOWz49z9XDlAXBJpC7Wy-vQTSvUGWGh5u8KibG44dBiigrgjDxGjU0150Q0848azk48N09C02IR0go4SaR70r8owyg9pU0V23hwiA0LQczA48S0f-x-27o05NG0fkw",
    __comet_req: "7",
    lsd: "AVqbxe3J_YA",
    jazoest: "2957",
    __spin_r: "1008824440",
    __spin_b: "trunk",
    __spin_t: "1695523385",
    fb_api_caller_class: "RelayModern",
    fb_api_req_friendly_name: "PolarisPostActionLoadPostQueryQuery",
    variables: JSON.stringify({
      shortcode,
      fetch_comment_count: "null",
      fetch_related_profile_media_count: "null",
      parent_comment_count: "null",
      child_comment_count: "null",
      fetch_like_count: "null",
      fetch_tagged_user_count: "null",
      fetch_preview_comment_count: "null",
      has_threaded_comments: "false",
      hoisted_comment_id: "null",
      hoisted_reply_id: "null",
    }),
    server_timestamps: "true",
    doc_id: "10015901848480474",
  }).toString();
}

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

function getErrorDiagnostics(err: unknown): { status?: unknown; data?: unknown } {
  if (!isRecord(err)) return {};

  const response = isRecord(err.response) ? err.response : undefined;
  return {
    status: response?.status ?? err.status,
    data: response?.data ?? err.data,
  };
}

function decodeHtml(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function createInstagramResponse(videoUrl: string, source: string, thumbnail = ""): InstagramVideoResponse {
  return {
    title: "Instagram Video",
    thumbnail,
    source,
    medias: [
      {
        quality: "HD",
        extension: "mp4",
        url: videoUrl,
        videoAvailable: true,
        audioAvailable: true,
        formattedSize: "-",
      },
    ],
  };
}

export function getPostIdFromUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/(?:p|reel|reels)\/([^/?#]+)/i);
    return match?.[1] || "";
  } catch {
    return "";
  }
}

export async function getPostPageHTML(url: string): Promise<string> {
  const shortcode = getPostIdFromUrl(url);
  const pageUrl = shortcode ? `https://www.instagram.com/p/${encodeURIComponent(shortcode)}/` : url;

  const response = await fetch(pageUrl, {
    headers: INSTAGRAM_HEADERS,
    cache: "no-store",
    redirect: "follow",
  });

  console.log("INSTAGRAM_HTML_STATUS", { status: response.status });

  if (!response.ok) {
    throw new InstagramDownloadError(INSTAGRAM_ERROR_MESSAGE, response.status, { stage: "html", status: response.status });
  }

  return response.text();
}

export async function getPostGraphqlData(shortcode: string): Promise<unknown> {
  const response = await fetch("https://www.instagram.com/api/graphql", {
    method: "POST",
    headers: {
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": "https://www.instagram.com/",
      "X-FB-Friendly-Name": "PolarisPostActionLoadPostQueryQuery",
      "X-CSRFToken": "RVDUooU5MYsBbS1CNN3CzVAuEP8oHB52",
      "X-IG-App-ID": "1217981644879628",
      "X-FB-LSD": "AVqbxe3J_YA",
      "X-ASBD-ID": "129477",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.2 Chrome/87.0.4280.141 Mobile Safari/537.36",
    },
    body: encodeGraphqlRequestData(shortcode),
    cache: "no-store",
    redirect: "follow",
  });

  const text = await response.text();

  console.log("INSTAGRAM_GRAPHQL_STATUS", { status: response.status });

  if (!response.ok) {
    throw new InstagramDownloadError(INSTAGRAM_ERROR_MESSAGE, response.status, {
      stage: "graphql",
      status: response.status,
      body: text.slice(0, 300),
    });
  }

  try {
    return text ? JSON.parse(text) : null;
  } catch {
    throw new InstagramDownloadError(INSTAGRAM_ERROR_MESSAGE, 502, {
      stage: "graphql_parse",
      body: text.slice(0, 300),
    });
  }
}

export function formatPageJson(html: string, source: string): InstagramVideoResponse | null {
  const $ = cheerio.load(html);
  const videoUrl =
    $("meta[property='og:video:secure_url']").attr("content") ||
    $("meta[property='og:video']").attr("content") ||
    $("meta[property='og:video:url']").attr("content") ||
    "";

  console.log("INSTAGRAM_OG_VIDEO_EXISTS", Boolean(videoUrl));

  if (!videoUrl) return null;

  const thumbnail = $("meta[property='og:image']").attr("content") || "";
  return createInstagramResponse(decodeHtml(videoUrl), source, decodeHtml(thumbnail));
}

function findVideoUrl(value: unknown): string {
  if (!isRecord(value)) return "";

  const direct = getStringValue(value, ["video_url", "videoUrl", "url"]);
  if (direct.includes(".mp4") || direct.includes("video")) return direct;

  const media = value.media;
  if (isRecord(media)) {
    const mediaUrl = findVideoUrl(media);
    if (mediaUrl) return mediaUrl;
  }

  const shortcodeMedia = value.shortcode_media;
  if (isRecord(shortcodeMedia)) {
    const shortcodeMediaUrl = findVideoUrl(shortcodeMedia);
    if (shortcodeMediaUrl) return shortcodeMediaUrl;
  }

  const items = value.items;
  if (Array.isArray(items)) {
    for (const item of items) {
      const itemUrl = findVideoUrl(item);
      if (itemUrl) return itemUrl;
    }
  }

  const edges = value.edge_sidecar_to_children;
  if (isRecord(edges) && Array.isArray(edges.edges)) {
    for (const edge of edges.edges) {
      if (!isRecord(edge)) continue;
      const nodeUrl = findVideoUrl(edge.node);
      if (nodeUrl) return nodeUrl;
    }
  }

  const graphql = value.graphql;
  if (isRecord(graphql)) {
    const graphqlUrl = findVideoUrl(graphql);
    if (graphqlUrl) return graphqlUrl;
  }

  return "";
}

function findDashVideoUrl(value: unknown): string {
  if (!isRecord(value)) return "";

  const dashInfo = value.dash_info;
  if (isRecord(dashInfo)) {
    const manifest = getStringValue(dashInfo, ["video_dash_manifest"]);
    const match = manifest.match(/<Representation\b[^>]*mimeType="video\/mp4"[\s\S]*?<BaseURL>([\s\S]*?)<\/BaseURL>/);
    if (match?.[1]) return decodeHtml(match[1]);
  }

  const media = value.media;
  if (isRecord(media)) {
    const mediaUrl = findDashVideoUrl(media);
    if (mediaUrl) return mediaUrl;
  }

  const shortcodeMedia = value.shortcode_media;
  if (isRecord(shortcodeMedia)) {
    const shortcodeMediaUrl = findDashVideoUrl(shortcodeMedia);
    if (shortcodeMediaUrl) return shortcodeMediaUrl;
  }

  const graphql = value.graphql;
  if (isRecord(graphql)) {
    const graphqlUrl = findDashVideoUrl(graphql);
    if (graphqlUrl) return graphqlUrl;
  }

  return "";
}

async function isDownloadableVideoUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      headers: {
        ...INSTAGRAM_MEDIA_HEADERS,
        "Range": "bytes=0-0",
      },
      cache: "no-store",
    });

    return response.ok && (response.headers.get("content-type") || "").toLowerCase().startsWith("video/");
  } catch {
    return false;
  }
}

async function findDownloadableVideoUrl(value: unknown): Promise<string> {
  const candidates = [findVideoUrl(value), findDashVideoUrl(value)].filter(Boolean);

  for (const candidate of candidates) {
    if (await isDownloadableVideoUrl(candidate)) return candidate;
  }

  return "";
}

function findThumbnail(value: unknown): string {
  if (!isRecord(value)) return "";

  const direct = getStringValue(value, ["display_url", "thumbnail_src", "thumbnail", "image"]);
  if (direct) return direct;

  const media = value.media;
  if (isRecord(media)) {
    const mediaThumb = findThumbnail(media);
    if (mediaThumb) return mediaThumb;
  }

  const shortcodeMedia = value.shortcode_media;
  if (isRecord(shortcodeMedia)) {
    const shortcodeThumb = findThumbnail(shortcodeMedia);
    if (shortcodeThumb) return shortcodeThumb;
  }

  const graphql = value.graphql;
  if (isRecord(graphql)) {
    const graphqlThumb = findThumbnail(graphql);
    if (graphqlThumb) return graphqlThumb;
  }

  return "";
}

export async function formatGraphqlJson(data: unknown, source: string): Promise<InstagramVideoResponse | null> {
  const root = isRecord(data) && isRecord(data.data) ? data.data : {};
  const mediaData = isRecord(root.xdt_shortcode_media) ? root.xdt_shortcode_media : data;

  console.log("INSTAGRAM_GRAPHQL_HAS_MEDIA", isRecord(root.xdt_shortcode_media));

  const videoUrl = await findDownloadableVideoUrl(mediaData);
  console.log("INSTAGRAM_GRAPHQL_VIDEO_URL_EXISTS", Boolean(videoUrl));

  if (!videoUrl) return null;

  return createInstagramResponse(videoUrl, source, findThumbnail(mediaData));
}

export async function getVideoInfo(url: string): Promise<InstagramVideoResponse> {
  const shortcode = getPostIdFromUrl(url);

  console.log("INSTAGRAM_SHORTCODE", { shortcode });

  if (!shortcode) {
    throw new InstagramDownloadError(INSTAGRAM_ERROR_MESSAGE, 400, { stage: "shortcode" });
  }

  try {
    const html = await getPostPageHTML(url);
    const pageResult = formatPageJson(html, url);

    if (pageResult) return pageResult;
  } catch (err: unknown) {
    const diagnostics = getErrorDiagnostics(err);

    console.error("INSTAGRAM_ERROR", {
      platform: "instagram",
      message: err instanceof Error ? err.message : INSTAGRAM_ERROR_MESSAGE,
      status: diagnostics.status,
      data: diagnostics.data,
      stack: err instanceof Error ? err.stack : undefined,
      stage: "html",
    });
  }

  try {
    const graphqlData = await getPostGraphqlData(shortcode);
    const graphqlResult = await formatGraphqlJson(graphqlData, url);

    if (graphqlResult) return graphqlResult;
  } catch (err: unknown) {
    const diagnostics = getErrorDiagnostics(err);

    console.error("INSTAGRAM_ERROR", {
      platform: "instagram",
      message: err instanceof Error ? err.message : INSTAGRAM_ERROR_MESSAGE,
      status: diagnostics.status,
      data: diagnostics.data,
      stack: err instanceof Error ? err.stack : undefined,
      stage: "graphql",
    });
  }

  throw new InstagramDownloadError(INSTAGRAM_ERROR_MESSAGE, 404, { stage: "not_found" });
}
