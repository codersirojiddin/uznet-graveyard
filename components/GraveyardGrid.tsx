"use client";

import { useState } from "react";
import TombstoneCard from "./TombstoneCard";
import ProjectModal from "./ProjectModal";

export type Project = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  founded_year: number;
  closed_year: number;
  status: "RIP" | "Acquired" | "Archived";
  category: string;
  logo_url: string;
  stats: { peak_users: string; peak_rank: string };
  short_summary: string;
  death_cause_tags: string[];
  founders: string;
  has_full_article: boolean;
};

export default function GraveyardGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-10">
        {projects.map((project) => (
          <TombstoneCard
            key={project.id}
            project={project}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
