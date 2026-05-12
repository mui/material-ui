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

function hasStatus(metas: ReadonlyArray<A11yMeta>, status: 'fail' | 'incomplete'): boolean {
  return metas.some((meta) => Object.values(meta.rules).some((rule) => rule.status === status));
}

// Regression a11y fixtures live in `fixtures/ColorContrast/{Component}{Light|Dark}.js`,
// so the demo name encodes both the component (output file) and the mode
// (entry key within that file). Fixtures that don't follow the suffix
// convention fall back to a single self-named file/entry.
const REGRESSION_DEMO_RE = /^(.*?)(Light|Dark)$/;

interface OutputTarget {
  /** Root dir holding the result files. */
  dir: string;
  /** Group key for a recorded meta — also the output file's identity. */
  bucketOf: (meta: A11yMeta) => string;
  /** Key for this meta's entry inside its file. */
  entryKeyOf: (meta: A11yMeta) => string;
  /** Absolute path of the output file for a bucket. */
  fileFor: (bucket: string) => string;
  /** Glob (relative to `dir`) for discovering existing result files. */
  pruneGlob: string;
  /** Map a discovered file path back to its bucket id. */
  pruneBucketOf: (absPath: string) => string;
}

const TARGETS: Record<RouteKind, OutputTarget> = {
  docs: {
    dir: DOCS_COMPONENTS_DIR,
    bucketOf: (meta) => meta.slug,
    entryKeyOf: (meta) => meta.demo,
    fileFor: (slug) => path.join(DOCS_COMPONENTS_DIR, slug, `${slug}.a11y.json`),
    pruneGlob: '*/*.a11y.json',
    pruneBucketOf: (file) => path.basename(path.dirname(file)),
  },
  regression: {
    dir: REGRESSION_RESULTS_DIR,
    bucketOf: (meta) => meta.demo.match(REGRESSION_DEMO_RE)?.[1] ?? meta.demo,
    entryKeyOf: (meta) => meta.demo.match(REGRESSION_DEMO_RE)?.[2] ?? meta.demo,
    fileFor: (component) => path.join(REGRESSION_RESULTS_DIR, `${component}.a11y.json`),
    pruneGlob: '*.a11y.json',
    pruneBucketOf: (file) => path.basename(file, '.a11y.json'),
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
    // bucket id -> recorded metas, kept separate per kind
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
        const bucket = TARGETS[meta.kind].bucketOf(meta);
        const list = byKind[meta.kind].get(bucket) ?? [];
        list.push(meta);
        byKind[meta.kind].set(bucket, list);
      }
    }

    for (const kind of Object.keys(TARGETS) as RouteKind[]) {
      const target = TARGETS[kind];
      for (const [bucket, metas] of byKind[kind]) {
        const outFile = target.fileFor(bucket);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        const sorted = [...metas].sort((a, b) =>
          target.entryKeyOf(a).localeCompare(target.entryKeyOf(b)),
        );
        const file: Record<string, DemoEntry> = {};
        for (const meta of sorted) {
          file[target.entryKeyOf(meta)] = { rules: meta.rules };
        }
        fs.writeFileSync(outFile, `${JSON.stringify(file, null, 2)}\n`);
      }
    }

    // Only prune when this run is authoritative for the full enrolment set:
    // VRT module must have actually executed, no `-t` filter narrowed it, and
    // the run completed cleanly. A partial/failed run can omit buckets whose
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
          if (!seen.has(target.pruneBucketOf(file))) {
            fs.unlinkSync(file);
          }
        }
      }
    }

    for (const kind of Object.keys(TARGETS) as RouteKind[]) {
      const buckets = byKind[kind];
      if (buckets.size === 0) {
        continue;
      }
      const names = [...buckets.keys()].sort();
      const partial = names.filter((n) => hasStatus(buckets.get(n)!, 'fail'));
      const needsReview = names.filter(
        (n) => !partial.includes(n) && hasStatus(buckets.get(n)!, 'incomplete'),
      );
      const pass = names.filter((n) => !partial.includes(n) && !needsReview.includes(n));
      const totalDemos = [...buckets.values()].reduce((n, ms) => n + ms.length, 0);
      const target = TARGETS[kind];
      const dirLabel =
        kind === 'docs'
          ? `${path.relative(process.cwd(), target.dir)}/{slug}/{slug}.a11y.json`
          : `${path.relative(process.cwd(), target.dir)}/{component}.a11y.json`;
      // eslint-disable-next-line no-console
      console.log(
        [
          '',
          chalk.bold(
            `a11y ${kind} results (${totalDemos} demos, ${names.length} components) -> ${dirLabel}`,
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
