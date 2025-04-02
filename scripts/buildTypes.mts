import glob from 'fast-glob';
import * as fs from 'fs/promises';
import path from 'path';
import yargs from 'yargs';
import { $ } from 'execa';
import * as babel from '@babel/core';
import throttle from 'lodash/throttle';

interface Options {
  watch: boolean;
}

const $$ = $({ stdio: 'inherit' });

async function emitDeclarations(tsconfig: string, outDir: string, { watch = false }: Options) {
  // eslint-disable-next-line no-console
  console.log(`Building types for ${path.resolve(tsconfig)}`);

  const tsconfigExists = await fs.access(tsconfig).then(
    () => true,
    () => false,
  );

  if (!tsconfigExists) {
    throw new Error(
      'Unable to find a tsconfig to build this project. ' +
        `The package root needs to contain a 'tsconfig.build.json'. ` +
        `The package root is '${path.basename(tsconfig)}'`,
    );
  }

  const watchOptions = watch ? ['--watch', '--preserveWatchOutput'] : [];
  await $$`tsc -p ${tsconfig} --outDir ${outDir} --declaration --emitDeclarationOnly ${watchOptions}`;
}

async function addImportExtensions(dtsFile: string) {
  const result = await babel.transformFileAsync(dtsFile, {
    configFile: false,
    plugins: [
      ['@babel/plugin-syntax-typescript', { dts: true }],
      ['@mui/internal-babel-plugin-resolve-imports'],
    ],
  });

  if (typeof result?.code === 'string') {
    const existing = await fs.readFile(dtsFile, 'utf8');
    if (existing === result.code) {
      return;
    }
    await fs.writeFile(dtsFile, result.code);
  } else {
    console.error('failed to transform', dtsFile);
  }
}

async function watchDeclarations(sourceDirectory: string, onChange: (file: string) => void) {
  const handleChange = throttle(onChange, 300);
  const watcher = fs.watch(sourceDirectory, { recursive: true });
  for await (const event of watcher) {
    if (event.filename?.endsWith('.d.ts')) {
      handleChange(event.filename);
    }
  }
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

async function postProcessDts(
  dtsFile: string,
  {
    esmFolder,
    buildFolder,
    modernFolder,
  }: { esmFolder: string; buildFolder: string; modernFolder: string },
) {
  const relative = path.relative(esmFolder, dtsFile);
  const buildFile = path.join(buildFolder, relative);
  const modernFile = path.join(modernFolder, relative);
  await addImportExtensions(dtsFile);
  await Promise.all([fs.cp(dtsFile, buildFile), fs.cp(dtsFile, modernFile)]);
}

async function postProcessTypes(esmFolder: string, buildFolder: string, modernFolder: string) {
  // eslint-disable-next-line no-console
  console.log(`Adding import extensions`);
  const dtsFiles = await glob('**/*.d.ts', { absolute: true, cwd: esmFolder });
  if (dtsFiles.length === 0) {
    throw new Error(`Unable to find declaration files in '${esmFolder}'`);
  }

  await Promise.all(
    dtsFiles.map(async (dtsFile) => {
      await postProcessDts(dtsFile, { esmFolder, buildFolder, modernFolder });
    }),
  );
}

interface HandlerArgv {
  skipTsc: boolean;
  watch: boolean;
}

async function main(argv: HandlerArgv) {
  const packageRoot = process.cwd();
  const tsconfigPath = path.join(packageRoot, 'tsconfig.build.json');

  const srcPath = path.join(packageRoot, 'src');
  const buildFolder = path.join(packageRoot, 'build');
  const esmFolder = path.join(buildFolder, 'esm');
  const modernFolder = path.join(buildFolder, 'modern');

  await copyDeclarations(srcPath, esmFolder);

  if (!argv.skipTsc) {
    await emitDeclarations(tsconfigPath, esmFolder, { watch: false });
  }

  await postProcessTypes(esmFolder, buildFolder, modernFolder);

  if (argv.watch) {
    // eslint-disable-next-line no-console
    console.log('Watching for changes...');
    await Promise.all([
      watchDeclarations(srcPath, async () => {
        await copyDeclarations(srcPath, esmFolder);
      }),
      argv.skipTsc ? null : emitDeclarations(tsconfigPath, esmFolder, { watch: true }),
      watchDeclarations(esmFolder, async (filename) => {
        const dtsFile = path.resolve(esmFolder, filename);
        await postProcessDts(dtsFile, { esmFolder, buildFolder, modernFolder });
      }),
    ]);
  }
}

yargs(process.argv.slice(2))
  .command<HandlerArgv>({
    command: '$0',
    description:
      'Builds a project with a fix for https://github.com/microsoft/TypeScript/issues/39117',
    builder: (command) => {
      return command
        .option('skipTsc', {
          type: 'boolean',
          default: false,
          describe: 'Set to `true` if you want the legacy behavior of just copying .d.ts files.',
        })
        .option('watch', {
          type: 'boolean',
          default: false,
          describe: 'Set to `true` if you want to build types upon changes.',
        });
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
