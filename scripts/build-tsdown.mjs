/* eslint-disable no-console */
import { globby } from 'globby';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { build } from 'tsdown';

const cwd = process.cwd();
const pkgJson = JSON.parse(await fs.readFile(path.join(cwd, 'package.json'), 'utf-8'));
const pkgExports = pkgJson.exports;

/**
 * @type {string[]}
 */
const entries = [];

await Promise.all(
  Object.entries(pkgExports).map(async ([key, value]) => {
    if (key.includes('*')) {
      const files = await globby(value, { cwd });
      entries.push(...files);
    } else if (typeof value === 'string') {
      entries.push(value);
    }
  }),
);

let tsconfigBuild = path.join(cwd, 'tsconfig.build.json');

if (!(await fs.stat(tsconfigBuild).catch(() => false))) {
  tsconfigBuild = path.join(cwd, 'tsconfig.json');
}

build({
  entry: entries,
  tsconfig: tsconfigBuild,
  format: ['es', 'cjs'],
  outDir: path.join(cwd, pkgJson.publishConfig.directory),
  config: false,
  unbundle: true,
  dts: {
    emitJs: false,
  },
  report: true,
  exports: false,
  platform: 'neutral',
  loader: {
    js: 'jsx',
  },
  cwd,
  // workspace: true,
  banner: {
    js: `/**
 * ${pkgJson.name} v${pkgJson.version}
 *
 * @license ${pkgJson.license}
 * This source code is licensed under the ${pkgJson.license} license found in the
 * LICENSE file in the root directory of this source tree.
 */
`,
  },
});
