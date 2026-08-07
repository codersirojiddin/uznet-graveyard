import { getProjects } from "@/lib/data";
import { createArticleAction } from "@/lib/actions";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function NewArticlePage() {
  const projects = await getProjects();

  return (
    <div>
      <a href="/admin/articles" className="text-xs text-stone-500 hover:text-stone-300 transition">
        ← Maqolalarga qaytish
      </a>
      <h1 className="font-serif text-2xl text-stone-100 mt-3 mb-6">Yangi maqola yozish</h1>
      <ArticleForm action={createArticleAction} projects={projects} />
    </div>
  );
}
