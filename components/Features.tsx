import { Rocket, Lock, Globe, Star } from "lucide-react";

const features = [
  {
    icon: <Rocket size={22} className="text-white" />,
    bg: "bg-gradient-to-br from-blue-400 to-blue-600",
    title: "Ultra Fast Downloads",
    desc: "Lightning fast servers deliver your videos in seconds.",
  },
  {
    icon: <Star size={22} className="text-white" />,
    bg: "bg-gradient-to-br from-violet-400 to-violet-600",
    title: "HD & 4K Support",
    desc: "Download in HD, Full HD, 4K and even 8K quality.",
  },
  {
    icon: <Lock size={22} className="text-white" />,
    bg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    title: "Secure & Private",
    desc: "Your downloads are private and 100% secure.",
  },
  {
    icon: <Globe size={22} className="text-white" />,
    bg: "bg-gradient-to-br from-amber-400 to-orange-500",
    title: "Multi-Platform Support",
    desc: "Supports 100+ platforms and social media sites.",
  },
];

export default function Features() {
  return (
    <section className="bg-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-3 shadow-sm`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-sm text-gray-900">{f.title}</h3>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
