import childProcess from 'child_process';
import path from 'path';
import { promisify } from 'util';
import yargs from 'yargs';
import * as fs from 'fs/promises';
import { hideBin } from 'yargs/helpers';
import { cjsCopy } from './copyFilesUtils.mjs';
import { getVersionEnvVariables, getWorkspaceRoot } from './utils.mjs';

const exec = promisify(childProcess.exec);

const validBundles = [
  // build for node using commonJS modules
  'node',
  // build with a hardcoded target using ES6 modules
  'stable',
];

const bundleTypes = {
  stable: 'module',
  node: 'commonjs',
};

async function run(argv) {
  const {
    bundle,
    largeFiles,
    outDir: outDirBase,
    verbose,
    cjsDir,
    babelIgnore,
    babelFlag: babelFlags,
  } = argv;

  if (!validBundles.includes(bundle)) {
    throw new TypeError(
      `Unrecognized bundle '${bundle}'. Did you mean one of "${validBundles.join('", "')}"?`,
    );
  }

  const packageJsonPath = path.resolve('./package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, { encoding: 'utf8' }));

  let babelRuntimeVersion = packageJson.dependencies['@babel/runtime'];
  if (babelRuntimeVersion === 'catalog:') {
    // resolve the version from the given package
    // outputs the pnpm-workspace.yaml config as json
    const { stdout: configStdout } = await exec('pnpm config list --json');
    const pnpmWorkspaceConfig = JSON.parse(configStdout);
    babelRuntimeVersion = pnpmWorkspaceConfig.catalog['@babel/runtime'];
  }

  if (!babelRuntimeVersion) {
    throw new Error(
      'package.json needs to have a dependency on `@babel/runtime` when building with `@babel/plugin-transform-runtime`.',
    );
  }

  const babelConfigPath = path.resolve(getWorkspaceRoot(), 'babel.config.js');
  const srcDir = path.resolve('./src');
  const extensions = ['.js', '.ts', '.tsx'];
  const ignore = [
    '**/*.test.js',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.js',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.d.ts',
    '**/*.test/*.*',
    '**/test-cases/*.*',
    ...babelIgnore,
  ];

  const outFileExtension = '.js';

  const relativeOutDir = {
    node: cjsDir,
    stable: './esm',
  }[bundle];

  const outDir = path.resolve(outDirBase, relativeOutDir);

  const env = {
    NODE_ENV: 'production',
    BABEL_ENV: bundle,
    MUI_BUILD_VERBOSE: verbose,
    MUI_BABEL_RUNTIME_VERSION: babelRuntimeVersion,
    MUI_OUT_FILE_EXTENSION: outFileExtension,
    ...getVersionEnvVariables(packageJson),
  };

  const babelArgs = [
    '--config-file',
    babelConfigPath,
    '--extensions',
    `"${extensions.join(',')}"`,
    srcDir,
    '--out-dir',
    outDir,
    '--ignore',
    // Need to put these patterns in quotes otherwise they might be evaluated by the used terminal.
    `"${ignore.join('","')}"`,
    ...babelFlags,
  ];

  if (outFileExtension !== '.js') {
    babelArgs.push('--out-file-extension', outFileExtension);
  }

  if (largeFiles) {
    babelArgs.push('--compact false');
  }

  const command = ['pnpm babel', ...babelArgs].join(' ');

  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(`running '${command}' with ${JSON.stringify(env)}`);
  }

  const { stderr, stdout } = await exec(command, { env: { ...process.env, ...env } });
  if (stderr) {
    throw new Error(`'${command}' failed with \n${stderr}`);
  }

  // cjs for reexporting from commons only modules.
  // If we need to rely more on this we can think about setting up a separate commonjs => commonjs build for .cjs files to .cjs
  // `--extensions-.cjs --out-file-extension .cjs`
  await cjsCopy({ from: srcDir, to: outDir });

  // Write a package.json file in the output directory if we are building the stable bundle
  // or if the output directory is not the root of the package.
  const shouldWriteBundlePackageJson = bundle === 'stable' || relativeOutDir !== './';
  if (shouldWriteBundlePackageJson && !argv.skipEsmPkg) {
    const rootBundlePackageJson = path.join(outDir, 'package.json');
    await fs.writeFile(
      rootBundlePackageJson,
      JSON.stringify({ type: bundleTypes[bundle], sideEffects: packageJson.sideEffects }),
    );
  }

  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(stdout);
  }
}

yargs()
  .command({
    command: '$0 <bundle>',
    description: 'build package',
    builder: (command) => {
      return command
        .positional('bundle', {
          description: `Valid bundles: "${validBundles.join('" | "')}"`,
          type: 'string',
        })
        .option('largeFiles', {
          type: 'boolean',
          default: false,
          describe: 'Set to `true` if you know you are transpiling large files.',
        })
        .option('skipEsmPkg', {
          type: 'boolean',
          default: false,
          describe:
            "Set to `true` if you don't want to generate a package.json file in the /esm folder.",
        })
        .option('cjsDir', {
          default: './',
          type: 'string',
          description: 'The directory to copy the cjs files to.',
        })
        .option('out-dir', { default: './build', type: 'string' })
        .option('babel-ignore', { type: 'string', array: true, default: [] })
        .option('verbose', { type: 'boolean' })
        .option('babel-flag', {
          type: 'string',
          array: true,
          default: [],
          description: 'Additional flags to pass to babel cli.',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse(hideBin(process.argv));
