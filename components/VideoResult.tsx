"use client";

import { useState } from "react";
import { Download, Play, Video, Music, FileText, ExternalLink } from "lucide-react";

type Tab = "video" | "audio" | "other";

export default function VideoResult({ video }: { video: any }) {
  const [tab, setTab] = useState<Tab>("video");
  const [playing, setPlaying] = useState(false);
  const medias: any[] = video.medias || [];
  const videoFormats = medias.filter((m: any) => m.extension === "mp4" || m.videoAvailable);
  const audioFormats = medias.filter((m: any) => m.extension === "mp3" || (m.audioAvailable && !m.videoAvailable));
  const otherFormats = medias.filter((m: any) => !videoFormats.includes(m) && !audioFormats.includes(m));
  const rows = tab === "video" ? videoFormats : tab === "audio" ? audioFormats : otherFormats;
  const thumbnail = video.thumbnail || video.picture || video.thumb || video.image || "";
  const isValidThumb = thumbnail && !thumbnail.startsWith("🎬") && thumbnail.startsWith("http");
  const title = video.title || "Untitled Video";
  const source = video.source || "";
  const previewUrl = videoFormats[0]?.url || "";
  const rawDesc = video.description || title;
  const description = rawDesc.length > 80 ? rawDesc.slice(0, 80) + "..." : rawDesc;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="relative bg-black aspect-video">
          {playing && previewUrl ? (
            <video src={previewUrl} autoPlay controls className="w-full h-full object-cover" />
          ) : (
            <>
              {isValidThumb ? (
                <img src={thumbnail} alt={title} className="w-full h-full object-cover opacity-90" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <span className="text-4xl">🎬</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setPlaying(true)}>
                <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Play size={24} className="text-gray-900 ml-1" fill="currentColor" />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-4 pt-3 pb-2 border-b border-gray-100">
          <h2 className="font-bold text-sm text-gray-900 leading-snug mb-1 line-clamp-2">{title}</h2>
          <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400">{medias.length} format{medias.length !== 1 ? "s" : ""} available</span>
            {source && (
              <a href={source} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-500 hover:underline">
                <ExternalLink size={11} /> View original
              </a>
            )}
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-1 border-b border-gray-100 mb-3">
            {[
              { key: "video" as Tab, label: "Video", icon: <Video size={13} /> },
              { key: "audio" as Tab, label: "Audio", icon: <Music size={13} /> },
              { key: "other" as Tab, label: "Other", icon: <FileText size={13} /> },
            ].map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`flex items-center gap-1 px-3 py-2 text-xs font-semibold border-b-2 -mb-px transition-colors ${tab === t.key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {rows.length === 0 ? (
            <p className="text-xs text-gray-400 py-4 text-center">No {tab} formats available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 font-semibold">
                    <th className="text-left pb-2 pr-2">Quality</th>
                    <th className="text-left pb-2 pr-2">Format</th>
                    <th className="text-left pb-2 pr-2">Size</th>
                    <th className="text-left pb-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="py-2 pr-2 font-medium text-gray-800 whitespace-nowrap">
                        {row.quality || row.qualityText || row.extension?.toUpperCase() || "-"}
                      </td>
                      <td className="py-2 pr-2 text-gray-500">{row.extension?.toUpperCase() || "-"}</td>
                      <td className="py-2 pr-2 text-gray-500">{row.formattedSize || row.size || "-"}</td>
                      <td className="py-2">
                        <a href={`/api/download?url=${encodeURIComponent(row.url)}&filename=video.${row.extension || "mp4"}`} download
                          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors w-fit">
                          <Download size={11} /> Download
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
  );
}
