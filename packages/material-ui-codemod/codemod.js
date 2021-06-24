const childProcess = require('child_process');
const { promises: fs } = require('fs');
const path = require('path');
const yargs = require('yargs');

const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

async function runTransform(transform, files, flags, codemodFlags) {
  const transformerSrcPath = path.resolve(__dirname, './src', `${transform}.js`);
  const transformerBuildPath = path.resolve(__dirname, './node', `${transform}.js`);
  let transformerPath;
  try {
    await fs.stat(transformerSrcPath);
    transformerPath = transformerSrcPath;
  } catch (srcPathError) {
    try {
      await fs.stat(transformerBuildPath);
      transformerPath = transformerBuildPath;
    } catch (buildPathError) {
      if (buildPathError.code === 'ENOENT') {
        throw new Error(
          `Transform '${transform}' not found. Check out ${path.resolve(
            __dirname,
            './README.md for a list of available codemods.',
          )}`,
        );
      }
      throw buildPathError;
    }
  }

  const args = [
    // can't directly spawn `jscodeshiftExecutable` due to https://github.com/facebook/jscodeshift/issues/424
    jscodeshiftExecutable,
    '--transform',
    transformerPath,
    ...codemodFlags,
    '--extensions',
    'js,ts,jsx,tsx',
    '--parser',
    'tsx',
  ];
  if (flags.dry) {
    args.push('--dry');
  }
  if (flags.print) {
    args.push('--print');
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
    command: '$0 <codemod> [paths...]',
    describe: 'formats codebase',
    builder: (command) => {
      return command
        .positional('codemod', {
          description: 'TODO',
          type: 'string',
        })
        .positional('paths', {
          array: true,
          default: ['.'],
          description: 'TODO',
          type: 'string',
        })
        .option('dry', {
          description: 'TODO',
          default: false,
          type: 'boolean',
        })
        .option('print', {
          description: 'TODO',
          default: false,
          type: 'boolean',
        });
    },
    handler: run,
  })
  .help()
  .parse();
