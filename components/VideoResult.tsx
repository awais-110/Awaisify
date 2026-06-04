"use client";

import { useState } from "react";
import { Download, Play, Video, Music, FileText, ExternalLink } from "lucide-react";

type Tab = "video" | "audio" | "other";

export default function VideoResult({ video }: { video: any }) {
  const [tab, setTab] = useState<Tab>("video");
  const medias: any[] = video.medias || [];
  const videoFormats = medias.filter((m: any) => m.extension === "mp4" || m.videoAvailable);
  const audioFormats = medias.filter((m: any) => m.extension === "mp3" || (m.audioAvailable && !m.videoAvailable));
  const otherFormats = medias.filter((m: any) => !videoFormats.includes(m) && !audioFormats.includes(m));
  const rows = tab === "video" ? videoFormats : tab === "audio" ? audioFormats : otherFormats;
  const thumbnail = video.thumbnail || video.picture || "";
  const title = video.title || "Untitled Video";
  const source = video.source || "";
  const [playing, setPlaying] = useState(false);
  const previewUrl = videoFormats[0]?.url || "";

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[340px_1fr]">
          <div className="p-5 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-4">
              {thumbnail && <img src={thumbnail} alt={title} className="w-full h-full object-cover opacity-90" />}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                  <Play size={20} className="text-gray-900 ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>
            <h2 className="font-bold text-sm text-gray-900 leading-snug mb-2">{title}</h2>
            {source && (
              <a href={source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-500 hover:underline mb-2">
                <ExternalLink size={12} /> View original
              </a>
            )}
            <p className="text-xs text-gray-500">{medias.length} format{medias.length !== 1 ? "s" : ""} available</p>
          </div>
          <div className="p-5">
            <div className="flex gap-1 border-b border-gray-100 mb-4">
              {[
                { key: "video" as Tab, label: "Video", icon: <Video size={14} /> },
                { key: "audio" as Tab, label: "Audio", icon: <Music size={14} /> },
                { key: "other" as Tab, label: "Other", icon: <FileText size={14} /> },
              ].map((t) => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${tab === t.key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            {rows.length === 0 ? (
              <p className="text-sm text-gray-400 py-4 text-center">No {tab} formats available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs text-gray-400 font-semibold">
                      <th className="text-left pb-3 pr-3">Quality</th>
                      <th className="text-left pb-3 pr-3">Format</th>
                      <th className="text-left pb-3 pr-3">Size</th>
                      <th className="text-left pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {rows.map((row: any, i: number) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="py-2.5 pr-3 font-medium text-gray-800 whitespace-nowrap">
                          {row.quality || row.qualityText || row.extension?.toUpperCase() || "-"}
                        </td>
                        <td className="py-2.5 pr-3 text-gray-500">{row.extension?.toUpperCase() || "-"}</td>
                        <td className="py-2.5 pr-3 text-gray-500">{row.formattedSize || row.size || "-"}</td>
                        <td className="py-2.5">
                        <a href={`/api/download?url=${encodeURIComponent(row.url)}&filename=video.${row.extension || "mp4"}`} download
                            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors w-fit">
                            <Download size={12} /> Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
