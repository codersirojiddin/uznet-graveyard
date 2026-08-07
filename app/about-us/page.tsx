import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Biz haqimizda — UzNet Muzeyi",
  description: "UzNet Muzeyi loyihasi va uning missiyasi haqida.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#0a0d08] text-stone-200">
      <SiteHeader />

      <section className="px-6 md:px-16 py-16 max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl text-stone-100 mb-8">Biz haqimizda</h1>

        <div className="space-y-6 text-stone-400 leading-relaxed">
          <p>
            <strong className="text-stone-200">UzNet Muzeyi</strong> — O&apos;zbekiston internet
            tarixini hujjatlashtirish va asrab qolish maqsadida yaratilgan mustaqil, notijorat
            raqamli arxiv loyihasi.
          </p>

          <h2 className="font-serif text-xl text-stone-200 pt-4">Missiyamiz</h2>
          <p>
            2000–2020-yillar oralig&apos;ida O&apos;zbekistonda ishlagan yuzlab veb-saytlar,
            ijtimoiy tarmoqlar, forumlar va onlayn xizmatlar bugungi kunda ko&apos;pchilik uchun
            unutilgan. Ularning aksariyati hech qanday rasmiy arxivga ega emas. Biz bu tarixni
            yig&apos;ish, tekshirish va kelajak avlodlar uchun saqlab qolishni maqsad qilganmiz.
          </p>

          <h2 className="font-serif text-xl text-stone-200 pt-4">Nima qilamiz</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Yopilgan yoki sotib olingan UzNet loyihalari haqida ma&apos;lumot to&apos;playmiz</li>
            <li>Har bir loyiha uchun tarixiy maqola va vizual &quot;muzey eksponati&quot; yaratamiz</li>
            <li>Foydalanuvchilardan yangi nomzodlarni taklif qilishni qabul qilamiz</li>
            <li>Barcha ma&apos;lumotlarni ochiq va bepul shaklda taqdim etamiz</li>
          </ul>

          <h2 className="font-serif text-xl text-stone-200 pt-4">Nima uchun bu muhim?</h2>
          <p>
            Raqamli tarix ham xuddi jismoniy tarix kabi yo&apos;qolib ketishi mumkin — domenlar
            muddati tugaydi, serverlar o&apos;chadi, jamoalar tarqalib ketadi. UzNet Muzeyi shu
            yo&apos;qolib borayotgan izlarni saqlab qolish uchun kichik, lekin muhim qadamdir.
          </p>

          <h2 className="font-serif text-xl text-stone-200 pt-4">Hamkorlik</h2>
          <p>
            Agar sizda arxivlanishi kerak bo&apos;lgan loyiha haqida ma&apos;lumot yoki
            eski skrinshotlar bo&apos;lsa,{" "}
            <a href="/contact" className="text-amber-400 hover:text-amber-300 transition">
              biz bilan bog&apos;laning
            </a>{" "}
            yoki{" "}
            <a href="/taklif-qilish" className="text-amber-400 hover:text-amber-300 transition">
              loyihani taklif qiling
            </a>
            .
          </p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
