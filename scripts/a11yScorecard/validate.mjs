import path from 'path';
import { exists, rootDirectory } from './files.mjs';
import {
  CONFORMANCE_SYMBOLS,
  EVIDENCE_TYPES,
  GROUP_HEADINGS,
  RESPONSIBILITY_SYMBOLS,
  WCAG_BY_NUMBER,
  WCAG_CRITERIA,
} from './wcag.mjs';

/**
 * The shape of `<Component>/accessibility.json`. Prose fields hold Markdown.
 *
 * - `title` (optional): the display name, when it differs from the folder name.
 * - `intro`, `countsNote` (optional): paragraphs before and after the count table.
 * - `knownGaps`, `levelAAA`, `scope`: `{ intro?: string[], items: string[] }`.
 * - `criteria`: the rated criteria. See `CRITERION_KEYS`.
 * - `inherited` (optional): `{ from, intro?, items: [{ criteria, text }] }`.
 * - `notApplicable`: `[{ criteria, text }]`.
 */
const REPORT_KEYS = {
  title: 'string',
  intro: 'strings',
  countsNote: 'strings',
  knownGaps: 'listSection',
  criteria: 'array',
  inherited: 'object',
  notApplicable: 'array',
  levelAAA: 'listSection',
  scope: 'listSection',
};
const REQUIRED_REPORT_KEYS = ['knownGaps', 'criteria', 'notApplicable', 'levelAAA', 'scope'];

const CRITERION_KEYS = {
  number: 'string',
  conformance: 'string',
  responsibility: 'string',
  group: 'string',
  flagged: 'boolean',
  evidence: 'array',
  notes: 'strings',
  details: 'string',
  steps: 'strings',
  pass: 'string',
};
const REQUIRED_CRITERION_KEYS = [
  'number',
  'conformance',
  'responsibility',
  'group',
  'flagged',
  'evidence',
  'notes',
];

const isStrings = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === 'string' && item.trim() !== '');

function checkType(value, type) {
  switch (type) {
    case 'strings':
      return isStrings(value);
    case 'array':
      return Array.isArray(value);
    case 'object':
      return value !== null && typeof value === 'object' && !Array.isArray(value);
    case 'listSection':
      return (
        checkType(value, 'object') &&
        isStrings(value.items) &&
        (value.intro === undefined || isStrings(value.intro)) &&
        Object.keys(value).every((key) => key === 'intro' || key === 'items')
      );
    default:
      return typeof value === type;
  }
}

/** Checks an object against a `{ key: type }` map. */
function checkKeys(object, keys, required, where, violations) {
  for (const key of required) {
    if (object[key] === undefined) {
      violations.push(`${where}: missing "${key}"`);
    }
  }
  for (const [key, value] of Object.entries(object)) {
    if (!keys[key]) {
      violations.push(`${where}: unknown key "${key}"`);
    } else if (!checkType(value, keys[key])) {
      violations.push(`${where}: "${key}" must be ${keys[key]}`);
    }
  }
}

function checkCriteriaList(entries, where, violations) {
  entries.forEach((entry, index) => {
    const at = `${where}[${index}]`;
    checkKeys(entry, { criteria: 'strings', text: 'string' }, ['criteria', 'text'], at, violations);
  });
}

/** Checks one criterion's fields and the evidence behind its rating. */
async function checkCriterion(criterion, where, violations) {
  checkKeys(criterion, CRITERION_KEYS, REQUIRED_CRITERION_KEYS, where, violations);

  if (!CONFORMANCE_SYMBOLS[criterion.conformance]) {
    violations.push(`${where}: unknown conformance "${criterion.conformance}"`);
  }
  if (!RESPONSIBILITY_SYMBOLS[criterion.responsibility]) {
    violations.push(`${where}: unknown responsibility "${criterion.responsibility}"`);
  }
  if (!GROUP_HEADINGS[criterion.group]) {
    violations.push(`${where}: unknown group "${criterion.group}"`);
  }
  if ((criterion.steps === undefined) !== (criterion.pass === undefined)) {
    violations.push(`${where}: "steps" and "pass" go together`);
  }

  await Promise.all(
    (criterion.evidence ?? []).map(async (entry, index) => {
      const at = `${where}.evidence[${index}]`;
      checkKeys(entry, { type: 'string', ref: 'string' }, ['type', 'ref'], at, violations);
      if (!EVIDENCE_TYPES.includes(entry.type)) {
        violations.push(`${at}: unknown type "${entry.type}"`);
      } else if (entry.type !== 'review' && !(await exists(path.join(rootDirectory, entry.ref)))) {
        violations.push(`${at}: "${entry.ref}" does not exist`);
      }
    }),
  );

  // An ⚙️ Automated rating claims that something deterministic proves the
  // criterion, so it must name that test, and it cannot also be flagged 🚩.
  if (criterion.group === 'Automated') {
    if (criterion.flagged) {
      violations.push(`${where}: rated Automated but still flagged 🚩`);
    }
    if (!(criterion.evidence ?? []).some((entry) => entry.type !== 'review')) {
      violations.push(`${where}: rated Automated but has no axe, unit, or Playwright evidence`);
    }
  }
}

/**
 * A report accounts for each WCAG 2.2 Level A and AA criterion exactly once:
 * rated, inherited, or not applicable.
 */
function checkAccounting(data, violations) {
  const seen = new Map();
  const note = (number, where) => seen.set(number, [...(seen.get(number) ?? []), where]);

  (data.criteria ?? []).forEach((criterion) => note(criterion.number, 'criteria'));
  (data.inherited?.items ?? []).forEach((item) =>
    item.criteria?.forEach((number) => note(number, 'inherited')),
  );
  (data.notApplicable ?? []).forEach((item) =>
    item.criteria?.forEach((number) => note(number, 'notApplicable')),
  );

  for (const [number, places] of seen) {
    if (!WCAG_BY_NUMBER.has(number)) {
      violations.push(`${number} is not a WCAG 2.2 Level A or AA criterion`);
    } else if (places.length > 1) {
      violations.push(`${number} is listed more than once (${places.join(', ')})`);
    }
  }
  for (const { number } of WCAG_CRITERIA) {
    if (!seen.has(number)) {
      violations.push(`${number} is not rated, inherited, or listed as not applicable`);
    }
  }
}

/** Returns every problem in one report's data, prefixed with the component name. */
export default async function validateReport({ component, data }) {
  const violations = [];
  checkKeys(data, REPORT_KEYS, REQUIRED_REPORT_KEYS, 'report', violations);

  await Promise.all(
    (data.criteria ?? []).map((criterion, index) =>
      checkCriterion(criterion, `criteria[${index}] (${criterion.number})`, violations),
    ),
  );
  if (data.inherited) {
    checkKeys(
      data.inherited,
      { from: 'string', intro: 'strings', items: 'array' },
      ['from', 'items'],
      'inherited',
      violations,
    );
    checkCriteriaList(data.inherited.items ?? [], 'inherited.items', violations);
  }
  checkCriteriaList(data.notApplicable ?? [], 'notApplicable', violations);
  checkAccounting(data, violations);

  return violations.map((violation) => `${component}: ${violation}`);
}
