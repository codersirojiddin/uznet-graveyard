import { getProjects, getArticles, getSubmissions, getMessages } from "@/lib/data";

export default async function AdminHomePage() {
  const [projects, articles, submissions, messages] = await Promise.all([
    getProjects(),
    getArticles(),
    getSubmissions(),
    getMessages(),
  ]);

  const pendingSubmissions = submissions.filter((s) => s.status === "pending").length;

  return (
    <div>
      <h1 className="font-serif text-3xl text-stone-100 mb-2">Boshqaruv paneli</h1>
      <p className="text-stone-500 text-sm mb-8">
        UzNet Muzeyi kontentini shu yerdan boshqaring.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
        <Card label="Jami loyihalar" value={projects.length} href="/admin/projects" />
        <Card label="Jami maqolalar" value={articles.length} href="/admin/articles" />
        <Card
          label="Kutilayotgan takliflar"
          value={pendingSubmissions}
          href="/admin/submissions"
          highlight={pendingSubmissions > 0}
        />
        <Card label="Xabarlar" value={messages.length} href="/admin/messages" />
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

function Card({
  label,
  value,
  href,
  highlight,
}: {
  label: string;
  value: number;
  href: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-stone-900/50 border rounded-xl p-5 ${
        highlight ? "border-amber-800/50" : "border-stone-800"
      }`}
    >
      <p className="text-xs text-stone-500 uppercase tracking-wide">{label}</p>
      <p className={`text-3xl font-serif mt-1 ${highlight ? "text-amber-400" : "text-stone-100"}`}>
        {value}
      </p>
      <a href={href} className="inline-block mt-4 text-xs text-amber-400 hover:text-amber-300 transition">
        Boshqarish →
      </a>
    </div>
  );
}
