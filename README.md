# Jezdecký klub Šilheřovice

Web jezdeckého klubu Šilheřovice. Postaveno na Next.js + Sanity.io, nasazeno na Vercel.

## Stack

- **Next.js 16** (App Router, SSG + ISR)
- **Sanity.io** — headless CMS, Studio na `/studio`
- **Tailwind CSS v4**
- **Vercel** — hosting

## Stránky

| Route | Popis |
|---|---|
| `/` | Úvodní stránka s hero, O klubu, náhled koní |
| `/kone` | Seznam všech koní |
| `/kone/[slug]` | Detail koně — foto, info, rodokmen, galerie, videa |
| `/galerie` | Fotogalerie všech koní |
| `/o-nas` | O klubu |
| `/kontakt` | Kontakt s mapou |
| `/studio` | Sanity Studio (CMS) |

## Lokální vývoj

```bash
npm install
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000).

## Proměnné prostředí

Vytvoř `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=99iyhu3q
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=...
SANITY_REVALIDATE_SECRET=...
```

## Sanity schema

Po změně schématu:

```bash
npx sanity@latest schema extract --path schema.json
npx sanity@latest typegen generate
npx sanity@latest schema deploy
```

## Revalidace obsahu

Sanity webhook volá `/api/revalidate?secret=...` po každém publikování. Nastavení: **manage.sanity.io → API → Webhooks**.
