"use client";

import type { Project } from "@/lib/types";

export default function ProjectForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial?: Project;
}) {
  return (
    <form action={action} className="space-y-5 max-w-xl">
      <Field label="Nomi" name="name" defaultValue={initial?.name} required />
      <Field
        label="Slug (bo'sh qoldirsa avtomatik yaratiladi)"
        name="slug"
        defaultValue={initial?.slug?.replace(/-tarixi$/, "")}
        placeholder="masalan: muloqot-uz"
      />
      <Field label="Tagline" name="tagline" defaultValue={initial?.tagline} required />

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Tashkil topgan yil"
          name="founded_year"
          type="number"
          defaultValue={initial?.founded_year}
          required
        />
        <Field
          label="Yopilgan yil"
          name="closed_year"
          type="number"
          defaultValue={initial?.closed_year}
          required
        />
      </div>

      <div>
        <label className="block text-xs text-stone-500 mb-1.5">Status</label>
        <select
          name="status"
          defaultValue={initial?.status || "RIP"}
          className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
        >
          <option value="RIP">RIP</option>
          <option value="Acquired">Acquired</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      <Field label="Kategoriya" name="category" defaultValue={initial?.category} required />
      <Field
        label="Logo URL"
        name="logo_url"
        defaultValue={initial?.logo_url}
        placeholder="/logos/example.png"
      />

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Peak foydalanuvchilar"
          name="peak_users"
          defaultValue={initial?.stats?.peak_users}
          placeholder="150,000+"
        />
        <Field
          label="Peak reyting"
          name="peak_rank"
          defaultValue={initial?.stats?.peak_rank}
          placeholder="UzNet TOP-3"
        />
      </div>

      <div>
        <label className="block text-xs text-stone-500 mb-1.5">Qisqa tavsif</label>
        <textarea
          name="short_summary"
          defaultValue={initial?.short_summary}
          rows={3}
          required
          className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
        />
      </div>

      <Field
        label="O'lim sabablari (vergul bilan ajrating)"
        name="death_cause_tags"
        defaultValue={initial?.death_cause_tags?.join(", ")}
        placeholder="Telegram ommalashishi, Investitsiya yetishmasligi"
      />

      <Field label="Asoschilari" name="founders" defaultValue={initial?.founders} />

      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-stone-100 text-stone-900 text-sm font-medium hover:bg-white transition"
      >
        Saqlash
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-stone-500 mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue as string | number | undefined}
        required={required}
        placeholder={placeholder}
        className="w-full bg-stone-900/60 border border-stone-800 rounded-lg px-3 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-700/60"
      />
    </div>
  );
}
