/* eslint-disable no-console */
import path from 'path';
import * as fs from 'fs/promises';
import glob from 'fast-glob';
import url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const BUILD_DIR = path.resolve(currentDirectory, '../build');
const BANNER_END = ' */\n';

// `code-infra build-new` adds the license header to every file. With ~21k icon files it adds
// ~4 MB to the package, so only the index files keep it, as with `code-infra build`.
async function run() {
  const files = await glob(['**/*.{js,mjs}', '!index.{js,mjs}'], { cwd: BUILD_DIR });
  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(BUILD_DIR, file);
      const code = await fs.readFile(filePath, 'utf8');
      if (!code.startsWith('/**\n * @mui/icons-material v')) {
        return;
      }
      await fs.writeFile(filePath, code.slice(code.indexOf(BANNER_END) + BANNER_END.length));
    }),
  );
  console.log(`Removed the license header from ${files.length} files.`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
