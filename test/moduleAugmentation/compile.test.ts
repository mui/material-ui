import path from 'node:path';
import { afterAll, afterEach, beforeAll, describe, it, expect, vi } from 'vitest';

const execute = vi.hoisted(() => vi.fn<() => Promise<{ stdout: string; stderr: string }>>());

vi.mock('node:child_process', async () => {
  const { promisify } = await import('node:util');
  return { exec: Object.assign(vi.fn(), { [promisify.custom]: execute }) };
});

const options = { cwd: import.meta.dirname, encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 };

function command(flags = '') {
  const project = path.resolve('fixture.tsconfig.json');
  return `pnpm tsc --project "${project}" --listFiles --pretty false ${flags}`.trim();
}

function built(extension: string) {
  return path.resolve(import.meta.dirname, `../../packages/mui-material/build/index.${extension}`);
}

describe('module augmentation compiler', () => {
  let compile: typeof import('./compile').default;

  beforeAll(async () => {
    ({ default: compile } = await import('./compile'));
  });

  afterEach(() => {
    execute.mockReset();
  });

  it('waits for the compiler process to finish', async () => {
    const result = Promise.withResolvers<{ stdout: string; stderr: string }>();
    execute.mockReturnValue(result.promise);
    const completed = vi.fn();
    const run = compile('fixture.tsconfig.json').then(completed);

    await Promise.resolve();
    expect(completed).not.toHaveBeenCalled();
    result.resolve({ stdout: built('d.mts'), stderr: '' });
    await run;
    expect(completed).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledWith(command(), options);
  });

  it('reads the require condition in the commonjs mode', async () => {
    execute.mockResolvedValue({ stdout: built('d.ts'), stderr: '' });

    await compile('fixture.tsconfig.json', 'cjs');

    expect(execute).toHaveBeenCalledWith(command('--module commonjs --esModuleInterop'), options);
  });

  it.each([
    { mode: 'esm', extension: 'd.ts' },
    { mode: 'cjs', extension: 'd.mts' },
  ] as const)('rejects the .$extension files in the $mode mode', async ({ mode, extension }) => {
    execute.mockResolvedValue({ stdout: built(extension), stderr: '' });

    await expect(compile('fixture.tsconfig.json', mode)).rejects.toThrow(
      'Consumer test loaded another declaration flavor:',
    );
  });

  it('rejects compiler failures with diagnostics without the file list', async () => {
    execute.mockRejectedValue(
      Object.assign(new Error('Command failed'), {
        stdout: `fixture.tsx(1,1): error TS2345: Invalid breakpoint.\n${built('d.mts')}\n`,
      }),
    );

    await expect(compile('fixture.tsconfig.json')).rejects.toThrow(
      /^fixture\.tsx\(1,1\): error TS2345: Invalid breakpoint\.$/,
    );
  });

  it('reports the compiler error when the compiler writes nothing', async () => {
    execute.mockRejectedValue(
      Object.assign(new Error('Command failed: pnpm tsc\n/bin/sh: pnpm: command not found'), {
        stdout: '',
      }),
    );

    await expect(compile('fixture.tsconfig.json')).rejects.toThrow('pnpm: command not found');
  });
});

describe.each([
  { name: 'POSIX', paths: path.posix, root: '/repo/material-ui' },
  { name: 'Windows', paths: path.win32, root: 'C:\\repo\\material-ui' },
])('module augmentation file guard on $name', ({ paths, root }) => {
  const fixtureRoot = paths.join(root, 'test/moduleAugmentation/material');
  let assertBuiltDeclarations: typeof import('./compile').assertBuiltDeclarations;

  beforeAll(async () => {
    vi.resetModules();
    vi.doMock('node:path', () => ({ default: paths }));
    ({ assertBuiltDeclarations } = await import('./compile'));
  });

  afterAll(() => {
    vi.doUnmock('node:path');
    vi.resetModules();
  });

  function check(libraryFile: string, extensions: string[] = ['.d.mts']) {
    // TypeScript lists files with forward slashes, including on Windows.
    const output = [
      paths.join(root, libraryFile),
      paths.join(fixtureRoot, 'breakpointsDefault.spec.tsx'),
    ]
      .map((file) => file.replaceAll('\\', '/'))
      .join('\r\n');

    assertBuiltDeclarations(output, paths.join(root, 'packages'), extensions);
  }

  it.each([
    { extension: 'd.mts', extensions: ['.d.mts'] },
    { extension: 'd.ts', extensions: ['.d.ts', '.d.cts'] },
    { extension: 'd.cts', extensions: ['.d.ts', '.d.cts'] },
  ])('accepts the built .$extension declarations', ({ extension, extensions }) => {
    expect(() =>
      check(`packages/mui-material/build/styles/index.${extension}`, extensions),
    ).not.to.throw();
  });

  it('rejects the built declarations of another flavor', () => {
    expect(() => check('packages/mui-material/build/styles/index.d.ts')).to.throw(
      'Consumer test loaded another declaration flavor:',
    );
  });

  it.each([
    'packages/mui-material/src/styles/index.d.ts',
    'packages/mui-material/src/styles/index.d.mts',
    'packages/mui-material/src/Grid/Grid.tsx',
    'packages/mui-material/build/Grid/Grid.tsx',
  ])('rejects library source: %s', (file) => {
    expect(() => check(file)).to.throw('Consumer test loaded library source:');
  });
});
