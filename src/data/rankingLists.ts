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
  {
    id: 'world-2022',
    name: "The World's 50 Best Bars 2022",
    shortName: 'World 2022',
    region: 'World',
    year: 2022,
    source: 'official',
  },
  {
    id: 'world-2023',
    name: "The World's 50 Best Bars 2023",
    shortName: 'World 2023',
    region: 'World',
    year: 2023,
    source: 'official',
  },
  {
    id: 'world-2024',
    name: "The World's 50 Best Bars 2024",
    shortName: 'World 2024',
    region: 'World',
    year: 2024,
    source: 'official',
  },
  {
    id: 'na-2022',
    name: "North America's 50 Best Bars 2022",
    shortName: 'NA 2022',
    region: 'North America',
    year: 2022,
    source: 'official',
  },
  {
    id: 'na-2023',
    name: "North America's 50 Best Bars 2023",
    shortName: 'NA 2023',
    region: 'North America',
    year: 2023,
    source: 'official',
  },
  {
    id: 'na-2024',
    name: "North America's 50 Best Bars 2024",
    shortName: 'NA 2024',
    region: 'North America',
    year: 2024,
    source: 'official',
  },
  {
    id: 'na-2025',
    name: "North America's 50 Best Bars 2025",
    shortName: 'NA 2025',
    region: 'North America',
    year: 2025,
    source: 'official',
  },
  {
    id: 'asia-2022',
    name: "Asia's 50 Best Bars 2022",
    shortName: 'Asia 2022',
    region: 'Asia',
    year: 2022,
    source: 'official',
  },
  {
    id: 'asia-2023',
    name: "Asia's 50 Best Bars 2023",
    shortName: 'Asia 2023',
    region: 'Asia',
    year: 2023,
    source: 'official',
  },
  {
    id: 'asia-2024',
    name: "Asia's 50 Best Bars 2024",
    shortName: 'Asia 2024',
    region: 'Asia',
    year: 2024,
    source: 'official',
  },
  {
    id: 'asia-2025',
    name: "Asia's 50 Best Bars 2025",
    shortName: 'Asia 2025',
    region: 'Asia',
    year: 2025,
    source: 'official',
  },
];

export const RANKING_LISTS_BY_ID: Map<string, RankingList> = new Map(
  RANKING_LISTS.map((l) => [l.id, l]),
);
