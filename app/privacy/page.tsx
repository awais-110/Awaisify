import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy - Awaisify Down",
  description: "Privacy Policy for Awaisify Down - Free Video Downloader",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-xs text-gray-400 mb-8">Last updated: June 2026</p>
        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">1. Introduction</h2>
            <p>Welcome to Awaisify Down. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at awaisify-down.vercel.app.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">2. Information We Collect</h2>
            <p>We do not collect any personal information from users. No registration or login is required to use our service. The only data processed is the video URL you submit, which is used solely to fetch download links and is never stored on our servers.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">3. Google Analytics</h2>
            <p>We use Google Analytics to collect anonymous usage data such as page views, session duration, and browser type. This data helps us improve the user experience. Google Analytics uses cookies to collect this information. You can opt out by using the Google Analytics Opt-out Browser Add-on.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">4. Google AdSense</h2>
            <p>We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google Ads Settings.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">5. Third Party Services</h2>
            <p>We use third-party APIs to process video download requests. These services operate under their own privacy policies. We do not share any personal data with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">6. Cookies</h2>
            <p>Our website uses cookies for analytics and advertising purposes through Google Analytics and Google AdSense. By using our website, you consent to the use of cookies in accordance with this policy.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">7. Data Security</h2>
            <p>We take reasonable precautions to protect your data. We do not store video URLs or any user data after the session ends. No method of transmission over the internet is 100% secure.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-2">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:awaiss.dev@gmail.com" className="text-blue-600 hover:underline">awaiss.dev@gmail.com</a></p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
