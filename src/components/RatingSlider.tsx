import { useState } from 'react';
import { Info } from 'lucide-react';
import { formatScore } from '../ratingSystem';

type Anchors = Record<number, string>;

export default function RatingSlider({
  label,
  value,
  onChange,
  anchors,
  weight,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
  anchors?: Anchors;
  weight?: string;
}) {
  const [showAnchors, setShowAnchors] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="font-sans text-xs tracking-wider uppercase text-cream-200">
            {label}
          </label>
          {weight && (
            <span className="font-sans text-[10px] text-cream-600 tracking-wide">{weight}</span>
          )}
          {anchors && (
            <button
              type="button"
              onClick={() => setShowAnchors((v) => !v)}
              className="text-cream-600 hover:text-amber transition-colors"
              aria-label="Show rating reference"
            >
              <Info size={13} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-xl text-amber tabular-nums leading-none">
            {formatScore(value)}
          </span>
          {value !== undefined && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="font-sans text-[10px] text-cream-600 hover:text-bitters transition-colors uppercase tracking-widest"
            >
              clear
            </button>
          )}
        </div>
      </div>

      <input
        type="range"
        min={1}
        max={10}
        step={0.5}
        value={value ?? 5.5}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-amber h-1.5"
      />

      {showAnchors && anchors && (
        <div className="bg-ink-800 border border-ink-600 rounded-sm p-3 space-y-1.5">
          {Object.entries(anchors)
            .sort(([a], [b]) => +a - +b)
            .map(([score, text]) => (
              <div key={score} className="flex gap-3 font-sans text-[11px]">
                <span className="font-display text-amber w-6 tabular-nums">{score}</span>
                <span className="text-cream-200 leading-relaxed">{text}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
