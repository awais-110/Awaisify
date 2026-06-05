"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogCategory, BlogPost } from "@/lib/blogs";

interface BlogListingProps {
  blogs: BlogPost[];
}

const categories: Array<"All" | BlogCategory> = ["All", "YouTube", "TikTok", "Instagram", "Tips"];

export default function BlogListing({ blogs }: BlogListingProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | BlogCategory>("All");

  const filteredBlogs = activeCategory === "All"
    ? blogs
    : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === category
                ? "bg-blue-600 text-white"
                : "border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 hover:border-blue-200"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <span className="rounded-full bg-blue-50 px-2.5 py-1">{blog.category}</span>
              <span className="text-gray-400">{blog.readTime}</span>
            </div>
            <h2 className="mt-4 text-lg font-black leading-snug text-gray-900 transition-colors group-hover:text-blue-600">
              {blog.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{blog.excerpt}</p>
            <div className="mt-4 text-xs font-medium text-gray-400">{blog.date}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
