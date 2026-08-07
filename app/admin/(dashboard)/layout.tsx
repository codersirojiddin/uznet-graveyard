import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { logoutAction } from "@/lib/actions";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!getSession()) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#0a0d08] text-stone-200">
      <header className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-12 py-5 border-b border-stone-800/60">
        <a href="/admin" className="flex items-center gap-2 font-serif text-lg text-stone-100">
          🏛️ UzNet Muzeyi <span className="text-stone-500 text-sm font-sans">/ admin</span>
        </a>
        <nav className="flex items-center gap-6 text-sm text-stone-400">
          <a href="/admin" className="hover:text-stone-100 transition">
            Bosh sahifa
          </a>
          <a href="/admin/projects" className="hover:text-stone-100 transition">
            Loyihalar
          </a>
          <a href="/admin/articles" className="hover:text-stone-100 transition">
            Maqolalar
          </a>
          <a href="/admin/submissions" className="hover:text-stone-100 transition">
            Takliflar
          </a>
          <a href="/admin/messages" className="hover:text-stone-100 transition">
            Xabarlar
          </a>
          <a
            href="/muzey"
            target="_blank"
            className="hover:text-stone-100 transition"
          >
            Saytni ko&apos;rish ↗
          </a>
          <form action={logoutAction}>
            <button type="submit" className="text-stone-500 hover:text-red-400 transition">
              Chiqish
            </button>
          </form>
        </nav>
      </header>
      <main className="px-6 md:px-12 py-10">{children}</main>
    </div>
  );
}
