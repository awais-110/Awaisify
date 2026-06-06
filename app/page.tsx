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

const platformIcons = [
  {
    name: "YouTube",
    bg: "bg-red-500",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.75 15.5v-7l6.5 3.5-6.5 3.5z"/>
      </svg>
    ),
  },
  {
    name: "TikTok",
    bg: "bg-gray-900",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    bg: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    bg: "bg-blue-600",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "X",
    bg: "bg-gray-900",
    svg: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
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
  { href: "/youtube-downloader", title: "YouTube Downloader", description: "Save public YouTube videos in HD and higher-quality formats." },
  { href: "/tiktok-downloader", title: "TikTok Downloader", description: "Download TikTok videos quickly with a mobile-friendly browser workflow." },
  { href: "/instagram-downloader", title: "Instagram Downloader", description: "Fetch reels and public Instagram video posts in a cleaner format list." },
  { href: "/mp3-converter", title: "MP3 Converter", description: "Show only audio formats when you just want an MP3-style download flow." },
];

const trustPoints = [
  { title: "Fast public-link workflow", description: "Paste a supported URL, fetch the formats, and save what you need without extra setup." },
  { title: "Built for repeated use", description: "The UI stays simple when you are downloading reference material, study clips, or creative inspiration every day." },
  { title: "Works across major platforms", description: "Use the same core flow for YouTube, TikTok, Instagram, Facebook, X, and more public video sources." },
  { title: "Useful beyond one-off saves", description: "Awaisify Down supports broader offline workflows like MP3 conversion, watermark-free TikTok fetching, and content research." },
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
    } catch {
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
            { "@type": "WebSite", name: "Awaisify Down", url: BASE_URL, description: "Free browser tools for downloading public videos and converting audio." },
            { "@type": "Organization", name: "Awaisify Down", url: BASE_URL },
          ],
        }}
      />
      <Navbar />

      <main className="flex-1">
        <section className="hero-mesh relative flex min-h-[480px] items-center overflow-hidden px-4 py-12">
          {particles.map((particle, index) => (
            <span key={`${particle.left}-${index}`} className="particle"
              style={{ width: `${particle.size}px`, height: `${particle.size}px`, left: particle.left, bottom: "-24px", animationDelay: particle.delay, animationDuration: particle.duration }}
            />
          ))}

          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            {/* Badge */}
            <div className="animate-fade-in">
              <span className="gradient-badge inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]">
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Free Video Downloader</span>
              </span>
            </div>

            {/* Heading */}
            <h1 className="animate-slide-down mt-5 text-5xl font-black tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
              Awaisify{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent text-glow-violet">Down</span>
            </h1>

            <p className="animate-slide-up mt-4 text-lg font-semibold text-gray-700 opacity-0">Paste link. Download video.</p>
            <p className="animate-fade-in mt-2 text-sm text-gray-500">Supports YouTube, TikTok, Instagram, Facebook, X and more public video links.</p>

            {/* Platform Icons — premium floating */}
            <div
              className="mt-8 flex flex-wrap items-center justify-center gap-5"
              style={{ animation: "fadeIn 0.7s ease 0.5s forwards", opacity: 0 }}
            >
              {platformIcons.map((platform, i) => (
                <div
                  key={platform.name}
                  title={platform.name}
                  className="platform-icon group relative"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Glow behind icon */}
                  <div className={`absolute inset-0 rounded-2xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50 ${platform.bg}`} />
                  {/* Icon itself */}
                  <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-2xl ${platform.bg}`}>
                    {platform.svg}
                  </div>
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900/80 px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                    {platform.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Card */}
            <div className="input-card-premium mt-10">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 transition-all duration-200 focus-within:border-blue-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.14)]">
                  <Link2 size={18} className="shrink-0 text-gray-400" />
                  <input
                    type="text" value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                    placeholder="Paste video URL here..."
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                    aria-label="Video URL input"
                  />
                  {url && (
                    <button onClick={handleClear} aria-label="Clear URL" className="text-gray-400 hover:text-gray-600">
                      <X size={16} />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleFetch}
                  disabled={status === "loading" || !url.trim()}
                  aria-label="Fetch video"
                  className="btn-shimmer flex items-center justify-center rounded-2xl px-5 py-3 text-white shadow-lg shadow-green-200 transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between px-1">
                {status === "success" && <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600"><CheckCircle2 size={14} /> Link fetched successfully</span>}
                {status === "error" && <span className="flex items-center gap-1.5 text-xs font-medium text-red-500"><AlertCircle size={14} /> {error}</span>}
                {(status === "idle" || status === "loading") && <span className="text-xs text-gray-400">Auto-detect platform</span>}
                <span className="text-xs font-medium text-emerald-600">Safe • Fast • Secure</span>
              </div>
            </div>
          </div>
        </section>

        {status === "success" && video && (
          <section className="px-4 pb-10">
            <div className="max-w-3xl mx-auto mb-3 flex justify-end">
              <button onClick={handleClear} aria-label="Download another video"
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 border border-gray-200 hover:border-blue-300 px-3 py-1.5 rounded-lg transition-colors">
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
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">{platform.icon}</div>
                    <div className="text-sm font-semibold text-gray-800">{platform.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl"><AffiliateBanner type="4kdownloader" /></div>
        </section>

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-black text-gray-900">Popular tools</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {popularTools.map((tool) => (
                <Link key={tool.href} href={tool.href}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-blue-200">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Clapperboard size={18} /></div>
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
              <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all posts</Link>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {latestBlogs.map((blog) => (
                <Link key={blog.slug} href={`/blog/${blog.slug}`}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-blue-200">
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
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><ShieldCheck size={22} /></div>
              <div>
                <h2 className="text-3xl font-black text-gray-900">Why Choose Awaisify Down?</h2>
                <p className="mt-1 text-sm text-gray-600">Built for people who want a quick, trustworthy way to work with public video links.</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"><Sparkles size={18} /></div>
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