import { BARS, BARS_BY_ID } from '../data/bars';
import { RANKING_LISTS, RANKING_LISTS_BY_ID } from '../data/rankingLists';
import { BAR_RANKINGS, RANKINGS_BY_BAR } from '../data/barRankings';
import type { Bar, BarRanking, RankingList, UserBarData } from '../types';

// ============================================================
// Re-exports for convenience
// ============================================================

export { BARS, BARS_BY_ID, RANKING_LISTS, RANKING_LISTS_BY_ID, BAR_RANKINGS, RANKINGS_BY_BAR };

// ============================================================
// Derived data
// ============================================================

/** All rankings for a bar, sorted newest-list-first. */
export function getRankingsForBar(barId: string): Array<BarRanking & { list: RankingList }> {
  const rankings = RANKINGS_BY_BAR.get(barId) ?? [];
  return rankings
    .map((r) => ({ ...r, list: RANKING_LISTS_BY_ID.get(r.listId)! }))
    .sort((a, b) => b.list.year - a.list.year);
}

/** Filter dimension values derived from the current bar set. */
export function getFilterOptions() {
  const countries = new Set<string>();
  const states = new Set<string>();
  const cities = new Set<string>();
  for (const bar of BARS) {
    countries.add(bar.country);
    if (bar.state) states.add(bar.state);
    cities.add(bar.city);
  }
  return {
    countries: [...countries].sort(),
    states: [...states].sort(),
    cities: [...cities].sort(),
  };
}

// ============================================================
// Combined "view model" — Bar + user data + rankings, in one shape
// ============================================================

export type BarView = {
  bar: Bar;
  userData?: UserBarData;
  rankings: Array<BarRanking & { list: RankingList }>;
};

export function getBarView(barId: string, userData: Record<string, UserBarData>): BarView | null {
  const bar = BARS_BY_ID.get(barId);
  if (!bar) return null;
  return {
    bar,
    userData: userData[barId],
    rankings: getRankingsForBar(barId),
  };
}

export function getAllBarViews(userData: Record<string, UserBarData>): BarView[] {
  return BARS.map((bar) => ({
    bar,
    userData: userData[bar.id],
    rankings: getRankingsForBar(bar.id),
  }));
}
