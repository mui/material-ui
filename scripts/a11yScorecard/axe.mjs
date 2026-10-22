import fs from 'fs/promises';
import path from 'path';
import axe from 'axe-core';
import { rootDirectory } from './files.mjs';
import { wcagTag } from './wcag.mjs';

const RULE_TAGS = new Map(axe.getRules().map((rule) => [rule.ruleId, rule.tags]));

/** Worst-first, so a rule that fails in one demo fails for the component. */
const STATUS_SEVERITY = ['fail', 'incomplete', 'pass'];

export const AXE_STATUS_SYMBOLS = { pass: '✅', incomplete: '❔', fail: '❌' };

/** `*` is the only wildcard, and the pattern is anchored. Other characters are literals. */
function demoPattern(pattern) {
  const source = pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${source}$`);
}

/** Whether a demo name matches one `axeDemos` pattern (`Circular*`, or an exact name). */
export function demoMatches(name, pattern) {
  return demoPattern(pattern).test(name);
}

async function readAxeFile(ref) {
  return JSON.parse(await fs.readFile(path.join(rootDirectory, ref), 'utf8'));
}

/** Patterns in `patterns` that name no demo in `ref`. */
export async function unmatchedAxeDemos(ref, patterns) {
  const names = Object.keys(await readAxeFile(ref));
  return patterns.filter((pattern) => !names.some((name) => demoMatches(name, pattern)));
}

/**
 * Reads a committed `*.a11y.json` and keeps each rule's worst status across
 * the demos: `rule → 'pass' | 'incomplete' | 'fail'`.
 * `patterns` (`axeDemos`) limits which demos count when several components
 * share the file. Anything else, including no list, counts every demo.
 */
export async function readAxeResults(ref, patterns) {
  const demos = await readAxeFile(ref);
  const entries = Array.isArray(patterns)
    ? Object.entries(demos).filter(([name]) =>
        patterns.some((pattern) => typeof pattern === 'string' && demoMatches(name, pattern)),
      )
    : Object.entries(demos);
  const statuses = new Map();
  for (const [, { rules }] of entries) {
    for (const [rule, { status }] of Object.entries(rules)) {
      const current = statuses.get(rule);
      if (!current || STATUS_SEVERITY.indexOf(status) < STATUS_SEVERITY.indexOf(current)) {
        statuses.set(rule, status);
      }
    }
  }
  return statuses;
}

/**
 * The axe rules that test a criterion, from the WCAG tags axe-core ships with
 * each rule (`color-contrast` → `wcag143`), sorted by rule id.
 */
export function axeRulesFor(number, statuses) {
  const tag = wcagTag(number);
  return [...statuses]
    .filter(([rule]) => RULE_TAGS.get(rule)?.includes(tag))
    .map(([rule, status]) => ({ rule, status }))
    .sort((a, b) => a.rule.localeCompare(b.rule));
}
