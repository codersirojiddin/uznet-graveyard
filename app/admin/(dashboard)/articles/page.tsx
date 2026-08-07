import { getArticles, getProjects } from "@/lib/data";
import { deleteArticleAction } from "@/lib/actions";

export default async function AdminArticlesPage() {
  const articles = await getArticles();
  const projects = await getProjects();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="font-serif text-2xl text-stone-100">Maqolalar ({articles.length})</h1>
        <a
          href="/admin/articles/new"
          className="px-4 py-2 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
        >
          + Yangi maqola
        </a>
      </div>

      {articles.length === 0 ? (
        <p className="text-stone-500 text-sm">Hali maqola yozilmagan.</p>
      ) : (
        <div className="border border-stone-800 rounded-xl overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-stone-900/60 text-stone-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Sarlavha</th>
                <th className="text-left px-4 py-3">Loyiha</th>
                <th className="text-left px-4 py-3">Sana</th>
                <th className="text-right px-4 py-3">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => {
                const project = projects.find((p) => p.id === a.project_id);
                return (
                  <tr key={a.slug} className="border-t border-stone-800/60 hover:bg-stone-900/40">
                    <td className="px-4 py-3 text-stone-200">{a.title}</td>
                    <td className="px-4 py-3 text-stone-500">{project?.name || "—"}</td>
                    <td className="px-4 py-3 text-stone-500">
                      {new Date(a.published_at).toLocaleDateString("uz-UZ")}
                    </td>
                    <td className="px-4 py-3 text-right space-x-3 whitespace-nowrap">
                      <a
                        href={`/maqolalar/${a.slug}`}
                        target="_blank"
                        className="text-xs text-stone-400 hover:text-stone-200 transition"
                      >
                        Ko&apos;rish
                      </a>
                      <a
                        href={`/admin/articles/${a.slug}/edit`}
                        className="text-xs text-amber-400 hover:text-amber-300 transition"
                      >
                        Tahrirlash
                      </a>
                      <form action={deleteArticleAction.bind(null, a.slug)} className="inline">
                        <button type="submit" className="text-xs text-red-400 hover:text-red-300 transition">
                          O&apos;chirish
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
