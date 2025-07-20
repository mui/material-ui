import glob from 'fast-glob';
import * as fs from 'fs/promises';
import path from 'path';
import yargs from 'yargs';
import { $ } from 'execa';
import * as babel from '@babel/core';
import { parse } from 'jsonc-parser';

const $$ = $({ stdio: 'inherit' });

async function emitDeclarations(tsconfig: string, outDir: string) {
  // eslint-disable-next-line no-console
  console.log(`Building types for ${path.resolve(tsconfig)}`);
  await $$`tsc -p ${tsconfig} --outDir ${outDir} --declaration --emitDeclarationOnly`;
}

async function postProcessImports(folder: string, removeCss: boolean) {
  // eslint-disable-next-line no-console
  console.log(`Adding import extensions`);
  const dtsFiles = await glob('**/*.d.ts', { absolute: true, cwd: folder });
  if (dtsFiles.length === 0) {
    throw new Error(`Unable to find declaration files in '${folder}'`);
  }

  const babelPlugins: babel.PluginItem[] = [
    ['@babel/plugin-syntax-typescript', { dts: true }],
    ['@mui/internal-babel-plugin-resolve-imports'],
  ];

  if (removeCss) {
    babelPlugins.push(['babel-plugin-transform-remove-imports', { test: /\.css$/ }]);
  }

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

interface HandlerArgv {
  skipTsc: boolean;
  copy: string[];
  removeCss: boolean;
}

async function main(argv: HandlerArgv) {
  const packageRoot = process.cwd();
  const tsconfigPath = path.join(packageRoot, 'tsconfig.build.json');
  const tsconfigExists = await fs.access(tsconfigPath).then(
    () => true,
    () => false,
  );

  const tsConfig = tsconfigExists
    ? (parse(await fs.readFile(tsconfigPath, 'utf-8')) as { compilerOptions: { outDir: string } })
    : null;

  const srcPath = path.join(packageRoot, 'src');
  const buildFolder = path.join(packageRoot, 'build');
  const esmOrOutDir = tsConfig?.compilerOptions.outDir
    ? path.join(packageRoot, tsConfig.compilerOptions.outDir)
    : path.join(buildFolder, 'esm');

  await copyDeclarations(srcPath, esmOrOutDir);

  if (!argv.skipTsc) {
    if (!tsconfigExists) {
      throw new Error(
        'Unable to find a tsconfig to build this project. ' +
          `The package root needs to contain a 'tsconfig.build.json'. ` +
          `The package root is '${packageRoot}'`,
      );
    }

    await emitDeclarations(tsconfigPath, esmOrOutDir);
  }

  await postProcessImports(esmOrOutDir, argv.removeCss);

  await Promise.all(
    argv.copy.map((copy) => copyDeclarations(esmOrOutDir, path.join(packageRoot, copy))),
  );

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
        .option('copy', {
          alias: 'c',
          type: 'array',
          description: 'Directories where the type definition files should be copied',
          default: ['build'],
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
