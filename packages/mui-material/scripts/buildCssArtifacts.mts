import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(dirname, '..');
const srcRoot = path.join(packageRoot, 'src');

const defaultBreakpointValues: Record<string, number> = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

const defaultBreakpoints = {
  keys: Object.keys(defaultBreakpointValues),
  values: defaultBreakpointValues,
  up: (key: string) => `@media (min-width:${defaultBreakpointValues[key]}px)`,
  down: (key: string) => `@media (max-width:${defaultBreakpointValues[key] - 0.05}px)`,
};

async function findCssModules(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findCssModules(absolutePath);
      }

      if (entry.isFile() && entry.name.endsWith('.module.css')) {
        return [absolutePath];
      }

      return [];
    }),
  );

  return files.flat().sort();
}

function createReplacementMap() {
  const replacements = new Map<string, string>();

  defaultBreakpoints.keys.forEach((key) => {
    replacements.set(
      `--mui-breakpoint-up-${key}`,
      defaultBreakpoints.up(key).replace(/^@media\s*/, ''),
    );
    replacements.set(
      `--mui-breakpoint-down-${key}`,
      defaultBreakpoints.down(key).replace(/^@media\s*/, ''),
    );
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

const cssModuleFiles = await findCssModules(srcRoot);
const sourceCss = (
  await Promise.all(
    cssModuleFiles.map(async (file) => {
      const relativePath = path.relative(srcRoot, file);
      const contents = await readFile(file, 'utf8');

      return `/* ${relativePath} */\n${contents.trim()}\n`;
    }),
  )
).join('\n');

await writeFile(path.join(srcRoot, 'components-source.css'), `${sourceCss}\n`);
await writeFile(path.join(srcRoot, 'components.css'), `${resolveDefaultBreakpoints(sourceCss)}\n`);
