import glob from 'fast-glob';
import * as fs from 'fs/promises';
import path from 'path';
import yargs from 'yargs';
import { $ } from 'execa';
import * as babel from '@babel/core';

const $$ = $({ stdio: 'inherit' });

async function emitDeclarations(tsconfig: string, outDir: string) {
  console.log(`Building types for ${path.resolve(tsconfig)}`);
  await $$`tsc -p ${tsconfig} --outDir ${outDir} --declaration --emitDeclarationOnly`;
}

async function addImportExtensions(folder: string) {
  console.log(`Adding import extensions`);
  const dtsFiles = await glob('**/*.d.ts', { absolute: true, cwd: folder });
  if (dtsFiles.length === 0) {
    throw new Error(`Unable to find declaration files in '${folder}'`);
  }

  await Promise.all(
    dtsFiles.map(async (dtsFile) => {
      const result = await babel.transformFileAsync(dtsFile, {
        configFile: false,
        plugins: [
          ['@babel/plugin-syntax-typescript', { dts: true }],
          ['@mui/internal-babel-plugin-resolve-imports'],
        ],
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
}

async function main(argv: HandlerArgv) {
  const packageRoot = process.cwd();

  const srcPath = path.join(packageRoot, 'src');
  const buildFolder = path.join(packageRoot, 'build');
  const esmFolder = path.join(buildFolder, 'esm');
  const modernFolder = path.join(buildFolder, 'modern');

  await copyDeclarations(srcPath, esmFolder);

  if (!argv.skipTsc) {
    const tsconfigPath = path.join(packageRoot, 'tsconfig.build.json');
    const tsconfigExists = await fs.access(tsconfigPath).then(
      () => true,
      () => false,
    );

    if (!tsconfigExists) {
      throw new Error(
        'Unable to find a tsconfig to build this project. ' +
          `The package root needs to contain a 'tsconfig.build.json'. ` +
          `The package root is '${packageRoot}'`,
      );
    }

    await emitDeclarations(tsconfigPath, esmFolder);
  }

  await addImportExtensions(esmFolder);

  await copyDeclarations(esmFolder, buildFolder);
  await copyDeclarations(esmFolder, modernFolder);
}

yargs(process.argv.slice(2))
  .command<HandlerArgv>({
    command: '$0',
    description:
      'Builds a project with a fix for https://github.com/microsoft/TypeScript/issues/39117',
    builder: (command) => {
      return command.option('skipTsc', {
        type: 'boolean',
        default: false,
        describe: 'Set to `true` if you want the legacy behavior of just copying .d.ts files.',
      });
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
