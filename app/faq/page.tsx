import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "FAQ - Awaisify Down | Frequently Asked Questions",
  description: "Frequently asked questions about Awaisify Down video downloader.",
};

const faqs = [
  {
    q: "Is Awaisify Down free to use?",
    a: "Yes! Awaisify Down is completely free to use. Simply paste your video link and download. No registration required.",
  },
  {
    q: "Is it safe to use Awaisify Down?",
    a: "Absolutely. Awaisify Down is a browser-based tool. We do not install anything on your device, do not collect personal data, and do not store any videos.",
  },
  {
    q: "Do you store downloaded videos?",
    a: "No. We do not store any videos on our servers. All download links are generated in real-time and point directly to the original platform servers.",
  },
  {
    q: "Which platforms are supported?",
    a: "Awaisify Down supports YouTube, TikTok, Instagram, Facebook, X (Twitter), and many more public video platforms.",
  },
  {
    q: "How does downloading work?",
    a: "Simply paste the video URL into the input box, click Fetch, choose your preferred quality, and click Download. The video will be saved directly to your device.",
  },
  {
    q: "Is it legal to download videos?",
    a: "Downloading videos for personal, non-commercial use is generally acceptable. However, you must not redistribute, resell, or claim ownership of downloaded content. Always respect content creators rights.",
  },
  {
    q: "Why is my video not downloading?",
    a: "Some videos may be private or region-restricted. Make sure the video is publicly accessible. YouTube long videos may have limitations based on the API plan.",
  },
  {
    q: "What video qualities are available?",
    a: "Available qualities depend on the original video. We support up to 4K quality for YouTube and HD for most other platforms.",
  },
  {
    q: "Can I download audio only?",
    a: "Yes! Switch to the Audio tab in the download panel to download MP3 audio from supported platforms.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is needed. Awaisify Down is completely free and requires no registration.",
  },
  {
    q: "Is there an age restriction?",
    a: "Yes. Awaisify Down is intended for users who are 18 years of age or older.",
  },
  {
    q: "How do I contact support?",
    a: "You can reach us at awaiss.dev@gmail.com or via Instagram @igmuhammadawais. We typically respond within 24-48 hours.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-sm mb-8">Everything you need to know about Awaisify Down.</p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5">
              <h2 className="font-bold text-sm text-gray-900 mb-2">Q: {faq.q}</h2>
              <p className="text-xs text-gray-600 leading-relaxed">A: {faq.a}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
