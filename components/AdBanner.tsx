"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

type Props = {
  slot: string;
};

export default function AdBanner({ slot }: Props) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {}
  }, []);

  const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || "";

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={ADSENSE_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}