import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="relative z-20 px-6 md:px-16 py-8 border-t border-stone-800/50 text-xs text-stone-500 bg-black/20">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <span className="flex items-center gap-2">
          🏛️ © {new Date().getFullYear()} UzNet Muzeyi. Barcha huquqlar himoyalangan.
        </span>
        <div className="flex flex-wrap gap-5 justify-center">
          <Link href="/muzey" className="hover:text-stone-300 transition">
            Muzey
          </Link>
          <Link href="/maqolalar" className="hover:text-stone-300 transition">
            Maqolalar
          </Link>
          <Link href="/taklif-qilish" className="hover:text-stone-300 transition">
            Loyiha taklif qilish
          </Link>
          <Link href="/about-us" className="hover:text-stone-300 transition">
            Biz haqimizda
          </Link>
          <Link href="/contact" className="hover:text-stone-300 transition">
            Aloqa
          </Link>
          <Link href="/privacy-policy" className="hover:text-stone-300 transition">
            Maxfiylik siyosati
          </Link>
          <a href="/feed.xml" className="hover:text-stone-300 transition">
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
