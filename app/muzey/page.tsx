import { getProjects } from "@/lib/data";
import MuseumGrid from "@/components/MuseumGrid";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Muzey — UzNet Muzeyi",
  description:
    "O'zbekiston internet olamining afsonaviy loyihalari — shon-sharaf devoridagi rasmlar sifatida.",
};

export default async function MuzeyPage() {
  const projects = await getProjects();

  return (
    <main className="relative min-h-screen bg-[#0c0d0a] text-stone-200">
      {/* Muzey devor teksturasi — nozik gradient, hech qanday tashqi rasm yo'q */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(60,45,20,0.15),transparent_55%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3),transparent_15%,transparent_85%,rgba(0,0,0,0.5))]" />

      <div className="relative z-10">
        <SiteHeader />

        <section className="px-6 md:px-16 pt-16 pb-10 text-center">
          <span className="inline-block text-xs tracking-widest text-amber-500/80 uppercase mb-3">
            Shon-sharaf devori
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-100">Muzey</h1>
          <p className="mt-4 max-w-lg mx-auto text-stone-400">
            Har bir ramka — o&apos;z davrida millionlab foydalanuvchini birlashtirgan
            loyihaning xotirasi. Batafsil ma&apos;lumot uchun rasmga bosing.
          </p>
        </section>

        <section className="px-6 md:px-16 pb-24">
          <div className="max-w-6xl mx-auto bg-black/25 backdrop-blur-[1px] rounded-3xl border border-stone-800/40 p-6 md:p-12">
            <MuseumGrid projects={projects} />
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
