import childProcess from 'node:child_process';
import path from 'node:path';
import { availableParallelism } from 'node:os';
import { promisify, parseArgs } from 'node:util';
import { pathToFileURL } from 'node:url';
import glob from 'fast-glob';
import { mapAsync } from 'es-toolkit/array';

const execFile = promisify(childProcess.execFile);
const root = path.resolve(import.meta.dirname, '../..');

export default async function main(args = process.argv.slice(2)) {
  const { values } = parseArgs({
    args,
    options: {
      concurrency: { type: 'string', default: String(availableParallelism()) },
    },
  });
  const concurrency = Number(values.concurrency);
  if (!Number.isSafeInteger(concurrency) || concurrency < 1) {
    throw new Error('Concurrency must be a positive integer.');
  }
  const configs = await glob('{material,system}/*.tsconfig.json', {
    cwd: import.meta.dirname,
    absolute: true,
  });
  if (configs.length === 0) {
    throw new Error('No module augmentation fixtures found.');
  }
  // Each worker runs fixtures in separate compiler processes.
  await mapAsync(
    configs,
    async (config) => {
      try {
        await execFile(process.execPath, [path.join(import.meta.dirname, 'compile.ts'), config], {
          cwd: import.meta.dirname,
          maxBuffer: 10 * 1024 * 1024,
        });
        // eslint-disable-next-line no-console -- test runner feedback
        console.log(`PASS ${path.relative(root, config)}`);
      } catch (error) {
        const { stdout, message } = error as childProcess.ExecException & { stdout?: string };
        console.error(`FAIL ${path.relative(root, config)}\n${stdout || message}`);
        process.exitCode = 1;
      }
    },
    { concurrency },
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
