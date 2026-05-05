import type { BarStatus } from '../types';

const statusStyles: Record<BarStatus, string> = {
  visited: 'bg-sage/20 text-sage border-sage/40',
  unvisited: 'bg-ink-700 text-cream-600 border-ink-600',
};

const statusLabels: Record<BarStatus, string> = {
  visited: 'Visited',
  unvisited: 'Unvisited',
};

export default function StatusBadge({
  status,
  size = 'sm',
}: {
  status: BarStatus;
  size?: 'sm' | 'md';
}) {
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';
  return (
    <span
      className={`inline-block border rounded-full font-sans tracking-widest uppercase ${sizeClass} ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
