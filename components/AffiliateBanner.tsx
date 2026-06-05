import Link from "next/link";
import { Download, Shield, Sparkles } from "lucide-react";

type AffiliateBannerType = "4kdownloader" | "nordvpn" | "canva";

interface AffiliateConfig {
  href: string;
  text: string;
  className: string;
  icon: JSX.Element;
}

const affiliateConfig: Record<AffiliateBannerType, AffiliateConfig> = {
  "4kdownloader": {
    href: "https://www.4kdownload.com/affiliate/8",
    text: "Want offline downloads? Try 4K Video Downloader — Free & Fast",
    className: "bg-gradient-to-r from-blue-600 to-sky-500 text-white",
    icon: <Download size={20} />,
  },
  "nordvpn": {
    href: "https://nordvpn.com/affiliates",
    text: "Stay private while downloading — Get NordVPN 67% OFF",
    className: "bg-gradient-to-r from-slate-900 to-blue-900 text-white",
    icon: <Shield size={20} />,
  },
  "canva": {
    href: "https://www.canva.com/affiliates",
    text: "Edit your downloaded videos with Canva — Free to Start",
    className: "bg-gradient-to-r from-fuchsia-600 to-violet-500 text-white",
    icon: <Sparkles size={20} />,
  },
};

export default function AffiliateBanner({ type }: { type: AffiliateBannerType }) {
  const banner = affiliateConfig[type];

  return (
    <Link
      href={banner.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-4 shadow-sm transition-transform hover:-translate-y-0.5 ${banner.className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          {banner.icon}
        </div>
        <p className="text-sm font-semibold leading-relaxed">{banner.text}</p>
      </div>
      <span className="shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
        Try now
      </span>
    </Link>
  );
}
