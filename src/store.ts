import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  UserBarData,
  BarStatus,
  Visit,
  DrinkLog,
  Ratings,
} from './types';

// ============================================================
// Store shape
// ============================================================

type UserDataMap = Record<string, UserBarData>;

type StoreState = {
  userData: UserDataMap;
};

type StoreActions = {
  setStatus: (barId: string, status: BarStatus) => void;
  markVisited: (barId: string, date?: string) => void;
  unmarkVisited: (barId: string) => void;
  toggleUnderground: (barId: string) => void;
  setRatings: (barId: string, ratings: Ratings) => void;
  setBarNotes: (barId: string, notes: string) => void;
  addVisit: (barId: string, visit: Omit<Visit, 'id'>) => string;
  updateVisit: (barId: string, visitId: string, patch: Partial<Visit>) => void;
  deleteVisit: (barId: string, visitId: string) => void;
  addDrink: (barId: string, visitId: string, drink: Omit<DrinkLog, 'id'>) => string;
  updateDrink: (
    barId: string,
    visitId: string,
    drinkId: string,
    patch: Partial<DrinkLog>,
  ) => void;
  deleteDrink: (barId: string, visitId: string, drinkId: string) => void;
  importData: (data: UserDataMap) => void;
  resetAll: () => void;
};

type Store = StoreState & StoreActions;

// ============================================================
// Helpers
// ============================================================

const ensureBar = (state: UserDataMap, barId: string): UserBarData => {
  return state[barId] ?? { id: barId, status: 'unvisited' };
};

const todayISO = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

// ============================================================
// Store implementation — every parameter explicitly typed to bypass
// the inference issue between Zustand persist middleware and strict TS
// ============================================================

export const useStore = create<Store>()(
  persist(
    (set) => {
      const setState = set as (
        partial: ((s: Store) => Partial<Store>) | Partial<Store>,
      ) => void;

      const actions: StoreActions = {
        setStatus: (barId: string, status: BarStatus) =>
          setState((s: Store) => ({
            userData: {
              ...s.userData,
              [barId]: { ...ensureBar(s.userData, barId), status },
            },
          })),

        markVisited: (barId: string, date?: string) =>
          setState((s: Store) => {
            const bar = ensureBar(s.userData, barId);
            const visitDate = date ?? todayISO();
            const hasVisitOnDate = bar.visits?.some((v) => v.date === visitDate);
            const visits = hasVisitOnDate
              ? bar.visits
              : [...(bar.visits ?? []), { id: uuidv4(), date: visitDate }];
            return {
              userData: {
                ...s.userData,
                [barId]: { ...bar, status: 'visited', visits },
              },
            };
          }),

        unmarkVisited: (barId: string) =>
          setState((s: Store) => {
            const bar = ensureBar(s.userData, barId);
            const today = todayISO();
            const visits = (bar.visits ?? []).filter((v) => {
              if (v.date !== today) return true;
              const hasNotes = (v.notes ?? '').trim() !== '';
              const hasDrinks = (v.drinks ?? []).length > 0;
              return hasNotes || hasDrinks;
            });
            return {
              userData: {
                ...s.userData,
                [barId]: { ...bar, status: 'unvisited', visits },
              },
            };
          }),

        toggleUnderground: (barId: string) =>
          setState((s: Store) => {
            const bar = ensureBar(s.userData, barId);
            return {
              userData: {
                ...s.userData,
                [barId]: { ...bar, isUnderground: !bar.isUnderground },
              },
            };
          }),

        setRatings: (barId: string, ratings: Ratings) =>
          setState((s: Store) => ({
            userData: {
              ...s.userData,
              [barId]: { ...ensureBar(s.userData, barId), ratings },
            },
          })),

        setBarNotes: (barId: string, notes: string) =>
          setState((s: Store) => ({
            userData: {
              ...s.userData,
              [barId]: { ...ensureBar(s.userData, barId), notes },
            },
          })),

        addVisit: (barId: string, visit: Omit<Visit, 'id'>): string => {
          const id = uuidv4();
          setState((s: Store) => {
            const bar = ensureBar(s.userData, barId);
            return {
              userData: {
                ...s.userData,
                [barId]: {
                  ...bar,
                  status: 'visited',
                  visits: [...(bar.visits ?? []), { ...visit, id }],
                },
              },
            };
          });
          return id;
        },

        updateVisit: (barId: string, visitId: string, patch: Partial<Visit>) =>
          setState((s: Store) => {
            const bar = ensureBar(s.userData, barId);
            const visits = (bar.visits ?? []).map((v) =>
              v.id === visitId ? { ...v, ...patch } : v,
            );
            return {
              userData: { ...s.userData, [barId]: { ...bar, visits } },
            };
          }),

        deleteVisit: (barId: string, visitId: string) =>
          setState((s: Store) => {
            const bar = ensureBar(s.userData, barId);
            const visits = (bar.visits ?? []).filter((v) => v.id !== visitId);
            return {
              userData: { ...s.userData, [barId]: { ...bar, visits } },
            };
          }),

        addDrink: (
          barId: string,
          visitId: string,
          drink: Omit<DrinkLog, 'id'>,
        ): string => {
          const id = uuidv4();
          setState((s: Store) => {
            const bar = ensureBar(s.userData, barId);
            const visits = (bar.visits ?? []).map((v) =>
              v.id === visitId
                ? { ...v, drinks: [...(v.drinks ?? []), { ...drink, id }] }
                : v,
            );
            return {
              userData: { ...s.userData, [barId]: { ...bar, visits } },
            };
          });
          return id;
        },

        updateDrink: (
          barId: string,
          visitId: string,
          drinkId: string,
          patch: Partial<DrinkLog>,
        ) =>
          setState((s: Store) => {
            const bar = ensureBar(s.userData, barId);
            const visits = (bar.visits ?? []).map((v) =>
              v.id !== visitId
                ? v
                : {
                    ...v,
                    drinks: (v.drinks ?? []).map((d) =>
                      d.id === drinkId ? { ...d, ...patch } : d,
                    ),
                  },
            );
            return {
              userData: { ...s.userData, [barId]: { ...bar, visits } },
            };
          }),

        deleteDrink: (barId: string, visitId: string, drinkId: string) =>
          setState((s: Store) => {
            const bar = ensureBar(s.userData, barId);
            const visits = (bar.visits ?? []).map((v) =>
              v.id !== visitId
                ? v
                : { ...v, drinks: (v.drinks ?? []).filter((d) => d.id !== drinkId) },
            );
            return {
              userData: { ...s.userData, [barId]: { ...bar, visits } },
            };
          }),

        importData: (data: UserDataMap) => setState({ userData: data }),

        resetAll: () => setState({ userData: {} }),
      };

      const initial: Store = {
        userData: {},
        ...actions,
      };

      return initial;
    },
    {
      name: 'higher-proof-user-data',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
