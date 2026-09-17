import path from 'node:path';
import { afterEach, beforeEach, describe, it, expect, vi, type MockInstance } from 'vitest';
import main from './testModuleAugmentation';

const { compile, glob } = vi.hoisted(() => ({
  compile: vi.fn<(config: string, mode: string) => Promise<void>>(),
  glob: vi.fn<() => Promise<string[]>>(),
}));

vi.mock('./compile', async (importOriginal) => ({
  ...(await importOriginal<typeof import('./compile')>()),
  default: compile,
}));
vi.mock('fast-glob', () => ({ default: glob }));

describe('module augmentation runner', () => {
  const configs = ['first', 'second', 'third'].map((name) =>
    path.join(import.meta.dirname, 'material', `${name}.tsconfig.json`),
  );
  const started: string[] = [];
  let exitCode: typeof process.exitCode;
  let log: MockInstance<typeof console.log>;

  beforeEach(() => {
    exitCode = process.exitCode;
    started.length = 0;
    glob.mockResolvedValue(configs);
    compile.mockImplementation(async (config, mode) => {
      started.push(`${mode} ${path.basename(config)}`);
    });
    log = vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    process.exitCode = exitCode;
    vi.restoreAllMocks();
    vi.resetAllMocks();
  });

  it('runs every fixture in both resolution modes', async () => {
    await main(['--concurrency', '4']);

    expect(started).toEqual([
      'esm first.tsconfig.json',
      'cjs first.tsconfig.json',
      'esm second.tsconfig.json',
      'cjs second.tsconfig.json',
      'esm third.tsconfig.json',
      'cjs third.tsconfig.json',
    ]);
    expect(log).toHaveBeenCalledTimes(6);
  });

  it('limits compiler processes and starts the next run as soon as one finishes', async () => {
    const pending: PromiseWithResolvers<void>[] = [];
    const twoStarted = Promise.withResolvers<void>();
    const threeStarted = Promise.withResolvers<void>();
    compile.mockImplementation((config, mode) => {
      started.push(`${mode} ${path.basename(config)}`);
      if (pending.length >= 3) {
        return Promise.resolve();
      }
      const task = Promise.withResolvers<void>();
      pending.push(task);
      if (pending.length === 2) {
        twoStarted.resolve();
      } else if (pending.length === 3) {
        threeStarted.resolve();
      }
      return task.promise;
    });

    const run = main(['--concurrency', '2']);
    await twoStarted.promise;
    expect(started).toEqual(['esm first.tsconfig.json', 'cjs first.tsconfig.json']);

    pending[1].resolve();
    await threeStarted.promise;
    expect(started).toHaveLength(3);

    pending.forEach((task) => task.resolve());
    await run;
    expect(log).toHaveBeenCalledTimes(6);
  });

  it('reports a failed run and continues with the remaining runs', async () => {
    compile.mockRejectedValueOnce(new Error('Type error'));

    await main(['--concurrency', '1']);

    expect(process.exitCode).to.equal(1);
    expect(console.error).toHaveBeenCalledWith(
      `FAIL esm ${path.join('test/moduleAugmentation/material/first.tsconfig.json')}\nType error`,
    );
    expect(compile).toHaveBeenCalledTimes(6);
    expect(log).toHaveBeenCalledTimes(5);
  });

  it('rejects a run with no fixtures', async () => {
    glob.mockResolvedValue([]);
    await expect(main([])).rejects.toThrow('No module augmentation fixtures found.');
    expect(compile).not.toHaveBeenCalled();
  });

  it.each(['0', '-1', '1.5', 'NaN', 'Infinity'])(
    'rejects invalid concurrency before starting compilers: %s',
    async (concurrency) => {
      await expect(main([`--concurrency=${concurrency}`])).rejects.toThrow(
        'Concurrency must be a positive integer.',
      );
      expect(compile).not.toHaveBeenCalled();
    },
  );
});
