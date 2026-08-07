import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 md:px-16 py-6 border-b border-stone-800/50 backdrop-blur-sm">
      <Link href="/" className="flex items-center gap-2 font-serif text-lg tracking-wide text-stone-100">
        <span className="text-xl">🏛️</span> UzNet Muzeyi
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm text-stone-400">
        <Link href="/muzey" className="hover:text-stone-100 transition">
          Muzey
        </Link>
        <Link href="/maqolalar" className="hover:text-stone-100 transition">
          Maqolalar
        </Link>
        <Link href="/taklif-qilish" className="hover:text-stone-100 transition">
          Loyiha taklif qilish
        </Link>
        <Link href="/about-us" className="hover:text-stone-100 transition">
          Biz haqimizda
        </Link>
        <Link href="/contact" className="hover:text-stone-100 transition">
          Aloqa
        </Link>
      </nav>
      <Link
        href="/muzey"
        className="md:hidden text-sm text-stone-300 border border-stone-700 rounded-lg px-3 py-1.5"
      >
        Muzey
      </Link>
    </header>
  );
}
