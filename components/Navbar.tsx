import { Heart, Crown, Link2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <polygon points="6,4 20,12 6,20" />
            </svg>
          </div>
        <span className="font-black text-lg tracking-tight text-gray-900">Awaisify <span className="text-blue-600">Down</span></span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors">
            <Heart size={14} /> Donate
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
            <Crown size={14} /> Subscribe
          </button>
          <button className="flex items-center gap-1.5 border border-gray-200 hover:border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-xl transition-colors">
            <Link2 size={14} /> Link Support
          </button>
        </div>
      </div>
    </nav>
  );
}
