import { Download, Users, ShieldCheck } from "lucide-react";

const stats = [
  { icon: <Download size={22} className="text-blue-600" />, value: "10M+", label: "Downloads" },
  { icon: <Users size={22} className="text-blue-600" />, value: "500K+", label: "Users Worldwide" },
  { icon: <ShieldCheck size={22} className="text-blue-600" />, value: "99.9%", label: "Uptime & Reliability" },
];

export default function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-4 pb-12">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center justify-center gap-3 px-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <div>
                <div className="text-2xl font-black text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
