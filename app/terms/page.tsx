import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service - Awaisify Down",
  description: "Terms of Service for Awaisify Down - Free Video Downloader",
};

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-xs text-gray-400 mb-8">Last updated: June 2026</p>
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using Awaisify Down, you confirm that you are at least 18 years of age and agree to be bound by these Terms of Service. If you do not agree, please do not use our service.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Age Restriction</h2>
            <p>Awaisify Down is intended for users who are 18 years of age or older. By using this service, you represent and warrant that you meet this age requirement. If you are under 18, you are not permitted to use this service.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Use of Service</h2>
            <p>Awaisify Down provides a free tool to download publicly available videos for personal, non-commercial use only. You agree not to use this service for any commercial, illegal, or unauthorized purpose including but not limited to reselling downloaded content or violating copyright laws.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Subscription & Premium Features</h2>
            <p>Awaisify Down may offer premium subscription plans with additional features. Subscription fees are non-refundable unless required by applicable law. We reserve the right to modify subscription pricing and features at any time with prior notice.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Copyright & Intellectual Property</h2>
            <p>You must respect the intellectual property rights of content creators. Downloading videos for redistribution, resale, or commercial use is strictly prohibited. Awaisify Down is intended for personal, non-commercial use only. We are not responsible for any copyright infringement committed by users.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">6. Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Download and redistribute copyrighted content</li>
              <li>Use the service for commercial purposes</li>
              <li>Attempt to hack, scrape, or abuse the service</li>
              <li>Use automated bots or scripts to access the service</li>
              <li>Violate any applicable local, national, or international laws</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">7. Advertisements</h2>
            <p>Awaisify Down displays advertisements through Google AdSense to support the free service. By using our website, you acknowledge and accept the presence of these advertisements.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">8. Disclaimer of Warranties</h2>
            <p>Awaisify Down is provided on an as-is basis without warranties of any kind. We do not guarantee the availability, accuracy, or reliability of the service at all times. Download links may expire and are subject to third-party platform changes.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">9. Limitation of Liability</h2>
            <p>Awaisify Down shall not be liable for any damages arising from the use or inability to use the service, including but not limited to data loss, copyright infringement by users, or service interruptions.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">10. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">11. Contact</h2>
            <p>For any questions regarding these terms, contact us at: <a href="mailto:awaiss.dev@gmail.com" className="text-blue-600 hover:underline">awaiss.dev@gmail.com</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
