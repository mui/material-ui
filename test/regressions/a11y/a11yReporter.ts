import * as fs from 'node:fs';
import * as path from 'node:path';
import chalk from 'chalk';
import { globbySync } from 'globby';
import type {
  Reporter,
  TestCase,
  TestModule,
  TestRunEndReason,
  TestSuite,
  Vitest,
} from 'vitest/node';
import type { SerializedError } from 'vitest';
import type { A11yMeta, RouteKind } from './axe';

const DOCS_COMPONENTS_DIR = path.resolve(__dirname, '../../../docs/data/material/components');
const REGRESSION_RESULTS_DIR = path.resolve(__dirname, './results');
const VRT_MODULE_PATH = path.resolve(__dirname, '../index.test.js');

interface DemoEntry {
  rules: A11yMeta['rules'];
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

function hasStatus(meta: A11yMeta, status: 'fail' | 'incomplete'): boolean {
  for (const rule of Object.values(meta.rules)) {
    if (rule.status === status) {
      return true;
    }
  }
  return false;
}

interface OutputTarget {
  /** Output dir for `{slug}.a11y.json` files. */
  dir: string;
  /** Where the file path lives for a given slug (docs co-locates inside slug subdir). */
  file: (slug: string) => string;
  /** Glob (relative to `dir`) used to discover stale files for pruning. */
  pruneGlob: string;
  /** Extract the slug name from an absolute file path discovered via `pruneGlob`. */
  pruneSlug: (file: string) => string;
}

const TARGETS: Record<RouteKind, OutputTarget> = {
  docs: {
    dir: DOCS_COMPONENTS_DIR,
    file: (slug) => path.join(DOCS_COMPONENTS_DIR, slug, `${slug}.a11y.json`),
    pruneGlob: '*/*.a11y.json',
    pruneSlug: (file) => path.basename(path.dirname(file)),
  },
  regression: {
    dir: REGRESSION_RESULTS_DIR,
    file: (slug) => path.join(REGRESSION_RESULTS_DIR, `${slug}.a11y.json`),
    pruneGlob: '*.a11y.json',
    pruneSlug: (file) => path.basename(file, '.a11y.json'),
  },
};

export default class A11yReporter implements Reporter {
  private filtered = false;

  onInit(ctx: Vitest) {
    this.filtered = ctx.config.testNamePattern != null;
  }

  onTestRunEnd(
    testModules: ReadonlyArray<TestModule>,
    _unhandledErrors: ReadonlyArray<SerializedError>,
    reason: TestRunEndReason,
  ) {
    const byKind: Record<RouteKind, Map<string, A11yMeta[]>> = {
      docs: new Map(),
      regression: new Map(),
    };
    for (const mod of testModules) {
      for (const test of walkTests(mod)) {
        const meta = (test.meta() as { a11y?: A11yMeta }).a11y;
        if (!meta) {
          continue;
        }
        const bucket = byKind[meta.kind];
        const list = bucket.get(meta.slug) ?? [];
        list.push(meta);
        bucket.set(meta.slug, list);
      }
    }

    for (const kind of Object.keys(TARGETS) as RouteKind[]) {
      const bySlug = byKind[kind];
      if (bySlug.size === 0) {
        continue;
      }
      const target = TARGETS[kind];
      for (const [slug, metas] of bySlug) {
        const outFile = target.file(slug);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        const sorted = [...metas].sort((a, b) => a.demo.localeCompare(b.demo));
        const file: Record<string, DemoEntry> = {};
        for (const meta of sorted) {
          file[meta.demo] = { rules: meta.rules };
        }
        fs.writeFileSync(outFile, `${JSON.stringify(file, null, 2)}\n`);
      }
    }

    // Only prune when this run is authoritative for the full enrolment set:
    // VRT module must have actually executed, no `-t` filter narrowed it, and
    // the run completed cleanly. A partial/failed run can omit slugs whose
    // tests crashed before recording, so pruning then would delete tracked
    // JSON for still-enrolled demos.
    const ranVrtSuite = testModules.some((m) => m.moduleId === VRT_MODULE_PATH);
    if (ranVrtSuite && !this.filtered && reason === 'passed') {
      for (const kind of Object.keys(TARGETS) as RouteKind[]) {
        const target = TARGETS[kind];
        if (!fs.existsSync(target.dir)) {
          continue;
        }
        const seen = byKind[kind];
        for (const file of globbySync(target.pruneGlob, { cwd: target.dir, absolute: true })) {
          if (!seen.has(target.pruneSlug(file))) {
            fs.unlinkSync(file);
          }
        }
      }
    }

    for (const kind of Object.keys(TARGETS) as RouteKind[]) {
      const bySlug = byKind[kind];
      if (bySlug.size === 0) {
        continue;
      }
      const slugs = [...bySlug.keys()].sort();
      const partial = slugs.filter((s) => bySlug.get(s)!.some((m) => hasStatus(m, 'fail')));
      const needsReview = slugs.filter(
        (s) => !partial.includes(s) && bySlug.get(s)!.some((m) => hasStatus(m, 'incomplete')),
      );
      const pass = slugs.filter((s) => !partial.includes(s) && !needsReview.includes(s));
      const totalDemos = [...bySlug.values()].reduce((n, ms) => n + ms.length, 0);
      const target = TARGETS[kind];
      const dirLabel =
        kind === 'docs'
          ? `${path.relative(process.cwd(), target.dir)}/{slug}/{slug}.a11y.json`
          : `${path.relative(process.cwd(), target.dir)}/{slug}.a11y.json`;
      // eslint-disable-next-line no-console
      console.log(
        [
          '',
          chalk.bold(
            `a11y ${kind} results (${totalDemos} demos, ${slugs.length} slugs) -> ${dirLabel}`,
          ),
          '',
          `  ✅ Pass (${pass.length}):         ${pass.join(', ') || '—'}`,
          `  ⚠️  Partial (${partial.length}):      ${partial.join(', ') || '—'}`,
          `  🔍 Needs review (${needsReview.length}): ${needsReview.join(', ') || '—'}`,
          '',
        ].join('\n'),
      );
    }
  }
}
