import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Donate - Awaisify Down",
  description: "Support Awaisify Down by donating via JazzCash.",
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
          <p className="text-gray-500 text-sm">
            Awaisify Down is completely free. If you find it useful, consider
            supporting the developer!
          </p>
        </div>

        <div className="bg-white border-2 border-red-100 rounded-2xl p-6 mb-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">J</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">JazzCash</p>
              <p className="text-xs text-gray-500">
                Send any amount you like
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">JazzCash Number</p>
              <p className="text-xl font-black text-gray-900 tracking-widest">
                0307-9838110
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Account Name: Muhammad Awais
              </p>
            </div>
          </div>

          <div className="mt-4 bg-red-50 rounded-xl p-3">
            <p className="text-xs text-red-600 font-medium text-center">
              💝 Every donation keeps Awaisify Down free for everyone!
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
          <h2 className="font-bold text-gray-900 mb-3 text-sm">
            How to Send via JazzCash
          </h2>

          <ol className="space-y-2 text-xs text-gray-600">
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">
                1
              </span>
              Open your JazzCash app or dial *786#
            </li>

            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">
                2
              </span>
              Select &quot;Send Money&quot;
            </li>

            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">
                3
              </span>
              Enter number: 03079838110
            </li>

            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">
                4
              </span>
              Enter any amount you wish to donate
            </li>

            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">
                5
              </span>
              Confirm and send — JazakAllah!
            </li>
          </ol>
        </div>

        <div className="bg-blue-50 rounded-2xl p-5 text-center">
          <p className="text-sm font-bold text-gray-900 mb-1">
            Your support means a lot! 🙏
          </p>

          <p className="text-xs text-gray-500">
            After donating, feel free to message on Instagram{" "}
            <a
              href="https://instagram.com/igmuhammadawais"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:underline"
            >
              @igmuhammadawais
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
