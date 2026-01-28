import path from 'path';
import * as fs from 'fs/promises';

const currentDirectory = process.cwd();

const LIB_DIR = path.resolve(currentDirectory, 'lib');
const BUILD_DIR = path.resolve(currentDirectory, 'build');

async function run() {
  const pkgJson = JSON.parse(await fs.readFile(path.join(LIB_DIR, 'package.json'), 'utf8'));
  delete pkgJson.scripts;
  delete pkgJson.devDependencies;
  delete pkgJson.publishConfig.directory;
  pkgJson.types = 'index.d.ts';
  pkgJson.exports['.'] = {
    import: {
      types: './index.d.mts',
      default: './index.mjs',
    },
    require: {
      types: './index.d.ts',
      default: './index.js',
    },
    default: {
      types: './index.d.ts',
      default: './index.js',
    },
  };
  pkgJson.exports['./*'] = {
    import: {
      types: './*.d.mts',
      default: './*.mjs',
    },
    require: {
      types: './*.d.ts',
      default: './*.js',
    },
    default: {
      types: './*.d.ts',
      default: './*.js',
    },
  };
  await fs.writeFile(
    path.resolve(BUILD_DIR, 'package.json'),
    `${JSON.stringify(pkgJson, null, 2)}\n`,
    'utf8',
  );
}

run();
