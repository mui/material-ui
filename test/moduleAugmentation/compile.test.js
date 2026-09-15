import { readFileSync } from 'node:fs';
import path from 'node:path';
import { runInNewContext } from 'node:vm';
import { describe, it, expect } from 'vitest';

const compiler = readFileSync(new URL('./compile.js', import.meta.url), 'utf8');

describe.each([
  { name: 'POSIX', paths: path.posix, root: '/repo/material-ui' },
  { name: 'Windows', paths: path.win32, root: 'C:\\repo\\material-ui' },
])('module augmentation file guard on $name', ({ paths, root }) => {
  const fixtureRoot = paths.join(root, 'packages/mui-material/test/typescript/moduleAugmentation');

  function compile(libraryFile) {
    // TypeScript lists files with forward slashes, including on Windows.
    const output = [
      paths.join(root, libraryFile),
      paths.join(fixtureRoot, 'breakpointsDefault.spec.tsx'),
    ]
      .map((file) => file.replaceAll('\\', '/'))
      .join('\r\n');

    runInNewContext(compiler, {
      __dirname: paths.join(root, 'test/moduleAugmentation'),
      process: {
        argv: ['node', 'compile.js', paths.join(fixtureRoot, 'breakpointsDefault.tsconfig.json')],
      },
      require(name) {
        if (name === 'path') {
          return paths;
        }
        if (name === 'child_process') {
          return { execSync: () => output };
        }
        throw new Error(`Unexpected module: ${name}`);
      },
    });
  }

  it('accepts the fixture with built declarations', () => {
    expect(() => compile('packages/mui-material/build/styles/index.d.ts')).not.to.throw();
  });

  it.each([
    'packages/mui-material/src/styles/index.d.ts',
    'packages/mui-material/src/Grid/Grid.tsx',
  ])('rejects library source: %s', (file) => {
    expect(() => compile(file)).to.throw('Consumer test loaded library source:');
  });
});
