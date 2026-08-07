import Link from "next/link";
import { getProjects, getArticles } from "@/lib/data";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default async function HomePage() {
  const projects = await getProjects();
  const articles = await getArticles();

  const ripCount = projects.filter((p) => p.status === "RIP").length;
  const acquiredCount = projects.filter((p) => p.status === "Acquired").length;
  const featured = projects.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0a0d08] text-stone-200">
      <SiteHeader />

      {/* HERO */}
      <section className="relative px-6 md:px-16 pt-20 pb-16 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,90,30,0.12),transparent_60%)]" />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-block text-xs tracking-widest text-amber-500/80 uppercase mb-4">
            O'zbekiston raqamli merosi arxivi
          </span>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight text-stone-100">
            UzNet Muzeyi
          </h1>
          <p className="mt-5 text-stone-400 text-base md:text-lg leading-relaxed">
            2000–2020-yillarda O'zbekiston internetini shakllantirgan, keyinchalik yopilgan,
            sotib olingan yoki qayta tug'ilgan afsonaviy platformalarning raqamli xotira uyi.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/muzey"
              className="px-6 py-3 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
            >
              Muzeyga kiring 🏛️
            </Link>
            <Link
              href="/maqolalar"
              className="px-6 py-3 rounded-lg bg-stone-900/60 border border-stone-700 text-stone-200 text-sm font-medium hover:bg-stone-800 transition"
            >
              Maqolalarni o'qing 📖
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 md:px-16 py-10 border-y border-stone-800/50 bg-stone-950/40">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          <Stat value={projects.length} label="Arxivlangan loyiha" />
          <Stat value={ripCount} label="Butunlay yopilgan" />
          <Stat value={acquiredCount} label="Sotib olingan" />
        </div>
      </section>

      {/* NIMA UCHUN YARATILGAN */}
      <section className="px-6 md:px-16 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-100 mb-6">
            Nima uchun bu loyiha yaratildi?
          </h2>
          <div className="space-y-4 text-stone-400 leading-relaxed">
            <p>
              UzNet — O'zbekiston internet ekotizimining norasmiy nomi — 2000-yillar boshidan
              boshlab o'zining ijtimoiy tarmoqlari, forumlari, media portallari va
              e-commerce platformalari bilan mustaqil raqamli madaniyat yaratdi. Tas-IX orqali
              ishlaydigan tekin trafik davrida yuzlab mahalliy loyihalar tug'ildi.
            </p>
            <p>
              Ammo global platformalar (Facebook, Telegram, YouTube), texnologik o'zgarishlar
              va bozor konsolidatsiyasi ko'plab shu loyihalarni yo'q qildi. Ularning
              aksariyati hech qanday rasmiy arxivga ega emas — skrinshotlar yo'qoladi,
              domenlar boshqa qo'lga o'tadi, jamoalar tarqalib ketadi.
            </p>
            <p>
              <strong className="text-stone-200">UzNet Muzeyi</strong> — shu tarixni yo'qolib
              ketishdan asrab qolish uchun yaratilgan raqamli arxiv. Har bir loyiha — o'z
              davrining texnologik va madaniy izidir, va biz buni hurmat bilan hujjatlashtiramiz.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PREVIEW */}
      {featured.length > 0 && (
        <section className="px-6 md:px-16 py-16 bg-stone-950/30 border-y border-stone-800/50">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-stone-100">Muzeydan namunalar</h2>
              <Link href="/muzey" className="text-sm text-amber-400 hover:text-amber-300 transition">
                Barchasini ko'rish →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  href="/muzey"
                  className="block bg-stone-900/50 border border-stone-800 hover:border-amber-800/40 rounded-lg p-4 text-center transition"
                >
                  <p className="font-serif text-sm text-stone-200">{p.name}</p>
                  <p className="text-[11px] text-stone-500 mt-1">
                    {p.founded_year}–{p.closed_year}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MAQOLALAR PREVIEW */}
      {articles.length > 0 && (
        <section className="px-6 md:px-16 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl text-stone-100">So'nggi maqolalar</h2>
              <Link href="/maqolalar" className="text-sm text-amber-400 hover:text-amber-300 transition">
                Barchasini o'qish →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {articles.slice(-3).reverse().map((a) => (
                <Link
                  key={a.slug}
                  href={`/maqolalar/${a.slug}`}
                  className="block bg-stone-900/50 border border-stone-800 hover:border-amber-800/40 rounded-lg p-5 transition"
                >
                  <p className="font-serif text-base text-stone-100">{a.title}</p>
                  <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                    {a.content.slice(0, 100)}...
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-6 md:px-16 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-stone-100 mb-3">
            Yopilgan loyihani bilasizmi?
          </h2>
          <p className="text-stone-400 mb-6">
            Muzeyimizda yo'q afsonaviy UzNet loyihasini bilsangiz, uni taklif qiling —
            biz uni o'rganib, arxivga qo'shamiz.
          </p>
          <Link
            href="/taklif-qilish"
            className="inline-block px-6 py-3 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
          >
            Loyiha taklif qilish ➔
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl md:text-4xl text-amber-500/90">{value}</p>
      <p className="text-xs text-stone-500 mt-1 uppercase tracking-wide">{label}</p>
    </div>
  );
}
