import { WCAG_BY_NUMBER, WCAG_CRITERIA } from './wcag.mjs';

/** Worst-first: the library-level rating for a criterion is the worst any component scores. */
const CONFORMANCE_SEVERITY = [
  'Does Not Support',
  'Partially Supports',
  'Supports',
  'Not Applicable',
];

/** Adds the WCAG name and level to each rated criterion. */
export function resolveCriteria(data) {
  return data.criteria.map((criterion) => {
    const { name, level } = WCAG_BY_NUMBER.get(criterion.number);
    return { ...criterion, name, level };
  });
}

/**
 * The count table at the top of each report. Every number is derived from the
 * data: nothing is typed by hand.
 */
export function countCriteria(data, criteria) {
  const count = (conformance) =>
    criteria.filter((criterion) => criterion.conformance === conformance).length;
  const inherited = new Set((data.inherited?.items ?? []).flatMap((item) => item.criteria));

  const counts = {
    supports: count('Supports'),
    partiallySupports: count('Partially Supports'),
    doesNotSupport: count('Does Not Support'),
    notApplicable: WCAG_CRITERIA.length - criteria.length - inherited.size,
  };
  if (data.inherited) {
    counts.inherited = inherited.size;
  }
  counts.flagged = criteria.filter((criterion) => criterion.flagged).length;
  counts.rated = criteria.length;
  return counts;
}

/**
 * The per-component row on the public page: how many criteria apply, how they
 * split by level, how they conform, and how strong the evidence is.
 *
 * `verified` counts criteria confirmed by a test or a recorded review — the
 * ones without a 🚩 flag. `automated` counts those a deterministic test proves
 * on its own, which is the subset that cannot silently regress.
 */
export function summarize(criteria) {
  const count = (predicate) => criteria.filter(predicate).length;

  return {
    rated: criteria.length,
    levelA: count((criterion) => criterion.level === 'A'),
    levelAA: count((criterion) => criterion.level === 'AA'),
    supports: count((criterion) => criterion.conformance === 'Supports'),
    partiallySupports: count((criterion) => criterion.conformance === 'Partially Supports'),
    doesNotSupport: count((criterion) => criterion.conformance === 'Does Not Support'),
    verified: count((criterion) => !criterion.flagged),
    automated: count((criterion) => criterion.group === 'Automated'),
  };
}

/** Collapses the per-component criteria into one row per success criterion. */
export function rollUpCriteria(reports) {
  const byNumber = new Map();

  for (const report of reports) {
    for (const criterion of report.criteria) {
      const existing = byNumber.get(criterion.number);
      if (!existing) {
        byNumber.set(criterion.number, {
          number: criterion.number,
          name: criterion.name,
          level: criterion.level,
          conformance: criterion.conformance,
          flagged: criterion.flagged,
          affected: criterion.conformance === 'Partially Supports' ? [report.component] : [],
        });
        continue;
      }

      if (criterion.conformance === 'Partially Supports') {
        existing.affected.push(report.component);
      }
      existing.flagged = existing.flagged || criterion.flagged;

      const currentRank = CONFORMANCE_SEVERITY.indexOf(existing.conformance);
      const incomingRank = CONFORMANCE_SEVERITY.indexOf(criterion.conformance);
      if (incomingRank < currentRank) {
        existing.conformance = criterion.conformance;
      }
    }
  }

  return [...byNumber.values()].sort((a, b) =>
    a.number.localeCompare(b.number, undefined, { numeric: true }),
  );
}

/** Counts the rolled-up criteria by their library-level (worst) rating. */
export function summarizeRollup(criteria) {
  const count = (conformance) =>
    criteria.filter((criterion) => criterion.conformance === conformance).length;
  const rated = criteria.filter((criterion) => criterion.conformance !== 'Not Applicable');

  return {
    rated: rated.length,
    supports: count('Supports'),
    partiallySupports: count('Partially Supports'),
    doesNotSupport: count('Does Not Support'),
    flagged: rated.filter((criterion) => criterion.flagged).length,
  };
}
