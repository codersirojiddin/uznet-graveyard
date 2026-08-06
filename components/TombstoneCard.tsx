"use client";

import { motion } from "framer-motion";
import type { Project } from "./GraveyardGrid";

const statusStyles: Record<string, string> = {
  RIP: "bg-red-950/70 text-red-300 border-red-800/50",
  Acquired: "bg-amber-950/70 text-amber-300 border-amber-800/50",
  Archived: "bg-stone-800/70 text-stone-300 border-stone-600/50",
};

export default function TombstoneCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.96 }}
      className="group relative flex flex-col items-center text-center focus:outline-none"
    >
      <div
        className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#2c2c28] via-[#232320] to-[#1a1a17]
                   border border-stone-700/60 shadow-lg shadow-black/60
                   flex flex-col items-center justify-center px-3 py-4
                   group-hover:border-amber-700/40 group-hover:shadow-amber-900/20 transition-all duration-300"
        style={{ borderRadius: "50% 50% 6px 6px / 55% 55% 6px 6px" }}
      >
        <span
          className={`absolute top-3 text-[8px] px-2 py-0.5 rounded-full border font-medium tracking-wide ${statusStyles[project.status]}`}
        >
          {project.status}
        </span>

        <span className="text-2xl mb-2 opacity-60 grayscale group-hover:opacity-90 transition">
          💀
        </span>

        <h3 className="font-serif text-[13px] md:text-sm text-stone-200 leading-tight line-clamp-1 px-1">
          {project.name}
        </h3>
        <p className="text-[10px] text-stone-500 mt-1">
          {project.founded_year}-{project.closed_year}
        </p>
      </div>

      {/* Yer / soya effekti */}
      <div className="w-[70%] h-2 bg-black/50 blur-[3px] rounded-full -mt-1" />
    </motion.button>
  );
}
