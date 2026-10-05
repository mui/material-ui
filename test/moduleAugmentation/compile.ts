import { exec } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export function assertBuiltDeclarations(
  output: string,
  packagesRoot: string,
  forbiddenDeclarations: readonly string[] = [],
) {
  let declarations = 0;
  for (const line of output.split(/\r?\n/)) {
    if (!path.isAbsolute(line)) {
      continue;
    }
    const normalized = line.replaceAll('\\', '/');
    if (forbiddenDeclarations.some((fragment) => normalized.includes(fragment))) {
      throw new Error(`Consumer test loaded a forbidden declaration: ${line}`);
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

interface CompileOptions {
  forbiddenDeclarations?: readonly string[];
}

export default async function compile(config: string, options: CompileOptions = {}) {
  const configPath = path.resolve(config);
  const packagesRoot = path.resolve(import.meta.dirname, '../../packages');
  let output: string;
  let failure: Error | undefined;
  try {
    // Windows needs a shell to start the pnpm.cmd shim.
    const { stdout } = await execAsync(
      `pnpm tsc --project "${configPath}" --listFiles --pretty false`,
      {
        cwd: import.meta.dirname,
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
      },
    );
    output = stdout;
  } catch (error) {
    const compilerError = error as Error & { stdout?: string };
    output = compilerError.stdout || '';
    failure = compilerError;
  }
  assertBuiltDeclarations(output, packagesRoot, options.forbiddenDeclarations);
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
