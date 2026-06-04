import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

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
      return NextResponse.json({ error: "Failed to fetch video info" }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}