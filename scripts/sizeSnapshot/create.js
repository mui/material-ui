const path = require('path');
const os = require('os');
const fse = require('fs-extra');
const lodash = require('lodash');
const yargs = require('yargs');
const Piscina = require('piscina');
const { getWebpackEntries } = require('./webpack.config');

const MAX_CONCURRENCY = Math.min(8, os.cpus().length);

const workspaceRoot = path.join(__dirname, '../../');
const snapshotDestPath = path.join(workspaceRoot, 'size-snapshot.json');

/**
 * creates size snapshot for every bundle that built with webpack
 */
async function getWebpackSizes(webpackEnvironment) {
  const worker = new Piscina({
    filename: require.resolve('./worker'),
    maxThreads: MAX_CONCURRENCY,
  });
  await fse.mkdirp(path.join(__dirname, 'build'));

  const entries = await getWebpackEntries();

  const sizeArrays = await Promise.all(
    entries.map((entry, index) =>
      worker.run({ entry, webpackEnvironment, index, total: entries.length }),
    ),
  );

  return sizeArrays.flat();
}

async function run(argv) {
  const { analyze, accurateBundles } = argv;

  const bundleSizes = lodash.fromPairs([...(await getWebpackSizes({ analyze, accurateBundles }))]);

  await fse.writeJSON(snapshotDestPath, bundleSizes, { spaces: 2 });
}

yargs
  .command({
    command: '$0',
    description: 'Saves a size snapshot in size-snapshot.json',
    builder: (command) => {
      return command
        .option('analyze', {
          default: false,
          describe: 'Creates a webpack-bundle-analyzer report for each bundle.',
          type: 'boolean',
        })
        .option('accurateBundles', {
          default: false,
          describe: 'Displays used bundles accurately at the cost of more CPU cycles.',
          type: 'boolean',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
