/* eslint-disable no-console */
/**
 * Transpiles TypeScript demos to formatted JavaScript.
 * Can be used to verify that JS and TS demos are equivalent. No introduced change
 * would indicate equivalence.
 */

/**
 * List of demos to ignore when transpiling
 * Example: "app-bar/BottomAppBar.tsx"
 */
const ignoreList = [];

const fse = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');
const prettier = require('prettier');
const typescriptToProptypes = require('typescript-to-proptypes');
const yargs = require('yargs');
const { fixBabelGeneratorIssues, fixLineEndings } = require('./helpers');

const tsConfig = typescriptToProptypes.loadConfig(path.resolve(__dirname, '../tsconfig.json'));

const babelConfig = {
  presets: ['@babel/preset-typescript'],
  plugins: ['babel-plugin-unwrap-createstyles'],
  generatorOpts: { retainLines: true },
  babelrc: false,
  configFile: false,
};

const workspaceRoot = path.join(__dirname, '../../');

async function getFiles(root) {
  const files = [];

  await Promise.all(
    (await fse.readdir(root)).map(async (name) => {
      const filePath = path.join(root, name);
      const stat = await fse.stat(filePath);

      if (stat.isDirectory()) {
        files.push(...(await getFiles(filePath)));
      } else if (
        stat.isFile() &&
        /\.tsx?$/.test(filePath) &&
        !filePath.endsWith('.d.ts') &&
        !ignoreList.some((ignorePath) => filePath.endsWith(path.normalize(ignorePath)))
      ) {
        files.push(filePath);
      }
    }),
  );

  return files;
}

const TranspileResult = {
  Success: 0,
  Failed: 1,
};

async function transpileFile(tsxPath, program) {
  const jsPath = tsxPath.replace(/\.tsx?$/, '.js');
  try {
    const source = await fse.readFile(tsxPath, 'utf8');

    const { code } = await babel.transformAsync(source, { ...babelConfig, filename: tsxPath });

    if (/import \w* from 'prop-types'/.test(code)) {
      throw new Error('TypeScript demo contains prop-types, please remove them');
    }

    const propTypesAST = typescriptToProptypes.parseFromProgram(tsxPath, program, {
      shouldResolveObject: ({ name }) => {
        if (name === 'classes') {
          return false;
        }

        return undefined;
      },
    });
    const codeWithPropTypes = typescriptToProptypes.inject(propTypesAST, code);

    const prettierConfig = prettier.resolveConfig.sync(jsPath, {
      config: path.join(workspaceRoot, 'prettier.config.js'),
    });
    const prettierFormat = (jsSource) =>
      prettier.format(jsSource, { ...prettierConfig, filepath: jsPath });

    const prettified = prettierFormat(codeWithPropTypes);
    const formatted = fixBabelGeneratorIssues(prettified);
    const correctedLineEndings = fixLineEndings(source, formatted);

    // removed blank lines change potential formatting
    await fse.writeFile(jsPath, prettierFormat(correctedLineEndings));
    return TranspileResult.Success;
  } catch (err) {
    console.error('Something went wrong transpiling %s\n%s\n', tsxPath, err);
    return TranspileResult.Failed;
  }
}

async function main(argv) {
  const { watch: watchMode, disableCache, pattern } = argv;

  // TODO: Remove at some point.
  // Though not too soon so that it isn't disruptive.
  // It's a no-op anyway.
  if (disableCache !== undefined) {
    console.warn(
      '--disable-cache does not have any effect since it is the default. In the future passing this flag will throw.',
    );
  }

  const filePattern = new RegExp(pattern);
  if (pattern.length > 0) {
    console.log(`Only considering demos matching ${filePattern}`);
  }

  const tsxFiles = (await getFiles(path.join(workspaceRoot, 'docs/src/pages'))).filter(
    (fileName) => {
      return filePattern.test(fileName);
    },
  );

  const program = typescriptToProptypes.createTSProgram(tsxFiles, tsConfig);

  let successful = 0;
  let failed = 0;
  (await Promise.all(tsxFiles.map((file) => transpileFile(file, program)))).forEach((result) => {
    switch (result) {
      case TranspileResult.Success: {
        successful += 1;
        break;
      }
      case TranspileResult.Failed: {
        failed += 1;
        break;
      }
      default: {
        throw new Error(`No handler for ${result}`);
      }
    }
  });

  console.log(
    [
      '------ Summary ------',
      '%i demo(s) were successfully transpiled',
      '%i demo(s) were unsuccessful',
    ].join('\n'),
    successful,
    failed,
  );

  if (!watchMode) {
    if (failed > 0) {
      process.exit(1);
    }
    return;
  }

  tsxFiles.forEach((filePath) => {
    fse.watchFile(filePath, { interval: 500 }, async () => {
      if ((await transpileFile(filePath, program, true)) === 0) {
        console.log('Success - %s', filePath);
      }
    });
  });

  console.log('\nWatching for file changes...');
}

yargs
  .command({
    command: '$0',
    description: 'transpile TypeScript demos',
    builder: (command) => {
      return command
        .option('watch', {
          default: false,
          description: 'transpiles demos as soon as they changed',
          type: 'boolean',
        })
        .option('disable-cache', {
          description: 'No longer supported. The cache is disabled by default.',
          type: 'boolean',
        })
        .option('pattern', {
          default: '',
          description:
            'Transpiles only the TypeScript demos whose filename matches the given pattern.',
          type: 'string',
        });
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
