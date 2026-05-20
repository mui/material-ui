#!/usr/bin/env node
/* eslint-disable no-await-in-loop -- one-off codemod, sequential I/O is intentional */
/**
 * One-off codemod: migrates legacy `{{"demo": "Foo.js"}}` markdown references
 * in `docs/data/**` to the new `demos/<folder>/index.ts` layout consumed by
 * `@mui/internal-docs-infra`.
 *
 * Defaults to dry-run; pass `--write` to actually mutate the working tree.
 *
 * Usage:
 *   node scripts/migrateDemos.mjs
 *   node scripts/migrateDemos.mjs --write
 *   node scripts/migrateDemos.mjs --filter buttons --verbose
 */
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import {
  parseImportsAndComments,
  fileUrlToPortablePath,
} from '@mui/internal-docs-infra/pipeline/loaderUtils';

// ---------- CLI ----------
const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const VERBOSE = args.includes('--verbose');
const FILTER = (() => {
  const i = args.indexOf('--filter');
  return i !== -1 ? args[i + 1] : null;
})();
const ROOT_ARG = (() => {
  const i = args.indexOf('--root');
  return i !== -1 ? args[i + 1] : 'docs/data';
})();

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), '../..');
const ROOT = path.resolve(REPO_ROOT, ROOT_ARG);

const DEMO_RE = /\{\{\s*"demo"\s*:\s*"([^"]+)\.(?:js|tsx|jsx|ts)"([^}]*)\}\}/g;
const DEMO_EXTS = ['.tsx', '.js', '.jsx', '.ts'];

// ---------- helpers ----------
function log(...m) {
  console.warn(...m);
}
function vlog(...m) {
  if (VERBOSE) {
    console.warn(...m);
  }
}

