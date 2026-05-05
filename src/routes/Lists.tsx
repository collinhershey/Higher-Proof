import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useStore } from '../store';
import { RANKING_LISTS } from '../lib/selectors';
import { RANKINGS_BY_LIST } from '../data/barRankings';

export default function Lists() {
  const userData = useStore((s) => s.userData);
  const sorted = [...RANKING_LISTS].sort(
    (a, b) => b.year - a.year || a.region.localeCompare(b.region),
  );

  return (
    <div className="px-4 py-4 space-y-4">
      <h2 className="font-display text-2xl text-cream-50">Lists</h2>
      <p className="font-sans text-xs text-cream-400 leading-relaxed">
        View any list as it was published — rank-ordered, top to bottom.
      </p>

      <div className="space-y-3">
        {sorted.map((list) => {
          const rankings = RANKINGS_BY_LIST.get(list.id) ?? [];
          const total = rankings.length;
          const visited = rankings.filter(
            (r) => userData[r.barId]?.status === 'visited',
          ).length;
          const pct = total > 0 ? (visited / total) * 100 : 0;

          return (
            <Link
              key={list.id}
              to={`/lists/${list.id}`}
              className="block bg-ink-800 border border-ink-600 rounded-sm p-4 hover:border-amber/40 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-2">
                  <h3 className="font-display text-base text-cream-50 leading-tight">
                    {list.name}
                  </h3>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-cream-600">
                    {list.region} · {list.year}
                  </p>
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between font-sans text-xs">
                      <span className="text-cream-400">Progress</span>
                      <span className="text-cream-200 tabular-nums">
                        {visited} / {total}
                      </span>
                    </div>
                    <div className="h-1 bg-ink-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-cream-600 mt-1 flex-shrink-0" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
