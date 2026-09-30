import path from 'path';
import { exists, rootDirectory } from './files.mjs';
import { renderReport } from './render.mjs';
import { countCriteria, flatGroups, resolveCriteria } from './rollup.mjs';
import {
  CONFORMANCE_SYMBOLS,
  EVIDENCE_TYPES,
  GROUP_HEADINGS,
  RESPONSIBILITY_SYMBOLS,
  WCAG_BY_NUMBER,
  WCAG_CRITERIA,
} from './wcag.mjs';

/**
 * The shape of `<Component>/accessibility.json`. It holds what the script
 * computes with; the prose lives in the Markdown report, between region markers.
 *
 * - `title` (optional): the display name, when it differs from the folder name.
 * - `axe` (optional): the committed `*.a11y.json` for the component's demos.
 * - `criteria`: the rated criteria, keyed by number. See `CRITERION_KEYS`.
 * - `inherited` (optional): `{ from, criteria }`.
 * - `notApplicable`, `inherited.criteria`: criterion numbers. A nested array
 *   groups criteria that share one reason.
 */
const REPORT_KEYS = {
  title: 'string',
  axe: 'string',
  criteria: 'object',
  inherited: 'object',
  notApplicable: 'groups',
};
const REQUIRED_REPORT_KEYS = ['criteria', 'notApplicable'];

const CRITERION_KEYS = {
  conformance: 'string',
  responsibility: 'string',
  group: 'string',
  flagged: 'boolean',
  evidence: 'array',
};
const REQUIRED_CRITERION_KEYS = ['conformance', 'responsibility', 'group', 'flagged'];

const isStrings = (value) =>
  Array.isArray(value) && value.every((item) => typeof item === 'string' && item.trim() !== '');

function checkType(value, type) {
  switch (type) {
    case 'array':
      return Array.isArray(value);
    case 'object':
      return value !== null && typeof value === 'object' && !Array.isArray(value);
    case 'groups':
      return (
        Array.isArray(value) &&
        value.every((group) => (Array.isArray(group) ? isStrings(group) : isStrings([group])))
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

/** Checks one resolved criterion's values and the evidence behind its rating. */
async function checkCriterion(criterion, where, violations) {
  if (!CONFORMANCE_SYMBOLS[criterion.conformance]) {
    violations.push(`${where}: unknown conformance "${criterion.conformance}"`);
  }
  if (!RESPONSIBILITY_SYMBOLS[criterion.responsibility]) {
    violations.push(`${where}: unknown responsibility "${criterion.responsibility}"`);
  }
  if (!GROUP_HEADINGS[criterion.group]) {
    violations.push(`${where}: unknown group "${criterion.group}"`);
  }

  await Promise.all(
    (criterion.evidence ?? [])
      .filter((entry) => entry.type !== 'axe')
      .map(async (entry, index) => {
        const at = `${where}.evidence[${index}]`;
        checkKeys(entry, { type: 'string', ref: 'string' }, ['type', 'ref'], at, violations);
        if (!EVIDENCE_TYPES.includes(entry.type)) {
          violations.push(`${at}: unknown type "${entry.type}"`);
        } else if (
          entry.type !== 'review' &&
          !(await exists(path.join(rootDirectory, entry.ref)))
        ) {
          violations.push(`${at}: "${entry.ref}" does not exist`);
        }
      }),
  );

  for (const { rule, status } of criterion.axeRules) {
    if (status === 'fail' && criterion.conformance === 'Supports') {
      violations.push(`${where}: rated Supports but axe rule "${rule}" fails`);
    }
  }

  // An ⚙️ Automated rating claims that something deterministic proves the
  // criterion, so it must name that test, and it cannot also be flagged 🚩.
  if (criterion.group === 'Automated') {
    if (criterion.flagged) {
      violations.push(`${where}: rated Automated but still flagged 🚩`);
    }
    if (!criterion.evidence.some((entry) => entry.type !== 'review')) {
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

  Object.keys(data.criteria).forEach((number) => note(number, 'criteria'));
  flatGroups(data.inherited?.criteria).forEach((number) => note(number, 'inherited'));
  flatGroups(data.notApplicable).forEach((number) => note(number, 'notApplicable'));

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

/**
 * The prose in the Markdown report has to match the data. A region that the
 * report no longer renders would be dropped, so it fails instead. With `check`,
 * each rated criterion also needs its notes.
 */
function checkRegions(report, check, violations) {
  const used = new Set();
  renderReport(report, used);
  for (const [name, content] of report.regions) {
    if (content && !used.has(name)) {
      violations.push(
        `accessibility.md: region "${name}" has prose but nothing in the data renders it`,
      );
    }
  }
  if (check) {
    for (const { number } of report.criteria) {
      if (!report.regions.get(number)) {
        violations.push(`accessibility.md: ${number} has no notes`);
      }
    }
  }
}

/** Returns every problem in one report, prefixed with the component name. */
export default async function validateReport(report, check) {
  const { component, data } = report;
  const violations = [];
  const done = () => violations.map((violation) => `${component}: ${violation}`);

  checkKeys(data, REPORT_KEYS, REQUIRED_REPORT_KEYS, 'report', violations);
  if (violations.length > 0) {
    return done();
  }
  if (data.axe !== undefined && !report.axe) {
    violations.push(`axe: "${data.axe}" does not exist`);
  }
  for (const [number, criterion] of Object.entries(data.criteria)) {
    checkKeys(criterion, CRITERION_KEYS, REQUIRED_CRITERION_KEYS, `criteria.${number}`, violations);
  }
  if (data.inherited) {
    checkKeys(
      data.inherited,
      { from: 'string', criteria: 'groups' },
      ['from', 'criteria'],
      'inherited',
      violations,
    );
  }
  checkAccounting(data, violations);
  if (violations.length > 0) {
    return done();
  }

  const criteria = resolveCriteria(report);
  await Promise.all(
    criteria.map((criterion) =>
      checkCriterion(criterion, `criteria.${criterion.number}`, violations),
    ),
  );
  checkRegions({ ...report, criteria, counts: countCriteria(data, criteria) }, check, violations);

  return done();
}