function toKebabCase(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toPascalCase(s) {
  return s
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('');
}

/**
 * Compute folder names for every demo in a single .md file, handling
 * collisions by falling back to the full kebab-cased component name.
 */
function computeFolderTokens(componentNames, mdBaseName) {
  const base = toPascalCase(mdBaseName);
  // Try every reasonable singular/plural form so e.g. `table.md` can strip
  // `Table` AND `Tables`, and `buttons.md` can strip `Buttons` AND `Button`.
  const forms = new Set([base]);
  if (base.endsWith('s')) {
    forms.add(base.slice(0, -1));
  } else {
    forms.add(`${base}s`);
  }
  if (base.endsWith('es')) {
    forms.add(base.slice(0, -2));
  } else if (!base.endsWith('s')) {
    forms.add(`${base}es`);
  }
  // Sort longest-first so we prefer e.g. `Tables` over `Table`.
  const ordered = [...forms].sort((a, b) => b.length - a.length);

  /**
   * Strip every PascalCase-aligned occurrence of any form from `name`.
   * A match is only accepted when its boundaries align with PascalCase word
   * boundaries — the char before must be lowercase/digit (or start of string)
   * and the char after must be uppercase (or end of string). This prevents
   * `BoxSystemProps` from matching the form `Boxs` against `BoxS`.
   */
  function stripForms(name) {
    let result = '';
    let i = 0;
    while (i < name.length) {
      let matched = null;
      for (const form of ordered) {
        if (name.slice(i, i + form.length).toLowerCase() !== form.toLowerCase()) {
          continue;
        }
        const before = i === 0 ? null : name[i - 1];
        const after = i + form.length >= name.length ? null : name[i + form.length];
        const okBefore = before === null || /[a-z0-9]/.test(before);
        const okAfter = after === null || /[A-Z]/.test(after);
        if (okBefore && okAfter) {
          matched = form;
          break;
        }
      }
      if (matched) {
        i += matched.length;
      } else {
        result += name[i];
        i += 1;
      }
    }
    return result;
  }

  function strippedToken(name) {
    const stripped = stripForms(name);
    const kebab = toKebabCase(stripped);
    return kebab || toKebabCase(name);
  }

  const initial = new Map();
  for (const name of componentNames) {
    initial.set(name, strippedToken(name));
  }

  const counts = new Map();
  for (const v of initial.values()) {
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  const final = new Map();
  for (const [name, token] of initial) {
    if ((counts.get(token) || 0) > 1) {
      final.set(name, toKebabCase(name));
    } else {
      final.set(name, token);
    }
  }

  const seen = new Set();
  for (const t of final.values()) {
    if (seen.has(t)) {
      throw new Error(
        `migrateDemos: unresolvable folder-name collision in ${mdBaseName}.md among components: ${componentNames.join(', ')}`,
      );
    }
    seen.add(t);
  }
  return final;
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function findDemoSource(dir, name) {
  for (const ext of DEMO_EXTS) {
    const p = path.join(dir, `${name}${ext}`);
    if (await fileExists(p)) {
      return { path: p, ext };
    }
  }
  return null;
}

async function resolveExisting(p) {
  if (await fileExists(p)) {
    const stat = await fs.stat(p);
    if (stat.isFile()) {
      return p;
    }
  }
  for (const ext of ['.tsx', '.ts', '.jsx', '.js', '.json', '.css']) {
    const candidate = p + ext;
    if (await fileExists(candidate)) {
      return candidate;
    }
  }
  for (const ext of ['.tsx', '.ts', '.jsx', '.js']) {
    const candidate = path.join(p, `index${ext}`);
    if (await fileExists(candidate)) {
      return candidate;
    }
  }
  return null;
}

/**
 * Recursively collect every relative-import file reachable from the given
 * source file, restricted to `withinDir`.
 */
async function collectLocalGraph(sourcePath, withinDir, acc = new Map()) {
  if (acc.has(sourcePath)) {
    return acc;
  }
  const code = await fs.readFile(sourcePath, 'utf8');
  const parsed = await parseImportsAndComments(code, pathToFileURL(sourcePath).href);
  acc.set(sourcePath, { code, parsed });

  const withinNormalized = `${path.normalize(withinDir)}${path.sep}`;
  for (const rel of Object.values(parsed.relative)) {
    const importedPath = fileUrlToPortablePath(rel.url);
    const normalized = path.normalize(importedPath);
    if (!normalized.startsWith(withinNormalized) && normalized !== path.normalize(withinDir)) {
      continue;
    }
    const resolved = await resolveExisting(importedPath);
    if (!resolved) {
      continue;
    }
    await collectLocalGraph(resolved, withinDir, acc);
  }
  return acc;
}

/**
 * Splice import-path edits into `code` using byte positions reported by
 * parseImportsAndComments. Each edit is `{ start, end, newSpecifier }` where
 * `start`/`end` include the surrounding quotes.
 */
function applyImportEdits(code, edits) {
  if (!edits.length) {
    return code;
  }
  const sorted = [...edits].sort((a, b) => a.start - b.start);
  let out = '';
  let cursor = 0;
  for (const edit of sorted) {
    out += code.slice(cursor, edit.start);
    out += JSON.stringify(edit.newSpecifier);
    cursor = edit.end;
  }
  out += code.slice(cursor);
  return out;
}

function indexTsTemplate(componentName) {
  return `import { createDemo } from '@mui/internal-core-docs/utils/createDemo';

import ${componentName} from './${componentName}';

export default createDemo(import.meta.url, ${componentName});
`;
}

/**
 * Insert `{/* @focus-start *\/}` / `{/* @focus-end *\/}` JSX comments around
 * the block of source lines that match `previewText`. Returns the modified
 * code, or `null` if no contiguous match was found.
 *
 * The preview file holds the inner JSX of the demo with leading indentation
 * stripped. We locate the matching window by trying every offset and looking
 * for a constant-whitespace prefix that aligns each preview line with the
 * corresponding source line.
 */
function insertFocusMarkers(code, previewText) {
  const newline = code.includes('\r\n') ? '\r\n' : '\n';
  const codeLines = code.split(/\r?\n/);
  const previewLines = previewText.split(/\r?\n/);
  while (previewLines.length && previewLines[0].trim() === '') {
    previewLines.shift();
  }
  while (previewLines.length && previewLines[previewLines.length - 1].trim() === '') {
    previewLines.pop();
  }
  if (!previewLines.length) {
    return null;
  }
  const firstPreview = previewLines[0];
  for (let i = 0; i + previewLines.length <= codeLines.length; i += 1) {
    const firstCode = codeLines[i];
    if (!firstCode.endsWith(firstPreview)) {
      continue;
    }
    const indent = firstCode.slice(0, firstCode.length - firstPreview.length);
    if (!/^\s*$/.test(indent)) {
      continue;
    }
    let matched = true;
    for (let j = 1; j < previewLines.length; j += 1) {
      const previewLine = previewLines[j];
      const codeLine = codeLines[i + j];
      if (previewLine.trim() === '') {
        if (codeLine.trim() !== '') {
          matched = false;
          break;
        }
        continue;
      }
      if (codeLine !== indent + previewLine) {
        matched = false;
        break;
      }
    }
    if (!matched) {
      continue;
    }
    const prevLine = i > 0 ? codeLines[i - 1].trimEnd() : '';
    const nextLineIdx = i + previewLines.length;
    const nextLine = nextLineIdx < codeLines.length ? codeLines[nextLineIdx].trim() : '';

    // Case 1: matched block sits in JSX-children position (line above ends
    // with `>`, an opening JSX tag). Use JSX comments around the block.
    if (prevLine.endsWith('>')) {
      const startMarker = `${indent}{/* @focus-start */}`;
      const endMarker = `${indent}{/* @focus-end */}`;
      const newLines = [
        ...codeLines.slice(0, i),
        startMarker,
        ...codeLines.slice(i, nextLineIdx),
        endMarker,
        ...codeLines.slice(nextLineIdx),
      ];
      return newLines.join(newline);
    }

    // Case 2: matched block IS the entire JSX returned by the function — the
    // line above ends with `return (` (or just `(`) and the next line closes
    // with `);`. Use line-comment markers around the `return` statement, the
    // same form the eslint plugin's `wrapReturn` autofix produces.
    if (prevLine.endsWith('(') && /^\)\s*;?$/.test(nextLine)) {
      // Find the line containing `return` (usually i-1, but allow the `(` to
      // sit on its own line in unusual formatting).
      let returnLineIdx = i - 1;
      while (returnLineIdx >= 0 && !/\breturn\b/.test(codeLines[returnLineIdx])) {
        returnLineIdx -= 1;
      }
      if (returnLineIdx < 0) {
        return null;
      }
      const returnIndent = codeLines[returnLineIdx].match(/^\s*/)[0];
      const startMarker = `${returnIndent}// @focus-start @padding 1`;
      const endMarker = `${returnIndent}// @focus-end`;
      const newLines = [
        ...codeLines.slice(0, returnLineIdx),
        startMarker,
        ...codeLines.slice(returnLineIdx, nextLineIdx + 1),
        endMarker,
        ...codeLines.slice(nextLineIdx + 1),
      ];
      return newLines.join(newline);
    }

    return null;
  }
  return null;
}

// ---------- main per-md processing ----------
async function processMarkdown(mdPath, plan) {
  const dir = path.dirname(mdPath);
  const mdBaseName = path.basename(mdPath, '.md');
  const src = await fs.readFile(mdPath, 'utf8');

  const matches = [...src.matchAll(DEMO_RE)];
  if (!matches.length) {
    vlog(`  skip (no {{"demo": ...}}): ${path.relative(REPO_ROOT, mdPath)}`);
    return;
  }

  const componentNames = [...new Set(matches.map((m) => m[1]))];
  const folderTokens = computeFolderTokens(componentNames, mdBaseName);

  const demoInfo = new Map();
  for (const name of componentNames) {
    const found = await findDemoSource(dir, name);
    if (!found) {
      log(
        `  WARN: no source file for {{"demo": "${name}.*"}} in ${path.relative(REPO_ROOT, mdPath)}`,
      );
      continue;
    }
    const graph = await collectLocalGraph(found.path, dir);
    demoInfo.set(name, { source: found.path, ext: found.ext, graph });
  }

  if (!demoInfo.size) {
    return;
  }

  const demoEntryPoints = new Set([...demoInfo.values()].map((d) => d.source));
  const helperUsedBy = new Map();
  for (const [name, info] of demoInfo) {
    for (const filePath of info.graph.keys()) {
      if (demoEntryPoints.has(filePath)) {
        continue;
      }
      if (!helperUsedBy.has(filePath)) {
        helperUsedBy.set(filePath, new Set());
      }
      helperUsedBy.get(filePath).add(name);
    }
  }

  const demosRoot = path.join(dir, 'demos');

  const helperDest = new Map();
  for (const [helperPath, users] of helperUsedBy) {
    const base = path.basename(helperPath);
    if (users.size >= 2) {
      helperDest.set(helperPath, path.join(demosRoot, base));
    } else {
      const onlyUser = [...users][0];
      const folder = folderTokens.get(onlyUser);
      helperDest.set(helperPath, path.join(demosRoot, folder, base));
    }
  }

  const demoDest = new Map();
  for (const [name, info] of demoInfo) {
    const folder = folderTokens.get(name);
    demoDest.set(name, path.join(demosRoot, folder, `${name}${info.ext}`));
  }

  function destFor(absPath) {
    if (helperDest.has(absPath)) {
      return helperDest.get(absPath);
    }
    for (const [name, info] of demoInfo) {
      if (info.source === absPath) {
        return demoDest.get(name);
      }
    }
    return null;
  }

  const fileWrites = [];
  const filesToDelete = new Set();

  for (const [demoName, info] of demoInfo) {
    for (const [absPath, { code, parsed }] of info.graph) {
      const dest = destFor(absPath);
      if (!dest) {
        continue;
      }
      const edits = [];
      for (const rel of Object.values(parsed.relative)) {
        const importedAbs = fileUrlToPortablePath(rel.url);
        const importedResolved = await resolveExisting(importedAbs);
        if (!importedResolved) {
          continue;
        }
        const importedDest = destFor(importedResolved);
        if (!importedDest) {
          continue;
        }
        let newSpec = path.relative(path.dirname(dest), importedDest);
        if (!newSpec.startsWith('.')) {
          newSpec = `./${newSpec}`;
        }
        newSpec = newSpec.replace(/\.(?:tsx?|jsx?)$/, '');
        newSpec = newSpec.split(path.sep).join('/');
        for (const pos of rel.positions) {
          edits.push({ start: pos.start, end: pos.end, newSpecifier: newSpec });
        }
      }
      let content = applyImportEdits(code, edits);

      // Insert focus markers based on the legacy `<Demo>.tsx.preview` snippet,
      // but only on the demo entry file (not shared helpers).
      if (absPath === info.source) {
        const previewPath = path.join(dir, `${demoName}.tsx.preview`);
        if (await fileExists(previewPath)) {
          const previewText = await fs.readFile(previewPath, 'utf8');
          const withMarkers = insertFocusMarkers(content, previewText);
          if (withMarkers !== null) {
            content = withMarkers;
          } else {
            log(
              `  WARN: could not match preview to source for ${demoName} in ${path.relative(REPO_ROOT, mdPath)}`,
            );
          }
        }
      }

      if (dest !== absPath || content !== code) {
        fileWrites.push({ destPath: dest, content });
      }
      if (dest !== absPath) {
        filesToDelete.add(absPath);
      }
    }
  }

  for (const [name] of demoInfo) {
    const destDir = path.dirname(demoDest.get(name));
    fileWrites.push({
      destPath: path.join(destDir, 'index.ts'),
      content: indexTsTemplate(name),
    });
  }

  // Deduplicate fileWrites by destPath (shared helpers are visited in every
  // demo's graph). Keep the last entry; assert content agreement.
  const dedupedByPath = new Map();
  for (const w of fileWrites) {
    const existing = dedupedByPath.get(w.destPath);
    if (existing && existing.content !== w.content) {
      throw new Error(
        `migrateDemos: conflicting rewrites for ${path.relative(REPO_ROOT, w.destPath)}`,
      );
    }
    dedupedByPath.set(w.destPath, w);
  }
  const dedupedWrites = [...dedupedByPath.values()];

  // Patch the markdown.
  let newMd = '';
  let cursor = 0;
  for (const m of matches) {
    const componentName = m[1];
    const tail = m[2];
    if (!demoInfo.has(componentName)) {
      continue;
    }
    const folder = folderTokens.get(componentName);
    const newPath = `file://./demos/${folder}/index.ts`;
    const replacement = `{{"component": "${newPath}"${tail}}}`;
    newMd += src.slice(cursor, m.index);
    newMd += replacement;
    cursor = m.index + m[0].length;
  }
  newMd += src.slice(cursor);
  const mdChanged = newMd !== src;

  // Delete legacy siblings of every migrated demo.
  for (const [, info] of demoInfo) {
    const base = path.basename(info.source, info.ext);
    for (const ext of [...DEMO_EXTS, '.tsx.preview']) {
      const candidate = path.join(dir, `${base}${ext}`);
      if (candidate === info.source) {
        continue;
      }
      if (await fileExists(candidate)) {
        filesToDelete.add(candidate);
      }
    }
  }

  // Delete legacy siblings of every moved helper too (e.g. when we move
  // `components/Menubar.tsx`, we also want `components/Menubar.js` gone).
  for (const helperPath of helperDest.keys()) {
    const helperDir = path.dirname(helperPath);
    const helperExt = path.extname(helperPath);
    const helperBase = path.basename(helperPath, helperExt);
    for (const ext of [...DEMO_EXTS, '.tsx.preview']) {
      const candidate = path.join(helperDir, `${helperBase}${ext}`);
      if (candidate === helperPath) {
        continue;
      }
      if (await fileExists(candidate)) {
        filesToDelete.add(candidate);
      }
    }
  }

  // Orphan cleanup: any *.tsx, *.js, *.tsx.preview directly in `dir` that we did
  // not touch (i.e. not referenced by any {{"demo": …}}) is removed.
  const dirEntries = await fs.readdir(dir, { withFileTypes: true });
  const referencedNames = new Set([...demoInfo.keys()]);
  for (const ent of dirEntries) {
    if (!ent.isFile()) {
      continue;
    }
    const isDemoLike =
      ent.name.endsWith('.tsx.preview') ||
      ent.name.endsWith('.tsx') ||
      ent.name.endsWith('.js') ||
      ent.name.endsWith('.jsx') ||
      ent.name.endsWith('.ts');
    if (!isDemoLike) {
      continue;
    }
    let base = ent.name;
    if (base.endsWith('.tsx.preview')) {
      base = base.slice(0, -'.tsx.preview'.length);
    } else {
      base = base.replace(/\.(?:tsx?|jsx?)$/, '');
    }
    if (referencedNames.has(base)) {
      continue;
    }
    if (!/^[A-Z][A-Za-z0-9]*$/.test(base)) {
      continue;
    }
    filesToDelete.add(path.join(dir, ent.name));
  }

  plan.push({
    mdPath,
    mdChanged,
    newMd,
    fileWrites: dedupedWrites,
    filesToDelete: [...filesToDelete],
  });
}

// ---------- entrypoint ----------
async function main() {
  log(
    `migrateDemos: ${WRITE ? 'WRITE' : 'DRY-RUN'} root=${path.relative(REPO_ROOT, ROOT)}${
      FILTER ? ` filter=${FILTER}` : ''
    }`,
  );

  const mdFiles = [];
  for await (const entry of fs.glob('**/*.md', { cwd: ROOT })) {
    if (FILTER && !entry.includes(FILTER)) {
      continue;
    }
    mdFiles.push(path.join(ROOT, entry));
  }
  log(`Found ${mdFiles.length} markdown files`);

  const plan = [];
  for (const md of mdFiles) {
    try {
      await processMarkdown(md, plan);
    } catch (err) {
      log(`  ERROR processing ${path.relative(REPO_ROOT, md)}: ${err.message}`);
      if (VERBOSE) {
        console.error(err.stack);
      }
    }
  }

  let totalWrites = 0;
  let totalDeletes = 0;
  let totalMdPatched = 0;
  for (const entry of plan) {
    if (entry.mdChanged) {
      totalMdPatched += 1;
    }
    totalWrites += entry.fileWrites.length;
    totalDeletes += entry.filesToDelete.length;
    if (VERBOSE) {
      log(`\n${path.relative(REPO_ROOT, entry.mdPath)}`);
      if (entry.mdChanged) {
        log(`  PATCH md`);
      }
      for (const w of entry.fileWrites) {
        log(`  WRITE ${path.relative(REPO_ROOT, w.destPath)}`);
      }
      for (const d of entry.filesToDelete) {
        log(`  DELETE ${path.relative(REPO_ROOT, d)}`);
      }
    }
  }
  log(
    `\nSummary: ${totalMdPatched} md patched, ${totalWrites} files written, ${totalDeletes} files deleted`,
  );

  if (!WRITE) {
    log(`\n(dry-run; pass --write to apply)`);
    return;
  }

  for (const entry of plan) {
    for (const w of entry.fileWrites) {
      await fs.mkdir(path.dirname(w.destPath), { recursive: true });
      await fs.writeFile(w.destPath, w.content);
    }
    for (const d of entry.filesToDelete) {
      try {
        await fs.unlink(d);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          throw err;
        }
      }
    }
    if (entry.mdChanged) {
      await fs.writeFile(entry.mdPath, entry.newMd);
    }
  }

  // Prune any directories that became empty as a result of helper moves
  // (e.g. an old `components/` subdir).
  const candidateParents = new Set();
  for (const entry of plan) {
    for (const d of entry.filesToDelete) {
      candidateParents.add(path.dirname(d));
    }
  }
  // Sort by depth (deepest first) so child dirs are pruned before parents.
  const sortedParents = [...candidateParents].sort(
    (a, b) => b.split(path.sep).length - a.split(path.sep).length,
  );
  for (const dir of sortedParents) {
    try {
      const entries = await fs.readdir(dir);
      if (entries.length === 0) {
        await fs.rmdir(dir);
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }
  }

  log(`\nDone.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
