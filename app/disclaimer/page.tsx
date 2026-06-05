import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DMCA Policy - Awaisify Down",
  description: "DMCA Policy for Awaisify Down - Free Video Downloader",
};

export default function DMCA() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-2">DMCA Policy</h1>
        <p className="text-xs text-gray-400 mb-8">Last updated: June 2026</p>
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Our Stance on Copyright</h2>
            <p>Awaisify Down respects the intellectual property rights of others. We do not host, store, or distribute any video content. We only provide links to publicly available content on third-party platforms such as YouTube, TikTok, Instagram, and Facebook.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. No Storage Policy</h2>
            <p>Awaisify Down does not store any videos on its servers. All download links are generated in real-time and point directly to the original platform servers. We act solely as an intermediary tool.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. DMCA Takedown Request</h2>
            <p>If you believe your copyrighted content is being accessed through our service in a way that violates your rights, please send a DMCA takedown notice to our email. Your notice must include:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Your full legal name and contact information</li>
              <li>A description of the copyrighted work you claim has been infringed</li>
              <li>The specific URL or content in question</li>
              <li>A statement that you have a good faith belief that the use is not authorized</li>
              <li>A statement that the information in the notice is accurate</li>
              <li>Your electronic or physical signature</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Response Time</h2>
            <p>We will review all DMCA notices within 3-5 business days and take appropriate action as required by law.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Contact for DMCA</h2>
            <p>Send all DMCA notices to: <a href="mailto:awaiss.dev@gmail.com" className="text-blue-600 hover:underline">awaiss.dev@gmail.com</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
