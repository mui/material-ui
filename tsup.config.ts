import * as path from 'node:path';
import fs from 'node:fs';
import { defineConfig } from 'tsup';

const pkgJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));

const licenseText = `/**
  * ${pkgJson.name} v${pkgJson.version}
  *
  * @license ${pkgJson.license}
  * This source code is licensed under the ${pkgJson.license} license found in the
  * LICENSE file in the root directory of this source tree.
  */
 `;

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'build',
  splitting: true,
  sourcemap: true,
  clean: true,
  format: ['cjs', 'esm'],
  treeshake: true,
  cjsInterop: true,
  dts: true,
  silent: true,
  banner: {
    js: licenseText,
  },
  env: {
    PACKAGE_NAME: pkgJson.name,
  },
  loader: {
    '.js': 'jsx',
  },
});
