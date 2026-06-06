import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Coffee, Zap, Shield } from "lucide-react";

export const metadata = {
  title: "Donate - Awaisify Down",
  description: "Support Awaisify Down to keep it free for everyone.",
};

export default function Donate() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-red-500" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Support Awaisify Down
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Awaisify Down is completely free. Your support helps keep the servers running and the tool improving!
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: <Zap size={18} className="text-yellow-500" />, text: "Fast Servers" },
            { icon: <Shield size={18} className="text-blue-500" />, text: "No Ads" },
            { icon: <Coffee size={18} className="text-amber-600" />, text: "Dev Coffee" },
          ].map((item) => (
            <div key={item.text} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
              <div className="flex justify-center mb-1">{item.icon}</div>
              <p className="text-xs font-semibold text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-2xl p-8 text-center">
          <p className="text-lg font-black text-gray-900 mb-2">Coming Soon!</p>
          <p className="text-sm text-gray-500">
            Donation options will be available soon. Thank you for your support!
          </p>
        </div>

      </main>
      <Footer />
    </div>
  );
}