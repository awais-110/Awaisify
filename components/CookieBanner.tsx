"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
<div className="bg-gray-900 shadow-xl p-4 flex flex-col gap-3">        <p className="text-xs text-gray-300 leading-relaxed">
          🍪 We use cookies for analytics and ads to keep this service free.{" "}
          <a href="/privacy" className="text-blue-400 hover:underline">Learn more</a>
        </p>
        <div className="flex gap-2">
          <button
            onClick={decline}
            className="flex-1 text-xs text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
