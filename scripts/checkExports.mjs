/* eslint-disable no-console, no-bitwise -- script output; TS symbol flags are bit masks */
// Every public subpath export of a built package must be reachable from its root (ESM types, by symbol identity).
// Run after the packages are built (`pnpm release:build`).
// Usage: node scripts/checkExports.mjs [packageName...]
import ts from 'typescript';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Subpaths that are only meant to be imported by path, so they don't need to be reachable from the root.
const PACKAGES = {
  '@mui/material': {
    dir: 'packages/mui-material',
    pathOnly: [
      'zero-styled',
      'internal',
      'DefaultPropsProvider',
      'OverridableComponent',
      'PigmentContainer',
      'PigmentGrid',
      'PigmentStack',
      'ButtonBase/TouchRipple',
      'locale',
    ],
  },
  '@mui/system': { dir: 'packages/mui-system', pathOnly: [] },
  '@mui/utils': { dir: 'packages/mui-utils', pathOnly: [] },
  '@mui/lab': { dir: 'packages/mui-lab', pathOnly: [] },
  '@mui/private-theming': { dir: 'packages/mui-private-theming', pathOnly: [] },
  '@mui/styled-engine': { dir: 'packages/mui-styled-engine', pathOnly: [] },
  '@mui/styled-engine-sc': { dir: 'packages/mui-styled-engine-sc', pathOnly: [] },
  '@mui/types': { dir: 'packages/mui-types', pathOnly: [] },
};

function link(target, linkPath) {
  if (fs.existsSync(linkPath)) {
    return;
  }
  fs.mkdirSync(path.dirname(linkPath), { recursive: true });
  fs.symlinkSync(target, linkPath, 'dir');
}

// A consumer with every @mui package linked to its build output, and their third-party deps linked
// from the workspace, so that TS resolves imports the way it would for a published install.
function createConsumer() {
  const consumerDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-check-exports-'));
  const nodeModules = path.join(consumerDir, 'node_modules');
  for (const [name, { dir }] of Object.entries(PACKAGES)) {
    const buildDir = path.join(workspaceRoot, dir, 'build');
    if (!fs.existsSync(path.join(buildDir, 'package.json'))) {
      throw new Error(`${name} isn't built (${path.relative(workspaceRoot, buildDir)} is missing)`);
    }
    link(buildDir, path.join(nodeModules, name));
  }
  for (const { dir } of Object.values(PACKAGES)) {
    const depsDir = path.join(workspaceRoot, dir, 'node_modules');
    if (!fs.existsSync(depsDir)) {
      continue;
    }
    for (const entry of fs.readdirSync(depsDir)) {
      if (entry.startsWith('.') || entry === '@mui') {
        continue;
      }
      const names = entry.startsWith('@')
        ? fs.readdirSync(path.join(depsDir, entry)).map((scoped) => `${entry}/${scoped}`)
        : [entry];
      for (const name of names) {
        link(fs.realpathSync(path.join(depsDir, name)), path.join(nodeModules, name));
      }
    }
  }
  return consumerDir;
}

