import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://awaisify.site";

  return [
    // Main pages
    { url: `${baseUrl}`, lastModified: new Date(), priority: 1 },

    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), priority: 0.8 },

    { url: `${baseUrl}/donate`, lastModified: new Date(), priority: 0.7 },

    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), priority: 0.6 },

    // Blog main page
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.9 },
  ];
}