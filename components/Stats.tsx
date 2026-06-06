import { Download, Users, ShieldCheck } from "lucide-react";

const stats = [
  { icon: <Download size={20} className="text-white" />, value: "10M+", label: "Downloads" },
  { icon: <Users size={20} className="text-white" />, value: "500K+", label: "Users" },
  { icon: <ShieldCheck size={20} className="text-white" />, value: "99.9%", label: "Uptime" },
];

export default function Stats() {
  return (
    <section className="mx-4 mb-12">
      <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-violet-700 p-8 shadow-2xl shadow-blue-200">
        <div className="grid grid-cols-3 divide-x divide-white/20">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-3 px-2 py-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                {s.icon}
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-white">{s.value}</div>
                <div className="text-sm text-blue-100">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
