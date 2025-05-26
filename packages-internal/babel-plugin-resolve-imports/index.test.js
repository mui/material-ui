import * as fs from 'fs';
import * as path from 'path';
import { pluginTester } from 'babel-plugin-tester';
import plugin from './index';

const fixturePath = path.resolve(__dirname, './__fixtures__');

function readOutputFixtureSync(fixture, file) {
  // babel hardcodes the linefeed to \n and can add extra newlines
  return normalizeQuotesAndWhitespace(
    fs
      .readFileSync(path.join(fixturePath, fixture, file), { encoding: 'utf8' })
      .replace(/\r?\n/g, '\n'),
  );
}

// Normalize string quotes and whitespace for comparison
function normalizeQuotesAndWhitespace(str) {
  return str
    .trim()
    .replace(/["']/g, "'") // Convert all quotes to single quotes for comparison
    .replace(/\s+\n/g, '\n'); // Normalize whitespace before line breaks
}

pluginTester({
  plugin,
  filepath: __filename,
  formatResult: (r) => normalizeQuotesAndWhitespace(r),

  tests: [
    {
      title: 'basic js imports',
      pluginOptions: {
        outExtension: '.js',
      },
      fixture: path.join(fixturePath, 'basic-js-imports', 'input.js'),
      output: readOutputFixtureSync('basic-js-imports', 'output.js'),
    },
    {
      title: 'typescript imports',
      pluginOptions: {
        outExtension: '.js',
      },
      babelOptions: {
        plugins: [['@babel/plugin-syntax-typescript']],
      },
      fixture: path.join(fixturePath, 'typescript-imports', 'input.ts'),
      output: readOutputFixtureSync('typescript-imports', 'output.ts'),
    },
    {
      title: 'index resolution',
      pluginOptions: {
        outExtension: '.js',
      },
      fixture: path.join(fixturePath, 'index-resolution', 'input.js'),
      output: readOutputFixtureSync('index-resolution', 'output.js'),
    },
    {
      title: 'nested paths',
      pluginOptions: {
        outExtension: '.js',
      },
      fixture: path.join(fixturePath, 'nested-paths', 'input.js'),
      output: readOutputFixtureSync('nested-paths', 'output.js'),
    },
    {
      title: 'different output extension',
      pluginOptions: {
        outExtension: '.mjs',
      },
      fixture: path.join(fixturePath, 'different-extension', 'input.js'),
      output: readOutputFixtureSync('different-extension', 'output.js'),
    },
    {
      title: 'no output extension',
      pluginOptions: {},
      fixture: path.join(fixturePath, 'no-extension', 'input.js'),
      output: readOutputFixtureSync('no-extension', 'output.js'),
    },
    {
      title: 'non-relative imports',
      pluginOptions: {
        outExtension: '.js',
      },
      fixture: path.join(fixturePath, 'non-relative-imports', 'input.js'),
      output: readOutputFixtureSync('non-relative-imports', 'output.js'),
    },
    {
      title: 'declaration files',
      pluginOptions: {
        outExtension: '.js',
      },
      babelOptions: {
        plugins: [['@babel/plugin-syntax-typescript', { dts: true }]],
      },
      fixture: path.join(fixturePath, 'declaration-files', 'input.d.ts'),
      output: readOutputFixtureSync('declaration-files', 'output.d.ts'),
    },
  ],
});
