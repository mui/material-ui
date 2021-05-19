const fse = require('fs-extra');
const path = require('path');
const rimrafCallback = require('rimraf');
const { promisify } = require('util');

const rimraf = promisify(rimrafCallback);

async function run(context) {
  const { fixturePath } = context;
  if (fixturePath === undefined) {
    throw new Error(
      `Usage: ${path.basename(
        process.argv[1],
      )} <fixturePath> <distTag>\n  distTag: An npm tag e.g. 'npm:next' or 'npm:latest'. Omit the use the built packages from source.`,
    );
  }

  const workspaceRoot = path.resolve(__dirname, '../../../');
  await Promise.all(
    ['core', 'icons', 'lab', 'styled-engine', 'styles', 'system', 'types', 'unstyled', 'utils'].map(
      async (muiPackageName) => {
        // clean coyp
        await rimraf(path.resolve(fixturePath, `node_modules/@material-ui/${muiPackageName}`));
        await fse.copy(
          path.join(
            workspaceRoot,
            `packages/material-ui${muiPackageName === 'core' ? '' : `-${muiPackageName}`}/build`,
          ),
          path.resolve(fixturePath, `node_modules/@material-ui/${muiPackageName}`),
        );
      },
    ),
  );
}

run({ fixturePath: process.argv[2] }).catch((error) => {
  console.error(error);
  process.exit(1);
});
