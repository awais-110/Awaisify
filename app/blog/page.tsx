import Link from "next/link";
import { blogs } from "@/lib/blogs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog - Awaisify Down | Video Download Guides & Tips",
  description: "Read our latest guides on how to download videos from TikTok, Instagram, YouTube, Facebook and more.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-500 text-sm mb-8">Guides, tips and tricks for downloading videos online.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className="group block bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{blog.category}</span>
              <h2 className="font-bold text-gray-900 mt-2 mb-1 text-sm leading-snug group-hover:text-blue-600 transition-colors">{blog.title}</h2>
              <p className="text-xs text-gray-500 line-clamp-2">{blog.description}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}