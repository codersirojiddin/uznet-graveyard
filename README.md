# UzNet Graveyard

O'zbekiston internet olamining nostalgik va viral "qabristoni" — admin panel bilan.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda oching: http://localhost:3000 (avtomatik `/graveyard` ga yo'naltiradi)

## Admin panel

`.env.local` faylida login/parol sozlangan (standart holatda):

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=uznet2026
SESSION_SECRET=please-change-this-to-a-long-random-secret-string
```

**Production'ga chiqarishdan oldin bu qiymatlarni albatta o'zgartiring**, ayniqsa `SESSION_SECRET` ni uzun va tasodifiy qatorga almashtiring.

Kirish: **http://localhost:3000/admin/login**

Admin paneldan quyidagilarni bajarish mumkin:
- Yangi loyiha qo'shish / tahrirlash / o'chirish (`/admin/projects`)
- Yangi maqola yozish / tahrirlash / o'chirish (`/admin/articles`)
- Har bir maqola bitta loyihaga bog'lanadi; maqola saqlanganda loyihaning "Batafsil o'qish" tugmasi avtomatik faollashadi

Sessiya `httpOnly`, imzolangan (HMAC) cookie orqali saqlanadi — token `.env.local` dagi `SESSION_SECRET` bilan tasdiqlanadi.

## Struktura

- `data/projects.json` — barcha loyihalar ma'lumoti
- `data/articles.json` — admin tomonidan yozilgan to'liq maqolalar
- `lib/actions.ts` — auth va CRUD uchun server actions
- `lib/session.ts` — cookie-based sessiya tekshiruvi
- `middleware.ts` — `/admin/*` yo'llarini himoya qiluvchi tezkor gate
- `app/graveyard/page.tsx` — asosiy Graveyard sahifasi (fon rasmi bilan)
- `app/maqolalar/[slug]/page.tsx` — har bir loyiha uchun to'liq maqola sahifasi
- `app/admin/login/page.tsx` — login sahifasi
- `app/admin/(dashboard)/` — himoyalangan admin panel sahifalari

## Muhim eslatma (production uchun)

Ma'lumotlar oddiy JSON fayllarga (`data/projects.json`, `data/articles.json`) yoziladi. Bu lokal yoki doimiy fayl tizimiga ega serverda (masalan, VPS) yaxshi ishlaydi. Agar Vercel kabi serverless muhitga joylashtirsangiz, fayl yozish operatsiyalari doimiy saqlanmaydi — production uchun haqiqiy baza (Postgres, SQLite + persistent disk va h.k.) ga o'tish tavsiya etiladi.

## Texnik stack

- Next.js 14 (App Router) + Server Actions
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion (animatsiyalar)
- Node crypto (HMAC) — sessiya imzolash uchun, tashqi auth kutubxonasiz
