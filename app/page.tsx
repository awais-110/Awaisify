"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Clapperboard,
  Download,
  Facebook,
  Instagram,
  Link2,
  Loader2,
  PlaySquare,
  ShieldCheck,
  Sparkles,
  Twitter,
  Video,
  Waves,
  X,
} from "lucide-react";
import AffiliateBanner from "@/components/AffiliateBanner";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import Navbar from "@/components/Navbar";
import SchemaScript from "@/components/SchemaScript";
import Stats from "@/components/Stats";
import VideoResult from "@/components/VideoResult";
import { getLatestBlogs } from "@/lib/blogs";
import { BASE_URL } from "@/lib/tool-pages";

type Status = "idle" | "loading" | "success" | "error";

const heroPlatforms = [
  { name: "YouTube", bg: "bg-red-500", shadow: "hover:shadow-red-200", letter: "YT" },
  { name: "TikTok", bg: "bg-gray-900", shadow: "hover:shadow-gray-300", letter: "TT" },
  {
    name: "Instagram",
    bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    shadow: "hover:shadow-pink-200",
    letter: "IG",
  },
  { name: "Facebook", bg: "bg-blue-600", shadow: "hover:shadow-blue-200", letter: "FB" },
  { name: "X", bg: "bg-gray-900", shadow: "hover:shadow-gray-300", letter: "X" },
];

const particles = [
  { size: 8, left: "8%", delay: "0s", duration: "6s" },
  { size: 5, left: "20%", delay: "1s", duration: "8s" },
  { size: 10, left: "35%", delay: "2s", duration: "7s" },
  { size: 6, left: "55%", delay: "0.5s", duration: "9s" },
  { size: 4, left: "70%", delay: "1.5s", duration: "6s" },
  { size: 8, left: "82%", delay: "3s", duration: "8s" },
  { size: 5, left: "92%", delay: "2.5s", duration: "7s" },
];

const supportedPlatforms = [
  { label: "YouTube", icon: <PlaySquare size={18} className="text-red-500" /> },
  { label: "TikTok", icon: <Waves size={18} className="text-gray-900" /> },
  { label: "Instagram", icon: <Instagram size={18} className="text-pink-500" /> },
  { label: "Facebook", icon: <Facebook size={18} className="text-blue-600" /> },
  { label: "X", icon: <Twitter size={18} className="text-gray-900" /> },
  { label: "Vimeo", icon: <Video size={18} className="text-sky-500" /> },
];

const popularTools = [
  {
    href: "/youtube-downloader",
    title: "YouTube Downloader",
    description: "Save public YouTube videos in HD and higher-quality formats.",
  },
  {
    href: "/tiktok-downloader",
    title: "TikTok Downloader",
    description: "Download TikTok videos quickly with a mobile-friendly browser workflow.",
  },
  {
    href: "/instagram-downloader",
    title: "Instagram Downloader",
    description: "Fetch reels and public Instagram video posts in a cleaner format list.",
  },
  {
    href: "/mp3-converter",
    title: "MP3 Converter",
    description: "Show only audio formats when you just want an MP3-style download flow.",
  },
];

const trustPoints = [
  {
    title: "Fast public-link workflow",
    description: "Paste a supported URL, fetch the formats, and save what you need without extra setup.",
  },
  {
    title: "Built for repeated use",
    description: "The UI stays simple when you are downloading reference material, study clips, or creative inspiration every day.",
  },
  {
    title: "Works across major platforms",
    description: "Use the same core flow for YouTube, TikTok, Instagram, Facebook, X, and more public video sources.",
  },
  {
    title: "Useful beyond one-off saves",
    description: "Awaisify Down supports broader offline workflows like MP3 conversion, watermark-free TikTok fetching, and content research.",
  },
];

