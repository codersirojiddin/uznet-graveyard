import { submitContactMessageAction } from "@/lib/actions";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata = {
  title: "Aloqa — UzNet Muzeyi",
  description: "UzNet Muzeyi jamoasi bilan bog'laning.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const sent = searchParams?.success === "1";

  return (
    <main className="min-h-screen bg-[#0a0d08] text-stone-200">
      <SiteHeader />

      <section className="px-6 md:px-16 py-16 max-w-xl mx-auto">
        <h1 className="font-serif text-4xl text-stone-100 mb-3">Aloqa</h1>
        <p className="text-stone-400 mb-10">
          Savol, taklif yoki hamkorlik bo&apos;yicha murojaat qilishingiz mumkin — imkon
          qadar tezroq javob beramiz.
        </p>

        {sent && (
          <p className="mb-6 text-sm text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 rounded-lg px-4 py-3">
            ✓ Xabaringiz yuborildi. Rahmat! Tez orada siz bilan bog&apos;lanamiz.
          </p>
        )}

        <form action={submitContactMessageAction} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Ismingiz</label>
              <input
                name="name"
                type="text"
                required
                className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
              />
            </div>
            <div>
              <label className="block text-xs text-stone-500 mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Mavzu</label>
            <input
              name="subject"
              type="text"
              required
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Xabar</label>
            <textarea
              name="message"
              required
              rows={6}
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 leading-relaxed focus:outline-none focus:border-amber-700/60"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
          >
            Yuborish
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-stone-800/60 text-sm text-stone-500 space-y-1">
          <p>Email: info@uznetmuzeyi.uz</p>
          <p>Telegram: @uznetmuzeyi</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
