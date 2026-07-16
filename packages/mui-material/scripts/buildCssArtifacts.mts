import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unstable_createBreakpoints as createBreakpoints } from '@mui/system/createBreakpoints';
import { Features, transform } from 'lightningcss';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(dirname, '..');
const srcRoot = path.join(packageRoot, 'src');

// The aggregate styles.css components CSS file needs no consumer preprocessing, so compile it with MUI's defaults.
const defaultBreakpoints = createBreakpoints({});
const defaultCustomMedia = defaultBreakpoints.keys
  .flatMap((key) => [
    `@custom-media --mui-breakpoint-up-${key} ${defaultBreakpoints.up(key).replace(/^@media\s*/, '')};`,
    `@custom-media --mui-breakpoint-down-${key} ${defaultBreakpoints.down(key).replace(/^@media\s*/, '')};`,
  ])
  .join('\n');

async function findCssFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findCssFiles(absolutePath);
      }

      if (entry.isFile() && entry.name.endsWith('.module.css')) {
        return [absolutePath];
      }

      return [];
    }),
  );

  return files.flat().sort();
}

const cssFiles = await findCssFiles(srcRoot);
const css = (
  await Promise.all(
    cssFiles.map(async (file) => {
      const relativePath = path.relative(srcRoot, file);
      const contents = await readFile(file, 'utf8');
      // cssModules removes :global() without hashing Material UI's stable class names.
      const result = transform({
        filename: relativePath,
        code: Buffer.from(`${defaultCustomMedia}\n${contents}`),
        cssModules: true,
        drafts: { customMedia: true },
        include: Features.CustomMediaQueries,
      });

      return `/* ${relativePath} */\n${result.code.toString().trim()}\n`;
    }),
  )
).join('\n');

await writeFile(path.join(srcRoot, 'styles.css'), `${css}\n`);
