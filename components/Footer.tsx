import { Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-10 pb-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              </div>
              <span className="font-black text-gray-900 tracking-tight">CLIPDOWN</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              The fastest and easiest way to download videos from your favorite platforms.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-3">Links</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              {["Home", "How It Works", "Supported Sites", "Blog"].map((l) => (
                <li key={l}><a href="#" className="hover:text-blue-600 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-gray-500">
              {["Terms of Service", "Privacy Policy", "DMCA", "Contact"].map((l) => (
                <li key={l}><a href="#" className="hover:text-blue-600 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-3">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: <Twitter size={15} />, label: "Twitter" },
                { icon: <span className="text-xs font-bold">D</span>, label: "Discord" },
                { icon: <span className="text-xs font-bold">T</span>, label: "Telegram" },
                { icon: <Mail size={15} />, label: "Email" },
              ].map((s) => (
                <button
                  key={s.label}
                  aria-label={s.label}
                  className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5 text-center text-xs text-gray-400">
          © 2024 CLIPDOWN. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
