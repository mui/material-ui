import { existsSync } from 'node:fs';
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from 'lightningcss';

const packageDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const themesDirectory = path.join(packageDirectory, 'build/css/themes');
const sourceMapComment = '\n/*# sourceMappingURL=index.bundle.css.map */\n';

const themeDirectories = (await readdir(themesDirectory, { withFileTypes: true })).filter((entry) =>
  entry.isDirectory(),
);

const generatedThemes = await Promise.all(
  themeDirectories.map(async (themeDirectory) => {
    const themePath = path.join(themesDirectory, themeDirectory.name);
    const inputPath = path.join(themePath, 'index.css');

    // Theme discovery is directory-based, so adding a theme requires no build-script registry.
    if (!existsSync(inputPath)) {
      return false;
    }

    const { code, map } = bundle({
      filename: inputPath,
      minify: true,
      sourceMap: true,
    });

    await Promise.all([
      writeFile(
        path.join(themePath, 'index.bundle.css'),
        Buffer.concat([code, Buffer.from(sourceMapComment)]),
      ),
      writeFile(path.join(themePath, 'index.bundle.css.map'), map),
    ]);

    return true;
  }),
);

// eslint-disable-next-line no-console
console.log(`Generated ${generatedThemes.filter(Boolean).length} flattened theme CSS bundles.`);
