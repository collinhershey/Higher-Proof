import type { CocktailRatings, Ratings } from './types';

// ============================================================
// Weights
// ============================================================

export const WEIGHTS = {
  cocktails: 0.5,
  ambiance: 0.2,
  service: 0.2,
  xFactor: 0.1,
} as const;

export const COCKTAIL_WEIGHTS = {
  taste: 0.5,
  creativity: 0.3,
  execution: 0.2,
} as const;

// ============================================================
// Score computation
// ============================================================

/**
 * Computes weighted cocktail score from sub-components.
 * Returns undefined if no sub-scores are defined.
 * If only some sub-scores are present, weights renormalize over the defined
 * subset so a partial rating still yields a valid 1-10 number.
 */
export function computeCocktailScore(c?: CocktailRatings): number | undefined {
  if (!c) return undefined;
  const candidates: Array<[number | undefined, number]> = [
    [c.taste, COCKTAIL_WEIGHTS.taste],
    [c.creativity, COCKTAIL_WEIGHTS.creativity],
    [c.execution, COCKTAIL_WEIGHTS.execution],
  ];
  return weightedAvg(candidates);
}

/**
 * Computes the top-level weighted score across all four pillars.
 * Renormalizes weights over whichever pillars are rated.
 */
export function computeWeightedScore(r: Ratings): number | undefined {
  const cocktailScore = computeCocktailScore(r.cocktails);
  const candidates: Array<[number | undefined, number]> = [
    [cocktailScore, WEIGHTS.cocktails],
    [r.ambiance, WEIGHTS.ambiance],
    [r.service, WEIGHTS.service],
    [r.xFactor, WEIGHTS.xFactor],
  ];
  return weightedAvg(candidates);
}

/**
 * Internal helper. Takes [value, weight] pairs where value may be undefined.
 * Drops undefined values, renormalizes weights over the rest.
 */
function weightedAvg(pairs: Array<[number | undefined, number]>): number | undefined {
  const defined = pairs.filter((p): p is [number, number] => p[0] !== undefined);
  if (defined.length === 0) return undefined;
  const totalWeight = defined.reduce((s, [, w]) => s + w, 0);
  return defined.reduce((s, [v, w]) => s + v * w, 0) / totalWeight;
}

/**
 * Format a 1-10 score as a string with at most one decimal.
 * Returns '—' for undefined.
 */
export function formatScore(score: number | undefined): string {
  if (score === undefined) return '—';
  return score.toFixed(1).replace(/\.0$/, '');
}

// ============================================================
// Rating anchors — display in UI for consistency over time
// ============================================================

export const RATING_ANCHORS = {
  taste: {
    3: 'Off-balance or unpleasant',
    5: 'Pleasant but forgettable',
    7: "I'd order it again",
    9: 'Still thinking about it days later',
    10: 'Best version of this drink I have had',
  },
  creativity: {
    3: 'Standard menu, nothing novel',
    5: 'Familiar drinks, minor twists',
    7: 'Genuinely interesting menu choices',
    9: 'Pushing the form — new ingredients or techniques',
    10: 'Defining new territory for the craft',
  },
  execution: {
    3: 'Inconsistent, technical flaws',
    5: 'Solid but unremarkable',
    7: 'Precise, consistent across drinks',
    9: 'Flawless — dilution, temp, garnish all perfect',
    10: 'Every drink is the platonic version of itself',
  },
  ambiance: {
    3: 'Off-putting or sterile',
    5: 'Fine, neutral',
    7: 'Genuinely good space, would linger',
    9: 'Transportive — worth being there even without a drink',
    10: 'Singular sense of place',
  },
  service: {
    3: 'Slow, distant, or transactional',
    5: 'Competent and polite',
    7: 'Attentive, knowledgeable, well-paced',
    9: 'Hospitality as craft — anticipates without intruding',
    10: 'The service itself is part of the memory',
  },
  xFactor: {
    3: 'Generic — could be any good bar',
    5: 'A nice place, no signature',
    7: 'Has a distinct identity',
    9: 'Memorable enough to recommend on the X-factor alone',
    10: 'Legendary — a story you tell',
  },
} as const;
