import { getProjects, getArticles } from "@/lib/data";

export default async function AdminHomePage() {
  const projects = await getProjects();
  const articles = await getArticles();

  return (
    <div>
      <h1 className="font-serif text-3xl text-stone-100 mb-2">Boshqaruv paneli</h1>
      <p className="text-stone-500 text-sm mb-8">
        UzNet Graveyard kontentini shu yerdan boshqaring.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-5">
          <p className="text-xs text-stone-500 uppercase tracking-wide">Jami loyihalar</p>
          <p className="text-3xl font-serif text-stone-100 mt-1">{projects.length}</p>
          <a
            href="/admin/projects"
            className="inline-block mt-4 text-xs text-amber-400 hover:text-amber-300 transition"
          >
            Boshqarish →
          </a>
        </div>
        <div className="bg-stone-900/50 border border-stone-800 rounded-xl p-5">
          <p className="text-xs text-stone-500 uppercase tracking-wide">Jami maqolalar</p>
          <p className="text-3xl font-serif text-stone-100 mt-1">{articles.length}</p>
          <a
            href="/admin/articles"
            className="inline-block mt-4 text-xs text-amber-400 hover:text-amber-300 transition"
          >
            Boshqarish →
          </a>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        <a
          href="/admin/projects/new"
          className="px-4 py-2.5 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
        >
          + Yangi loyiha
        </a>
        <a
          href="/admin/articles/new"
          className="px-4 py-2.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-200 text-sm font-medium hover:bg-stone-700 transition"
        >
          + Yangi maqola
        </a>
      </div>
    </div>
  );
}