const latestBlogs = getLatestBlogs(3);

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
      <SchemaScript
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "Awaisify Down",
              url: BASE_URL,
              description: "Free browser tools for downloading public videos and converting audio.",
            },
            {
              "@type": "Organization",
              name: "Awaisify Down",
              url: BASE_URL,
            },
          ],
        }}
      />
      <Navbar />

      <main className="flex-1">
        <section className="hero-mesh relative flex min-h-[420px] items-center overflow-hidden px-4 py-10">
          {particles.map((particle, index) => (
            <span
              key={`${particle.left}-${index}`}
              className="particle"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: particle.left,
                bottom: "-24px",
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}

          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <div className="animate-fade-in">
              <span className="gradient-badge inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Free Video Downloader
                </span>
              </span>
            </div>

            <h1 className="animate-slide-down mt-6 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
              Awaisify{" "}
              <span className="text-glow-violet bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                Down
              </span>
            </h1>

            <p className="animate-slide-up mt-4 text-lg font-semibold text-gray-700 opacity-0">
              Paste link. Download video.
            </p>

            <p className="animate-fade-in mt-3 text-sm text-gray-500">
              Supports YouTube, TikTok, Instagram, Facebook, X and more public video links.
            </p>

            <div
              className="mt-5 flex flex-wrap items-center justify-center gap-2 opacity-0"
              style={{ animation: "fadeIn 0.7s ease 0.5s forwards" }}
            >
              {heroPlatforms.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur transition-all duration-300 hover:border-blue-200 hover:bg-white hover:shadow-md"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-[11px] font-black text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${platform.bg} ${platform.shadow}`}
                  >
                    {platform.letter}
                  </span>
                  <span className="text-xs font-semibold text-gray-700">{platform.name}</span>
                </div>
              ))}
            </div>

            <div className="input-glow mt-8 rounded-[28px] border-2 border-blue-100 bg-white p-4 shadow-xl shadow-blue-50 transition-all duration-300 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-100">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-200 focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.14)]">
                  <Link2 size={18} className="shrink-0 text-gray-400" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                    placeholder="Paste video URL here..."
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                    aria-label="Video URL input"
                  />
                  {url && (
                    <button
                      onClick={handleClear}
                      aria-label="Clear URL"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                <button
                  onClick={handleFetch}
                  disabled={status === "loading" || !url.trim()}
                  aria-label="Fetch video"
                  className="btn-shimmer flex items-center justify-center rounded-2xl px-4 py-3 text-white shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Download size={18} />
                  )}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between px-1">
                {status === "success" && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                    <CheckCircle2 size={14} /> Link fetched successfully
                  </span>
                )}
                {status === "error" && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                    <AlertCircle size={14} /> {error}
                  </span>
                )}
                {(status === "idle" || status === "loading") && (
                  <span className="text-xs text-gray-400">Auto-detect platform</span>
                )}
                <span className="text-xs font-medium text-emerald-600">Safe • Fast • Secure</span>
              </div>
            </div>
          </div>
        </section>

        {status === "success" && video && (
          <section className="px-4 pb-10">
            <div className="max-w-3xl mx-auto mb-3 flex justify-end">
              <button
                onClick={handleClear}
                aria-label="Download another video"
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

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900">Supported platforms</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {supportedPlatforms.map((platform) => (
                  <div key={platform.label} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      {platform.icon}
                    </div>
                    <div className="text-sm font-semibold text-gray-800">{platform.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl">
            <AffiliateBanner type="4kdownloader" />
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black text-gray-900">Popular tools</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {popularTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-blue-200"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Clapperboard size={18} />
                  </div>
                  <h3 className="text-lg font-black text-gray-900">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-gray-900">Latest blog posts</h2>
                <p className="mt-2 text-sm text-gray-600">Fresh guides for video downloads, MP3 workflows, and creator research.</p>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View all posts
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {latestBlogs.map((blog) => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-blue-200"
                >
                  <div className="text-xs font-semibold text-blue-600">{blog.category}</div>
                  <h3 className="mt-3 text-lg font-black leading-snug text-gray-900">{blog.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{blog.excerpt}</p>
                  <div className="mt-4 text-xs text-gray-400">{blog.readTime}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16">
          <div className="mx-auto max-w-6xl rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Why Choose Awaisify Down?</h2>
                <p className="mt-1 text-sm text-gray-600">Built for people who want a quick, trustworthy way to work with public video links.</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-sm font-black text-gray-900">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}