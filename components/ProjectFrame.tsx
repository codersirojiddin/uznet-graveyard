"use client";

import { motion } from "framer-motion";
import type { Project } from "./MuseumGrid";

const statusStyles: Record<string, string> = {
  RIP: "bg-red-950/70 text-red-300 border-red-800/50",
  Acquired: "bg-amber-950/70 text-amber-300 border-amber-800/50",
  Archived: "bg-stone-800/70 text-stone-300 border-stone-600/50",
};

export default function ProjectFrame({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex flex-col items-center text-center focus:outline-none"
    >
      {/* Osilgan simcha */}
      <div className="w-px h-5 bg-stone-700/60" />

      {/* Oltin ramka */}
      <div
        className="relative w-full aspect-[4/5] p-[6px] rounded-sm
                   bg-gradient-to-b from-amber-700/70 via-amber-900/50 to-amber-950/70
                   shadow-[0_8px_24px_rgba(0,0,0,0.6)]
                   group-hover:shadow-[0_10px_30px_rgba(180,130,40,0.25)] transition-shadow duration-300"
      >
        <div className="relative w-full h-full bg-gradient-to-b from-stone-800 via-stone-900 to-black rounded-[2px] flex flex-col items-center justify-center px-3 py-4 overflow-hidden">
          <span
            className={`absolute top-2 right-2 text-[8px] px-2 py-0.5 rounded-full border font-medium tracking-wide ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>

          <span className="text-3xl mb-2 opacity-70 group-hover:opacity-100 transition">🖼️</span>

          <h3 className="font-serif text-[13px] md:text-sm text-stone-100 leading-tight line-clamp-2 px-1">
            {project.name}
          </h3>
          <p className="text-[10px] text-amber-500/70 mt-1 tracking-wide">
            {project.founded_year} – {project.closed_year}
          </p>
        </div>
      </div>

      {/* Plaket / lavha */}
      <div className="mt-2 px-3 py-1 bg-stone-900/80 border border-stone-800 rounded-sm">
        <p className="text-[9px] text-stone-500 uppercase tracking-wider">{project.category}</p>
      </div>
    </motion.button>
  );
}
