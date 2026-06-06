"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Download, Link2, Loader2, X } from "lucide-react";
import VideoResult from "@/components/VideoResult";

type Status = "idle" | "loading" | "success" | "error";

interface MediaItem {
  quality?: string;
  extension?: string;
  url?: string;
  videoAvailable?: boolean;
  audioAvailable?: boolean;
  formattedSize?: string;
}

interface VideoData {
  title?: string;
  thumbnail?: string;
  description?: string;
  source?: string;
  medias?: MediaItem[];
}

interface DownloaderWidgetProps {
  placeholder?: string;
  helperText?: string;
  invalidHostMessage?: string;
  allowedHosts?: string[];
  mode?: "default" | "audio-only";
  resultBadges?: string[];
}

export default function DownloaderWidget({
  placeholder = "Paste video URL here...",
  helperText = "Auto-detect platform",
  invalidHostMessage = "This tool only supports specific links.",
  allowedHosts,
  mode = "default",
  resultBadges = [],
}: DownloaderWidgetProps) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [video, setVideo] = useState<VideoData | null>(null);
  const [error, setError] = useState("");

  function normalizeVideo(data: VideoData): VideoData {
    if (mode !== "audio-only") {
      return data;
    }

    const medias = (data.medias || []).filter(
      (media) => media.extension === "mp3" || media.audioAvailable
    );

    return { ...data, medias };
  }

  function validateHost(value: string): boolean {
    if (!allowedHosts || allowedHosts.length === 0) {
      return true;
    }

    try {
      const hostname = new URL(value).hostname.replace(/^www\./, "");
      return allowedHosts.some((host) => hostname.includes(host));
    } catch {
      return true;
    }
  }

  async function handleFetch() {
    if (!url.trim()) {
      return;
    }

    if (!validateHost(url.trim())) {
      setStatus("error");
      setVideo(null);
      setError(invalidHostMessage);
      return;
    }

    setStatus("loading");
    setVideo(null);
    setError("");

    try {
      const response = await fetch("/api/fetch-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = (await response.json()) as VideoData & { error?: string };

      if (!response.ok || data.error) {
        setError(data.error || "Failed to fetch video. Please check the URL.");
        setStatus("error");
        return;
      }

      setVideo(normalizeVideo(data));
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function handleClear() {
    setUrl("");
    setStatus("idle");
    setVideo(null);
    setError("");
  }

  return (
    <>
      <div className="rounded-3xl border border-blue-100 bg-white p-4 shadow-lg shadow-blue-50">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-200 focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm sm:flex-1">
            <Link2 size={18} className="shrink-0 text-gray-400" />
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && handleFetch()}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
            {url && (
              <button onClick={handleClear} className="text-gray-400 transition-colors hover:text-gray-600">
                <X size={16} />
              </button>
            )}
          </div>

          <button
            onClick={handleFetch}
            disabled={status === "loading" || !url.trim()}
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 disabled:bg-blue-300"
          >
            {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            Fetch
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-2 px-1 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-[18px]">
            {status === "success" && (
              <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                <CheckCircle2 size={14} /> Video ready to download
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center gap-1.5 font-medium text-red-500">
                <AlertCircle size={14} /> {error}
              </span>
            )}
            {(status === "idle" || status === "loading") && (
              <span className="font-medium text-gray-400">{helperText}</span>
            )}
          </div>
          <span className="font-medium text-emerald-600">Safe • Fast • Secure</span>
        </div>
      </div>

      {status === "success" && video && (
        <div className="mt-6">
          <VideoResult video={video} mode={mode} badges={resultBadges} />
        </div>
      )}
    </>
  );
}
