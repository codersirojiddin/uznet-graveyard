import { getMessages } from "@/lib/data";
import { deleteMessageAction } from "@/lib/actions";

export default async function AdminMessagesPage() {
  const messages = await getMessages();
  const sorted = [...messages].sort(
    (a, b) => new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
  );

  return (
    <div>
      <h1 className="font-serif text-2xl text-stone-100 mb-6">Xabarlar ({sorted.length})</h1>

      {sorted.length === 0 ? (
        <p className="text-stone-500 text-sm">Hozircha xabarlar yo&apos;q.</p>
      ) : (
        <div className="space-y-4">
          {sorted.map((m) => (
            <div key={m.id} className="bg-stone-900/50 border border-stone-800 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-serif text-stone-100">{m.subject}</p>
                  <p className="text-xs text-stone-500 mt-1">
                    {m.name} · {m.email} ·{" "}
                    {new Date(m.submitted_at).toLocaleDateString("uz-UZ")}
                  </p>
                  <p className="text-sm text-stone-400 mt-3 whitespace-pre-wrap">{m.message}</p>
                </div>
                <form action={deleteMessageAction.bind(null, m.id)} className="shrink-0">
                  <button type="submit" className="text-xs text-red-400 hover:text-red-300 transition">
                    O&apos;chirish
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
