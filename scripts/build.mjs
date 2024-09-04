import childProcess from 'child_process';
import glob from 'fast-glob';
import path from 'path';
import { promisify } from 'util';
import yargs from 'yargs';
import * as url from 'url';
import { rollup } from 'rollup';
import { babel as rollupBabel } from '@rollup/plugin-babel';
import rollupResolve from '@rollup/plugin-node-resolve';
import rollupPreserveDirectives from 'rollup-plugin-preserve-directives';
import rollupAlias from '@rollup/plugin-alias';
import * as fs from 'fs/promises';
import { getVersionEnvVariables, getWorkspaceRoot } from './utils.mjs';

const usePackageExports = process.env.MUI_USE_PACKAGE_EXPORTS === 'true';

const exec = promisify(childProcess.exec);

const validBundles = [
  // modern build with a rolling target using ES6 modules
  'modern',
  // build for node using commonJS modules
  'node',
  // build with a hardcoded target using ES6 modules
  'stable',
];

async function run(argv) {
  const { bundle, largeFiles, outDir: outDirBase, verbose } = argv;

  if (validBundles.indexOf(bundle) === -1) {
    throw new TypeError(
      `Unrecognized bundle '${bundle}'. Did you mean one of "${validBundles.join('", "')}"?`,
    );
  }

  const packageJsonPath = path.resolve('./package.json');
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, { encoding: 'utf8' }));

  const babelRuntimeVersion = packageJson.dependencies['@babel/runtime'];
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
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.d.ts',
    '**/*.test/*.*',
    '**/test-cases/*.*',
  ];

  let outFileExtension = {
    node: '.js',
    modern: '.modern.mjs',
    stable: '.mjs',
  }[bundle];

  let relativeOutDir = './';

  if (!usePackageExports) {
    outFileExtension = '.js';
    const topLevelNonIndexFiles = glob
      .sync(`*{${extensions.join(',')}}`, { cwd: srcDir, ignore })
      .filter((file) => {
        return path.basename(file, path.extname(file)) !== 'index';
      });
    const topLevelPathImportsCanBePackages = topLevelNonIndexFiles.length === 0;

    // We generally support top level path imports e.g.
    // 1. `import ArrowDownIcon from '@mui/icons-material/ArrowDown'`.
    // 2. `import Typography from '@mui/material/Typography'`.
    // The first case resolves to a file while the second case resolves to a package first i.e. a package.json
    // This means that only in the second case the bundler can decide whether it uses ES modules or CommonJS modules.
    // Different extensions are not viable yet since they require additional bundler config for users and additional transpilation steps in our repo.
    //
    // TODO v6: Switch to `exports` field.
    relativeOutDir = {
      node: topLevelPathImportsCanBePackages ? './node' : './',
      modern: './modern',
      stable: topLevelPathImportsCanBePackages ? './' : './esm',
    }[bundle];
  }

  const outDir = path.resolve(outDirBase, relativeOutDir);

  const env = {
    NODE_ENV: 'production',
    BABEL_ENV: bundle,
    MUI_BUILD_VERBOSE: verbose,
    MUI_BABEL_RUNTIME_VERSION: babelRuntimeVersion,
    MUI_OUT_FILE_EXTENSION: outFileExtension,
    ...(await getVersionEnvVariables()),
  };

  if (argv.rollup) {
    const entryFiles = await glob(`**/*{${extensions.join(',')}}`, { cwd: srcDir, ignore });

    const entries = Object.fromEntries(
      entryFiles.map((file) => [
        // nested/foo.js becomes nested/foo
        file.slice(0, file.length - path.extname(file).length),
        // This expands the relative paths to absolute paths, so e.g.
        // src/nested/foo becomes /project/src/nested/foo.js
        url.fileURLToPath(new URL(file, `${url.pathToFileURL(srcDir)}/`)),
      ]),
    );

    const rollupBundle = await rollup({
      input: entries,
      external: (id) => /node_modules/.test(id),
      onwarn(warning, warn) {
        if (warning.code !== 'MODULE_LEVEL_DIRECTIVE') {
          warn(warning);
        }
      },
      plugins: [
        rollupAlias({
          // Mostly to resolve @mui/utils/formatMuiErrorMessage correctly, but generalizes to all packages.
          entries: [{ find: packageJson.name, replacement: srcDir }],
        }),
        rollupResolve({ extensions }),
        rollupBabel({
          configFile: babelConfigPath,
          extensions,
          babelHelpers: 'runtime',
          envName: bundle,
        }),
        rollupPreserveDirectives(),
      ],
    });

    await rollupBundle.write({
      preserveModules: true,
      interop: 'auto',
      exports: 'named',
      dir: outDir,
      format: bundle === 'node' ? 'commonjs' : 'es',
      entryFileNames: `[name]${outFileExtension}`,
    });

    return;
  }

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

  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(stdout);
  }
}

yargs(process.argv.slice(2))
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
        .option('out-dir', { default: './build', type: 'string' })
        .option('rollup', {
          default: false,
          type: 'boolean',
          describe: '(Experiment) Use rollup to build the files.',
        })
        .option('verbose', { type: 'boolean' });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
