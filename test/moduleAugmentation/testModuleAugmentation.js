const childProcess = require('child_process');
const path = require('path');
const { availableParallelism } = require('os');
const { promisify, parseArgs } = require('util');
const glob = require('fast-glob');
const { mapConcurrently } = require('./mapConcurrently');

const execFile = promisify(childProcess.execFile);
const root = path.resolve(__dirname, '../..');

async function main() {
  const { values } = parseArgs({
    options: {
      concurrency: { type: 'string', default: String(availableParallelism()) },
    },
  });
  const configs = await glob('{material,system}/*.tsconfig.json', {
    cwd: __dirname,
    absolute: true,
  });
  if (configs.length === 0) {
    throw new Error('No module augmentation fixtures found.');
  }
  // Each worker runs fixtures in separate compiler processes.
  await mapConcurrently(
    configs,
    async (config) => {
      try {
        await execFile(process.execPath, [path.join(__dirname, 'compile.js'), config], {
          cwd: __dirname,
          maxBuffer: 10 * 1024 * 1024,
        });
        // eslint-disable-next-line no-console -- test runner feedback
        console.log(`PASS ${path.relative(root, config)}`);
      } catch (error) {
        console.error(`FAIL ${path.relative(root, config)}\n${error.stdout || error.message}`);
        process.exitCode = 1;
      }
    },
    Number(values.concurrency),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
