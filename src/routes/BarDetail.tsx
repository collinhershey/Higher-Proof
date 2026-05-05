import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Check, X } from 'lucide-react';
import { useStore } from '../store';
import { getBarView } from '../lib/selectors';
import {
  computeCocktailScore,
  computeWeightedScore,
  formatScore,
  RATING_ANCHORS,
} from '../ratingSystem';
import type { BarStatus, Visit, DrinkLog, Ratings } from '../types';
import StatusBadge from '../components/StatusBadge';
import RankingBadge from '../components/RankingBadge';
import RatingSlider from '../components/RatingSlider';

export default function BarDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userData = useStore((s) => s.userData);
  const setStatus = useStore((s) => s.setStatus);
  const markVisited = useStore((s) => s.markVisited);
  const setRatings = useStore((s) => s.setRatings);
  const setBarNotes = useStore((s) => s.setBarNotes);
  const addVisit = useStore((s) => s.addVisit);
  const updateVisit = useStore((s) => s.updateVisit);
  const deleteVisit = useStore((s) => s.deleteVisit);
  const addDrink = useStore((s) => s.addDrink);
  const updateDrink = useStore((s) => s.updateDrink);
  const deleteDrink = useStore((s) => s.deleteDrink);

  const view = useMemo(() => (id ? getBarView(id, userData) : null), [id, userData]);

  if (!view) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="font-sans text-cream-400">Bar not found.</p>
        <Link to="/" className="text-amber underline">
          Back to list
        </Link>
      </div>
    );
  }

  const { bar, rankings } = view;
  const status: BarStatus = view.userData?.status ?? 'unvisited';
  const ratings: Ratings = view.userData?.ratings ?? {};
  const visits = view.userData?.visits ?? [];
  const cocktailScore = computeCocktailScore(ratings.cocktails);
  const weighted = computeWeightedScore(ratings);

  const updateCocktailSub = (key: keyof NonNullable<Ratings['cocktails']>, v: number | undefined) => {
    setRatings(bar.id, {
      ...ratings,
      cocktails: { ...ratings.cocktails, [key]: v },
    });
  };

  const updateRating = (key: 'ambiance' | 'service' | 'xFactor' | 'overall', v: number | undefined) => {
    setRatings(bar.id, { ...ratings, [key]: v });
  };

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Back nav */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 font-sans text-xs uppercase tracking-widest text-cream-400 hover:text-amber transition-colors"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {/* Header */}
      <header className="space-y-2 border-b border-ink-600 pb-5">
        <h1 className="font-display text-3xl text-cream-50 leading-tight">{bar.name}</h1>
        <p className="font-sans text-sm text-cream-400">
          {bar.city}
          {bar.state && `, ${bar.state}`}
          {`, ${bar.country}`}
        </p>
        {rankings.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {rankings.map((r) => (
              <RankingBadge key={r.listId} ranking={r} list={r.list} />
            ))}
          </div>
        )}
      </header>

      {/* Status controls */}
      <section className="space-y-3">
        <SectionLabel>Status</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {(['unvisited', 'wishlist', 'visited'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(bar.id, s)}
              className={`px-3 py-1.5 border rounded-sm font-sans text-[11px] tracking-widest uppercase transition-colors ${
                status === s
                  ? 'border-amber bg-amber/10 text-amber-glow'
                  : 'border-ink-600 text-cream-400 hover:border-ink-500'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        {status !== 'visited' && (
          <button
            onClick={() => markVisited(bar.id)}
            className="font-sans text-xs text-sage hover:text-sage/80 underline tracking-wider"
          >
            Quick-mark as visited (today, no drinks logged)
          </button>
        )}
      </section>

      {/* Ratings */}
      {status === 'visited' && (
        <section className="space-y-5">
          <div className="flex items-baseline justify-between">
            <SectionLabel>Ratings</SectionLabel>
            <div className="flex items-baseline gap-4 font-sans text-[10px] uppercase tracking-widest text-cream-600">
              <div>
                Weighted{' '}
                <span className="font-display text-base text-amber tabular-nums normal-case ml-1">
                  {formatScore(weighted)}
                </span>
              </div>
            </div>
          </div>

          {/* Cocktails breakdown */}
          <div className="bg-ink-800 border border-ink-600 rounded-sm p-4 space-y-4">
            <div className="flex items-baseline justify-between border-b border-ink-600 pb-2">
              <h3 className="font-display text-base text-cream-50">
                Cocktails <span className="text-cream-600 text-xs ml-1">50%</span>
              </h3>
              <span className="font-display text-2xl text-amber tabular-nums">
                {formatScore(cocktailScore)}
              </span>
            </div>
            <RatingSlider
              label="Taste"
              weight="50%"
              value={ratings.cocktails?.taste}
              onChange={(v) => updateCocktailSub('taste', v)}
              anchors={RATING_ANCHORS.taste}
            />
            <RatingSlider
              label="Creativity"
              weight="30%"
              value={ratings.cocktails?.creativity}
              onChange={(v) => updateCocktailSub('creativity', v)}
              anchors={RATING_ANCHORS.creativity}
            />
            <RatingSlider
              label="Execution"
              weight="20%"
              value={ratings.cocktails?.execution}
              onChange={(v) => updateCocktailSub('execution', v)}
              anchors={RATING_ANCHORS.execution}
            />
          </div>

          {/* Other pillars */}
          <div className="bg-ink-800 border border-ink-600 rounded-sm p-4 space-y-5">
            <RatingSlider
              label="Ambiance"
              weight="20%"
              value={ratings.ambiance}
              onChange={(v) => updateRating('ambiance', v)}
              anchors={RATING_ANCHORS.ambiance}
            />
            <RatingSlider
              label="Service"
              weight="20%"
              value={ratings.service}
              onChange={(v) => updateRating('service', v)}
              anchors={RATING_ANCHORS.service}
            />
            <RatingSlider
              label="X-Factor"
              weight="10%"
              value={ratings.xFactor}
              onChange={(v) => updateRating('xFactor', v)}
              anchors={RATING_ANCHORS.xFactor}
            />
          </div>

          {/* Independent overall */}
          <div className="bg-bitters-dark/15 border border-bitters/30 rounded-sm p-4 space-y-2">
            <RatingSlider
              label="Overall (gestalt)"
              value={ratings.overall}
              onChange={(v) => updateRating('overall', v)}
            />
            {ratings.overall !== undefined && weighted !== undefined && (
              <p className="font-sans text-[11px] text-cream-600 italic leading-relaxed">
                Weighted {formatScore(weighted)} vs your overall {formatScore(ratings.overall)} (Δ{' '}
                {(ratings.overall - weighted).toFixed(1)}). Large gaps mean a component is
                mis-rated or weights are wrong for this bar's style.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Bar-level notes */}
      <section className="space-y-2">
        <SectionLabel>Notes about the bar</SectionLabel>
        <textarea
          value={view.userData?.notes ?? ''}
          onChange={(e) => setBarNotes(bar.id, e.target.value)}
          placeholder="Durable observations — sit at the bar, walk-ins after 10pm, ask for the off-menu mezcal flight…"
          rows={3}
          className="w-full bg-ink-800 border border-ink-600 rounded-sm p-3 text-sm font-sans text-cream-50 placeholder:text-cream-600 focus:outline-none focus:border-amber/60 transition-colors resize-y"
        />
      </section>

      {/* Visits */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Visits & Drink Log</SectionLabel>
          <button
            onClick={() => {
              addVisit(bar.id, {
                date: new Date().toISOString().slice(0, 10),
                isDraft: true,
              });
            }}
            className="flex items-center gap-1 font-sans text-[11px] uppercase tracking-widest text-amber hover:text-amber-glow"
          >
            <Plus size={14} /> Add visit
          </button>
        </div>
        {visits.length === 0 ? (
          <p className="font-sans text-xs text-cream-600 italic">No visits logged yet.</p>
        ) : (
          <div className="space-y-3">
            {[...visits]
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((visit) => (
                <VisitCard
                  key={visit.id}
                  visit={visit}
                  onUpdate={(patch) => updateVisit(bar.id, visit.id, patch)}
                  onDelete={() => deleteVisit(bar.id, visit.id)}
                  onAddDrink={(drink) => addDrink(bar.id, visit.id, drink)}
                  onUpdateDrink={(drinkId, patch) =>
                    updateDrink(bar.id, visit.id, drinkId, patch)
                  }
                  onDeleteDrink={(drinkId) => deleteDrink(bar.id, visit.id, drinkId)}
                />
              ))}
          </div>
        )}
      </section>

      <div className="pb-4">
        <StatusBadge status={status} size="md" />
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-sans text-[10px] uppercase tracking-widest text-cream-600">
      {children}
    </h2>
  );
}

// ============================================================
// VisitCard — visit-level notes, drinks list, draft/finalized
// ============================================================

function VisitCard({
  visit,
  onUpdate,
  onDelete,
  onAddDrink,
  onUpdateDrink,
  onDeleteDrink,
}: {
  visit: Visit;
  onUpdate: (patch: Partial<Visit>) => void;
  onDelete: () => void;
  onAddDrink: (drink: Omit<DrinkLog, 'id'>) => void;
  onUpdateDrink: (drinkId: string, patch: Partial<DrinkLog>) => void;
  onDeleteDrink: (drinkId: string) => void;
}) {
  return (
    <div
      className={`border rounded-sm p-4 space-y-3 ${
        visit.isDraft ? 'border-amber/40 bg-amber/5' : 'border-ink-600 bg-ink-800'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <input
          type="date"
          value={visit.date}
          onChange={(e) => onUpdate({ date: e.target.value })}
          className="bg-transparent border-b border-ink-600 text-cream-50 font-sans text-sm py-1 focus:outline-none focus:border-amber/60"
        />
        <div className="flex items-center gap-3">
          {visit.isDraft ? (
            <button
              onClick={() => onUpdate({ isDraft: false })}
              className="flex items-center gap-1 font-sans text-[11px] uppercase tracking-widest text-amber hover:text-amber-glow"
            >
              <Check size={13} /> Finalize
            </button>
          ) : (
            <span className="font-sans text-[10px] uppercase tracking-widest text-sage">
              Submitted
            </span>
          )}
          <button
            onClick={() => {
              if (confirm('Delete this visit and its drink log?')) onDelete();
            }}
            className="text-cream-600 hover:text-bitters"
            aria-label="Delete visit"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <textarea
        value={visit.notes ?? ''}
        onChange={(e) => onUpdate({ notes: e.target.value })}
        placeholder="Notes from the night — who you went with, what was happening, what stood out…"
        rows={2}
        className="w-full bg-ink-900 border border-ink-600 rounded-sm p-2.5 text-sm font-sans text-cream-50 placeholder:text-cream-600 focus:outline-none focus:border-amber/60 resize-y"
      />

      {/* Drinks */}
      <div className="space-y-2">
        <p className="font-sans text-[10px] uppercase tracking-widest text-cream-600">
          Drinks
        </p>
        {(visit.drinks ?? []).map((drink) => (
          <DrinkRow
            key={drink.id}
            drink={drink}
            onUpdate={(patch) => onUpdateDrink(drink.id, patch)}
            onDelete={() => onDeleteDrink(drink.id)}
          />
        ))}
        <DrinkAddForm onAdd={onAddDrink} />
      </div>
    </div>
  );
}

// ============================================================
// DrinkRow — expandable rating + notes per drink
// ============================================================

function DrinkRow({
  drink,
  onUpdate,
  onDelete,
}: {
  drink: DrinkLog;
  onUpdate: (patch: Partial<DrinkLog>) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-ink-900 border border-ink-700 rounded-sm">
      <div className="flex items-center gap-2 px-3 py-2">
        <input
          value={drink.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="flex-1 bg-transparent font-sans text-sm text-cream-50 focus:outline-none min-w-0"
          placeholder="Drink name"
        />
        {drink.rating !== undefined && (
          <span className="font-display text-amber tabular-nums text-sm">
            {formatScore(drink.rating)}
          </span>
        )}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="font-sans text-[10px] uppercase tracking-widest text-cream-600 hover:text-amber"
        >
          {expanded ? 'Less' : 'More'}
        </button>
        <button
          onClick={onDelete}
          className="text-cream-600 hover:text-bitters"
          aria-label="Delete drink"
        >
          <X size={14} />
        </button>
      </div>
      {expanded && (
        <div className="px-3 pb-3 space-y-3 border-t border-ink-700 pt-3">
          <RatingSlider
            label="Drink rating"
            value={drink.rating}
            onChange={(v) => onUpdate({ rating: v })}
          />
          <textarea
            value={drink.notes ?? ''}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            placeholder="Notes — flavor, presentation, story…"
            rows={2}
            className="w-full bg-ink-800 border border-ink-600 rounded-sm p-2 text-xs font-sans text-cream-50 placeholder:text-cream-600 focus:outline-none focus:border-amber/60 resize-y"
          />
          <div className="flex flex-wrap gap-2">
            <Toggle
              checked={drink.isSignature ?? false}
              onChange={(v) => onUpdate({ isSignature: v })}
              label="Signature drink"
            />
            <Toggle
              checked={drink.wouldOrderAgain ?? false}
              onChange={(v) => onUpdate({ wouldOrderAgain: v })}
              label="Would order again"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center gap-1.5 px-2 py-1 border rounded-sm font-sans text-[11px] tracking-wider transition-colors ${
        checked
          ? 'border-amber bg-amber/10 text-amber-glow'
          : 'border-ink-600 text-cream-400 hover:border-ink-500'
      }`}
    >
      {checked && <Check size={11} />}
      {label}
    </button>
  );
}

function DrinkAddForm({ onAdd }: { onAdd: (drink: Omit<DrinkLog, 'id'>) => void }) {
  const [name, setName] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        onAdd({ name: trimmed });
        setName('');
      }}
      className="flex gap-2"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="+ Add drink"
        className="flex-1 bg-ink-900 border border-ink-700 rounded-sm px-3 py-2 text-sm font-sans text-cream-50 placeholder:text-cream-600 focus:outline-none focus:border-amber/60"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="px-3 py-2 border border-amber/40 bg-amber/5 rounded-sm font-sans text-[11px] uppercase tracking-widest text-amber hover:bg-amber/10 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Add
      </button>
    </form>
  );
}
