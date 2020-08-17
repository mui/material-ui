const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');
const yargs = require('yargs');

const exec = promisify(childProcess.exec);

const validBundles = [
  // legacy build using commonJS modules
  'cjs',
  // modern build
  'es',
  // legacy build using ES6 modules
  'esm',
];

async function run(argv) {
  const { bundle, outDir: relativeOutDir, verbose } = argv;

  if (validBundles.indexOf(bundle) === -1) {
    throw new TypeError(
      `Unrecognized bundle '${bundle}'. Did you mean one of "${validBundles.join('", "')}"?`,
    );
  }

  const env = {
    ...process.env,
    NODE_ENV: 'production',
    BABEL_ENV: bundle,
  };
  const babelConfigPath = path.resolve(__dirname, '../babel.config.js');
  const srcDir = path.resolve('./src');
  const outDir = path.resolve(
    relativeOutDir,
    {
      cjs: '.',
      esm: './esm',
      es: './es',
    }[bundle],
  );

  const command = [
    'yarn babel',
    '--config-file',
    babelConfigPath,
    '--extensions',
    '".js,.ts,.tsx"',
    srcDir,
    '--out-dir',
    outDir,
    '--ignore',
    // Need to put these patterns in quotes otherwise they might be evaluated by the used terminal.
    `"${[
      '**/*.test.js',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
      '**/*.spec.tsx',
      '**/*.d.ts',
    ].join('","')}"`,
  ].join(' ');

  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(`running '${command}' with ${JSON.stringify(env)}`);
  }

  return exec(command, { env });
}

yargs
  .command({
    command: '$0 <bundle>',
    description: 'build package',
    builder: (command) => {
      return command
        .positional('bundle', {
          description: `Valid bundles: "${validBundles.join('" | "')}"`,
          type: 'string',
        })
        .option('out-dir', { default: './build', type: 'string' })
        .option('verbose', { type: 'boolean' });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
