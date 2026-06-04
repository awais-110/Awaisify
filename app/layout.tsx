import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Awaisify Down - Fast Video Downloader",
  description: "Download videos from YouTube, TikTok, Instagram, Facebook, X and more. Powered by Awaisify Down.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
