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
    <footer className="border-t border-gray-100 bg-gray-50 px-4 pb-8 pt-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
                <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
              <span className="text-lg font-black tracking-tight text-gray-900">
                Awaisify <span className="text-blue-600">Down</span>
              </span>
            </div>
            <p className="max-w-md text-sm leading-7 text-gray-600">
              Free browser tools for downloading public videos, converting MP3 audio, and finding practical guides for YouTube, TikTok, Instagram, Facebook, and X workflows.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.14em] text-gray-500">Links</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.14em] text-gray-500">Tools</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link href={tool.href} className="hover:text-blue-600">{tool.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-[0.14em] text-gray-500">Blog</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              {latestBlogs.map((blog) => (
                <li key={blog.slug}>
                  <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600">{blog.title}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-black uppercase tracking-[0.14em] text-gray-500">Connect</h4>
              <div className="mt-3 flex gap-2">
                <Link
                  href="https://instagram.com/igmuhammadawais"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:border-pink-200 hover:text-pink-600"
                >
                  <Instagram size={16} />
                </Link>
                <Link
                  href="mailto:awaiss.dev@gmail.com"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:border-blue-200 hover:text-blue-600"
                >
                  <Mail size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-5 text-xs text-gray-500">
          © 2026 Awaisify Down. All rights reserved. Built for fast, secure public video downloads and helpful offline media workflows.
        </div>
      </div>
    </footer>
  );
}
