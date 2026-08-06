import { getProjects } from "@/lib/data";
import { deleteProjectAction } from "@/lib/actions";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-serif text-2xl text-stone-100">Loyihalar ({projects.length})</h1>
        <a
          href="/admin/projects/new"
          className="px-4 py-2 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
        >
          + Yangi loyiha
        </a>
      </div>

      <div className="border border-stone-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-stone-900/60 text-stone-500 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">Nomi</th>
              <th className="text-left px-4 py-3">Yillar</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Maqola</th>
              <th className="text-right px-4 py-3">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-t border-stone-800/60 hover:bg-stone-900/40">
                <td className="px-4 py-3 text-stone-200">{p.name}</td>
                <td className="px-4 py-3 text-stone-500">
                  {p.founded_year}–{p.closed_year}
                </td>
                <td className="px-4 py-3 text-stone-400">{p.status}</td>
                <td className="px-4 py-3">
                  {p.has_full_article ? (
                    <span className="text-emerald-400 text-xs">Bor</span>
                  ) : (
                    <span className="text-stone-600 text-xs">Yo&apos;q</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                  <a
                    href={`/admin/projects/${p.id}/edit`}
                    className="text-xs text-amber-400 hover:text-amber-300 transition"
                  >
                    Tahrirlash
                  </a>
                  <form action={deleteProjectAction.bind(null, p.id)} className="inline">
                    <button type="submit" className="text-xs text-red-400 hover:text-red-300 transition">
                      O&apos;chirish
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-stone-600">
                  Hali loyiha qo&apos;shilmagan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
