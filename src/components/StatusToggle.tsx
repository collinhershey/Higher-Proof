import { Check } from 'lucide-react';
import { useStore } from '../store';
import type { BarStatus } from '../types';

export default function StatusToggle({
  barId,
  status,
}: {
  barId: string;
  status: BarStatus;
}) {
  const markVisited = useStore((s) => s.markVisited);
  const unmarkVisited = useStore((s) => s.unmarkVisited);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (status === 'visited') {
      unmarkVisited(barId);
    } else {
      markVisited(barId);
    }
  };

  const isVisited = status === 'visited';

  return (
    <button
      onClick={handleClick}
      aria-label={isVisited ? 'Mark as unvisited' : 'Mark as visited'}
      className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 border rounded-sm font-sans text-[10px] uppercase tracking-widest transition-colors ${
        isVisited
          ? 'bg-sage/15 border-sage/50 text-sage hover:bg-sage/25'
          : 'border-ink-500 text-cream-400 hover:border-cream-400 hover:text-cream-100'
      }`}
    >
      {isVisited && <Check size={11} strokeWidth={2.5} />}
      {isVisited ? 'Visited' : 'Mark visited'}
    </button>
  );
}
