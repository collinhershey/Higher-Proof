// Core domain types for Higher Proof

// ============================================================
// Static reference data — bars, ranking lists, and the join
// ============================================================

export type Bar = {
  id: string;              // stable slug, used as primary key
  name: string;
  city: string;
  state?: string;          // 2-letter US state code; undefined for non-US bars
  country: string;
};

export type RankingList = {
  id: string;              // e.g. 'world-2025', 'na-2026'
  name: string;            // "The World's 50 Best Bars"
  shortName: string;       // "World" — for compact UI badges
  region: 'World' | 'North America' | 'Asia' | 'Europe' | 'Personal';
  year: number;
  source: 'official' | 'personal';
};

export type BarRanking = {
  barId: string;
  listId: string;
  rank: number;
};

// ============================================================
// User data — ratings, visits, drinks, status
// ============================================================

export type BarStatus = 'unvisited' | 'wishlist' | 'visited';

export type CocktailRatings = {
  taste?: number;          // 1-10, 0.5 increments
  creativity?: number;
  execution?: number;
};

export type Ratings = {
  cocktails?: CocktailRatings;
  ambiance?: number;
  service?: number;
  xFactor?: number;
  overall?: number;        // independent gestalt score
};

export type DrinkLog = {
  id: string;              // uuid
  name: string;
  rating?: number;         // 1-10
  notes?: string;
  isSignature?: boolean;
  wouldOrderAgain?: boolean;
};

export type Visit = {
  id: string;              // uuid
  date: string;            // ISO date (YYYY-MM-DD)
  notes?: string;
  drinks?: DrinkLog[];
  isDraft?: boolean;       // saved-but-not-finalized state for at-the-bar logging
};

export type UserBarData = {
  id: string;              // matches Bar.id
  status: BarStatus;
  visits?: Visit[];
  ratings?: Ratings;
  notes?: string;          // bar-level durable notes
  isUnderground?: boolean; // user-found bar, not on any ranking list
};
