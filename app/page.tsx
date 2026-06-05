"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import VideoResult from "@/components/VideoResult";
import { Link2, Download, X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [video, setVideo] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!url.trim()) return;
    setStatus("loading");
    setVideo(null);
    setError("");

    try {
      const res = await fetch("/api/fetch-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Failed to fetch video. Please check the URL.");
        setStatus("error");
        return;
      }

      setVideo(data);
      setStatus("success");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const handleClear = () => {
    setUrl("");
    setStatus("idle");
    setVideo(null);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        <section className="hero-gradient pt-8 pb-8 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 mb-3">
              Awaisify <span className="text-blue-600">Down</span>
            </h1>

            <p className="text-lg font-semibold text-gray-700 mb-1">
              Paste link. Download video.
            </p>

            <p className="text-sm text-gray-500 mb-5">
              Supports YouTube, TikTok, Instagram, Facebook, X and more public video links.
            </p>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-4 transition-all duration-300 hover:shadow-xl hover:border-blue-300">
              <div className="flex items-center gap-3">
                <div className="flex items-center flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 gap-3 focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-sm transition-all duration-200">
                  <Link2 size={18} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                    placeholder="Paste video URL here..."
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                  />

                  {url && (
                    <button onClick={handleClear} className="text-gray-400 hover:text-gray-600">
                      <X size={16} />
                    </button>
                  )}
                </div>

                <button
                  onClick={handleFetch}
                  disabled={status === "loading" || !url.trim()}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold px-4 py-3 rounded-xl transition-all whitespace-nowrap text-sm hover:scale-105 active:scale-95"
                >
                  {status === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Download size={18} />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between mt-3 px-1">
                {status === "success" && (
                  <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
                    <CheckCircle2 size={14} /> Link fetched successfully
                  </span>
                )}

                {status === "error" && (
                  <span className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
                    <AlertCircle size={14} /> {error}
                  </span>
                )}

                {(status === "idle" || status === "loading") && (
                  <span className="text-xs text-gray-400">Auto-detect platform</span>
                )}

                <span className="text-xs text-emerald-600 font-medium">
                  🛡 Safe • Fast • Secure
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* RESULT */}
        {status === "success" && video && (
          <section className="px-4 pb-10">
            <div className="max-w-3xl mx-auto mb-3 flex justify-end">
              <button
                onClick={handleClear}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-colors"
              >
                ↩ Download Another Video
              </button>
            </div>

            <VideoResult video={video} />
          </section>
        )}

        <Features />
        <Stats />
      </main>

      <Footer />
    </div>
  );
}