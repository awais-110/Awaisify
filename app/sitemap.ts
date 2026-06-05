import { MetadataRoute } from "next";
import { blogs } from "@/lib/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://awaisify.site";

  return [
    { url: `${baseUrl}`, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/youtube-downloader`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/tiktok-downloader`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/instagram-downloader`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/facebook-downloader`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/twitter-downloader`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/mp3-converter`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/tiktok-watermark-remover`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
    ...blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: new Date(blog.date),
      priority: 0.8,
    })),
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), priority: 0.4 },
  ];
}
