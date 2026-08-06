import { getProjects } from "@/lib/data";
import GraveyardGrid from "@/components/GraveyardGrid";

export default async function GraveyardPage() {
  const projects = await getProjects();

  return (
    <main
      className="relative min-h-screen text-stone-200"
      style={{
        backgroundImage: "url('/backgrounds/cemetery-gate.png')",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
        backgroundSize: "100% auto",
        backgroundColor: "#0a0d08",
      }}
    >
      {/* Kontent o'qilishini yengillashtirish uchun qoraytiruvchi overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-6 md:px-16 py-6 border-b border-stone-800/40 backdrop-blur-sm bg-black/20">
          <div className="flex items-center gap-2 font-serif text-lg tracking-wide text-stone-100">
            <span className="text-xl">⛩️</span> UzNet Graveyard
          </div>
          <nav className="flex items-center gap-6 text-sm text-stone-300">
            <a href="/" className="flex items-center gap-1.5 hover:text-stone-100 transition">
              🏠 Bosh sahifa
            </a>
            <a href="/graveyard" className="flex items-center gap-1.5 text-stone-100 border-b border-amber-500/70 pb-1">
              🪦 Graveyard
            </a>
            <button className="text-stone-400 hover:text-stone-200 transition">🌙</button>
          </nav>
        </header>

        {/* Hero */}
        <section className="px-6 md:px-16 pt-16 pb-8 text-center md:text-left">
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-stone-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            UzNet Graveyard
          </h1>
          <p className="mt-4 max-w-md mx-auto md:mx-0 text-stone-300 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            Bu yerda boshlanib, tugallanmagan loyihalar abadiy uxlaydi.
          </p>
          <button className="mt-6 inline-flex items-center gap-2 bg-stone-900/70 hover:bg-stone-800/80 border border-stone-700 text-stone-200 text-sm px-5 py-2.5 rounded-lg transition backdrop-blur-sm">
            Loyihangizni dafn eting <span>⚰️</span>
          </button>
        </section>

        {/* Grid */}
        <section className="px-6 md:px-16 py-16">
          <div className="bg-black/35 backdrop-blur-[2px] rounded-3xl border border-stone-800/40 p-6 md:p-10">
            <GraveyardGrid projects={projects} />
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-16 py-6 border-t border-stone-800/40 text-xs text-stone-400 flex flex-col sm:flex-row gap-3 justify-between items-center bg-black/30 backdrop-blur-sm">
          <span className="flex items-center gap-2">
            💀 © 2025 UzNet Graveyard. Barcha huquqlar himoyalangan.
          </span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-stone-200">Haqida</a>
            <a href="#" className="hover:text-stone-200">Kontakt</a>
            <a href="#" className="hover:text-stone-200">Maxfiylik siyosati</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
