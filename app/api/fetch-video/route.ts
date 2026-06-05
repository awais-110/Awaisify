import { NextRequest, NextResponse } from "next/server";

function isYouTubeUrl(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

function getVideoId(url: string): string | null {
  try {
    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1]?.split("?")[0];
    }
    return new URL(url).searchParams.get("v");
  } catch {
    return null;
  }
}

async function fetchYouTube(url: string) {
  const videoId = getVideoId(url);
  if (!videoId) throw new Error("Invalid YouTube URL");

  const res = await fetch(
    `https://youtube-video-fast-downloader-24-7.p.rapidapi.com/get_video_details_and_quality?id=${videoId}`,
    {
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
        "x-rapidapi-host": "youtube-video-fast-downloader-24-7.p.rapidapi.com",
      },
    }
  );

  const details = await res.json();
  console.log("YT RESPONSE:", JSON.stringify(details, null, 2));

  if (!res.ok) return await fetchOther(url);

  const qualities = details.qualities || details.formats || details.videos || details.links || [];
  const medias = qualities.map((q: any) => ({
    quality: q.quality || q.label || q.resolution || "HD",
    extension: q.extension || "mp4",
    url: q.url || q.download_url || q.link || "",
    videoAvailable: true,
    audioAvailable: false,
    formattedSize: q.size || q.filesize || "-",
  }));

  return {
    title: details.title || "YouTube Video",
    thumbnail: details.thumbnail || details.thumb || details.image || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    source: url,
    medias: medias.length > 0 ? medias : (await fetchOther(url)).medias,
  };
}

async function fetchOther(url: string) {
  const response = await fetch(process.env.RAPIDAPI_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
      "x-rapidapi-host": process.env.RAPIDAPI_HOST!,
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("RapidAPI error:", err);
    throw new Error("Failed to fetch video info");
  }

  const data = await response.json();
  console.log("OTHER API RESPONSE:", JSON.stringify(data, null, 2));
  return data;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "URL is required" }, { status: 400 });

    const data = isYouTubeUrl(url) ? await fetchYouTube(url) : await fetchOther(url);
    return NextResponse.json(data);

  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
