import type { Metadata } from "next";

export interface ToolStep {
  title: string;
  description: string;
}

export interface ToolFeature {
  title: string;
  description: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface RelatedToolLink {
  href: string;
  label: string;
  description: string;
}

export interface ToolPageContent {
  slug: string;
  badgeLabel: string;
  title: string;
  seoTitle: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  placeholder: string;
  helperText: string;
  trustBadges: string[];
  steps: ToolStep[];
  features: ToolFeature[];
  faqs: ToolFaq[];
  relatedTools: RelatedToolLink[];
  mode?: "default" | "audio-only";
  resultBadges?: string[];
  allowedHosts?: string[];
  invalidHostMessage?: string;
  affiliateBannerType?: "4kdownloader" | "nordvpn" | "canva";
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://awaisify.site";
const DEFAULT_OG_IMAGE = `${BASE_URL}/favicon.ico`;

const sharedRelatedTools: RelatedToolLink[] = [
  {
    href: "/youtube-downloader",
    label: "YouTube Downloader",
    description: "Save YouTube videos in HD quality with a simple paste-and-download flow.",
  },
  {
    href: "/tiktok-downloader",
    label: "TikTok Downloader",
    description: "Grab TikTok clips quickly for offline viewing on mobile or desktop.",
  },
  {
    href: "/instagram-downloader",
    label: "Instagram Downloader",
    description: "Download reels, stories, and feed videos from public Instagram links.",
  },
  {
    href: "/facebook-downloader",
    label: "Facebook Downloader",
    description: "Save public Facebook videos and reels without extra software.",
  },
  {
    href: "/twitter-downloader",
    label: "Twitter Video Downloader",
    description: "Download X and Twitter videos from public posts in a couple of taps.",
  },
  {
    href: "/mp3-converter",
    label: "MP3 Converter",
    description: "Turn supported videos into downloadable audio formats from one clean page.",
  },
  {
    href: "/tiktok-watermark-remover",
    label: "TikTok Watermark Remover",
    description: "Fetch TikTok videos without the watermark and keep your exports clean.",
  },
];

export const platformPages: Record<string, ToolPageContent> = {
  youtube: {
    slug: "youtube-downloader",
    badgeLabel: "YouTube tool",
    title: "YouTube Video Downloader",
    seoTitle: "YouTube Video Downloader — Free HD & 4K | Awaisify Down",
    description:
      "Download YouTube videos in HD, 4K, and ready-to-save formats with a fast browser workflow that works on phone and desktop.",
    metaDescription: "Download YouTube videos in HD, 4K, MP3 for free. Fast, secure, no signup required.",
    keywords: [
      "youtube downloader",
      "download youtube videos",
      "youtube to mp4",
      "youtube 4k downloader",
    ],
    placeholder: "Paste YouTube video URL here...",
    helperText: "Paste any public YouTube link",
    trustBadges: ["HD & 4K Ready", "Fast browser downloads", "No signup", "Works on mobile"],
    steps: [
      {
        title: "Copy the video link",
        description: "Open YouTube, choose the video you want, and copy its share URL from the address bar or app.",
      },
      {
        title: "Paste and fetch",
        description: "Paste the link into the downloader above and let Awaisify Down load the available formats.",
      },
      {
        title: "Pick a format",
        description: "Choose the quality that fits your device and click download to save it directly.",
      },
    ],
    features: [
      {
        title: "HD and higher quality support",
        description: "Choose from the best formats available for the original upload, including higher-resolution options when supported.",
      },
      {
        title: "Clean browser workflow",
        description: "No extension, no extra app, and no account wall between you and the file you need.",
      },
      {
        title: "Device-friendly output",
        description: "Saved files work well across laptops, Android phones, iPhones, and tablets.",
      },
      {
        title: "Fast repeat use",
        description: "The page is built for people who download tutorials, lectures, podcasts, and reference clips often.",
      },
    ],
    faqs: [
      {
        question: "Can I download YouTube videos in HD or 4K?",
        answer: "Yes. The page lists whatever qualities the source video exposes, including HD and higher resolutions when available.",
      },
      {
        question: "Does this tool work on mobile?",
        answer: "Yes. You can paste a YouTube link from mobile Safari, Chrome, or the YouTube app share menu and download from there.",
      },
      {
        question: "Can I save music videos or lectures for offline use?",
        answer: "Public videos such as lectures, talks, podcasts, and music videos can be fetched as long as the source is accessible.",
      },
      {
        question: "Why do some YouTube videos show different quality options?",
        answer: "Quality depends on the original upload, the codecs available from the source, and how the platform exposes each stream.",
      },
      {
        question: "Is there any signup or desktop app required?",
        answer: "No. The downloader works directly in your browser, so you can paste a link and save the result without creating an account.",
      },
    ],
    relatedTools: sharedRelatedTools.filter((tool) => tool.href !== "/youtube-downloader").slice(0, 4),
  },
  tiktok: {
    slug: "tiktok-downloader",
    badgeLabel: "TikTok tool",
    title: "TikTok Video Downloader",
    seoTitle: "TikTok Video Downloader — Free HD Save Tool | Awaisify Down",
    description:
      "Download TikTok videos fast with a mobile-first page built for public links, quick saving, and clean sharing workflows.",
    metaDescription: "Download TikTok videos online for free in HD quality. Fast, secure, and mobile friendly.",
    keywords: [
      "tiktok downloader",
      "download tiktok videos",
      "tiktok video saver",
      "tiktok mp4 downloader",
    ],
    placeholder: "Paste TikTok video URL here...",
    helperText: "Paste any public TikTok link",
    trustBadges: ["Public TikTok links", "Fast mobile flow", "No signup", "Clean MP4 export"],
    steps: [
      {
        title: "Copy the TikTok link",
        description: "Tap Share on the TikTok post you want, then choose Copy link from the app menu.",
      },
      {
        title: "Fetch the media",
        description: "Paste the TikTok URL into the input above and let the downloader detect the available file options.",
      },
      {
        title: "Download to your device",
        description: "Choose the format you want and save it right away for repost planning, reference, or offline access.",
      },
    ],
    features: [
      {
        title: "Built for short-form video",
        description: "The layout is optimized for TikTok-style workflows where speed matters and most users arrive from mobile.",
      },
      {
        title: "Quick copy-paste experience",
        description: "TikTok links are handled with the same simple fetch flow as the homepage, so repeat use stays easy.",
      },
      {
        title: "Great for creators and research",
        description: "Save references, edit ideas, trend examples, and campaign inspiration without hunting through bookmarks later.",
      },
      {
        title: "Private browser workflow",
        description: "No account creation is needed, which keeps the process lightweight when you only need a quick download.",
      },
    ],
    faqs: [
      {
        question: "Does this TikTok downloader work on phone browsers?",
        answer: "Yes. It is designed for mobile-first use, so you can paste a TikTok URL from the app and download from your browser.",
      },
      {
        question: "Can I use this for public TikTok videos only?",
        answer: "Yes. The tool is intended for publicly accessible TikTok posts and cannot unlock private or restricted content.",
      },
      {
        question: "Will I need a TikTok account to use this page?",
        answer: "No. If you already have the public URL, the downloader works without logging in.",
      },
      {
        question: "Why might a TikTok link fail to load?",
        answer: "The most common reasons are a private post, a removed video, a malformed link, or a temporary upstream fetch issue.",
      },
      {
        question: "Can I use the downloaded files for offline inspiration boards?",
        answer: "Yes, many people use the page to save references for creative planning, provided they respect platform rules and creator rights.",
      },
    ],
    relatedTools: sharedRelatedTools.filter((tool) => tool.href !== "/tiktok-downloader").slice(0, 4),
  },
  instagram: {
    slug: "instagram-downloader",
    badgeLabel: "Instagram tool",
    title: "Instagram Video Downloader",
    seoTitle: "Instagram Video Downloader — Reels & Videos Free | Awaisify Down",
    description:
      "Download Instagram reels, videos, and shareable public media quickly with a clean page that works across desktop and mobile.",
    metaDescription: "Download Instagram reels and videos online for free. Quick browser tool, no signup required.",
    keywords: [
      "instagram downloader",
      "download instagram reels",
      "instagram reels downloader",
      "instagram video saver",
    ],
    placeholder: "Paste Instagram Reel or video URL here...",
    helperText: "Paste any public Instagram link",
    trustBadges: ["Reels ready", "Fast browser fetch", "No account needed", "Mobile friendly"],
    steps: [
      {
        title: "Copy the Instagram URL",
        description: "Use the share menu on a public reel or post and copy the URL to your clipboard.",
      },
      {
        title: "Paste the link",
        description: "Drop the Instagram URL into the input and fetch the downloadable versions available for that post.",
      },
      {
        title: "Save the file",
        description: "Choose the media option you want and download it straight to your phone or computer.",
      },
    ],
    features: [
      {
        title: "Great for reels and feed videos",
        description: "Save short-form content for planning, personal reference, or offline access with a quick repeatable workflow.",
      },
      {
        title: "No cluttered steps",
        description: "The page keeps the flow focused: paste, fetch, choose a result, and save your file.",
      },
      {
        title: "Useful for social teams",
        description: "Marketers, editors, and social managers can quickly pull public assets for internal review and inspiration.",
      },
      {
        title: "Responsive everywhere",
        description: "Whether you paste from Instagram mobile or from a desktop browser, the experience stays simple and readable.",
      },
    ],
    faqs: [
      {
        question: "Can I download Instagram reels in HD?",
        answer: "You can download the best public media quality made available through the source response for the reel or video.",
      },
      {
        question: "Does this work for private Instagram accounts?",
        answer: "No. The downloader is meant for public Instagram URLs and cannot fetch private or permission-protected media.",
      },
      {
        question: "Can I save carousel posts too?",
        answer: "If the response exposes multiple media items, you will see multiple options in the results list and can save each one.",
      },
      {
        question: "What if an Instagram link loads but shows no formats?",
        answer: "That usually means the post has limited availability, the upstream source changed, or the media is not publicly exposed.",
      },
      {
        question: "Is this Instagram downloader free to use?",
        answer: "Yes. The page is built as a free browser tool with no signup requirement for normal use.",
      },
    ],
    relatedTools: sharedRelatedTools.filter((tool) => tool.href !== "/instagram-downloader").slice(0, 4),
  },
  facebook: {
    slug: "facebook-downloader",
    badgeLabel: "Facebook tool",
    title: "Facebook Video Downloader",
    seoTitle: "Facebook Video Downloader — Save Reels & Clips Free | Awaisify Down",
    description:
      "Save public Facebook videos and reels from desktop or mobile with a direct download flow and easy-to-read format options.",
    metaDescription: "Download public Facebook videos and reels in a few clicks. Free, secure, and easy to use.",
    keywords: [
      "facebook video downloader",
      "download facebook videos",
      "facebook reel downloader",
      "facebook mp4 download",
    ],
    placeholder: "Paste Facebook video URL here...",
    helperText: "Paste any public Facebook or fb.watch link",
    trustBadges: ["Public posts only", "Desktop and mobile", "No signup", "Simple save flow"],
    steps: [
      {
        title: "Find the post link",
        description: "Open the Facebook video or reel you want, then use Share or Copy link to grab the public URL.",
      },
      {
        title: "Fetch available formats",
        description: "Paste the Facebook link into the downloader above to load the downloadable media options.",
      },
      {
        title: "Choose and download",
        description: "Pick the format that fits your use case and save the file directly to your device.",
      },
    ],
    features: [
      {
        title: "Supports public Facebook posts",
        description: "The page is tuned for public videos and reels that are accessible without private account permissions.",
      },
      {
        title: "Useful for archives and references",
        description: "Save internal examples, community clips, training references, or event coverage when you need offline access.",
      },
      {
        title: "No bulky workflow",
        description: "Everything happens in the browser, which keeps the process lighter than switching between tools or installing software.",
      },
      {
        title: "Clear result table",
        description: "Format, quality, and size stay easy to compare before you click download.",
      },
    ],
    faqs: [
      {
        question: "Can I download Facebook reels with this page?",
        answer: "Yes, public Facebook reel links are supported in the same way as standard public video posts.",
      },
      {
        question: "Why do private Facebook videos fail?",
        answer: "Private content is not accessible through the public fetch flow, so only public URLs are expected to work.",
      },
      {
        question: "Does fb.watch work too?",
        answer: "Yes. Public `fb.watch` links are accepted along with standard Facebook video URLs.",
      },
      {
        question: "Can I use this on iPhone and Android?",
        answer: "Yes. The downloader is browser-based, so it works well on modern mobile browsers as well as desktop.",
      },
      {
        question: "Do I need to install an app to save Facebook videos?",
        answer: "No. Paste the public post link, fetch the results, and download straight from the browser.",
      },
    ],
    relatedTools: sharedRelatedTools.filter((tool) => tool.href !== "/facebook-downloader").slice(0, 4),
  },
  twitter: {
    slug: "twitter-downloader",
    badgeLabel: "X and Twitter tool",
    title: "Twitter Video Downloader",
    seoTitle: "Twitter Video Downloader — Save X Videos Free | Awaisify Down",
    description:
      "Download X and Twitter videos from public posts in a clean browser flow built for quick saves and repeat use.",
    metaDescription: "Download X and Twitter videos from public posts for free. Fast browser-based saver with no signup.",
    keywords: [
      "twitter video downloader",
      "x video downloader",
      "download twitter videos",
      "download x videos",
    ],
    placeholder: "Paste X or Twitter post URL here...",
    helperText: "Paste any public X or Twitter link",
    trustBadges: ["X and Twitter links", "Fast fetch", "No signup", "Browser based"],
    steps: [
      {
        title: "Copy the post URL",
        description: "Open the public X or Twitter post, use Share, and copy the link to the tweet containing the video.",
      },
      {
        title: "Fetch the media options",
        description: "Paste the URL into the downloader to pull the downloadable versions tied to that post.",
      },
      {
        title: "Download your format",
        description: "Choose the option you want and save the video directly to your device for offline viewing or review.",
      },
    ],
    features: [
      {
        title: "Optimized for social monitoring",
        description: "Save public examples, campaign references, and reaction clips quickly when you are working in fast-moving feeds.",
      },
      {
        title: "Works across old and new branding",
        description: "Both `twitter.com` and `x.com` public links are supported, so the flow remains reliable regardless of source format.",
      },
      {
        title: "Clean download table",
        description: "You can compare available qualities and file details before saving, which helps when bandwidth matters.",
      },
      {
        title: "Easy repeat workflow",
        description: "The page is lightweight enough for people who need to fetch multiple public post videos in one session.",
      },
    ],
    faqs: [
      {
        question: "Does this work for X and older Twitter links?",
        answer: "Yes. Public post URLs from both domains are accepted as long as the media is accessible.",
      },
      {
        question: "Can I save videos from quote posts too?",
        answer: "If the video is part of the public post you paste, the fetch flow can usually surface the available media options.",
      },
      {
        question: "Why do some X links open but fail to fetch?",
        answer: "The post may be deleted, restricted by region, behind account visibility rules, or temporarily unavailable upstream.",
      },
      {
        question: "Does the downloader require an X account?",
        answer: "No. A public post URL is enough for the browser workflow.",
      },
      {
        question: "Can I use this on desktop for research and reporting?",
        answer: "Yes. Teams often use it to keep reference clips handy for documentation, feedback, or trend tracking.",
      },
    ],
    relatedTools: sharedRelatedTools.filter((tool) => tool.href !== "/twitter-downloader").slice(0, 4),
  },
};

export const mp3ConverterPage: ToolPageContent = {
  slug: "mp3-converter",
  badgeLabel: "Audio tool",
  title: "YouTube to MP3 Converter",
  seoTitle: "YouTube to MP3 Converter — Free 320kbps | Awaisify Down",
  description:
    "Convert supported video links into downloadable audio results with a simple browser flow and quick access to audio-only formats.",
  metaDescription: "Convert YouTube videos to MP3 online for free. Quick audio downloads with a clean browser workflow.",
  keywords: [
    "youtube to mp3 converter",
    "free mp3 converter",
    "youtube mp3 downloader",
    "320kbps mp3 converter",
  ],
  placeholder: "Paste video URL to extract audio...",
  helperText: "Fetch a supported video link for audio formats",
  trustBadges: ["Audio only view", "Mobile friendly", "No signup", "Fast browser workflow"],
  steps: [
    {
      title: "Paste the source link",
      description: "Drop in the supported video URL you want to turn into an audio download.",
    },
    {
      title: "Load available audio results",
      description: "The converter fetches the link and filters the output to audio-focused download options only.",
    },
    {
      title: "Choose your file",
      description: "Select the audio result that fits your use case and save it directly to your device.",
    },
  ],
  features: [
    {
      title: "Audio-focused result view",
      description: "The page is tuned to show only audio results so you do not have to sort through video tabs.",
    },
    {
      title: "Great for lectures and podcasts",
      description: "Use it when you only need the sound from a long-form video for commuting, studying, or quick reference.",
    },
    {
      title: "Works in the browser",
      description: "No separate software is required to get from a supported URL to an audio download.",
    },
    {
      title: "Clean repeat workflow",
      description: "The interface is straightforward enough for batch-like use when you are collecting multiple tracks or talk recordings.",
    },
  ],
  faqs: [
    {
      question: "Does this page show only audio formats?",
      answer: "Yes. The converter filters the fetched results to audio-only outputs so the page stays focused on MP3-style use cases.",
    },
    {
      question: "What quality should I choose for MP3 downloads?",
      answer: "Higher bitrates such as 192kbps and 320kbps are useful for music and spoken audio clarity, while 128kbps keeps files smaller.",
    },
    {
      question: "Can I use this for study sessions and podcasts?",
      answer: "Yes. Many people convert long-form content into audio for commuting, note review, and offline listening.",
    },
    {
      question: "Why might a video link have no audio result?",
      answer: "That depends on how the upstream source exposes its downloadable streams and whether an audio-only option is available.",
    },
    {
      question: "Do I need a desktop app for MP3 conversion?",
      answer: "No, but if you prefer desktop software there is also a 4K Downloader option linked on the page.",
    },
  ],
  relatedTools: sharedRelatedTools.filter((tool) => tool.href !== "/mp3-converter").slice(0, 4),
  mode: "audio-only",
  resultBadges: ["128kbps", "192kbps", "320kbps"],
  affiliateBannerType: "4kdownloader",
};

export const tiktokWatermarkPage: ToolPageContent = {
  slug: "tiktok-watermark-remover",
  badgeLabel: "TikTok no watermark",
  title: "TikTok Watermark Remover",
  seoTitle: "TikTok Watermark Remover — Download Without Watermark Free",
  description:
    "Paste a public TikTok link and fetch a cleaner, no-watermark download workflow built specifically for TikTok video saving.",
  metaDescription: "Remove TikTok watermark and download clean public TikTok videos for free with a fast browser tool.",
  keywords: [
    "tiktok watermark remover",
    "download tiktok without watermark",
    "tiktok no watermark downloader",
    "tiktok remover free",
  ],
  placeholder: "Paste TikTok URL for no-watermark download...",
  helperText: "TikTok links only",
  invalidHostMessage: "Please enter a valid TikTok URL.",
  allowedHosts: ["tiktok.com"],
  trustBadges: ["100% Free", "No Watermark", "HD Quality", "No Signup"],
  steps: [
    {
      title: "Copy the TikTok link",
      description: "Use the Share menu on the public TikTok post and copy the video URL.",
    },
    {
      title: "Paste into the remover",
      description: "Drop the TikTok link into the page and let the tool fetch the supported outputs.",
    },
    {
      title: "Download the clean version",
      description: "Choose the result you want and save the no-watermark version directly to your device.",
    },
  ],
  features: [
    {
      title: "TikTok-only validation",
      description: "The page is intentionally strict so users do not waste time pasting links from unsupported platforms here.",
    },
    {
      title: "Clear no-watermark framing",
      description: "The results area is labeled to match the task people came for: cleaner TikTok exports without the extra overlay.",
    },
    {
      title: "Fast mobile workflow",
      description: "The flow is tuned for short sessions on phones where TikTok users usually copy and paste links.",
    },
    {
      title: "Good for planning and edits",
      description: "Use it to keep creator references, campaign ideas, or remix inspiration easier to review offline.",
    },
  ],
  faqs: [
    {
      question: "Does this page only accept TikTok links?",
      answer: "Yes. It is purpose-built for TikTok, so non-TikTok URLs are blocked before the fetch starts.",
    },
    {
      question: "Will the result show a no-watermark badge?",
      answer: "Yes. The result area highlights the no-watermark workflow so the page intent stays obvious.",
    },
    {
      question: "Can I use this on mobile?",
      answer: "Yes. The page is mobile-first and works well when you copy a TikTok link straight from the app.",
    },
    {
      question: "Why does a TikTok link sometimes fail here?",
      answer: "That usually comes down to a private post, a removed clip, a broken URL, or a temporary upstream issue.",
    },
    {
      question: "Is this TikTok watermark remover free?",
      answer: "Yes. It is designed as a free browser tool with no signup required for normal use.",
    },
  ],
  relatedTools: sharedRelatedTools.filter((tool) => tool.href !== "/tiktok-watermark-remover").slice(0, 4),
  resultBadges: ["No Watermark"],
  affiliateBannerType: "nordvpn",
};

export function buildMetadata(page: ToolPageContent): Metadata {
  return {
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: `${BASE_URL}/${page.slug}`,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: `${BASE_URL}/${page.slug}`,
      siteName: "Awaisify Down",
      images: [DEFAULT_OG_IMAGE],
      type: "website",
    },
  };
}

export function buildToolSchema(page: ToolPageContent) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: `${BASE_URL}/${page.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
        "@type": "HowTo",
        name: `${page.title} steps`,
        step: page.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.description,
        })),
      },
    ],
  };
}

export const latestToolLinks = sharedRelatedTools;