function checkPackage(consumerDir, pkgName, pathOnlyList) {
  const pathOnly = new Set(pathOnlyList.map((p) => `./${p}`));
  const pkgDir = path.join(consumerDir, 'node_modules', pkgName);
  const pkg = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8'));

  // 1. Public subpaths with types, straight from the published exports map (wildcards already expanded by the build).
  const subpaths = Object.entries(pkg.exports)
    .filter(([k, v]) => !k.includes('*') && typeof v === 'object')
    .map(([k]) => k);

  // 2. One ESM entry; TS resolves each specifier through `exports` like a consumer would.
  const specifier = (sub) => (sub === '.' ? pkgName : `${pkgName}/${sub.slice(2)}`);
  const body = subpaths.map((sub, i) => `export * as e${i} from '${specifier(sub)}';`).join('\n');
  const entryFile = path.join(consumerDir, `entry-${pkgName.replace(/\W/g, '_')}.mts`);
  fs.writeFileSync(entryFile, body);

  const program = ts.createProgram([entryFile], {
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    target: ts.ScriptTarget.ES2022,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    preserveSymlinks: true, // resolve deps from the consumer's node_modules, not the monorepo's
    types: ['react'],
  });
  const checker = program.getTypeChecker();

  function resolve(s) {
    let t = s;
    while (t.flags & ts.SymbolFlags.Alias) {
      t = checker.getAliasedSymbol(t);
    }
    return checker.getMergedSymbol(t);
  }
  const isModule = (s) =>
    !!(s.flags & ts.SymbolFlags.ValueModule) &&
    s.declarations?.some((d) => ts.isSourceFile(d) || ts.isModuleDeclaration(d));
  const where = (s) => {
    const d = s.declarations?.[0];
    if (!d) {
      return '?';
    }
    const sf = d.getSourceFile();
    return `${path.relative(path.join(consumerDir, 'node_modules'), sf.fileName)}:${sf.getLineAndCharacterOfPosition(d.getStart()).line + 1}`;
  };

  const entry = checker.getSymbolAtLocation(program.getSourceFile(entryFile));
  const modules = new Map(); // subpath -> module symbol
  const unresolvedEntries = [];
  for (const exp of checker.getExportsOfModule(entry)) {
    const sub = subpaths[Number(exp.name.slice(1))];
    const mod = resolve(exp);
    if (isModule(mod)) {
      modules.set(sub, mod);
    } else {
      unresolvedEntries.push(sub);
    }
  }
  for (const sub of subpaths) {
    if (!modules.has(sub) && !unresolvedEntries.includes(sub)) {
      unresolvedEntries.push(sub);
    }
  }
  if (!modules.has('.')) {
    return {
      entries: modules.size,
      unresolvedEntries,
      unreachable: {},
      sameNameDifferentSymbol: [],
    };
  }

  // Everything reachable from the root, namespaces flattened.
  const reachable = new Map();
  (function walk(m, prefix, seen) {
    for (const exp of checker.getExportsOfModule(m)) {
      const t = resolve(exp);
      if (!reachable.has(t)) {
        reachable.set(t, []);
      }
      reachable.get(t).push(prefix + exp.name);
      if (isModule(t) && !seen.has(t)) {
        walk(t, `${prefix}${exp.name}.`, new Set(seen).add(t));
      }
    }
  })(modules.get('.'), '', new Set());
  const rootByName = new Map(
    checker.getExportsOfModule(modules.get('.')).map((s) => [s.name, resolve(s)]),
  );

  const unreachable = {};
  const sameNameDifferentSymbol = [];
  for (const [sub, mod] of modules) {
    if (sub === '.' || pathOnly.has(sub)) {
      continue;
    }
    for (const exp of checker.getExportsOfModule(mod)) {
      const t = resolve(exp);
      if (reachable.has(t)) {
        continue;
      }
      unreachable[sub] ??= [];
      unreachable[sub].push(exp.name === 'default' ? `default (${t.name})` : exp.name);
      const clash = exp.name !== 'default' && rootByName.get(exp.name);
      if (clash && clash !== t) {
        sameNameDifferentSymbol.push({ name: exp.name, root: where(clash), [sub]: where(t) });
      }
    }
  }
  return { entries: modules.size, unresolvedEntries, unreachable, sameNameDifferentSymbol };
}

const requested = process.argv.slice(2);
for (const name of requested) {
  if (!PACKAGES[name]) {
    throw new Error(`Unknown package ${name}, expected one of ${Object.keys(PACKAGES).join(', ')}`);
  }
}

const consumerDir = createConsumer();
try {
  for (const name of requested.length > 0 ? requested : Object.keys(PACKAGES)) {
    const result = checkPackage(consumerDir, name, PACKAGES[name].pathOnly);
    const failed =
      result.unresolvedEntries.length > 0 ||
      Object.keys(result.unreachable).length > 0 ||
      result.sameNameDifferentSymbol.length > 0;
    if (failed) {
      process.exitCode = 1;
      console.error(`✗ ${name}`);
      console.error(JSON.stringify(result, null, 2));
    } else {
      console.log(`✓ ${name} (${result.entries} entries)`);
    }
  }
} finally {
  fs.rmSync(consumerDir, { recursive: true, force: true });
}
