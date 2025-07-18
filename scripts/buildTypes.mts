import glob from 'fast-glob';
import * as fs from 'fs/promises';
import path from 'path';
import yargs from 'yargs';
import { $ } from 'execa';
import * as babel from '@babel/core';

const $$ = $({ stdio: 'inherit' });

// Use .mjs extension for ESM output files if the MUI_EXPERIMENTAL_MJS environment variable is set.
const EXPERIMENTAL_MJS = !!process.env.MUI_EXPERIMENTAL_MJS;

async function emitDeclarations(tsconfig: string, outDir: string) {
  // eslint-disable-next-line no-console
  console.log(`Building types for ${path.resolve(tsconfig)}`);
  await $$`tsc -p ${tsconfig} --outDir ${outDir} --declaration --emitDeclarationOnly`;
}

async function postProcessImports(folder: string, removeCss: boolean, filter = '.d.ts') {
  // eslint-disable-next-line no-console
  console.log(`Adding import extensions`);
  const dtsFiles = await glob(`**/*${filter}`, { absolute: true, cwd: folder });
  if (dtsFiles.length === 0) {
    return;
  }

  const babelPlugins: babel.PluginItem[] = [['@babel/plugin-syntax-typescript', { dts: true }]];

  if (removeCss) {
    babelPlugins.push(['babel-plugin-transform-remove-imports', { test: /\.css$/ }]);
  }

  // this plugin needs to come after remove-imports so that css imports are already removed
  babelPlugins.push(['@mui/internal-babel-plugin-resolve-imports']);

  await Promise.all(
    dtsFiles.map(async (dtsFile) => {
      const result = await babel.transformFileAsync(dtsFile, {
        configFile: false,
        plugins: babelPlugins,
      });

      if (typeof result?.code === 'string') {
        await fs.writeFile(dtsFile, result.code);
      } else {
        console.error('failed to transform', dtsFile);
      }
    }),
  );
}

async function copyDeclarations(sourceDirectory: string, destinationDirectory: string) {
  const fullSourceDirectory = path.resolve(sourceDirectory);
  const fullDestinationDirectory = path.resolve(destinationDirectory);

  // eslint-disable-next-line no-console
  console.log(`Copying declarations from ${fullSourceDirectory} to ${fullDestinationDirectory}`);

  await fs.cp(fullSourceDirectory, fullDestinationDirectory, {
    recursive: true,
    filter: async (src) => {
      if (src.startsWith('.')) {
        // ignore dotfiles
        return false;
      }
      const stats = await fs.stat(src);
      if (stats.isDirectory()) {
        return true;
      }
      return src.endsWith('.d.ts');
    },
  });
}

async function renameDtsFilesToDmts(sourceDirectory: string) {
  const dtsFiles = await glob('**/*.d.ts', { absolute: true, cwd: sourceDirectory });
  if (dtsFiles.length === 0) {
    console.warn('No .d.ts files found in the directory. Skipping renaming to .d.mts');
    return;
  }

  console.log('Renaming .d.ts files to .d.mts files in', sourceDirectory);
  await Promise.all(
    dtsFiles.map(async (dtsFile) => {
      // Rename the file from .d.ts to .d.mts
      const basename = path.basename(dtsFile, '.d.ts');
      const dirname = path.dirname(dtsFile);
      const newFilePath = path.join(dirname, `${basename}.d.mts`);
      await fs.rename(dtsFile, newFilePath);
    }),
  );
}

interface HandlerArgv {
  skipTsc: boolean;
  cjsDir: string;
  removeCss: boolean;
}

async function main(argv: HandlerArgv) {
  const packageRoot = process.cwd();
  const tsconfigPath = path.join(packageRoot, 'tsconfig.build.json');
  const tsconfigExists = await fs.access(tsconfigPath).then(
    () => true,
    () => false,
  );

  const srcPath = path.join(packageRoot, 'src');
  const buildFolder = path.join(packageRoot, 'build');
  const esmDir = path.join(buildFolder, 'esm');
  const cjsDir = path.join(buildFolder, argv.cjsDir);

  await copyDeclarations(srcPath, esmDir);

  if (!argv.skipTsc) {
    if (!tsconfigExists) {
      throw new Error(
        'Unable to find a tsconfig to build this project. ' +
          `The package root needs to contain a 'tsconfig.build.json'. ` +
          `The package root is '${packageRoot}'`,
      );
    }

    await emitDeclarations(tsconfigPath, esmDir);
  }

  await copyDeclarations(esmDir, cjsDir);

  if (EXPERIMENTAL_MJS) {
    await renameDtsFilesToDmts(esmDir);
  }

  await postProcessImports(esmDir, argv.removeCss, '.d.mts');
  await postProcessImports(cjsDir, argv.removeCss, '.d.ts');

  const tsbuildinfo = await glob('**/*.tsbuildinfo', { absolute: true, cwd: buildFolder });
  await Promise.all(tsbuildinfo.map(async (file) => fs.rm(file)));
}

yargs(process.argv.slice(2))
  .command<HandlerArgv>(
    '$0',
    'Builds type definition files and copies them to the specified directories with a fix for https://github.com/microsoft/TypeScript/issues/39117',
    (command) => {
      return command
        .option('skipTsc', {
          type: 'boolean',
          default: false,
          describe: 'Set to `true` if you want the legacy behavior of just copying .d.ts files.',
        })
        .option('cjsDir', {
          type: 'string',
          description: 'Directory under the build folder where the cjs build lives',
          default: '.',
        })
        .option('removeCss', {
          type: 'boolean',
          default: false,
          describe: 'Set to `true` if you want to remove the css imports in the type definitions',
        });
    },
    main,
  )
  .help()
  .strict(true)
  .version(false)
  .parse();
