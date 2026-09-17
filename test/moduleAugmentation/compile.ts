import { execSync } from 'node:child_process';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export function assertBuiltDeclarations(output: string, packagesRoot: string) {
  let declarations = 0;
  for (const line of output.split(/\r?\n/)) {
    if (!path.isAbsolute(line)) {
      continue;
    }
    const relative = path.relative(packagesRoot, line);
    if (!relative.startsWith('..')) {
      if (!/\.d\.(?:ts|mts|cts)$/.test(line) || relative.split(path.sep)[1] !== 'build') {
        throw new Error(`Consumer test loaded library source: ${line}`);
      }
      declarations += 1;
    }
  }
  if (declarations === 0) {
    throw new Error(`Consumer test did not load built declarations.\n${output}`);
  }
}

export default function compile(config: string) {
  const configPath = path.resolve(config);
  const packagesRoot = path.resolve(import.meta.dirname, '../../packages');
  let output: string;
  let failed = false;
  try {
    // Windows needs a shell to start the pnpm.cmd shim.
    output = execSync(`pnpm tsc --project "${configPath}" --listFiles --pretty false`, {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch (error) {
    output = (error as { stdout?: string }).stdout || '';
    failed = true;
  }
  assertBuiltDeclarations(output, packagesRoot);
  if (failed) {
    // Print the diagnostics without the --listFiles paths.
    // eslint-disable-next-line no-console -- compiler diagnostics
    console.log(
      output
        .split(/\r?\n/)
        .filter((line) => !path.isAbsolute(line))
        .join('\n'),
    );
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  compile(process.argv[2]);
}
