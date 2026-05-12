#!/usr/bin/env node
/* eslint-disable no-console, no-await-in-loop, no-nested-ternary --
 * One-off CLI: console output is the UX, sequential awaits keep the merge
 * deterministic, and the small ext-precedence ternary is clearer inline.
 */
/**
 * Helper for resolving merge conflicts that arise when upstream edits a legacy
 * demo file whose path was changed by `scripts/migrateDemos.mjs`.
 *
 * Handles two cases:
 *
 *   A. "deleted by us" — git did not detect the rename. The old path appears
 *      in stages 1 and 3 only.
 *
 *   B. "both modified" — git misdetected the rename and paired an unrelated
 *      legacy file with the new path. Stages 1 and 3 contain content from a
 *      different file. Detected when a sibling legacy file with the same
 *      basename exists in MERGE_HEAD/merge-base.
 *
 * For each conflict the script:
 *
 *   1. Locates the legacy old path:
 *        A: same basename under a sibling `demos/<slug>/` directory.
 *        B: same basename in the parent `<componentDir>/` (sibling of demos/).
 *   2. Performs a 3-way merge of:
 *        BASE   = old path @ merge-base
 *        OURS   = new path content from our branch (stage 2 / working tree)
 *        THEIRS = old path @ MERGE_HEAD
 *      using `git merge-file`, writing the result back to the new path.
 *   3. Stages the new path; for case A also `git rm`s the old path.
 *
 * Files with no obvious legacy path are skipped and reported. Files with
 * remaining conflict markers are left for manual resolution.
 *
 * Usage:
 *   node scripts/resolveDemoMergeConflicts.mjs            # do it
 *   node scripts/resolveDemoMergeConflicts.mjs --dry-run  # report only
 */

import { execFileSync, spawnSync } from 'node:child_process';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const DRY_RUN = process.argv.includes('--dry-run');
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

function git(args, opts = {}) {
  return execFileSync('git', args, {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
    maxBuffer: 1024 * 1024 * 64,
    ...opts,
  });
}

function gitTry(args) {
  const result = spawnSync('git', args, {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 64,
  });
  return { code: result.status ?? 1, stdout: result.stdout ?? '', stderr: result.stderr ?? '' };
}

function showBlob(ref, file) {
  const result = spawnSync('git', ['show', `${ref}:${file}`], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 64,
  });
  if (result.status !== 0) {
    return null;
  }
  return result.stdout;
}

async function findNewPath(oldRelPath) {
  const dir = path.dirname(oldRelPath);
  const base = path.basename(oldRelPath, path.extname(oldRelPath));
  const demosDir = path.join(REPO_ROOT, dir, 'demos');
  let slugs;
  try {
    slugs = await fs.readdir(demosDir, { withFileTypes: true });
  } catch {
    return null;
  }
  const matches = [];
  for (const entry of slugs) {
    if (!entry.isDirectory()) {
      continue;
    }
    for (const ext of EXTENSIONS) {
      const candidate = path.join(demosDir, entry.name, `${base}${ext}`);
      try {
        await fs.access(candidate);
        matches.push(path.relative(REPO_ROOT, candidate));
      } catch {
        // ignore
      }
    }
  }
  if (matches.length === 0) {
    return null;
  }
  if (matches.length > 1) {
    return { ambiguous: matches };
  }
  return { path: matches[0] };
}

