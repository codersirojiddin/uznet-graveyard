import { notFound } from "next/navigation";
import { getProjects, getArticles } from "@/lib/data";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — UzNet Graveyard`,
    description: project.short_summary,
  };
}

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const [projects, articles] = await Promise.all([getProjects(), getArticles()]);
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  const article = articles.find((a) => a.slug === params.slug);
  const paragraphs = article
    ? article.content.split(/\n\s*\n/).filter(Boolean)
    : [project.short_summary];

  return (
    <main className="min-h-screen bg-[#0a0d08] text-stone-200">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <a href="/graveyard" className="text-xs text-stone-500 hover:text-stone-300 transition">
          ← Graveyard'ga qaytish
        </a>

        <h1 className="font-serif text-4xl text-stone-100 mt-6">
          {article?.title || project.name}
        </h1>
        <p className="text-stone-400 mt-2">
          {project.founded_year} — {project.closed_year} · {project.category}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.death_cause_tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {article?.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full rounded-xl mt-8 border border-stone-800"
          />
        )}

        <div className="mt-8 space-y-4 text-stone-300 leading-relaxed text-lg">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {!article && (
          <p className="mt-10 text-xs text-stone-600 italic">
            To'liq maqola hali yozilmagan — hozircha qisqa tavsif ko'rsatilmoqda.
          </p>
        )}
      </article>
    </main>
  );
}
