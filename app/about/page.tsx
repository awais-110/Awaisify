import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Shield, Zap, Globe } from "lucide-react";

export const metadata = {
  title: "About Us - Awaisify Down",
  description: "Learn about Awaisify Down - Free Video Downloader built by Muhammad Awais.",
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-2">About Us</h1>
        <p className="text-gray-500 text-sm mb-8">The story behind Awaisify Down.</p>

        <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6 mb-6 border border-blue-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Who We Are</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Awaisify Down is a free online video downloader built and maintained by Muhammad Awais, a passionate developer from Pakistan. Our goal is to provide a fast, clean, and reliable tool for downloading videos from your favorite platforms without any hassle.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Our Mission</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            We believe everyone should have access to free, easy-to-use tools for saving online videos. Whether you want to save a tutorial for offline study, keep a memory, or enjoy content without internet, Awaisify Down is here for you.
          </p>
        </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { icon: <Zap size={20} className="text-blue-600" />, title: "Ultra Fast", desc: "Download videos in seconds with our optimized API" },
            { icon: <Shield size={20} className="text-green-600" />, title: "100% Safe", desc: "No malware, no data collection, no installations" },
            { icon: <Download size={20} className="text-purple-600" />, title: "HD Quality", desc: "Download in HD, Full HD and 4K where available" },
            { icon: <Globe size={20} className="text-orange-600" />, title: "Multi Platform", desc: "Supports YouTube, TikTok, Instagram, Facebook & more" },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center mb-2">
                {item.icon}
              </div>
              <h3 className="font-bold text-sm text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Meet the Developer</h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-xl">A</div>
            <div>
              <p className="font-bold text-gray-900">Muhammad Awais</p>
              <p className="text-xs text-gray-500">Full Stack Developer & Creator of Awaisify Down</p>
              <a href="https://instagram.com/igmuhammadawais" target="_blank" rel="noopener noreferrer" className="text-xs text-pink-600 hover:underline">@igmuhammadawais</a>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
          <h2 className="font-bold text-lg mb-2">Have Questions?</h2>
          <p className="text-sm opacity-90 mb-4">We would love to hear from you!</p>
          <a href="mailto:awaiss.dev@gmail.com" className="inline-block bg-white text-blue-600 font-bold text-sm px-6 py-2 rounded-xl hover:bg-blue-50 transition-colors">
            Contact Us
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
