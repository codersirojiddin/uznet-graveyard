"use client";

import type { Article, Project } from "@/lib/types";

export default function ArticleForm({
  action,
  projects,
  initial,
  lockProject,
}: {
  action: (formData: FormData) => void;
  projects: Project[];
  initial?: Article;
  lockProject?: boolean;
}) {
  return (
    <form action={action} className="space-y-5 max-w-2xl">
      <div>
        <label className="block text-xs text-stone-500 mb-1.5">Loyiha</label>
        <select
          name="project_id"
          defaultValue={initial?.project_id}
          required
          disabled={lockProject}
          className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60 disabled:opacity-60"
        >
          <option value="">— Loyihani tanlang —</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        {lockProject && (
          <p className="text-[11px] text-stone-600 mt-1">
            Mavjud maqolada loyihani o&apos;zgartirib bo&apos;lmaydi.
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs text-stone-500 mb-1.5">Sarlavha</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={initial?.title}
          className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
        />
      </div>

      <div>
        <label className="block text-xs text-stone-500 mb-1.5">Muqova rasm URL (ixtiyoriy)</label>
        <input
          name="cover_image"
          type="text"
          defaultValue={initial?.cover_image}
          placeholder="/covers/example.png"
          className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
        />
      </div>

      <div>
        <label className="block text-xs text-stone-500 mb-1.5">
          Maqola matni (paragraflarni bo&apos;sh qator bilan ajrating)
        </label>
        <textarea
          name="content"
          required
          rows={14}
          defaultValue={initial?.content}
          className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 leading-relaxed focus:outline-none focus:border-amber-700/60"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
      >
        Saqlash
      </button>
    </form>
  );
}
