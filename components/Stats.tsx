import { Download, Users, ShieldCheck } from "lucide-react";

const stats = [
  { icon: <Download size={20} className="text-blue-600" />, value: "10M+", label: "Downloads" },
  { icon: <Users size={20} className="text-blue-600" />, value: "500K+", label: "Users" },
  { icon: <ShieldCheck size={20} className="text-blue-600" />, value: "99.9%", label: "Uptime" },
];

export default function Stats() {
  return (
    <section className="max-w-3xl mx-auto px-4 pb-12">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
        <div className="grid grid-cols-3 divide-x divide-gray-100">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-1.5 px-2 py-2">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                {s.icon}
              </div>
              <div className="text-center">
                <div className="text-lg font-black text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
