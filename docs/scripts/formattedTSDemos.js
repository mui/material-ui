/* eslint-disable no-console */
/**
 * Transpiles TypeScript demos to formatted JavaScript.
 * Can be used to verify that JS and TS demos are equivalent. No introduced change
 * would indicate equivalence.
 */

/**
 * List of demos or folders to ignore when transpiling.
 * Only ignore files that aren't used in the UI.
 */
const ignoreList = ['/pages.ts', 'docs/data/joy/getting-started/templates'];

const path = require('path');
const fse = require('fs-extra');
const babel = require('@babel/core');
const prettier = require('prettier');
const {
  getPropTypesFromFile,
  injectPropTypesInFile,
} = require('@mui/internal-scripts/typescript-to-proptypes');
const {
  createTypeScriptProjectBuilder,
} = require('@mui-internal/api-docs-builder/utils/createTypeScriptProject');
const yargs = require('yargs');
const { fixBabelGeneratorIssues, fixLineEndings } = require('@mui/internal-docs-utils');
const { default: CORE_TYPESCRIPT_PROJECTS } = require('../../scripts/coreTypeScriptProjects');

const babelConfig = {
  presets: ['@babel/preset-typescript'],
  plugins: [],
  generatorOpts: { retainLines: true },
  babelrc: false,
  configFile: false,
  shouldPrintComment: (comment) => !comment.startsWith(' @babel-ignore-comment-in-output'),
};

const workspaceRoot = path.join(__dirname, '../../');

async function getFiles(root) {
  const files = [];

  try {
    await Promise.all(
      (await fse.readdir(root)).map(async (name) => {
        const filePath = path.join(root, name);
        const stat = await fse.stat(filePath);

        if (
          stat.isDirectory() &&
          !ignoreList.some((ignorePath) =>
            filePath.startsWith(path.normalize(`${workspaceRoot}/${ignorePath}`)),
          )
        ) {
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
  } catch (error) {
    if (error.message?.includes('no such file or directory')) {
      return [];
    }
    throw error;
  }

  return files;
}

const TranspileResult = {
  Success: 0,
  Failed: 1,
};

async function transpileFile(tsxPath, project) {
  const jsPath = tsxPath.replace(/\.tsx?$/, '.js');
  try {
    const source = await fse.readFile(tsxPath, 'utf8');

    const transformOptions = { ...babelConfig, filename: tsxPath };
    const enableJSXPreview =
      !tsxPath.includes(path.join('pages', 'premium-themes')) &&
      !tsxPath.includes(path.join('getting-started', 'templates'));
    if (enableJSXPreview) {
      transformOptions.plugins = transformOptions.plugins.concat([
        [
          require.resolve('docs/src/modules/utils/babel-plugin-jsx-preview'),
          { maxLines: 16, outputFilename: `${tsxPath}.preview` },
        ],
      ]);
    }
    const { code } = await babel.transformAsync(source, transformOptions);

    if (/import \w* from 'prop-types'/.test(code)) {
      throw new Error('TypeScript demo contains prop-types, please remove them');
    }

    console.log(tsxPath);

    const propTypesAST = getPropTypesFromFile({
      project,
      filePath: tsxPath,
      shouldResolveObject: ({ name }) => {
        if (name === 'classes' || name === 'ownerState' || name === 'popper') {
          return false;
        }

        return undefined;
      },
    });
    const codeWithPropTypes = injectPropTypesInFile({ components: propTypesAST, target: code });
    const prettierConfig = await prettier.resolveConfig(jsPath, {
      config: path.join(workspaceRoot, 'prettier.config.js'),
    });
    const prettierFormat = async (jsSource) =>
      prettier.format(jsSource, { ...prettierConfig, filepath: jsPath });

    const codeWithoutTsIgnoreComments = codeWithPropTypes.replace(/^\s*\/\/ @ts-ignore.*$/gm, '');
    const prettified = await prettierFormat(codeWithoutTsIgnoreComments);
    const formatted = fixBabelGeneratorIssues(prettified);
    const correctedLineEndings = fixLineEndings(source, formatted);

    // removed blank lines change potential formatting
    await fse.writeFile(jsPath, await prettierFormat(correctedLineEndings));
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

  const tsxFiles = [
    ...(await getFiles(path.join(workspaceRoot, 'docs/src/pages'))), // old structure
    ...(await getFiles(path.join(workspaceRoot, 'docs/data'))), // new structure
  ].filter((fileName) => filePattern.test(fileName));

  const buildProject = createTypeScriptProjectBuilder(CORE_TYPESCRIPT_PROJECTS);
  const project = buildProject('docs', { files: tsxFiles });

  let successful = 0;
  let failed = 0;
  (
    await Promise.all(
      tsxFiles.map((file) => {
        return transpileFile(file, project);
      }),
    )
  ).forEach((result) => {
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
      if ((await transpileFile(filePath, project, true)) === 0) {
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
