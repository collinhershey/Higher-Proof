import type { RankingList, BarRanking } from '../types';

export default function RankingBadge({
  ranking,
  list,
  onClick,
}: {
  ranking: BarRanking;
  list: RankingList;
  onClick?: () => void;
}) {
  const Component = onClick ? 'button' : 'span';
  return (
    <Component
      onClick={onClick}
      className={`inline-flex items-baseline gap-1.5 px-2 py-1 border border-amber/30 bg-amber/5 rounded-sm font-sans text-[10px] tracking-wider uppercase text-amber-glow ${
        onClick ? 'hover:border-amber/60 hover:bg-amber/10 transition-colors cursor-pointer' : ''
      }`}
    >
      <span className="text-cream-400">{list.shortName}</span>
      <span className="font-display text-cream-50 font-semibold text-sm leading-none">
        #{ranking.rank}
      </span>
    </Component>
  );
}
