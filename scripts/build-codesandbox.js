const childProcess = require('child_process');
const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const { promisify } = require('util');

/**
 * prepares `@material-ui/*` packages to be published under a single verison
 * that is based on the commit SHA of `HEAD`
 */

const exec = promisify(childProcess.exec);

async function main() {
  await exec('lerna run --parallel --scope "@material-ui/*" build');

  const commitSha = (await exec('git rev-parse HEAD')).stdout.trim();
  const version = `0.0.0-${commitSha}`;

  const workspaceRoot = path.resolve(__dirname, '..');
  const manifestPaths = [
    ...glob.sync(path.join(workspaceRoot, 'packages/material-ui*/build/package.json')),
    path.join(workspaceRoot, 'packages/material-ui-types/package.json'),
  ];
  const manifestsWithPath = await Promise.all(
    manifestPaths.map(async manifestPath => {
      return {
        path: manifestPath,
        manifest: await fs.readJson(manifestPath),
      };
    }),
  );
  const packageNames = manifestsWithPath.map(({ manifest: { name } }) => name);

  await Promise.all(
    manifestsWithPath.map(({ path: manifestPath, manifest }) => {
      manifest.version = version;
      packageNames.forEach(packageName => {
        if (manifest.dependencies[packageName] !== undefined) {
          manifest.dependencies[packageName] = version;
        }
      });

      return fs.writeJson(manifestPath, manifest, { spaces: 2 });
    }),
  );
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
