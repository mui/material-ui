import type { ExecFileOptions } from 'node:child_process';
import path from 'node:path';
import { afterEach, beforeEach, describe, it, expect, vi, type MockInstance } from 'vitest';
import main from './testModuleAugmentation';

type CompilerCallback = (error: Error | null) => void;

const { execFile, glob } = vi.hoisted(() => ({
  execFile:
    vi.fn<
      (
        command: string,
        args: string[],
        options: ExecFileOptions,
        callback: CompilerCallback,
      ) => void
    >(),
  glob: vi.fn<() => Promise<string[]>>(),
}));

vi.mock('node:child_process', () => ({ default: { execFile } }));
vi.mock('fast-glob', () => ({ default: glob }));

describe('module augmentation runner', () => {
  const configs = ['first', 'second', 'third'].map((name) =>
    path.join(import.meta.dirname, 'material', `${name}.tsconfig.json`),
  );
  let exitCode: typeof process.exitCode;
  let log: MockInstance<typeof console.log>;

  beforeEach(() => {
    exitCode = process.exitCode;
    glob.mockResolvedValue(configs);
    log = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.exitCode = exitCode;
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('limits compiler processes and starts the next fixture as soon as one finishes', async () => {
    const callbacks: CompilerCallback[] = [];
    const twoStarted = Promise.withResolvers<void>();
    const threeStarted = Promise.withResolvers<void>();
    execFile.mockImplementation((command, args, options, callback) => {
      callbacks.push(callback);
      if (callbacks.length === 2) {
        twoStarted.resolve();
      } else if (callbacks.length === 3) {
        threeStarted.resolve();
      }
    });

    const run = main(['--concurrency', '2']);
    await twoStarted.promise;
    expect(execFile).toHaveBeenCalledTimes(2);
    expect(execFile).toHaveBeenNthCalledWith(
      1,
      process.execPath,
      [path.join(import.meta.dirname, 'compile.ts'), configs[0]],
      { cwd: import.meta.dirname, maxBuffer: 10 * 1024 * 1024 },
      expect.any(Function),
    );
    callbacks[1](null);
    await threeStarted.promise;
    callbacks[2](null);
    callbacks[0](null);
    await run;
    expect(log).toHaveBeenCalledTimes(3);
  });

  it('reports a compiler failure and continues with the remaining fixtures', async () => {
    const error = Object.assign(new Error('Compiler failed'), { stdout: 'Type error' });
    execFile
      .mockImplementationOnce((command, args, options, callback) => callback(error))
      .mockImplementation((command, args, options, callback) => callback(null));

    await main(['--concurrency', '1']);

    expect(process.exitCode).to.equal(1);
    expect(console.error).toHaveBeenCalledWith(
      `FAIL ${path.join('test/moduleAugmentation/material/first.tsconfig.json')}\nType error`,
    );
    expect(execFile).toHaveBeenCalledTimes(3);
    expect(log).toHaveBeenCalledTimes(2);
  });

  it('rejects a run with no fixtures', async () => {
    glob.mockResolvedValue([]);
    await expect(main([])).rejects.toThrow('No module augmentation fixtures found.');
    expect(execFile).not.toHaveBeenCalled();
  });

  it.each(['0', '-1', '1.5', 'NaN', 'Infinity'])(
    'rejects invalid concurrency before starting compilers: %s',
    async (concurrency) => {
      await expect(main([`--concurrency=${concurrency}`])).rejects.toThrow(
        'Concurrency must be a positive integer.',
      );
      expect(execFile).not.toHaveBeenCalled();
    },
  );
});
