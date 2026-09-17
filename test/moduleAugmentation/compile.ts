import { exec } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

// A bundler or ESM consumer reads the `import` condition, which points at `.d.mts` files.
// `module: commonjs` makes TypeScript read the `require` condition, which points at `.d.ts` files.
export const modes = {
  esm: { flags: '', extensions: ['.d.mts'] },
  cjs: { flags: '--module commonjs --esModuleInterop', extensions: ['.d.ts', '.d.cts'] },
};

export type Mode = keyof typeof modes;

export function assertBuiltDeclarations(
  output: string,
  packagesRoot: string,
  extensions: string[],
) {
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
      if (!extensions.some((extension) => line.endsWith(extension))) {
        throw new Error(`Consumer test loaded another declaration flavor: ${line}`);
      }
      declarations += 1;
    }
  }
  if (declarations === 0) {
    throw new Error(`Consumer test did not load built declarations.\n${output}`);
  }
}

export default async function compile(config: string, mode: Mode = 'esm') {
  const configPath = path.resolve(config);
  const packagesRoot = path.resolve(import.meta.dirname, '../../packages');
  const { flags, extensions } = modes[mode];
  let output: string;
  let failure: (Error & { stdout?: string }) | undefined;
  try {
    // Windows needs a shell to start the pnpm.cmd shim.
    const { stdout } = await execAsync(
      `pnpm tsc --project "${configPath}" --listFiles --pretty false ${flags}`.trim(),
      {
        cwd: import.meta.dirname,
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
      },
    );
    output = stdout;
  } catch (error) {
    failure = error as Error & { stdout?: string };
    output = failure.stdout || '';
  }
  if (failure && !output.trim()) {
    // The compiler wrote nothing, so report its own error. It carries the standard error output.
    throw new Error(failure.message, { cause: failure });
  }
  assertBuiltDeclarations(output, packagesRoot, extensions);
  if (failure) {
    // Report the diagnostics without the --listFiles paths.
    const diagnostics = output
      .split(/\r?\n/)
      .filter((line) => !path.isAbsolute(line))
      .join('\n')
      .trim();
    throw new Error(diagnostics || failure.message, { cause: failure });
  }
}
