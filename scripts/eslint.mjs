import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
const cli = path.join(path.dirname(require.resolve('eslint/package.json')), 'bin/eslint.js');
const args = process.argv.slice(2);
const queryOnly = args.some((arg) =>
  ['--help', '-h', '--version', '-v', '--print-config', '--inspect-config'].includes(arg),
);
const phases = queryOnly
  ? [{ name: 'query', files: [] }]
  : [
      { name: 'source', files: ['.', '--ignore-pattern', 'docs/**'] },
      { name: 'docs', files: ['docs', '--ignore-pattern', '**/*.{js,jsx}'] },
      { name: 'docs-js', files: ['docs/**/*.{js,jsx}'] },
    ];

const separateCaches =
  !queryOnly && args.includes('--cache') && !args.some((arg) => arg.startsWith('--cache-location'));
if (separateCaches && fs.existsSync('.eslintcache') && !fs.statSync('.eslintcache').isDirectory()) {
  // The previous single-process command stored a file at this path.
  fs.rmSync('.eslintcache');
}

// Separate processes release the TypeScript project before loading the JavaScript project.
for (const { name, files } of phases) {
  if (!queryOnly) {
    process.stdout.write(`Linting ${name}\n`);
  }
  const cacheArgs = separateCaches ? ['--cache-location', `.eslintcache/${name}`] : [];
  const result = spawnSync(
    process.execPath,
    [
      cli,
      ...files,
      '--report-unused-disable-directives',
      '--max-warnings',
      '0',
      ...cacheArgs,
      ...args,
    ],
    { stdio: 'inherit' },
  );
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
