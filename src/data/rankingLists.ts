import type { RankingList } from '../types';

// Each ranked list this app supports. Add new lists here as they're released.
// The id is used as a foreign key in barRankings.ts.

export const RANKING_LISTS: RankingList[] = [
  {
    id: 'world-2025',
    name: "The World's 50 Best Bars 2025",
    shortName: 'World 2025',
    region: 'World',
    year: 2025,
    source: 'official',
  },
  {
    id: 'na-2026',
    name: "North America's 50 Best Bars 2026",
    shortName: 'NA 2026',
    region: 'North America',
    year: 2026,
    source: 'official',
  },
];

export const RANKING_LISTS_BY_ID: Map<string, RankingList> = new Map(
  RANKING_LISTS.map((l) => [l.id, l]),
);