function listConflicts() {
  // ls-files -u prints stages 1 (base), 2 (ours), 3 (theirs).
  const lines = git(['ls-files', '-u']).split('\n').filter(Boolean);
  const stages = new Map(); // path -> Map<stage, sha>
  for (const line of lines) {
    const match = line.match(/^\d+\s+([0-9a-f]+)\s+(\d)\t(.+)$/);
    if (!match) {
      continue;
    }
    const [, sha, stage, file] = match;
    if (!stages.has(file)) {
      stages.set(file, new Map());
    }
    stages.get(file).set(stage, sha);
  }
  const deletedByUs = [];
  const bothModified = [];
  for (const [file, map] of stages) {
    if (map.has('1') && map.has('3') && !map.has('2')) {
      deletedByUs.push(file);
    } else if (map.has('1') && map.has('2') && map.has('3')) {
      bothModified.push({ file, stages: map });
    }
    // Other shapes (added by us / deleted by them / etc.) are left alone.
  }
  return {
    deletedByUs: deletedByUs.sort(),
    bothModified: bothModified.sort((a, b) => a.file.localeCompare(b.file)),
  };
}

async function findLegacyPath(newRelPath, ref) {
  // newRelPath looks like .../<componentDir>/demos/<slug>/<Base>.<ext>
  const ext = path.extname(newRelPath);
  const base = path.basename(newRelPath, ext);
  const segments = newRelPath.split(path.sep);
  const demosIdx = segments.lastIndexOf('demos');
  if (demosIdx < 1) {
    return null;
  }
  const componentDir = segments.slice(0, demosIdx).join(path.sep);
  // Try same ext first, then the other common ext.
  const exts =
    ext === '.tsx' ? ['.tsx', '.js'] : ext === '.js' ? ['.js', '.tsx'] : [ext, '.tsx', '.js'];
  for (const candidateExt of exts) {
    const candidate = `${componentDir}/${base}${candidateExt}`;
    const result = spawnSync('git', ['cat-file', '-e', `${ref}:${candidate}`], {
      cwd: REPO_ROOT,
    });
    if (result.status === 0) {
      return candidate;
    }
  }
  return null;
}

async function threeWayMerge({ newPath, oldPath, baseContent, oursContent, theirsContent }) {
  if (DRY_RUN) {
    return { status: 'would-merge' };
  }
  const tmpDir = await fs.mkdtemp(path.join(REPO_ROOT, '.merge-demo-'));
  const oursFile = path.join(tmpDir, 'ours');
  const baseFile = path.join(tmpDir, 'base');
  const theirsFile = path.join(tmpDir, 'theirs');
  await fs.writeFile(oursFile, oursContent);
  await fs.writeFile(baseFile, baseContent);
  await fs.writeFile(theirsFile, theirsContent);

  const merge = gitTry([
    'merge-file',
    '-L',
    `ours (${newPath})`,
    '-L',
    `base (${oldPath} @ merge-base)`,
    '-L',
    `theirs (${oldPath} @ MERGE_HEAD)`,
    oursFile,
    baseFile,
    theirsFile,
  ]);

  const merged = await fs.readFile(oursFile, 'utf8');
  await fs.rm(tmpDir, { recursive: true, force: true });

  if (merge.code < 0) {
    return { status: 'merge-error', stderr: merge.stderr };
  }

  await fs.writeFile(path.join(REPO_ROOT, newPath), merged);
  return { status: merge.code === 0 ? 'merged' : 'conflicts', conflicts: merge.code };
}

async function resolveDeletedByUs(oldPath, mergeBase, mergeHead) {
  const lookup = await findNewPath(oldPath);
  if (!lookup) {
    return { oldPath, status: 'no-new-path' };
  }
  if (lookup.ambiguous) {
    return { oldPath, status: 'ambiguous', candidates: lookup.ambiguous };
  }
  const newPath = lookup.path;
  const baseContent = showBlob(mergeBase, oldPath);
  const theirsContent = showBlob(mergeHead, oldPath);
  if (baseContent === null || theirsContent === null) {
    return { oldPath, status: 'missing-blob' };
  }
  let oursContent;
  try {
    oursContent = await fs.readFile(path.join(REPO_ROOT, newPath), 'utf8');
  } catch {
    return { oldPath, status: 'missing-new-file', newPath };
  }

  const result = await threeWayMerge({ newPath, oldPath, baseContent, oursContent, theirsContent });
  if (DRY_RUN || result.status === 'merge-error') {
    return { oldPath, newPath, ...result };
  }
  if (result.status === 'merged') {
    git(['add', '--', newPath]);
    git(['rm', '--quiet', '--', oldPath]);
  } else {
    // Conflict markers written into newPath; drop the old path so its half of
    // the conflict goes away.
    git(['rm', '--quiet', '--', oldPath]);
  }
  return { oldPath, newPath, ...result };
}

