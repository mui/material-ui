// Only use built-in modules because this script runs pre-install.
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

/**
 * @param {string} muiPackageName - e.g. `core` NOT `@material-ui/core`
 * @param {string} distTag
 * @returns {Promise<string>}
 */
async function resolveNpmDistTag(muiPackageName, distTag) {
  const { stdout: versions } = await exec(`npm dist-tag ls ${muiPackageName}`);
  const tagMapping = versions.split('\n').find((mapping) => {
    return mapping.startsWith(`${distTag}: `);
  });
  if (tagMapping === undefined) {
    throw new Error(`Could not find '${distTag}' in "${versions}"`);
  }

  const version = tagMapping.replace(`${distTag}: `, '');
  return version;
}

function resolveMuiVersion(muiPackageName, distTag) {
  if (distTag !== undefined && distTag.startsWith('npm:')) {
    const npmDistTag = distTag.replace(/^npm:/, '');
    return resolveNpmDistTag(`@material-ui/${muiPackageName}`, npmDistTag);
  }
  return `file:../../../../packages/material-ui${
    muiPackageName === 'core' ? '' : `-${muiPackageName}`
  }/build`;
}

async function run(context) {
  const { distTag: muiDistTag, fixturePath } = context;
  if (fixturePath === undefined) {
    throw new Error(
      `Usage: ${path.basename(
        process.argv[1],
      )} <fixturePath> <distTag>\n  distTag: An npm tag e.g. 'npm:next' or 'npm:latest'. Omit the use the built packages from source.`,
    );
  }

  const manifestPath = path.resolve(fixturePath, './package.json');
  const manifestContent = fs.readFileSync(manifestPath, { encoding: 'utf8' });
  const manifest = JSON.parse(manifestContent);
  manifest.resolutions = manifest.resolutions || {};
  await Promise.all(
    ['core', 'icons', 'lab', 'styled-engine', 'styles', 'system', 'types', 'unstyled', 'utils'].map(
      async (muiPackageName) => {
        manifest.resolutions[`@material-ui/${muiPackageName}`] = await resolveMuiVersion(
          muiPackageName,
          muiDistTag,
        );
      },
    ),
  );
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

run({ distTag: process.argv[3], fixturePath: process.argv[2] }).catch((error) => {
  console.error(error);
  process.exit(1);
});
