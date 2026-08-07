# UzNet Muzeyi

O'zbekiston internet olamining raqamli muzeyi va arxivi — admin panel, foydalanuvchi
takliflari, ijtimoiy ulashish kartalari va RSS/sitemap bilan to'liq platforma.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda oching: http://localhost:3000

## Sayt strukturasi

| Yo'l | Tavsif |
|---|---|
| `/` | Asosiy sahifa — loyiha haqida, statistika, CTA'lar |
| `/muzey` | Muzey galereyasi — loyihalar ramka ko'rinishida |
| `/maqolalar` | Barcha maqolalar ro'yxati |
| `/maqolalar/[slug]` | Bitta loyiha haqida to'liq maqola + ulashish tugmalari |
| `/taklif-qilish` | Foydalanuvchilar yangi loyiha taklif qiladigan forma |
| `/about-us` | Loyiha haqida, missiya |
| `/contact` | Aloqa formasi |
| `/privacy-policy` | Maxfiylik siyosati |
| `/sitemap.xml` | Avtomatik generatsiya qilingan sitemap |
| `/feed.xml` | Maqolalar uchun RSS feed |

## Admin panel

`.env.local` faylida login/parol sozlangan:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=uznet2026
SESSION_SECRET=please-change-this-to-a-long-random-secret-string
```

**Production'ga chiqarishdan oldin bu qiymatlarni albatta o'zgartiring.**

Kirish: **http://localhost:3000/admin/login**

Admin paneldan quyidagilarni bajarish mumkin:
- **Loyihalar** (`/admin/projects`) — qo'shish / tahrirlash / o'chirish
- **Maqolalar** (`/admin/articles`) — yozish / tahrirlash / o'chirish (loyihaga bog'langan holda)
- **Takliflar** (`/admin/submissions`) — foydalanuvchilar `/taklif-qilish` orqali yuborgan
  nomzodlarni ko'rib chiqish, tasdiqlash (avtomatik loyiha sifatida qo'shiladi) yoki rad etish
- **Xabarlar** (`/admin/messages`) — `/contact` formasi orqali kelgan xabarlarni ko'rish

Sessiya `httpOnly`, HMAC bilan imzolangan cookie orqali saqlanadi.

## Ijtimoiy ulashish (OG-kartalar)

Har bir maqola sahifasi (`/maqolalar/[slug]`) uchun avtomatik OG-rasm generatsiya qilinadi
(`opengraph-image.tsx`, Next.js'ning o'rnatilgan `next/og` orqali). Telegram yoki
Twitter/X'da havola ulashilganda loyiha nomi, yillari va statusi bilan chiroyli kartochka
ko'rinadi.

## Struktura

```
data/
  projects.json      — barcha tasdiqlangan loyihalar
  articles.json       — admin yozgan to'liq maqolalar
  submissions.json     — foydalanuvchi takliflari (moderatsiyada)
  messages.json        — aloqa formasi xabarlari
lib/
  actions.ts           — barcha server actions (auth, CRUD, submissions, contact)
  session.ts            — cookie-based sessiya tekshiruvi (HMAC)
  data.ts                — JSON fayllarni o'qish/yozish helper'lari
  types.ts                — TypeScript tiplari
components/
  SiteHeader.tsx / SiteFooter.tsx  — barcha public sahifalarda umumiy
  MuseumGrid.tsx / ProjectFrame.tsx / ProjectModal.tsx — muzey galereyasi
  admin/ProjectForm.tsx / ArticleForm.tsx  — admin formalar
app/
  page.tsx              — asosiy sahifa
  muzey/page.tsx          — muzey galereyasi
  maqolalar/               — maqolalar ro'yxati + [slug] sahifasi + OG-rasm
  taklif-qilish/, contact/, about-us/, privacy-policy/
  admin/                    — himoyalangan admin panel
  sitemap.ts, feed.xml/route.ts, opengraph-image.tsx
middleware.ts              — /admin/* yo'llarini himoya qiluvchi tezkor gate
```

## Muhim eslatma (production uchun)

Ma'lumotlar oddiy JSON fayllarga yoziladi — bu doimiy fayl tizimiga ega serverda (VPS)
yaxshi ishlaydi. Vercel kabi serverless muhitga joylashtirsangiz, fayl yozish operatsiyalari
doimiy saqlanmaydi — production uchun haqiqiy baza (Postgres, va h.k.) ga o'tish tavsiya etiladi.

`SITE_URL` environment o'zgaruvchisini production domeningizga sozlang (sitemap, RSS va
OG meta teglar uchun ishlatiladi), aks holda standart bo'lib `https://uznetmuzeyi.uz` ishlatiladi.

## Texnik stack

- Next.js 14 (App Router) + Server Actions
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- `next/og` — dinamik OG-rasm generatsiyasi
- Node crypto (HMAC) — sessiya imzolash uchun, tashqi auth kutubxonasiz
