import ProjectForm from "@/components/admin/ProjectForm";
import { createProjectAction } from "@/lib/actions";

export default function NewProjectPage() {
  return (
    <div>
      <a href="/admin/projects" className="text-xs text-stone-500 hover:text-stone-300 transition">
        ← Loyihalarga qaytish
      </a>
      <h1 className="font-serif text-2xl text-stone-100 mt-3 mb-6">Yangi loyiha qo&apos;shish</h1>
      <ProjectForm action={createProjectAction} />
    </div>
  );
}
