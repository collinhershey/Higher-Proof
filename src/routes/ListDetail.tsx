import { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '../store';
import { RANKING_LISTS_BY_ID, BARS_BY_ID } from '../lib/selectors';
import { RANKINGS_BY_LIST } from '../data/barRankings';
import StatusToggle from '../components/StatusToggle';

export default function ListDetail() {
  const { listId } = useParams<{ listId: string }>();
  const navigate = useNavigate();
  const userData = useStore((s) => s.userData);

  const list = listId ? RANKING_LISTS_BY_ID.get(listId) : undefined;
  const rankings = useMemo(() => {
    if (!listId) return [];
    return [...(RANKINGS_BY_LIST.get(listId) ?? [])].sort((a, b) => a.rank - b.rank);
  }, [listId]);

  if (!list) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="font-sans text-cream-400">List not found.</p>
        <Link to="/lists" className="text-amber underline">
          Back to Lists
        </Link>
      </div>
    );
  }

  const total = rankings.length;
  const visited = rankings.filter(
    (r) => userData[r.barId]?.status === 'visited',
  ).length;

  return (
    <div className="px-4 py-4 space-y-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-cream-400 hover:text-amber transition-colors"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <header className="space-y-2 border-b border-ink-600 pb-4">
        <h1 className="font-display text-2xl text-cream-50 leading-tight">{list.name}</h1>
        <p className="font-sans text-[11px] uppercase tracking-widest text-cream-600">
          {list.region} · {list.year} · {visited} / {total} visited
        </p>
      </header>

      <ul className="divide-y divide-ink-600">
        {rankings.map((r) => {
          const bar = BARS_BY_ID.get(r.barId);
          if (!bar) return null;
          const status = userData[r.barId]?.status ?? 'unvisited';
          return (
            <li key={r.barId}>
              <Link
                to={`/bar/${bar.id}`}
                className="flex items-center gap-3 py-3 px-1 hover:bg-ink-800/40 transition-colors"
              >
                <span className="font-display text-cream-600 tabular-nums w-8 text-right flex-shrink-0">
                  {r.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base text-cream-50 leading-tight truncate">
                    {bar.name}
                  </p>
                  <p className="font-sans text-xs text-cream-400 mt-0.5">
                    {bar.city}
                    {bar.state && `, ${bar.state}`}
                    {!bar.state && `, ${bar.country}`}
                  </p>
                </div>
                <StatusToggle barId={bar.id} status={status} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
