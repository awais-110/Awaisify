import { Download, Users, ShieldCheck } from "lucide-react";

const stats = [
  { icon: <Download size={22} className="text-blue-600" />, bg: "bg-blue-50", value: "10M+", label: "Downloads" },
  { icon: <Users size={22} className="text-violet-600" />, bg: "bg-violet-50", value: "500K+", label: "Users Worldwide" },
  { icon: <ShieldCheck size={22} className="text-emerald-600" />, bg: "bg-emerald-50", value: "99.9%", label: "Uptime" },
];

export default function Stats() {
  return (
    <section className="px-4 mb-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                {s.icon}
              </div>
              <div className="text-3xl font-black text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}