async function resolveBothModified(entry, mergeBase, mergeHead) {
  const newPath = entry.file;
  const oursSha = entry.stages.get('2');
  if (!oursSha) {
    return { newPath, status: 'no-ours-stage' };
  }
  const legacyPath =
    (await findLegacyPath(newPath, mergeHead)) || (await findLegacyPath(newPath, mergeBase));
  if (!legacyPath) {
    return { newPath, status: 'no-legacy-path' };
  }
  const baseContent = showBlob(mergeBase, legacyPath);
  const theirsContent = showBlob(mergeHead, legacyPath);
  if (baseContent === null || theirsContent === null) {
    return { newPath, oldPath: legacyPath, status: 'missing-blob' };
  }
  const oursContent = git(['cat-file', '-p', oursSha]);

  const result = await threeWayMerge({
    newPath,
    oldPath: legacyPath,
    baseContent,
    oursContent,
    theirsContent,
  });
  if (DRY_RUN || result.status === 'merge-error') {
    return { newPath, oldPath: legacyPath, ...result };
  }
  if (result.status === 'merged') {
    git(['add', '--', newPath]);
  }
  // If conflicts remain, leave the file with markers; do NOT auto-add.
  return { newPath, oldPath: legacyPath, ...result };
}

async function main() {
  const mergeHead = git(['rev-parse', 'MERGE_HEAD']).trim();
  const mergeBase = git(['merge-base', 'HEAD', 'MERGE_HEAD']).trim();

  const { deletedByUs, bothModified } = listConflicts();
  if (deletedByUs.length === 0 && bothModified.length === 0) {
    console.log('No applicable conflicts found.');
    return;
  }

  console.log(
    `Found ${deletedByUs.length} "deleted by us" + ${bothModified.length} "both modified" conflict(s).`,
  );
  console.log(`merge-base: ${mergeBase}`);
  console.log(`MERGE_HEAD: ${mergeHead}`);
  console.log('');

  const results = [];
  if (deletedByUs.length > 0) {
    console.log('-- deleted by us --');
    for (const oldPath of deletedByUs) {
      const r = await resolveDeletedByUs(oldPath, mergeBase, mergeHead);
      results.push(r);
      const tag = r.status.padEnd(16);
      const detail = r.newPath ? ` -> ${r.newPath}` : '';
      const extra = r.conflicts ? `  [${r.conflicts} conflict region(s)]` : '';
      console.log(`  ${tag} ${r.oldPath}${detail}${extra}`);
      if (r.status === 'ambiguous') {
        for (const c of r.candidates) {
          console.log(`      candidate: ${c}`);
        }
      }
    }
  }
  if (bothModified.length > 0) {
    console.log('-- both modified (misdetected rename) --');
    for (const entry of bothModified) {
      const r = await resolveBothModified(entry, mergeBase, mergeHead);
      results.push(r);
      const tag = r.status.padEnd(16);
      const from = r.oldPath ? ` (legacy: ${r.oldPath})` : '';
      const extra = r.conflicts ? `  [${r.conflicts} conflict region(s)]` : '';
      console.log(`  ${tag} ${r.newPath}${from}${extra}`);
    }
  }

  console.log('');
  const summary = results.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});
  for (const [status, count] of Object.entries(summary)) {
    console.log(`  ${status}: ${count}`);
  }

  if (summary.conflicts || summary.ambiguous || summary['no-new-path']) {
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
