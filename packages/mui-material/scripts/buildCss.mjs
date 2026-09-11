import { existsSync } from 'node:fs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDirectory = path.join(packageDirectory, 'src');
const outputDirectory = path.join(packageDirectory, 'build/css');
const themedEntriesOutputDirectory = path.join(packageDirectory, 'build/themes');
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

async function writeThemedEntry(relativePath, source) {
  const outputPath = path.join(themedEntriesOutputDirectory, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, source);
}

/**
 * Generates wrappers that couple a component's existing JavaScript API to one granular theme CSS
 * entry. Theme barrels use the whole-theme stylesheet instead because CSS imports are side effects
 * and therefore cannot be safely tree-shaken according to which named barrel exports are used.
 */
async function buildThemedEntries(themes) {
  await rm(themedEntriesOutputDirectory, { recursive: true, force: true });

  await Promise.all(
    [...themes].map(async ([themeName, components]) => {
      const sortedComponents = components.sort((a, b) =>
        a.componentName.localeCompare(b.componentName),
      );

      // Each direct entry imports exactly one self-contained theme stylesheet, then preserves the
      // corresponding core component's default and named exports.
      await Promise.all(
        sortedComponents.flatMap(({ componentName, fileName }) => {
          const cssPath = `../../../css/themes/${themeName}/${fileName}.css`;
          const esmComponentPath = `../../../${componentName}/index.mjs`;
          const cjsComponentPath = `../../../${componentName}/index.js`;

          return [
            writeThemedEntry(
              `${themeName}/${componentName}/index.mjs`,
              `import '${cssPath}';\n\nexport { default } from '${esmComponentPath}';\nexport * from '${esmComponentPath}';\n`,
            ),
            writeThemedEntry(
              `${themeName}/${componentName}/index.js`,
              `'use strict';\n\nrequire('${cssPath}');\nmodule.exports = require('${cjsComponentPath}');\n`,
            ),
            writeThemedEntry(
              `${themeName}/${componentName}/index.d.mts`,
              `export { default } from '${esmComponentPath}';\nexport * from '${esmComponentPath}';\n`,
            ),
            writeThemedEntry(
              `${themeName}/${componentName}/index.d.ts`,
              `export { default } from '${cjsComponentPath}';\nexport * from '${cjsComponentPath}';\n`,
            ),
          ];
        }),
      );

      const esmExports = sortedComponents
        .map(
          ({ componentName }) =>
            `export { default as ${componentName} } from '../../${componentName}/index.mjs';`,
        )
        .join('\n');
      const cjsExports = sortedComponents
        .map(
          ({ componentName }) =>
            `Object.defineProperty(exports, '${componentName}', {\n  enumerable: true,\n  get: function () {\n    return require('../../${componentName}/index.js').default;\n  },\n});`,
        )
        .join('\n');
      const esmTypeExports = sortedComponents
        .map(
          ({ componentName }) =>
            `export { default as ${componentName} } from '../../${componentName}/index.mjs';`,
        )
        .join('\n');
      const cjsTypeExports = sortedComponents
        .map(
          ({ componentName }) =>
            `export { default as ${componentName} } from '../../${componentName}/index.js';`,
        )
        .join('\n');

      // A barrel is the convenience path and deliberately loads the whole theme. Granular consumers
      // use the component wrappers above, which load only their corresponding component CSS.
      await Promise.all([
        writeThemedEntry(
          `${themeName}/index.mjs`,
          `import '../../css/themes/${themeName}/index.css';\n\n${esmExports}\n`,
        ),
        writeThemedEntry(
          `${themeName}/index.js`,
          `'use strict';\n\nrequire('../../css/themes/${themeName}/index.css');\nObject.defineProperty(exports, '__esModule', { value: true });\n${cjsExports}\n`,
        ),
        writeThemedEntry(`${themeName}/index.d.mts`, `${esmTypeExports}\n`),
        writeThemedEntry(`${themeName}/index.d.ts`, `${cjsTypeExports}\n`),
      ]);
    }),
  );
}

/**
 * Generates the public CSS distribution and themed JavaScript entries from component-owned CSS.
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
                componentName,
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
    for (const { themeName, componentName, fileName, css } of componentThemes) {
      const components = themes.get(themeName) ?? [];
      components.push({ componentName, fileName, css });
      themes.set(themeName, components);
    }
  }

  // A themed barrel must have the same component surface for every theme. Treat a missing theme
  // file as a build error instead of publishing a theme whose JavaScript API silently differs.
  for (const [themeName, components] of themes) {
    const themedComponentNames = new Set(components.map(({ componentName }) => componentName));
    const missingComponents = componentDirectories
      .map(({ name }) => name)
      .filter((componentName) => !themedComponentNames.has(componentName));

    if (missingComponents.length > 0) {
      throw new Error(
        `Theme "${themeName}" is missing CSS for: ${missingComponents.join(', ')}. ` +
          'Every generated theme entry must expose the same component set.',
      );
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

  await buildThemedEntries(themes);

  // Workspace links and published packages both point at build/, so expose generated artifacts
  // relative to that directory instead of the source package paths.
  if (existsSync(outputPackageJson)) {
    const packageJson = JSON.parse(await readFile(outputPackageJson, 'utf8'));
    if (packageJson.exports['./css/*'] !== './css/*') {
      packageJson.exports['./css/*'] = './css/*';
    }
    packageJson.exports['./themes/*'] = {
      import: {
        types: './themes/*/index.d.mts',
        default: './themes/*/index.mjs',
      },
      require: {
        types: './themes/*/index.d.ts',
        default: './themes/*/index.js',
      },
      default: {
        types: './themes/*/index.d.mts',
        default: './themes/*/index.mjs',
      },
    };
    await writeFile(outputPackageJson, `${JSON.stringify(packageJson, null, 2)}\n`);
  }

  // eslint-disable-next-line no-console
  console.log(
    `Generated CSS and themed JavaScript entries for ${componentDirectories.length} components and ${themes.size} themes.`,
  );
}

const isDirectExecution =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  await buildCss();
}
