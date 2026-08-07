import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Maxfiylik siyosati — UzNet Muzeyi",
  description: "UzNet Muzeyi platformasining maxfiylik siyosati.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0a0d08] text-stone-200">
      <SiteHeader />

      <section className="px-6 md:px-16 py-16 max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl text-stone-100 mb-2">Maxfiylik siyosati</h1>
        <p className="text-xs text-stone-600 mb-10">Oxirgi yangilanish: 2026-yil avgust</p>

        <div className="space-y-8 text-stone-400 leading-relaxed text-sm">
          <div>
            <h2 className="font-serif text-lg text-stone-200 mb-2">1. Umumiy qoidalar</h2>
            <p>
              Ushbu Maxfiylik siyosati UzNet Muzeyi (&quot;biz&quot;, &quot;platforma&quot;)
              tomonidan foydalanuvchilardan yig&apos;iladigan ma&apos;lumotlarni qanday
              to&apos;plashi, ishlatishi va saqlashini tushuntiradi. Platformadan
              foydalanish orqali siz ushbu siyosat shartlariga rozilik bildirasiz.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg text-stone-200 mb-2">2. Qanday ma&apos;lumotlar yig&apos;iladi</h2>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Aloqa formasi orqali yuborilgan ism, email va xabar matni</li>
              <li>&quot;Loyiha taklif qilish&quot; formasi orqali yuborilgan ma&apos;lumotlar</li>
              <li>Standart texnik ma&apos;lumotlar (brauzer turi, sahifaga tashrif statistikasi)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-lg text-stone-200 mb-2">3. Ma&apos;lumotlardan foydalanish maqsadi</h2>
            <p>
              Yig&apos;ilgan ma&apos;lumotlar faqat quyidagi maqsadlarda ishlatiladi:
              foydalanuvchi so&apos;rovlariga javob berish, taklif qilingan loyihalarni
              ko&apos;rib chiqish va tasdiqlash, platforma sifatini yaxshilash. Ma&apos;lumotlar
              uchinchi shaxslarga sotilmaydi yoki tijorat maqsadida uzatilmaydi.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg text-stone-200 mb-2">4. Ma&apos;lumotlarni saqlash</h2>
            <p>
              Aloqa va taklif formalari orqali kelgan ma&apos;lumotlar platforma
              serverlarida xavfsiz saqlanadi va faqat administratorlar tomonidan
              ko&apos;rib chiqiladi. So&apos;rov bo&apos;yicha ma&apos;lumotlaringizni
              o&apos;chirishni talab qilishingiz mumkin.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg text-stone-200 mb-2">5. Cookie fayllari</h2>
            <p>
              Platforma faqat zaruriy funksionallik (masalan, admin sessiyasi) uchun
              texnik cookie fayllaridan foydalanadi. Reklama yoki kuzatuv maqsadidagi
              uchinchi tomon cookie fayllari ishlatilmaydi.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg text-stone-200 mb-2">6. Kontent va mualliflik huquqi</h2>
            <p>
              Platformadagi tarixiy ma&apos;lumotlar ta&apos;lim va arxiv maqsadida ochiq
              manbalar asosida tayyorlanadi. Agar sizning mualliflik huquqingiz buzilgan
              deb hisoblasangiz, biz bilan bog&apos;laning — muammo tezda hal qilinadi.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-lg text-stone-200 mb-2">7. Bog&apos;lanish</h2>
            <p>
              Maxfiylik siyosati bo&apos;yicha savollaringiz bo&apos;lsa,{" "}
              <a href="/contact" className="text-amber-400 hover:text-amber-300 transition">
                Aloqa
              </a>{" "}
              sahifasi orqali murojaat qiling.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
