import { cp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Builds a parallel package tree with component CSS imports, leaving the default tree CSS-free.
const dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(dirname, '..');
const sourceRoot = path.join(packageRoot, 'src');
const buildRoot = path.join(packageRoot, 'build');
const variantRoot = path.join(buildRoot, 'css-modules');

async function findCssModules(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return findCssModules(absolutePath);
      }

      return entry.isFile() && entry.name.endsWith('.module.css') ? [absolutePath] : [];
    }),
  );

  return files.flat().sort();
}

function insertAfterDirectives(code: string, statement: string) {
  let offset = 0;
  let match = code.match(/^(?:"[^"]+"|'[^']+');\r?\n/);

  // Keep "use strict" and "use client" at the start of generated modules.
  while (match) {
    offset += match[0].length;
    match = code.slice(offset).match(/^(?:"[^"]+"|'[^']+');\r?\n/);
  }

  return `${code.slice(0, offset)}${statement}\n${code.slice(offset)}`;
}

function prefixExportTarget(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.startsWith('./') ? `./css-modules/${value.slice(2)}` : value;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([condition, target]) => [condition, prefixExportTarget(target)]),
    );
  }

  return value;
}

await rm(variantRoot, { recursive: true, force: true });

const buildEntries = await readdir(buildRoot, { withFileTypes: true });
// Keep relative imports inside the same variant by copying the complete compiled runtime tree.
await Promise.all(
  buildEntries
    .filter((entry) => !['css-modules', 'package.json', 'styles.css'].includes(entry.name))
    .map((entry) =>
      cp(path.join(buildRoot, entry.name), path.join(variantRoot, entry.name), {
        recursive: entry.isDirectory(),
      }),
    ),
);

const cssModules = await findCssModules(sourceRoot);
// Add CSS imports only to component implementations that own a matching CSS Module.
await Promise.all(
  cssModules.flatMap((cssModule) => {
    const relativeCssPath = path.relative(sourceRoot, cssModule);
    const componentPath = relativeCssPath.replace(/\.module\.css$/, '');
    const cssFileName = path.basename(relativeCssPath);

    return ['mjs', 'js'].map(async (extension) => {
      const implementationPath = path.join(variantRoot, `${componentPath}.${extension}`);
      const implementation = await readFile(implementationPath, 'utf8');
      const statement =
        extension === 'mjs' ? `import './${cssFileName}';` : `require("./${cssFileName}");`;

      await writeFile(implementationPath, insertAfterDirectives(implementation, statement));
    });
  }),
);

const packageJsonPath = path.join(buildRoot, 'package.json');
const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
// Mirror existing conditional exports under the public css-modules subpath.
const variantExports: Record<string, unknown> = {
  './css-modules': prefixExportTarget(packageJson.exports['.']),
};

for (const [subpath, target] of Object.entries(packageJson.exports)) {
  if (subpath === '.' || subpath.endsWith('.css') || subpath === './package.json') {
    continue;
  }

  variantExports[`./css-modules${subpath.slice(1)}`] = prefixExportTarget(target);
}

packageJson.exports = { ...packageJson.exports, ...variantExports };
// code-infra emits the declaration but leaves CSS exports without a types condition.
packageJson.exports['./styles.css'] = {
  types: './styles.css.d.ts',
  default: './styles.css',
};
await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
