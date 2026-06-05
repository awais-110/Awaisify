import { Heart, Crown, BookOpen, Phone } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 px-4 py-3" style={{boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)'}}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </div>
          <span className="font-black text-lg tracking-tight text-gray-900 whitespace-nowrap">
            Awaisify <span className="text-blue-600">Down</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <Link href="/blog" className="hidden sm:flex items-center gap-1.5 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 text-gray-700 text-sm font-medium px-3 py-2 rounded-xl transition-all">
            <BookOpen size={14} /> Blog
          </Link>
          <Link href="/donate" className="flex items-center gap-1.5 border border-red-200 hover:border-red-300 hover:bg-red-50 text-red-500 text-sm font-medium px-3 py-2 rounded-xl transition-all">
            <Heart size={14} /> <span className="hidden sm:inline">Donate</span>
          </Link>
          <Link href="/contact" className="hidden sm:flex items-center gap-1.5 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-xl transition-all">
            <Phone size={14} /> Contact
          </Link>
          <Link href="/faq" className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-all shadow-sm">
            <Crown size={14} /> <span className="hidden sm:inline">Subscribe</span><span className="sm:hidden">Pro</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
