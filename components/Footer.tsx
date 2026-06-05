import { Twitter, Mail, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-10 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
              <span className="font-black text-gray-900 tracking-tight">Awaisify <span className="text-blue-600">Down</span></span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              The fastest and easiest way to download videos from your favorite platforms.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-3">Links</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-blue-600 transition-colors">DMCA</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-3">Connect</h4>
            <div className="flex flex-wrap gap-2">
              <a href="https://instagram.com/igmuhammadawais" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-pink-600 hover:border-pink-200 transition-colors">
                <Instagram size={15} />
              </a>
              <a href="mailto:awaiss.dev@gmail.com"
                className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors">
                <Mail size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5 text-center text-xs text-gray-400">
          © 2026 Awaisify Down. All rights reserved. | Made with ❤️ by <a href="https://instagram.com/igmuhammadawais" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@igmuhammadawais</a>
        </div>
      </div>
    </footer>
  );
}
