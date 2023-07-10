/**
 * Workaround for failing `yarn add -D -W typescript@next`
 * See https://github.com/yarnpkg/yarn/issues/7935
 *
 * Given an environment variable called `TYPESCRIPT_DIST_TAG` fetch the corresponding
 * version and make sure this version used in the worktree as well as in dtslint.
 *
 * If you work on this file:
 * WARNING: This script can only use built-in modules since it has to run before
 * `yarn install`
 */
import childProcess from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { promisify } from 'util';
import { getWorkspaceRoot } from './utils.mjs';

const exec = promisify(childProcess.exec);

async function main(distTag) {
  if (typeof distTag !== 'string') {
    throw new TypeError(`expected distTag: string but got '${distTag}'`);
  }

  if (distTag === 'stable') {
    // eslint-disable-next-line no-console
    console.log('nothing to do with stable');
    return;
  }

  const { stdout: versions } = await exec(`npm dist-tag ls typescript ${distTag}`);
  const tagMapping = versions.split('\n').find((mapping) => {
    return mapping.startsWith(`${distTag}: `);
  });
  if (tagMapping === undefined) {
    throw new Error(`Could not find '${distTag}' in "${versions}"`);
  }

  const version = tagMapping.replace(`${distTag}: `, '');

  const packageJsonPath = path.resolve(getWorkspaceRoot(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }));

  packageJson.devDependencies.typescript = version;
  packageJson.resolutions['**/dtslint/typescript'] = version;

  // add newline for clean diff
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}${os.EOL}`);
}

const [distTag = process.env.TYPESCRIPT_DIST_TAG] = process.argv.slice(2);
main(distTag).catch((error) => {
  console.error(error);
  process.exit(1);
});
