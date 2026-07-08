import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Breakpoint } from '@mui/system';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(dirname, '..');
const srcRoot = path.join(packageRoot, 'src');

const defaultBreakpointValues: Record<Breakpoint, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

function up(key: Breakpoint) {
  return `(min-width:${defaultBreakpointValues[key]}px)`;
}

function down(key: Breakpoint) {
  return `(max-width:${defaultBreakpointValues[key] - 0.05}px)`;
}

async function findCssFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findCssFiles(absolutePath);
      }

      if (
        entry.isFile() &&
        entry.name.endsWith('.css') &&
        entry.name !== 'styles.css' &&
        entry.name !== 'styles-source.css'
      ) {
        return [absolutePath];
      }

      return [];
    }),
  );

  return files.flat().sort();
}

function createReplacementMap() {
  const replacements = new Map<string, string>();

  (Object.keys(defaultBreakpointValues) as Breakpoint[]).forEach((key) => {
    replacements.set(`--mui-breakpoint-up-${key}`, up(key));
    replacements.set(`--mui-breakpoint-down-${key}`, down(key));
  });

  return replacements;
}

function resolveDefaultBreakpoints(css: string) {
  const replacements = createReplacementMap();

  return css.replace(/\(--mui-breakpoint-[\w-]+\)/g, (match) => {
    const customMediaName = match.slice(1, -1);
    const replacement = replacements.get(customMediaName);

    if (!replacement) {
      throw new Error(`Missing default breakpoint for ${customMediaName}`);
    }

    return replacement;
  });
}

const cssFiles = await findCssFiles(srcRoot);
const sourceCss = (
  await Promise.all(
    cssFiles.map(async (file) => {
      const relativePath = path.relative(srcRoot, file);
      const contents = await readFile(file, 'utf8');

      return `/* ${relativePath} */\n${contents.trim()}\n`;
    }),
  )
).join('\n');

await writeFile(path.join(srcRoot, 'styles-source.css'), `${sourceCss}\n`);
await writeFile(path.join(srcRoot, 'styles.css'), `${resolveDefaultBreakpoints(sourceCss)}\n`);
