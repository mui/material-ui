import { expect } from 'chai';
import type { AxeResults } from 'axe-core';
import type { TestContext } from 'vitest';

export const VISUAL_RULES = ['color-contrast', 'link-in-text-block'];

export const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** Rules disabled globally — depend on page-level context, not component correctness. */
export const GLOBAL_DISABLED_RULES = ['region', 'page-has-heading-one'];

export type RuleStatus = 'pass' | 'fail' | 'incomplete';

/**
 * One failing cell. Prop-axis keys (`variant`, `color`, etc.) are sourced
 * from `data-*` attributes the fixture stamps on each cell, so this shape
 * adapts to any component without code changes — Button has `variant` +
 * `color`, Alert would have `severity` + `variant`, etc.
 */
export interface Instance {
  contrastRatio?: number;
  [prop: string]: string | number | undefined;
}

export interface RuleEntry {
  status: RuleStatus;
  tags: string[];
  /** Populated for `fail` / `incomplete` statuses, one per offending DOM node. */
  instances?: Instance[];
}

/** Which side of the suite produced the route — controls reporter output dir. */
export type RouteKind = 'docs' | 'regression';

export interface A11yMeta {
  kind: RouteKind;
  slug: string;
  demo: string;
  rules: Record<string, RuleEntry>;
}

function formatNode(node: AxeResults['violations'][number]['nodes'][number]): string {
  const lines = [`    HTML: ${node.html}`];
  if (node.failureSummary) {
    lines.push(`    Summary: ${node.failureSummary.replace(/\n/g, '\n      ')}`);
  }
  const checks = [...node.any, ...node.all, ...node.none];
  for (const check of checks) {
    lines.push(`    - ${check.message}`);
    if (check.data && typeof check.data === 'object') {
      const { fgColor, bgColor, contrastRatio, fontSize, fontWeight, expectedContrastRatio } =
        check.data;
      if (contrastRatio !== undefined) {
        lines.push(
          `      Foreground: ${fgColor}, Background: ${bgColor}, Ratio: ${contrastRatio}, Expected: ${expectedContrastRatio}, Font: ${fontSize} / ${fontWeight}`,
        );
      }
    }
  }
  return lines.join('\n');
}

function formatResults(results: AxeResults['violations']) {
  return results
    .map((v) => {
      const header = `  [${v.id}] ${v.help} (${v.impact})\n  ${v.helpUrl}`;
      const nodes = v.nodes.map((n) => formatNode(n)).join('\n\n');
      return `${header}\n\n${nodes}`;
    })
    .join('\n\n');
}

interface RecordA11yOptions {
  kind: RouteKind;
  slug: string;
  demo: string;
  /**
   * Rule ids whose violations are recorded but not asserted on. The rule
   * still runs and still lands in the results JSON — only the test-failing
   * assertion is suppressed.
   */
  skipAssertions?: string[];
}

/**
 * The page-side script in `index.test.js` enriches each failing node with a
 * `dataAttrs` map collected by walking up the DOM from the violation node.
 * Anything outside that walk doesn't reach this code.
 */
type EnrichedNode = AxeResults['violations'][number]['nodes'][number] & {
  dataAttrs?: Record<string, string>;
};

function extractInstance(node: EnrichedNode): Instance {
  const result: Instance = { ...(node.dataAttrs ?? {}) };
  for (const check of [...node.any, ...node.all, ...node.none]) {
    if (!check.data || typeof check.data !== 'object') {
      continue;
    }
    const { contrastRatio } = check.data as { contrastRatio?: unknown };
    if (typeof contrastRatio === 'number') {
      result.contrastRatio = contrastRatio;
    }
  }
  return result;
}

/**
 * Node-side recorder for axe results produced inside a Playwright page.
 *
 * Extracts a structured summary onto `ctx.task.meta.a11y` (the reporter
 * writes one file per demo), then asserts on visual rules (`color-contrast`,
 * `link-in-text-block`) unless listed in `skipAssertions`.
 */
export function recordA11y(
  ctx: TestContext,
  results: AxeResults,
  { kind, slug, demo, skipAssertions = [] }: RecordA11yOptions,
): void {
  const rules: Record<string, RuleEntry> = {};
  const buckets: ReadonlyArray<[AxeResults['passes'], RuleStatus]> = [
    [results.passes, 'pass'],
    [results.incomplete, 'incomplete'],
    [results.violations, 'fail'],
  ];
  for (const [list, status] of buckets) {
    for (const rule of list) {
      const tags = rule.tags.filter((t) => WCAG_TAGS.includes(t)).sort();
      const entry: RuleEntry = { status, tags };
      if (status !== 'pass' && rule.nodes.length > 0) {
        entry.instances = rule.nodes.map(extractInstance);
      }
      rules[rule.id] = entry;
    }
  }
  const sortedRules = Object.fromEntries(
    Object.entries(rules).sort(([a], [b]) => a.localeCompare(b)),
  );

  const meta: A11yMeta = {
    kind,
    slug,
    demo,
    rules: sortedRules,
  };
  (ctx.task.meta as { a11y?: A11yMeta }).a11y = meta;

  const skip = new Set(skipAssertions);
  const visualViolations = results.violations.filter(
    (v) => VISUAL_RULES.includes(v.id) && !skip.has(v.id),
  );
  const visualIncomplete = results.incomplete.filter(
    (v) => VISUAL_RULES.includes(v.id) && !skip.has(v.id),
  );

  const failures: string[] = [];
  if (visualViolations.length > 0) {
    failures.push(
      `${visualViolations.length} axe violation(s):\n\n${formatResults(visualViolations)}`,
    );
  }
  if (visualIncomplete.length > 0) {
    failures.push(
      `${visualIncomplete.length} axe incomplete (needs review):\n\n${formatResults(visualIncomplete)}`,
    );
  }
  if (failures.length > 0) {
    expect.fail(`[${slug}/${demo}] ${failures.join('\n\n')}`);
  }
}
