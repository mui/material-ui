import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(packageDirectory, 'src');
const outputDirectory = path.join(packageDirectory, 'build/css');
const outputPackageJson = path.join(packageDirectory, 'build/package.json');
const layerOrder = '@layer mui.tokens, mui.base, mui.theme, mui.a11y;';

function indent(css) {
  return css
    .trim()
    .split('\n')
    .map((line) => (line ? `  ${line}` : ''))
    .join('\n');
}

function wrapInLayer(css, layer) {
  return `${layerOrder}\n\n@layer ${layer} {\n${indent(css)}\n}\n`;
}

function componentFileName(componentName) {
  return componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

async function writeCss(relativePath, css) {
  const outputPath = path.join(outputDirectory, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, css);
}

/**
 * Generates the public CSS distribution from component-owned source files.
 */
export default async function buildCss() {
  await rm(outputDirectory, { recursive: true, force: true });

  const tokens = await readFile(path.join(sourceDirectory, 'tokens/tokens.css'), 'utf8');
  await writeCss('tokens.css', wrapInLayer(tokens, 'mui.tokens'));

  const sourceEntries = await readdir(sourceDirectory, { withFileTypes: true });
  const componentDirectories = sourceEntries.filter(
    (entry) =>
      entry.isDirectory() && existsSync(path.join(sourceDirectory, entry.name, 'css/base.css')),
  );
  // Generate public foundation files and collect theme sources for each component in parallel.
  const discoveredThemes = await Promise.all(
    componentDirectories.map(async (componentDirectory) => {
      const componentName = componentDirectory.name;
      const fileName = componentFileName(componentName);
      const componentCssDirectory = path.join(sourceDirectory, componentName, 'css');
      const base = await readFile(path.join(componentCssDirectory, 'base.css'), 'utf8');
      const forcedColorsPath = path.join(componentCssDirectory, 'forced-colors.css');
      const hasForcedColors = existsSync(forcedColorsPath);
      const baseImports = hasForcedColors ? `\n@import '../a11y/${fileName}.css';` : '';
      const componentThemesDirectory = path.join(componentCssDirectory, 'themes');

      const themeSources = existsSync(componentThemesDirectory)
        ? await Promise.all(
            (await readdir(componentThemesDirectory, { withFileTypes: true }))
              .filter((entry) => entry.isFile() && entry.name.endsWith('.css'))
              .map(async (themeFile) => ({
                themeName: path.basename(themeFile.name, '.css'),
                fileName,
                css: await readFile(path.join(componentThemesDirectory, themeFile.name), 'utf8'),
              })),
          )
        : [];

      await Promise.all([
        writeCss(
          `base/${fileName}.css`,
          `${layerOrder}${baseImports}\n\n@layer mui.base {\n${indent(base)}\n}\n`,
        ),
        hasForcedColors
          ? readFile(forcedColorsPath, 'utf8').then((forcedColors) =>
              writeCss(`a11y/${fileName}.css`, wrapInLayer(forcedColors, 'mui.a11y')),
            )
          : Promise.resolve(),
      ]);

      return themeSources;
    }),
  );

  const themes = new Map();

  // Group the discovered component files by theme without maintaining a theme registry.
  for (const componentThemes of discoveredThemes) {
    for (const { themeName, fileName, css } of componentThemes) {
      const components = themes.get(themeName) ?? [];
      components.push({ fileName, css });
      themes.set(themeName, components);
    }
  }

  // Generate self-contained granular files and one import-based rollup for every discovered theme.
  await Promise.all(
    [...themes].map(([themeName, components]) => {
      const sortedComponents = components.sort((a, b) => a.fileName.localeCompare(b.fileName));
      const imports = sortedComponents
        .map(({ fileName }) => `@import './${fileName}.css';`)
        .join('\n');

      return Promise.all([
        ...sortedComponents.map(({ fileName, css }) =>
          writeCss(
            `themes/${themeName}/${fileName}.css`,
            `${layerOrder}\n\n@import '../../tokens.css';\n@import '../../base/${fileName}.css';\n\n@layer mui.theme {\n${indent(css)}\n}\n`,
          ),
        ),
        writeCss(`themes/${themeName}/index.css`, `${layerOrder}\n\n${imports}\n`),
      ]);
    }),
  );

  // Workspace links and published packages both point at build/, where CSS is rooted at ./css/.
  if (existsSync(outputPackageJson)) {
    const packageJson = JSON.parse(await readFile(outputPackageJson, 'utf8'));
    if (packageJson.exports['./css/*'] !== './css/*') {
      packageJson.exports['./css/*'] = './css/*';
      await writeFile(outputPackageJson, `${JSON.stringify(packageJson, null, 2)}\n`);
    }
  }

  // eslint-disable-next-line no-console
  console.log(
    `Generated CSS entries for ${componentDirectories.length} components and ${themes.size} themes.`,
  );
}

const isDirectExecution =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  await buildCss();
}
