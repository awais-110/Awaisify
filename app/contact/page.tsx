import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Instagram } from "lucide-react";

export const metadata = {
  title: "Contact - Awaisify Down",
  description: "Contact Awaisify Down team for support and inquiries.",
};

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 text-sm mb-8">Have a question or need help? We are here for you.</p>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Email Us</p>
                <a href="mailto:awaiss.dev@gmail.com" className="text-sm text-blue-600 hover:underline">awaiss.dev@gmail.com</a>
              </div>
            </div>
            <p className="text-xs text-gray-500">We typically respond within 24-48 hours. For DMCA requests, please include all required information.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                <Instagram size={20} className="text-pink-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Instagram</p>
                <a href="https://instagram.com/igmuhammadawais" target="_blank" rel="noopener noreferrer" className="text-sm text-pink-600 hover:underline">@igmuhammadawais</a>
              </div>
            </div>
            <p className="text-xs text-gray-500">Follow us on Instagram for updates and announcements.</p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-5">
            <h2 className="font-bold text-gray-900 mb-2 text-sm">Common Topics</h2>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li>• General support and questions</li>
              <li>• Bug reports and technical issues</li>
              <li>• DMCA and copyright concerns</li>
              <li>• Business and partnership inquiries</li>
              <li>• Subscription and billing questions</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
