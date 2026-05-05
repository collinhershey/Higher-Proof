import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ChevronDown } from 'lucide-react';
import { useStore } from '../store';
import { getAllBarViews, RANKING_LISTS, getFilterOptions, type BarView } from '../lib/selectors';
import StatusToggle from '../components/StatusToggle';
import RankingBadge from '../components/RankingBadge';

type Filters = {
  search: string;
  listId: string | null;       // null = all lists (and underground)
  country: string | null;
  state: string | null;
  status: 'all' | 'visited' | 'unvisited';
};

const defaultFilters: Filters = {
  search: '',
  listId: null,
  country: null,
  state: null,
  status: 'all',
};

export default function ListView() {
  const userData = useStore((s) => s.userData);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);

  const allViews = useMemo(() => getAllBarViews(userData), [userData]);
  const filterOptions = useMemo(() => getFilterOptions(), []);

  const filtered = useMemo(() => filterViews(allViews, filters), [allViews, filters]);

  const activeFilterCount = countActiveFilters(filters);

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-600"
        />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          placeholder="Search bars, cities…"
          className="w-full bg-ink-800 border border-ink-600 rounded-sm pl-9 pr-9 py-2.5 text-sm font-sans text-cream-50 placeholder:text-cream-600 focus:outline-none focus:border-amber/60 transition-colors"
        />
        {filters.search && (
          <button
            onClick={() => setFilters((f) => ({ ...f, search: '' }))}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-600 hover:text-cream-50"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter toggle + active count */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters((s) => !s)}
          className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-cream-400 hover:text-cream-50 transition-colors"
        >
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-amber/20 text-amber px-1.5 py-0.5 rounded-sm text-[10px]">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown
            size={14}
            className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}
          />
        </button>
        <p className="font-sans text-xs text-cream-600 tabular-nums">
          {filtered.length} {filtered.length === 1 ? 'bar' : 'bars'}
        </p>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-ink-800 border border-ink-600 rounded-sm p-4 space-y-4">
          {/* Status pills */}
          <FilterGroup label="Status">
            {(['all', 'unvisited', 'visited'] as const).map((s) => (
              <Pill
                key={s}
                active={filters.status === s}
                onClick={() => setFilters((f) => ({ ...f, status: s }))}
              >
                {s === 'all' ? 'All' : s[0].toUpperCase() + s.slice(1)}
              </Pill>
            ))}
          </FilterGroup>

          {/* List pills */}
          <FilterGroup label="Ranking list">
            <Pill
              active={filters.listId === null}
              onClick={() => setFilters((f) => ({ ...f, listId: null }))}
            >
              All lists
            </Pill>
            {RANKING_LISTS.map((list) => (
              <Pill
                key={list.id}
                active={filters.listId === list.id}
                onClick={() => setFilters((f) => ({ ...f, listId: list.id }))}
              >
                {list.shortName}
              </Pill>
            ))}
          </FilterGroup>

          {/* Country select */}
          <FilterGroup label="Country">
            <select
              value={filters.country ?? ''}
              onChange={(e) =>
                setFilters((f) => ({ ...f, country: e.target.value || null }))
              }
              className="w-full bg-ink-900 border border-ink-600 rounded-sm py-1.5 px-2 font-sans text-xs text-cream-50"
            >
              <option value="">All countries</option>
              {filterOptions.countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FilterGroup>

          {/* State select (only US) */}
          <FilterGroup label="State (US)">
            <select
              value={filters.state ?? ''}
              onChange={(e) =>
                setFilters((f) => ({ ...f, state: e.target.value || null }))
              }
              className="w-full bg-ink-900 border border-ink-600 rounded-sm py-1.5 px-2 font-sans text-xs text-cream-50"
            >
              <option value="">All states</option>
              {filterOptions.states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </FilterGroup>

          {activeFilterCount > 0 && (
            <button
              onClick={() => setFilters(defaultFilters)}
              className="font-sans text-[11px] uppercase tracking-widest text-bitters hover:text-bitters-glow"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* List */}
      <ul className="divide-y divide-ink-600 border-t border-b border-ink-600">
        {filtered.map((view) => (
          <BarRow key={view.bar.id} view={view} />
        ))}
        {filtered.length === 0 && (
          <li className="py-8 text-center font-sans text-sm text-cream-600">
            No bars match those filters.
          </li>
        )}
      </ul>
    </div>
  );
}

// ============================================================
// Sub-components
// ============================================================

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="font-sans text-[10px] uppercase tracking-widest text-cream-600">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 border rounded-sm font-sans text-[11px] tracking-wider transition-colors ${
        active
          ? 'border-amber bg-amber/10 text-amber-glow'
          : 'border-ink-600 text-cream-400 hover:border-ink-500 hover:text-cream-200'
      }`}
    >
      {children}
    </button>
  );
}

function BarRow({ view }: { view: BarView }) {
  const status = view.userData?.status ?? 'unvisited';
  return (
    <li>
      <Link
        to={`/bar/${view.bar.id}`}
        className="block py-3.5 px-1 hover:bg-ink-800/40 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg text-cream-50 leading-tight truncate">
              {view.bar.name}
            </h3>
            <p className="font-sans text-xs text-cream-400 mt-0.5">
              {view.bar.city}
              {view.bar.state && `, ${view.bar.state}`}
              {view.bar.state ? '' : `, ${view.bar.country}`}
            </p>
            {view.rankings.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {view.rankings.map((r) => (
                  <RankingBadge key={r.listId} ranking={r} list={r.list} />
                ))}
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <StatusToggle barId={view.bar.id} status={status} />
          </div>
        </div>
      </Link>
    </li>
  );
}

// ============================================================
// Filtering logic
// ============================================================

function filterViews(views: BarView[], f: Filters): BarView[] {
  const search = f.search.trim().toLowerCase();

  return views
    .filter((v) => {
      if (search) {
        const haystack = [v.bar.name, v.bar.city, v.bar.country, v.bar.state ?? '']
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(search)) return false;
      }

      if (f.listId !== null) {
        if (!v.rankings.some((r) => r.listId === f.listId)) return false;
      }

      if (f.country && v.bar.country !== f.country) return false;
      if (f.state && v.bar.state !== f.state) return false;

      const status = v.userData?.status ?? 'unvisited';
      if (f.status !== 'all' && status !== f.status) return false;

      return true;
    })
    .sort((a, b) => a.bar.name.localeCompare(b.bar.name));
}

function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.listId !== null) n++;
  if (f.country !== null) n++;
  if (f.state !== null) n++;
  if (f.status !== 'all') n++;
  return n;
}
