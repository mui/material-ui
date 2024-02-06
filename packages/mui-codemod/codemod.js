#!/usr/bin/env node

const childProcess = require('child_process');
const { promises: fs } = require('fs');
const path = require('path');
const yargs = require('yargs');
const jscodeshiftPackage = require('jscodeshift/package.json');

const jscodeshiftDirectory = path.dirname(require.resolve('jscodeshift'));
const jscodeshiftExecutable = path.join(jscodeshiftDirectory, jscodeshiftPackage.bin.jscodeshift);

async function runTransform(transform, files, flags, codemodFlags) {
  const paths = [
    path.resolve(__dirname, './src', `${transform}/index.js`),
    path.resolve(__dirname, './src', `${transform}.js`),
    path.resolve(__dirname, './node', `${transform}/index.js`),
    path.resolve(__dirname, './node', `${transform}.js`),
  ];

  let transformerPath;
  let error;
  // eslint-disable-next-line no-restricted-syntax
  for (const item of paths) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await fs.stat(item);
      error = undefined;
      transformerPath = item;
      break;
    } catch (srcPathError) {
      error = srcPathError;
      continue;
    }
  }

  if (error) {
    if (error?.code === 'ENOENT') {
      throw new Error(
        `Transform '${transform}' not found. Check out ${path.resolve(
          __dirname,
          './README.md for a list of available codemods.',
        )}`,
      );
    }
    throw error;
  }

  const args = [
    // can't directly spawn `jscodeshiftExecutable` due to https://github.com/facebook/jscodeshift/issues/424
    jscodeshiftExecutable,
    '--transform',
    transformerPath,
    ...codemodFlags,
    '--extensions',
    'js,ts,jsx,tsx,json',
    '--parser',
    flags.parser || 'tsx',
    '--ignore-pattern',
    '**/node_modules/**',
  ];

  if (flags.dry) {
    args.push('--dry');
  }
  if (flags.print) {
    args.push('--print');
  }
  if (flags.jscodeshift) {
    args.push(flags.jscodeshift);
  }

  args.push(...files);

  // eslint-disable-next-line no-console -- debug information
  console.log(`Executing command: jscodeshift ${args.join(' ')}`);
  const jscodeshiftProcess = childProcess.spawnSync('node', args, { stdio: 'inherit' });

  if (jscodeshiftProcess.error) {
    throw jscodeshiftProcess.error;
  }
}

function run(argv) {
  const { codemod, paths, ...flags } = argv;

  return runTransform(
    codemod,
    paths.map((filePath) => path.resolve(filePath)),
    flags,
    argv._,
  );
}

yargs
  .command({
    command: '$0 <codemod> <paths...>',
    describe: 'Applies a `@mui/codemod` to the specified paths',
    builder: (command) => {
      return command
        .positional('codemod', {
          description: 'The name of the codemod',
          type: 'string',
        })
        .positional('paths', {
          array: true,
          description: 'Paths forwarded to `jscodeshift`',
          type: 'string',
        })
        .option('dry', {
          description: 'dry run (no changes are made to files)',
          default: false,
          type: 'boolean',
        })
        .option('parser', {
          description: 'which parser for jscodeshift to use',
          default: 'tsx',
          type: 'string',
        })
        .option('print', {
          description: 'print transformed files to stdout, useful for development',
          default: false,
          type: 'boolean',
        })
        .option('jscodeshift', {
          description: '(Advanced) Pass options directly to jscodeshift',
          default: false,
          type: 'string',
        });
    },
    handler: run,
  })
  .scriptName('npx @mui/codemod')
  .example('$0 v4.0.0/theme-spacing-api src')
  .example('$0 v5.0.0/component-rename-prop src -- --component=Grid --from=prop --to=newProp')
  .help()
  .parse();
