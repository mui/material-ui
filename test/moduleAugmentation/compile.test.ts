import path from 'node:path';
import { afterAll, beforeAll, describe, it, expect, vi } from 'vitest';

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

  function compile(libraryFile: string) {
    // TypeScript lists files with forward slashes, including on Windows.
    const output = [
      paths.join(root, libraryFile),
      paths.join(fixtureRoot, 'breakpointsDefault.spec.tsx'),
    ]
      .map((file) => file.replaceAll('\\', '/'))
      .join('\r\n');

    assertBuiltDeclarations(output, paths.join(root, 'packages'));
  }

  it.each(['ts', 'mts', 'cts'])(
    'accepts the fixture with built .d.%s declarations',
    (extension) => {
      expect(() =>
        compile(`packages/mui-material/build/styles/index.d.${extension}`),
      ).not.to.throw();
    },
  );

  it.each([
    'packages/mui-material/src/styles/index.d.ts',
    'packages/mui-material/src/styles/index.d.mts',
    'packages/mui-material/src/Grid/Grid.tsx',
    'packages/mui-material/build/Grid/Grid.tsx',
  ])('rejects library source: %s', (file) => {
    expect(() => compile(file)).to.throw('Consumer test loaded library source:');
  });
});
