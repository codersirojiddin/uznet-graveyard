import Link from "next/link";
import { getArticles, getProjects } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Maqolalar — UzNet Muzeyi",
  description: "UzNet loyihalari haqida to'liq tarixiy maqolalar to'plami.",
};

export default async function ArticlesIndexPage() {
  const [articles, projects] = await Promise.all([getArticles(), getProjects()]);
  const sorted = [...articles].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  return (
    <main className="min-h-screen bg-[#0a0d08] text-stone-200">
      <SiteHeader />

      <section className="px-6 md:px-16 pt-16 pb-10 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-100">Maqolalar</h1>
        <p className="mt-4 max-w-lg mx-auto text-stone-400">
          UzNet loyihalarining to&apos;liq tarixi — tashkil topishidan yopilishigacha.
        </p>
      </section>

      <section className="px-6 md:px-16 pb-24">
        <div className="max-w-4xl mx-auto">
          {sorted.length === 0 ? (
            <p className="text-center text-stone-500">Hozircha maqolalar mavjud emas.</p>
          ) : (
            <div className="space-y-4">
              {sorted.map((a) => {
                const project = projects.find((p) => p.id === a.project_id);
                return (
                  <Link
                    key={a.slug}
                    href={`/maqolalar/${a.slug}`}
                    className="block bg-stone-900/40 border border-stone-800 hover:border-amber-800/40 rounded-xl p-6 transition"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-xl text-stone-100">{a.title}</h2>
                        {project && (
                          <p className="text-xs text-stone-500 mt-1">
                            {project.founded_year} — {project.closed_year} · {project.category}
                          </p>
                        )}
                        <p className="text-sm text-stone-400 mt-3 line-clamp-2">
                          {a.content.slice(0, 180)}...
                        </p>
                      </div>
                      <span className="text-stone-600 text-sm shrink-0">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
