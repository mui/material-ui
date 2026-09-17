/**
 * Verifies that the unstyled half of a component pulls in no styling code.
 *
 * This is the primary test of the seam: `@mui/unstyled` must be able to exist
 * without Emotion, so nothing reachable from it may import a styling engine, a
 * styled() factory, or the theme.
 *
 * Type-only imports are erased at runtime and reported separately — but they
 * only stay distinguishable if they are written as `import type`. A type-only
 * dependency written as a value import is indistinguishable from a real one to
 * any static check, which is why the Slider split had to make several explicit.
 *
 * Usage: node packages/mui-material/scripts/checkUnstyledBoundary.mjs
 */
/* eslint-disable no-console -- a CLI check; its output is the point */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const HERE = path.dirname(url.fileURLToPath(import.meta.url));
const SRC = path.resolve(HERE, '../src');

const ENTRIES = [
  path.join(SRC, 'Slider/unstyled/SliderUnstyled.js'),
  path.join(SRC, 'Slider/unstyled/sliderSlots.ts'),
  path.join(SRC, 'Button/unstyled/ButtonUnstyled.js'),
  path.join(SRC, 'Button/unstyled/buttonSlots.ts'),
];

/** Importing any of these means the unstyled layer depends on styling. */
const FORBIDDEN = [
  /^\.\.\/zero-styled/,
  /zero-styled$/,
  /^@mui\/styled-engine/,
  /^@emotion\//,
  /\/memoTheme$/,
  /^\.\.\/styles\//,
  /^\.\.\/\.\.\/styles\//,
  /^@mui\/system$/,
];

/** Plain React contexts that happen to live in `@mui/system` today. */
const TOLERATED = {
  '@mui/system/RtlProvider': 'plain RtlProvider context, would move with the unstyled layer',
  '@mui/system/DefaultPropsProvider':
    'plain DefaultPropsProvider context, would move with the unstyled layer',
};

const VALUE_IMPORT = /^\s*(?:import|export)\s+(?!type\s)[^'"]*from\s+['"]([^'"]+)['"]/gm;
const TYPE_IMPORT = /^\s*(?:import|export)\s+type\s+[^'"]*from\s+['"]([^'"]+)['"]/gm;
const BARE_IMPORT = /^\s*import\s+['"]([^'"]+)['"]/gm;

function matchAll(re, text) {
  return Array.from(text.matchAll(re), (m) => m[1]);
}

function resolve(spec, fromFile) {
  if (!spec.startsWith('.')) {
    return null;
  }
  const base = path.resolve(path.dirname(fromFile), spec);
  const candidates = [
    base,
    `${base}.js`,
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, 'index.js'),
    path.join(base, 'index.ts'),
    path.join(base, 'index.tsx'),
  ];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) ?? null;
}

const seen = new Set();
const violations = [];
const typeCouplings = [];
const external = new Set();
const queue = [...ENTRIES];

while (queue.length > 0) {
  const file = queue.pop();
  if (seen.has(file) || !fs.existsSync(file)) {
    continue;
  }
  seen.add(file);

  const text = fs.readFileSync(file, 'utf8');
  const rel = path.relative(SRC, file);

  matchAll(TYPE_IMPORT, text)
    .filter((spec) => FORBIDDEN.some((re) => re.test(spec)))
    .forEach((spec) => typeCouplings.push([rel, spec]));

  [...matchAll(VALUE_IMPORT, text), ...matchAll(BARE_IMPORT, text)].forEach((spec) => {
    if (TOLERATED[spec]) {
      return;
    }
    if (FORBIDDEN.some((re) => re.test(spec))) {
      violations.push([rel, spec]);
      return;
    }
    const next = resolve(spec, file);
    if (next) {
      queue.push(next);
    } else if (!spec.startsWith('.')) {
      external.add(spec);
    }
  });
}

console.log(`files reached: ${seen.size}`);
console.log(`external packages: ${[...external].sort().join(', ')}`);

if (typeCouplings.length > 0) {
  console.log('\ntype-only couplings (erased at runtime, still a compile-time dependency):');
  typeCouplings.forEach(([rel, spec]) => console.log(`  ${rel} -> ${spec}`));
}

console.log(`\nruntime styling violations: ${violations.length}`);
violations.forEach(([rel, spec]) => console.log(`  ${rel} -> ${spec}`));

process.exit(violations.length > 0 ? 1 : 0);
