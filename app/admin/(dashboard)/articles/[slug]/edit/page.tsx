import { notFound } from "next/navigation";
import { getArticles, getProjects } from "@/lib/data";
import { updateArticleAction } from "@/lib/actions";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function EditArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const articles = await getArticles();
  const projects = await getProjects();
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return notFound();

  const action = updateArticleAction.bind(null, article.slug);

  return (
    <div>
      <a href="/admin/articles" className="text-xs text-stone-500 hover:text-stone-300 transition">
        ← Maqolalarga qaytish
      </a>
      <h1 className="font-serif text-2xl text-stone-100 mt-3 mb-6">Maqolani tahrirlash</h1>
      <ArticleForm action={action} projects={projects} initial={article} lockProject />
    </div>
  );
}
