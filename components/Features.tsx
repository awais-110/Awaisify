import { Rocket, Lock, Globe, Star } from "lucide-react";

const features = [
  {
    icon: <Rocket size={22} className="text-blue-500" />,
    bg: "bg-blue-50",
    title: "Ultra Fast Downloads",
    desc: "Lightning fast servers deliver your videos in seconds.",
  },
  {
    icon: <Star size={22} className="text-emerald-500" />,
    bg: "bg-emerald-50",
    title: "HD & 4K Support",
    desc: "Download in HD, Full HD, 4K and even 8K quality.",
  },
  {
    icon: <Lock size={22} className="text-violet-500" />,
    bg: "bg-violet-50",
    title: "Secure & Private",
    desc: "Your downloads are private and 100% secure.",
  },
  {
    icon: <Globe size={22} className="text-amber-500" />,
    bg: "bg-amber-50",
    title: "Multi-Platform Support",
    desc: "Supports 100+ platforms and social media sites.",
  },
];

export default function Features() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${f.bg} rounded-xl flex items-center justify-center mb-3`}>
              {f.icon}
            </div>
            <h3 className="font-bold text-sm text-gray-900 mb-1">{f.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
