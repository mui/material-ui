/* eslint-disable no-console */
/**
 * Create live demo imports.
 */

/**
 * List of demos to ignore when transpiling
 * Example: ['app-bar/BottomAppBar.tsx']
 */
const ignoreList = [];

const fse = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const yargs = require('yargs');
const { fixLineEndings } = require('./helpers');

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
        /docs\/src\/pages\/.*\/[A-Z].*\.js$/.test(filePath) &&
        !filePath.endsWith('.tsx') &&
        !filePath.endsWith('Imports.js') &&
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

async function transpileFile(tsxPath) {
  const jsPath = tsxPath.replace(/\.tsx?$/, '.js');
  try {
    let source = await fse.readFile(jsPath, 'utf8');

    // Flatten multiline imports
    source = source
      .replace(/{\n/gm, '{')
      .replace(/,\n/gm, ',')
      .replace(/,}/gm, ' }')
      .replace(/ {2}/gm, ' ');

    // Extract imports
    const importsRegex = /^import.*$/gm;
    const imports = source.match(importsRegex);

    const importRegex = /^import (.*) from (.*);$/;
    const asRegex = /\w+ as\s*/gm;
    const firstOrLastRegex = /(^\w+|\w+$)/;
    const inBracesRegex = /({.+})/;

    // Prepare imports (object as string) for Jarle resolveImports
    const transformedImports = imports.reduce((accumulator, currentImport) => {
      const splitImport = currentImport.match(importRegex);

      // Remove '\w+ as': { red as blue } => { red }
      const module = splitImport[1].replace(asRegex, '');

      const defaultExport = module.match(firstOrLastRegex);
      const namedExports = module.match(inBracesRegex);

      // 'red' || '{ blue }
      let modules = defaultExport ? defaultExport[1] : namedExports[1];

      // 'red, { blue }' => '{ default: red, blue }
      if (defaultExport && namedExports) {
        modules = `${namedExports[1].slice(0, 1)} default: ${
          defaultExport[1]
        },${namedExports[1].slice(1)}`;
      }

      const newImport =
        splitImport[2] === `'${modules}'` ? modules : `${splitImport[2]}: ${modules}`;
      return `${accumulator}\n${newImport},`;
    }, '{\n');

    const output = `${imports.join('\n')};
    
    export default ${transformedImports}};`;

    const prettierConfig = prettier.resolveConfig.sync(jsPath, {
      config: path.join(workspaceRoot, 'prettier.config.js'),
    });
    const prettierFormat = (jsSource) =>
      prettier.format(jsSource, { ...prettierConfig, filepath: jsPath });

    const prettified = prettierFormat(output);
    const correctedLineEndings = fixLineEndings(source, prettified);

    await fse.writeFile(jsPath.replace(/\.js?$/, 'Imports.js'), correctedLineEndings);
    return TranspileResult.Success;
  } catch (err) {
    console.error('Something went wrong with %s\n%s\n', tsxPath, err);
    return TranspileResult.Failed;
  }
}

async function main(argv) {
  const { watch: watchMode, pattern } = argv;

  const filePattern = new RegExp(pattern);
  if (pattern.length > 0) {
    console.log(`Only considering demos matching ${filePattern}`);
  }

  const files = (await getFiles(path.join(workspaceRoot, 'docs/src/pages'))).filter((fileName) => {
    return filePattern.test(fileName);
  });

  let successful = 0;
  let failed = 0;
  (await Promise.all(files.map((file) => transpileFile(file)))).forEach((result) => {
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
      '%i demo(s) were successfully converted',
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

  files.forEach((filePath) => {
    fse.watchFile(filePath, { interval: 500 }, async () => {
      if ((await transpileFile(filePath)) === 0) {
        console.log('Success - %s', filePath);
      }
    });
  });

  console.log('\nWatching for file changes...');
}

yargs
  .command({
    command: '$0',
    description: 'Convert demos',
    builder: (command) => {
      return command
        .option('watch', {
          default: false,
          description: 'Convert demos as soon as they changed',
          type: 'boolean',
        })
        .option('pattern', {
          default: '',
          description: 'Convert only the JS demos whose filename matches the given pattern.',
          type: 'string',
        });
    },
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
