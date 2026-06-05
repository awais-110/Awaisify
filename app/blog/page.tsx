import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogListing from "@/components/BlogListing";
import SchemaScript from "@/components/SchemaScript";
import { BASE_URL } from "@/lib/tool-pages";
import { blogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blog — Awaisify Down Video Guides & Tips",
  description: "Read video download guides, MP3 tips, and platform-specific tutorials for YouTube, TikTok, Instagram, and more.",
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Blog — Awaisify Down Video Guides & Tips",
    description: "Read video download guides, MP3 tips, and platform-specific tutorials for YouTube, TikTok, Instagram, and more.",
    url: `${BASE_URL}/blog`,
    images: [`${BASE_URL}/favicon.ico`],
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SchemaScript
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Awaisify Down Blog",
          description: "Guides, tips, and updates for downloading and managing online video content.",
          url: `${BASE_URL}/blog`,
        }}
      />
      <Navbar />
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-black tracking-tight text-gray-900">Awaisify Down Blog</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Practical guides for downloading videos, converting audio, removing TikTok watermarks, and building better offline media workflows.
          </p>
          <div className="mt-8">
            <BlogListing blogs={blogs} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
