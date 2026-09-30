import fs from 'fs/promises';
import path from 'path';
import axe from 'axe-core';
import { rootDirectory } from './files.mjs';
import { wcagTag } from './wcag.mjs';

const RULE_TAGS = new Map(axe.getRules().map((rule) => [rule.ruleId, rule.tags]));

/** Worst-first, so a rule that fails in one demo fails for the component. */
const STATUS_SEVERITY = ['fail', 'incomplete', 'pass'];

export const AXE_STATUS_SYMBOLS = { pass: '✅', incomplete: '❔', fail: '❌' };

/**
 * Reads a committed `*.a11y.json` and keeps each rule's worst status across
 * the demos: `rule → 'pass' | 'incomplete' | 'fail'`.
 */
export async function readAxeResults(ref) {
  const demos = JSON.parse(await fs.readFile(path.join(rootDirectory, ref), 'utf8'));
  const statuses = new Map();
  for (const { rules } of Object.values(demos)) {
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
