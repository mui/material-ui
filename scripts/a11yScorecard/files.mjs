import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as prettier from 'prettier';

export const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const componentsDirectory = path.join(rootDirectory, 'packages/mui-material/src');
export const indexPath = path.join(componentsDirectory, 'accessibility.md');
export const checklistPath = path.join(componentsDirectory, 'manual-testing.md');
export const scorecardPath = path.join(
  rootDirectory,
  'docs/data/material/getting-started/accessibility/scorecard.json',
);
export const docsPagePath = path.join(
  rootDirectory,
  'docs/data/material/getting-started/accessibility/accessibility.md',
);
export const packageJsonPath = path.join(rootDirectory, 'packages/mui-material/package.json');

export const relative = (filepath) => path.relative(rootDirectory, filepath);

/** Returns the file content, or `null` when the file does not exist. */
export async function readOptional(filepath) {
  try {
    return await fs.readFile(filepath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
    return null;
  }
}

export async function exists(filepath) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

/** Formats generated output the way Prettier would, so `test_static` stays green. */
export async function format(source, filepath) {
  const config = await prettier.resolveConfig(filepath);
  return prettier.format(source, { ...config, filepath });
}

/** Replaces the content between `<!-- <name>:start -->` and `<!-- <name>:end -->`. */
export function replaceBlock(source, replacement, filepath, name = 'scorecard') {
  const startMarker = `<!-- ${name}:start -->`;
  const endMarker = `<!-- ${name}:end -->`;
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker);
  if (start === -1 || end === -1) {
    throw new Error(`Missing ${startMarker} / ${endMarker} markers in ${relative(filepath)}`);
  }
  return `${source.slice(0, start + startMarker.length)}\n\n${replacement}\n\n${source.slice(end)}`;
}
