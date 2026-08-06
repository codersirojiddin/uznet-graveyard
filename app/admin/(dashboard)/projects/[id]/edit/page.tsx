import { notFound } from "next/navigation";
import { getProjects } from "@/lib/data";
import { updateProjectAction } from "@/lib/actions";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const projects = await getProjects();
  const project = projects.find((p) => p.id === params.id);
  if (!project) return notFound();

  const action = updateProjectAction.bind(null, project.id);

  return (
    <div>
      <a href="/admin/projects" className="text-xs text-stone-500 hover:text-stone-300 transition">
        ← Loyihalarga qaytish
      </a>
      <h1 className="font-serif text-2xl text-stone-100 mt-3 mb-6">
        Loyihani tahrirlash: {project.name}
      </h1>
      <ProjectForm action={action} initial={project} />
    </div>
  );
}
