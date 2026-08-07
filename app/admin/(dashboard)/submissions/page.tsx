import { getSubmissions } from "@/lib/data";
import { approveSubmissionAction, rejectSubmissionAction } from "@/lib/actions";

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();
  const pending = submissions.filter((s) => s.status === "pending");
  const reviewed = submissions.filter((s) => s.status !== "pending");

  return (
    <div>
      <h1 className="font-serif text-2xl text-stone-100 mb-6">
        Foydalanuvchi takliflari ({pending.length} kutilmoqda)
      </h1>

      {pending.length === 0 ? (
        <p className="text-stone-500 text-sm mb-10">Hozircha yangi takliflar yo&apos;q.</p>
      ) : (
        <div className="space-y-4 mb-12">
          {pending.map((s) => (
            <div key={s.id} className="bg-stone-900/50 border border-stone-800 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-lg text-stone-100">{s.name}</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {s.founded_year} — {s.closed_year} · {s.category}
                  </p>
                  <p className="text-sm text-stone-400 mt-3">{s.short_summary}</p>
                  {s.death_cause_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {s.death_cause_tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-1 rounded-full bg-red-950/40 border border-red-900/40 text-red-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {(s.submitter_name || s.submitter_contact) && (
                    <p className="text-xs text-stone-600 mt-3">
                      Yuborgan: {s.submitter_name || "Noma'lum"}{" "}
                      {s.submitter_contact && `· ${s.submitter_contact}`}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <form action={approveSubmissionAction.bind(null, s.id)}>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-emerald-900/40 border border-emerald-800/50 text-emerald-300 text-xs hover:bg-emerald-900/60 transition"
                    >
                      Tasdiqlash
                    </button>
                  </form>
                  <form action={rejectSubmissionAction.bind(null, s.id)}>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-900/50 text-red-300 text-xs hover:bg-red-950/60 transition"
                    >
                      Rad etish
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {reviewed.length > 0 && (
        <div>
          <h2 className="text-sm text-stone-500 uppercase tracking-wide mb-4">
            Ko&apos;rib chiqilganlar
          </h2>
          <div className="space-y-2">
            {reviewed.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between text-sm bg-stone-900/30 border border-stone-800/60 rounded-lg px-4 py-2.5"
              >
                <span className="text-stone-300">{s.name}</span>
                <span
                  className={
                    s.status === "approved" ? "text-emerald-400 text-xs" : "text-red-400 text-xs"
                  }
                >
                  {s.status === "approved" ? "Tasdiqlangan" : "Rad etilgan"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
