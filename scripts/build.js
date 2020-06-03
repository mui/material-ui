const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');
const yargs = require('yargs');

const exec = promisify(childProcess.exec);

async function run(argv) {
  const { bundle, outDir: relativeOutDir, verbose } = argv;

  const env = {
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
    '".js,.ts"',
    srcDir,
    '--out-dir',
    outDir,
    '--ignore',
    '"**/*.test.js","**/*.spec.ts","**/*.d.ts"',
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
          description: '"cjs" | "esm" | "esnext"',
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
