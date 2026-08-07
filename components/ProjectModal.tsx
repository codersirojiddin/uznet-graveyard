"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Project } from "./MuseumGrid";

const statusStyles: Record<string, string> = {
  RIP: "bg-red-950/70 text-red-300 border-red-800/50",
  Acquired: "bg-amber-950/70 text-amber-300 border-amber-800/50",
  Archived: "bg-stone-800/70 text-stone-300 border-stone-600/50",
};

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const router = useRouter();

  const shareUrl =
    typeof window !== "undefined" && project
      ? `${window.location.origin}/maqolalar/${project.slug}`
      : "";

  const shareText = project ? `${project.name} — UzNet Muzeyi` : "";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 24 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            className="relative w-full max-w-md bg-[#141410] border border-stone-800
                       rounded-2xl shadow-2xl p-6 text-stone-200 max-h-[85vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-5 text-stone-500 hover:text-stone-200 transition"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-stone-800/80 border border-stone-700 flex items-center justify-center text-xl shrink-0">
                🖼️
              </div>
              <div>
                <h2 className="font-serif text-xl text-stone-100">{project.name}</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  {project.founded_year} — {project.closed_year} · {project.category}
                </p>
              </div>
              <span
                className={`ml-auto text-[10px] px-2.5 py-1 rounded-full border font-medium shrink-0 ${statusStyles[project.status]}`}
              >
                {project.status}
              </span>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed mb-5">
              {project.short_summary}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-stone-900/60 border border-stone-800 rounded-lg p-3">
                <p className="text-[10px] text-stone-500 uppercase tracking-wide">Peak foydalanuvchi</p>
                <p className="text-sm text-stone-100 mt-1">{project.stats.peak_users}</p>
              </div>
              <div className="bg-stone-900/60 border border-stone-800 rounded-lg p-3">
                <p className="text-[10px] text-stone-500 uppercase tracking-wide">Peak reyting</p>
                <p className="text-sm text-stone-100 mt-1">{project.stats.peak_rank}</p>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-[10px] text-stone-500 uppercase tracking-wide mb-2">O'lim sabablari</p>
              <div className="flex flex-wrap gap-2">
                {project.death_cause_tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-red-950/40 border border-red-900/40 text-red-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-stone-500 mb-6">
              Asoschilari: <span className="text-stone-300">{project.founders}</span>
            </p>

            {project.has_full_article && (
              <button
                onClick={() => router.push(`/maqolalar/${project.slug}`)}
                className="w-full py-2.5 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium
                           hover:bg-white transition"
              >
                Batafsil maqolani o'qing ➔
              </button>
            )}

            <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-stone-800/60">
              <span className="text-[10px] text-stone-600 uppercase tracking-wide">Ulashish:</span>
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-200 transition text-sm"
                title="Telegram'da ulashish"
              >
                Telegram
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-200 transition text-sm"
                title="X (Twitter)'da ulashish"
              >
                X
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="text-stone-500 hover:text-stone-200 transition text-sm"
                title="Havolani nusxalash"
              >
                Havolani nusxalash
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
