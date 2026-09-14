const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');
const { chunk } = require('es-toolkit/array');
const glob = require('fast-glob');

// Windows needs a shell to start the pnpm.cmd shim.
const exec = promisify(childProcess.exec);
const execFile = promisify(childProcess.execFile);
const root = path.resolve(__dirname, '..');

async function main(packages = ['@mui/material', '@mui/system']) {
  // Use the release build to copy authored declarations and emit TypeScript declarations.
  await exec(
    [
      'pnpm lerna run build',
      ...packages.map((name) => `--scope ${name}`),
      '--include-dependencies --skip-nx-cache --concurrency 3',
    ].join(' '),
    { cwd: root, maxBuffer: 20 * 1024 * 1024 },
  );
  const configs = await glob(
    packages.map(
      (name) =>
        `packages/mui-${name.split('/')[1]}/test/typescript/moduleAugmentation/*.tsconfig.json`,
    ),
    { cwd: root, absolute: true },
  );
  if (configs.length === 0) {
    throw new Error('No module augmentation fixtures found.');
  }
  // Each process has its own global augmentations. Limit memory use.
  for await (const group of chunk(configs, 7)) {
    await Promise.all(
      group.map(async (config) => {
        try {
          await execFile(
            process.execPath,
            [path.join(root, 'test/moduleAugmentation/compile.js'), config],
            {
              cwd: root,
              maxBuffer: 10 * 1024 * 1024,
            },
          );
          // eslint-disable-next-line no-console -- test runner feedback
          console.log(`PASS ${path.relative(root, config)}`);
        } catch (error) {
          console.error(`FAIL ${path.relative(root, config)}\n${error.stdout || error.message}`);
          process.exitCode = 1;
        }
      }),
    );
  }
}

module.exports = { main };

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
