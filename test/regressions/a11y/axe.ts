import { expect } from 'chai';
import type { AxeResults } from 'axe-core';
import type { TestContext } from 'vitest';

export const VISUAL_RULES = ['color-contrast', 'link-in-text-block'];

export const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/** Rules disabled globally — depend on page-level context, not component correctness. */
export const GLOBAL_DISABLED_RULES = ['region', 'page-has-heading-one'];

export interface A11yMeta {
  slug: string;
  demo: string;
  collectedRules: string[];
  testedRules: Record<string, string[]>;
  violations: string[];
  needsReview: string[];
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
 * Node-side recorder for axe results produced inside a Playwright page.
 *
 * Extracts a structured summary onto `ctx.task.meta.a11y` (the reporter
 * writes one file per demo), then asserts on visual rules (`color-contrast`,
 * `link-in-text-block`) unless listed in `skipAssertions`.
 */
export function recordA11y(
  ctx: TestContext,
  results: AxeResults,
  { slug, demo, skipAssertions = [] }: RecordA11yOptions,
): void {
  const collectedRules = new Set<string>();
  const testedRules = new Map<string, Set<string>>();
  for (const list of [results.passes, results.violations, results.incomplete]) {
    for (const rule of list) {
      collectedRules.add(rule.id);
      for (const tag of rule.tags) {
        if (WCAG_TAGS.includes(tag)) {
          if (!testedRules.has(tag)) {
            testedRules.set(tag, new Set());
          }
          testedRules.get(tag)!.add(rule.id);
        }
      }
    }
  }

  const violations = [...new Set(results.violations.map((v) => v.id))];
  const needsReview = [...new Set(results.incomplete.map((v) => v.id))].filter(
    (id) => !violations.includes(id),
  );

  const meta: A11yMeta = {
    slug,
    demo,
    collectedRules: [...collectedRules],
    testedRules: Object.fromEntries(
      [...testedRules.entries()].map(([tag, ids]) => [tag, [...ids]]),
    ),
    violations,
    needsReview,
  };
  (ctx.task.meta as { a11y?: A11yMeta }).a11y = meta;

  const skip = new Set(skipAssertions);
  const visualViolations = results.violations.filter(
    (v) => VISUAL_RULES.includes(v.id) && !skip.has(v.id),
  );
  const visualIncomplete = results.incomplete.filter(
    (v) => VISUAL_RULES.includes(v.id) && !skip.has(v.id),
  );

  if (visualViolations.length > 0) {
    expect.fail(
      `[${slug}/${demo}] ${visualViolations.length} axe violation(s):\n\n${formatResults(visualViolations)}`,
    );
  }
  if (visualIncomplete.length > 0) {
    expect.fail(
      `[${slug}/${demo}] ${visualIncomplete.length} axe incomplete (needs review):\n\n${formatResults(visualIncomplete)}`,
    );
  }
}
