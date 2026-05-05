import { useMemo } from 'react';
import { useStore } from '../store';
import { BARS, RANKING_LISTS } from '../lib/selectors';
import { RANKINGS_BY_LIST } from '../data/barRankings';
import { computeWeightedScore, formatScore } from '../ratingSystem';

export default function Stats() {
  const userData = useStore((s) => s.userData);

  const overall = useMemo(() => {
    const totalBars = BARS.length;
    const visited = Object.values(userData).filter((u) => u.status === 'visited').length;
    const wishlist = Object.values(userData).filter((u) => u.status === 'wishlist').length;
    const totalDrinks = Object.values(userData).reduce(
      (sum, u) => sum + (u.visits?.reduce((s, v) => s + (v.drinks?.length ?? 0), 0) ?? 0),
      0,
    );
    const ratedBars = Object.values(userData).filter(
      (u) => computeWeightedScore(u.ratings ?? {}) !== undefined,
    );
    return { totalBars, visited, wishlist, totalDrinks, ratedCount: ratedBars.length };
  }, [userData]);

  const topRated = useMemo(() => {
    return Object.values(userData)
      .map((u) => {
        const score = computeWeightedScore(u.ratings ?? {});
        const bar = BARS.find((b) => b.id === u.id);
        return score !== undefined && bar ? { bar, score } : null;
      })
      .filter((x): x is { bar: typeof BARS[0]; score: number } => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [userData]);

  return (
    <div className="px-4 py-4 space-y-6">
      <h2 className="font-display text-2xl text-cream-50">Progress</h2>

      {/* Top-line stats */}
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Visited" value={overall.visited} suffix={`/ ${overall.totalBars}`} />
        <Stat label="Wishlist" value={overall.wishlist} />
        <Stat label="Drinks logged" value={overall.totalDrinks} />
        <Stat label="Rated bars" value={overall.ratedCount} />
      </div>

      {/* Per-list progress */}
      <section className="space-y-3">
        <h3 className="font-sans text-[10px] uppercase tracking-widest text-cream-600">
          By list
        </h3>
        <div className="space-y-2">
          {RANKING_LISTS.map((list) => {
            const listRankings = RANKINGS_BY_LIST.get(list.id) ?? [];
            const total = listRankings.length;
            const visitedCount = listRankings.filter(
              (r) => userData[r.barId]?.status === 'visited',
            ).length;
            const pct = total > 0 ? (visitedCount / total) * 100 : 0;
            return (
              <div
                key={list.id}
                className="bg-ink-800 border border-ink-600 rounded-sm p-3 space-y-2"
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-sm text-cream-50">{list.name}</p>
                  <p className="font-sans text-xs text-cream-400 tabular-nums">
                    {visitedCount} / {total}
                  </p>
                </div>
                <div className="h-1 bg-ink-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top rated */}
      {topRated.length > 0 && (
        <section className="space-y-3">
          <h3 className="font-sans text-[10px] uppercase tracking-widest text-cream-600">
            Your top rated
          </h3>
          <ol className="space-y-1">
            {topRated.map(({ bar, score }, i) => (
              <li
                key={bar.id}
                className="flex items-baseline justify-between border-b border-ink-700 py-2"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-display text-cream-600 tabular-nums w-5">
                    {i + 1}
                  </span>
                  <span className="font-display text-cream-50 truncate">{bar.name}</span>
                  <span className="font-sans text-xs text-cream-400 truncate">
                    {bar.city}
                  </span>
                </div>
                <span className="font-display text-amber tabular-nums">
                  {formatScore(score)}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="bg-ink-800 border border-ink-600 rounded-sm p-4">
      <p className="font-sans text-[10px] uppercase tracking-widest text-cream-600">
        {label}
      </p>
      <p className="font-display text-3xl text-cream-50 tabular-nums mt-1">
        {value}
        {suffix && <span className="text-cream-600 text-base ml-1">{suffix}</span>}
      </p>
    </div>
  );
}
