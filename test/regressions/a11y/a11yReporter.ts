import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';
import { globbySync } from 'globby';
import type { Reporter, TestCase, TestModule, TestSuite, Vitest } from 'vitest/node';
import type { A11yMeta } from './axe';

const COMPONENTS_DIR = path.resolve(__dirname, '../../../docs/data/material/components');
const VRT_MODULE_PATH = path.resolve(__dirname, '../index.test.js');

interface DemoEntry {
  passedRules: string[];
  failedRules: string[];
  testedRules: Record<string, string[]>;
}

function* walkTests(node: TestModule | TestSuite): Generator<TestCase, undefined, void> {
  for (const child of node.children) {
    if (child.type === 'test') {
      yield child;
    } else if (child.type === 'suite') {
      yield* walkTests(child);
    }
  }
}

function toEntry(meta: A11yMeta): DemoEntry {
  const violations = new Set(meta.violations);
  return {
    passedRules: meta.collectedRules.filter((r) => !violations.has(r)).sort(),
    failedRules: [...meta.violations].sort(),
    testedRules: meta.testedRules,
  };
}

export default class A11yReporter implements Reporter {
  private filtered = false;

  onInit(ctx: Vitest) {
    this.filtered = ctx.config.testNamePattern != null;
  }

  onTestRunEnd(testModules: ReadonlyArray<TestModule>) {
    const entries: A11yMeta[] = [];
    for (const mod of testModules) {
      for (const test of walkTests(mod)) {
        const meta = (test.meta() as { a11y?: A11yMeta }).a11y;
        if (meta) {
          entries.push(meta);
        }
      }
    }

    const bySlug = new Map<string, A11yMeta[]>();
    for (const meta of entries) {
      const list = bySlug.get(meta.slug) ?? [];
      list.push(meta);
      bySlug.set(meta.slug, list);
    }

    // One file per slug, co-located with the component's other files. The docs
    // toolbar reads these via a webpack require.context (eager) at build time.
    for (const [slug, metas] of bySlug) {
      const slugDir = path.join(COMPONENTS_DIR, slug);
      fs.mkdirSync(slugDir, { recursive: true });
      const sorted = [...metas].sort((a, b) => a.demo.localeCompare(b.demo));
      const file: Record<string, DemoEntry> = {};
      for (const meta of sorted) {
        file[meta.demo] = toEntry(meta);
      }
      fs.writeFileSync(
        path.join(slugDir, `${slug}.a11y.json`),
        `${JSON.stringify(file, null, 2)}\n`,
      );
    }

    // Only prune when this run is authoritative for the full enrolment set:
    // VRT module must have actually executed, and no `-t` filter narrowed it.
    // Anything else (unrelated unit tests, filtered slug subset) leaves
    // untouched slugs' files alone since we have no signal about them.
    const ranVrtSuite = testModules.some((m) => m.moduleId === VRT_MODULE_PATH);
    if (ranVrtSuite && !this.filtered) {
      for (const file of globbySync('*/*.a11y.json', { cwd: COMPONENTS_DIR, absolute: true })) {
        const slug = path.basename(path.dirname(file));
        if (!bySlug.has(slug)) {
          fs.unlinkSync(file);
        }
      }
    }

    if (entries.length === 0) {
      return;
    }

    const slugs = [...bySlug.keys()].sort();
    const pass = slugs.filter((s) => bySlug.get(s)!.every((m) => m.violations.length === 0));
    const partial = slugs.filter((s) => bySlug.get(s)!.some((m) => m.violations.length > 0));
    // eslint-disable-next-line no-console
    console.log(
      [
        '',
        chalk.bold(
          `a11y results (${entries.length} demos, ${slugs.length} slugs) -> ${path.relative(process.cwd(), COMPONENTS_DIR)}/{slug}/{slug}.a11y.json`,
        ),
        '',
        `  ✅ Pass (${pass.length}):     ${pass.join(', ') || '—'}`,
        `  ⚠️  Partial (${partial.length}):  ${partial.join(', ') || '—'}`,
        '',
      ].join('\n'),
    );
  }
}
