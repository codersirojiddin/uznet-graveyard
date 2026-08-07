import { submitProjectNominationAction } from "@/lib/actions";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Loyiha taklif qilish — UzNet Muzeyi",
  description: "Yopilgan yoki unutilgan UzNet loyihasini muzeyga taklif qiling.",
};

export default function SubmitProjectPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const sent = searchParams?.success === "1";

  return (
    <main className="min-h-screen bg-[#0a0d08] text-stone-200">
      <SiteHeader />

      <section className="px-6 md:px-16 py-16 max-w-xl mx-auto">
        <h1 className="font-serif text-4xl text-stone-100 mb-3">Loyiha taklif qilish</h1>
        <p className="text-stone-400 mb-10">
          Muzeyimizda hali yo&apos;q, biroq yopilgan yoki qayta tug&apos;ilgan afsonaviy UzNet
          loyihasini bilasizmi? Quyidagi formani to&apos;ldiring — jamoamiz ma&apos;lumotni
          tekshirib, tasdiqlangandan so&apos;ng muzeyga qo&apos;shadi.
        </p>

        {sent && (
          <p className="mb-6 text-sm text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 rounded-lg px-4 py-3">
            ✓ Taklifingiz qabul qilindi! Moderatsiyadan so&apos;ng muzeyda paydo bo&apos;ladi.
          </p>
        )}

        <form action={submitProjectNominationAction} className="space-y-5">
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Loyiha nomi</label>
            <input
              name="name"
              type="text"
              required
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Tagline / qisqa ta&apos;rif</label>
            <input
              name="tagline"
              type="text"
              required
              placeholder="masalan: Milliy ijtimoiy tarmoq loyihasi"
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Tashkil topgan yil</label>
              <input
                name="founded_year"
                type="number"
                required
                className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Yopilgan yil</label>
              <input
                name="closed_year"
                type="number"
                required
                className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Kategoriya</label>
            <input
              name="category"
              type="text"
              required
              placeholder="masalan: Social Network, E-commerce, Forum..."
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Qisqa tavsif</label>
            <textarea
              name="short_summary"
              required
              rows={4}
              placeholder="Loyiha nima qilgan, nima uchun mashhur bo'lgan..."
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 leading-relaxed focus:outline-none focus:border-amber-700/60"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-500 mb-1.5">
              O&apos;lim sabablari (vergul bilan ajrating, ixtiyoriy)
            </label>
            <input
              name="death_cause_tags"
              type="text"
              placeholder="Telegram ommalashishi, Investitsiya yetishmasligi"
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Asoschilari (ixtiyoriy)</label>
            <input
              name="founders"
              type="text"
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
            />
          </div>

          <div className="pt-4 border-t border-stone-800/60">
            <p className="text-xs text-stone-500 mb-4">Sizning ma&apos;lumotlaringiz (ixtiyoriy)</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-stone-500 mb-1.5">Ismingiz</label>
                <input
                  name="submitter_name"
                  type="text"
                  className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-500 mb-1.5">Email / Telegram</label>
                <input
                  name="submitter_contact"
                  type="text"
                  className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
          >
            Taklif qilish
          </button>
        </form>
      </section>

      <SiteFooter />
    </main>
  );
}
