"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart, Menu, Phone, X } from "lucide-react";

const toolLinks = [
  { href: "/youtube-downloader", label: "YouTube Downloader" },
  { href: "/tiktok-downloader", label: "TikTok Downloader" },
  { href: "/instagram-downloader", label: "Instagram Downloader" },
  { href: "/facebook-downloader", label: "Facebook Downloader" },
  { href: "/mp3-converter", label: "MP3 Converter" },
  { href: "/tiktok-watermark-remover", label: "TikTok Watermark Remover" },
];

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 px-4 py-3 transition-all duration-300"
      style={{
        position: "sticky",
        background: "rgba(255, 255, 255, 0.92)",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
        WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(12px)",
        boxShadow: isScrolled
          ? "0 4px 24px rgba(59, 130, 246, 0.10)"
          : "0 1px 20px rgba(59, 130, 246, 0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="white" className="h-4 w-4">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </div>
          <span className="group/logo whitespace-nowrap text-lg font-black tracking-tight transition-transform duration-300 hover:scale-[1.02]">
            <span className="text-slate-950">Awaisify</span>
            <span className="navbar-brand-down ml-1">Down</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="relative">
            <button
              onClick={() => setIsToolsOpen((value) => !value)}
              className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            >
              Tools <ChevronDown size={14} className={`transition-transform ${isToolsOpen ? "rotate-180" : ""}`} />
            </button>
            {isToolsOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
                {toolLinks.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setIsToolsOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/donate"
            className="flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-500 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:shadow-md"
          >
            <Heart size={14} /> Donate
          </Link>
        </div>

        <button
          onClick={() => setIsMobileOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 lg:hidden"
        >
          {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-gray-200 bg-white p-3 shadow-sm lg:hidden">
          <div className="space-y-2">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3">
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">Tools</div>
              <div className="space-y-1">
                {toolLinks.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-white hover:text-blue-600"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center gap-2 rounded-2xl border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600"
              >
                {item.href === "/contact" && <Phone size={15} />}
                {item.label}
              </Link>
            ))}

            <Link
              href="/donate"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-2 rounded-2xl border border-red-200 px-3 py-3 text-sm font-semibold text-red-500 shadow-sm transition-all hover:border-red-300 hover:bg-red-50 hover:shadow-md"
            >
              <Heart size={15} /> Donate
            </Link>
          </div>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "0px",
          background:
            "linear-gradient(90deg, transparent 0%, #3b82f6 25%, #8b5cf6 50%, #10b981 75%, transparent 100%)",
        }}
      />
    </nav>
  );
}
