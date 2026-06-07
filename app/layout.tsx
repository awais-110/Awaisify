
import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Awaisify Down - Fast Video Downloader",
  description: "Download videos from YouTube, TikTok, Instagram, Facebook, X and more. Powered by Awaisify Down.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
