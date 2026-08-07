import { loginAction } from "@/lib/actions";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const hasError = searchParams?.error === "1";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0d08] text-stone-200 px-4">
      <div className="w-full max-w-sm bg-[#141410] border border-stone-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-2 justify-center mb-6">
          <span className="text-2xl">🪦</span>
          <h1 className="font-serif text-xl text-stone-100">Admin panel</h1>
        </div>

        {hasError && (
          <p className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-900/40 rounded-lg px-3 py-2 text-center">
            Login yoki parol noto&apos;g&apos;ri
          </p>
        )}

        <form action={loginAction} className="space-y-4">
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Login</label>
            <input
              name="username"
              type="text"
              required
              autoComplete="username"
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-500 mb-1.5">Parol</label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
          >
            Kirish
          </button>
        </form>

        <a
          href="/muzey"
          className="block text-center text-xs text-stone-600 hover:text-stone-400 mt-6 transition"
        >
          ← Muzeyga qaytish
        </a>
      </div>
    </main>
  );
}
