# Higher Proof

A personal bar journal for tracking and rating bars on the World's 50 Best and North America's 50 Best lists.

## Stack

- **Vite + React + TypeScript** — same baseline as Headwater
- **Tailwind CSS** — cocktail-menu palette (deep ink, cream, amber, bitters)
- **Zustand** with `persist` middleware → localStorage
- **React Router v6** — three top-level routes: list, bar detail, stats, settings
- **Lucide React** for icons
- **Fraunces** (display) + **Karla** (body) via Google Fonts

## Setup

```bash
npm install
npm run dev
```

Deploy to Vercel: connect the repo, the included `vercel.json` handles SPA fallback for deep links like `/bar/bar-leone`.

## Data architecture

The model deliberately separates **static reference data** from **user data**, and bars from rankings:

```
src/data/bars.ts          → 179 unique bars (identity, location)
src/data/rankingLists.ts  → list metadata (id, name, year, region, source)
src/data/barRankings.ts   → bar↔list join table (200 entries)
```

This means **adding a new list = add metadata + add ranking entries**. No migrations, no schema changes. The same shape supports historical lists (World 2022, NA 2024) and your eventual personal list (`source: 'personal'`).

User data lives in Zustand (persisted to localStorage) and is keyed by bar id:

```typescript
type UserBarData = {
  id: string;              // matches Bar.id
  status: 'unvisited' | 'wishlist' | 'visited';
  ratings?: Ratings;       // 4 pillars + overall
  visits?: Visit[];        // each with own notes + drinks log
  notes?: string;          // bar-level durable notes
  isUnderground?: boolean; // user-found, not on any official list
};
```

## Rating system

**Top-level pillars (weighted to a final score):**
- Cocktails — 50%
- Ambiance — 20%
- Service — 20%
- X-Factor — 10%

**Cocktails breakdown:**
- Taste — 50% of cocktails
- Creativity — 30%
- Execution — 20%

**Overall (independent gestalt score)** — not computed. The UI shows the delta between weighted and overall; large gaps surface mis-rated components or weights that don't fit a particular bar's style.

Weights renormalize when sub-scores are missing, so partial ratings still produce a valid 1-10 number. Reference anchors live in `ratingSystem.ts` and are shown in-app via the info icon next to each slider for consistency over time.

## Adding a new ranking list

1. Add an entry to `src/data/rankingLists.ts`:

```typescript
{ id: 'world-2026', name: "The World's 50 Best Bars 2026", shortName: 'World 2026', region: 'World', year: 2026, source: 'official' }
```

2. Add ranking entries to `src/data/barRankings.ts`. New bars not yet in `bars.ts` need to be added there first (with stable slug ids).

That's it. The list filter, badges, and stats all pick it up automatically.

## Key files

```
src/
├── App.tsx                      # shell + bottom nav + routing
├── main.tsx                     # entry
├── index.css                    # global styles + Tailwind
├── types.ts                     # all type definitions
├── ratingSystem.ts              # weights, score computation, anchors
├── store.ts                     # Zustand + persistence + all actions
├── data/                        # static reference data
│   ├── bars.ts
│   ├── rankingLists.ts
│   └── barRankings.ts
├── lib/
│   └── selectors.ts             # derived data + view models
├── components/
│   ├── StatusBadge.tsx
│   ├── RankingBadge.tsx
│   └── RatingSlider.tsx
└── routes/
    ├── ListView.tsx             # main list with filters
    ├── BarDetail.tsx            # ratings, visits, drinks, notes
    ├── Stats.tsx                # progress + per-list completion
    └── Settings.tsx             # JSON export/import + reset
```

## Backup

All data is in browser localStorage. Use Settings → Export JSON to back up regularly — especially before clearing site data or switching browsers/devices. Import accepts the exported format.

## Deferred

- **Map view** — not in v1. Geocoding 179 bars + Google Maps integration is its own pass.
- **Underground bars** — schema supports it (`isUnderground` flag) but the UI to add user-defined bars is not yet built. When ready, add a "+ New bar" flow that creates an entry without ranking attachments.
- **Personal list** — when you build your own ranked list, it's just another `RankingList` with `source: 'personal'`. Same UI, same components.
