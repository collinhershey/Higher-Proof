import { Check, Circle } from 'lucide-react';
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
      className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
        isVisited
          ? 'bg-sage/20 border-sage text-sage hover:bg-sage/30'
          : 'border-ink-500 text-cream-600 hover:border-cream-400 hover:text-cream-200'
      }`}
    >
      {isVisited ? <Check size={16} strokeWidth={2.5} /> : <Circle size={14} strokeWidth={1.5} />}
    </button>
  );
}
