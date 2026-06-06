import Link from "next/link";
import { Instagram, Mail } from "lucide-react";
import { getLatestBlogs } from "@/lib/blogs";

const tools = [
  { href: "/youtube-downloader", label: "YouTube Downloader" },
  { href: "/tiktok-downloader", label: "TikTok Downloader" },
  { href: "/instagram-downloader", label: "Instagram Downloader" },
  { href: "/facebook-downloader", label: "Facebook Downloader" },
  { href: "/twitter-downloader", label: "Twitter Downloader" },
  { href: "/mp3-converter", label: "MP3 Converter" },
  { href: "/tiktok-watermark-remover", label: "Watermark Remover" },
];

const latestBlogs = getLatestBlogs(3);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 px-4 pb-8 pt-12 text-gray-300">
      <div className="absolute left-0 right-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      <div className="absolute left-1/2 top-0 h-40 w-[80%] -translate-x-1/2 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl" />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="relative xl:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
              <span className="bg-gradient-to-r from-white via-white to-violet-400 bg-clip-text text-lg font-black tracking-tight text-transparent">
                Awaisify Down
              </span>
            </div>
            <p className="max-w-md text-sm leading-7 text-gray-400">
              Free browser tools for downloading public videos, converting MP3 audio, and finding practical guides for YouTube, TikTok, Instagram, Facebook, and X workflows.
            </p>
          </div>

          <div className="relative">
            <h4 className="text-sm font-black uppercase tracking-[0.14em] text-white">Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li><Link href="/" className="transition-colors hover:text-blue-400">Home</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-blue-400">Blog</Link></li>
              <li><Link href="/faq" className="transition-colors hover:text-blue-400">FAQ</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-blue-400">About</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          <div className="relative">
            <h4 className="text-sm font-black uppercase tracking-[0.14em] text-white">Tools</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="transition-colors hover:text-blue-400">{tool.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <h4 className="text-sm font-black uppercase tracking-[0.14em] text-white">Blog</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              {latestBlogs.map((blog) => (
                <li key={blog.slug}>
                  <Link href={`/blog/${blog.slug}`} className="transition-colors hover:text-blue-400">{blog.title}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-black uppercase tracking-[0.14em] text-white">Connect</h4>
              <div className="mt-3 flex gap-2">
                <Link
                  href="https://instagram.com/igmuhammadawais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 shadow-sm transition-all hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-pink-300 hover:shadow-md"
                >
                  <Instagram size={16} />
                </Link>
                <Link
                  href="mailto:awaiss.dev@gmail.com"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 shadow-sm transition-all hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-300 hover:shadow-md"
                >
                  <Mail size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-10 border-t border-white/10 pt-5 text-xs text-gray-500">
          © 2026 Awaisify Down. All rights reserved. Built for fast, secure public video downloads and helpful offline media workflows.
        </div>
      </div>
    </footer>
  );
}
