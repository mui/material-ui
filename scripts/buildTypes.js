const chalk = require('chalk');
const childProcess = require('child_process');
const glob = require('fast-glob');
const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');
const yargs = require('yargs');

const exec = promisify(childProcess.exec);

/**
 * Fixes a wrong import path caused by https://github.com/microsoft/TypeScript/issues/39117
 * @remarks Paths are hardcoded since it is unclear if all these broken import paths target "public paths".
 * @param {string} importPath - POSIX path
 */
function rewriteImportPath(importPath) {
  const coreSrcPath = path.posix.join('..', 'material-ui', 'src');
  if (importPath.startsWith(coreSrcPath)) {
    return importPath.replace(coreSrcPath, '@material-ui/core');
  }

  const stylesSrcPath = path.posix.join('..', 'material-ui-styles', 'src');
  if (importPath.startsWith(stylesSrcPath)) {
    return importPath.replace(stylesSrcPath, '@material-ui/styles');
  }

  const systemSrcPath = path.posix.join('..', 'material-ui-system', 'src');
  if (importPath.startsWith(systemSrcPath)) {
    return importPath.replace(systemSrcPath, '@material-ui/system');
  }

  throw new Error(`Don't know where to rewrite '${importPath}' to`);
}

async function main() {
  const packageRoot = process.cwd();

  const tsconfigPath = path.join(packageRoot, 'tsconfig.build.json');
  if (!fse.existsSync(tsconfigPath)) {
    throw new Error(
      'Unable to find a tsconfig to build this project. ' +
        `The package root needs to contain a 'tsconfig.build.json'. ` +
        `The package root is '${packageRoot}'`,
    );
  }

  await exec(['yarn', 'tsc', '-b', tsconfigPath].join(' '));

  const publishDir = path.join(packageRoot, 'build');
  const declarationFiles = await glob('**/*.d.ts', { absolute: true, cwd: publishDir });
  if (declarationFiles.length === 0) {
    throw new Error(`Unable to find declaration files in '${publishDir}'`);
  }

  async function rewriteImportPaths(declarationFile) {
    const code = await fse.readFile(declarationFile, { encoding: 'utf8' });
    let fixedCode = code;
    const changes = [];

    // find all type `import()`
    // not to be confused with `import type`
    const importTypeRegExp = /import\(([^)]+)\)/g;

    let importTypeMatch;
    // eslint-disable-next-line no-cond-assign -- Waiting for RegExp.prototype.matchAll
    while ((importTypeMatch = importTypeRegExp.exec(code)) !== null) {
      // First and last character are quotes.
      // TypeScript mixes single and double quotes.
      const importPath = importTypeMatch[1].slice(1, -1);
      // In filesystem semantics `@material-ui/core` is a relative path.
      // But when resolving imports these specifiers are considered "bare specifiers" and work differently.
      // We're only interested in imports that are considered "relative path imports".
      const isBareImportSpecifier = !importPath.startsWith('.');
      if (!isBareImportSpecifier) {
        const resolvedImport = path.resolve(declarationFile, importPath);
        const importPathFromPublishDir = path.relative(publishDir, resolvedImport);
        const isImportReachableWhenPublished = !importPathFromPublishDir.startsWith('.');

        if (!isImportReachableWhenPublished) {
          try {
            const fixedImportPath = rewriteImportPath(
              // ensure relative POSIX path
              importPathFromPublishDir.replace(/\\/g, '/'),
            );
            const originalImportType = importTypeMatch[0];
            const fixedImportType = importTypeMatch[0].replace(importPath, fixedImportPath);

            // Make it easy to visually scan for the created lines.
            changes.push(`-${chalk.bgRed(originalImportType)}\n+${chalk.bgGreen(fixedImportType)}`);
            fixedCode = fixedCode.replace(originalImportType, fixedImportType);
          } catch (error) {
            throw new Error(`${declarationFile}: ${error}`);
          }
        }
      }
    }

    const changed = changes.length > 0;
    if (changed) {
      await fse.writeFile(declarationFile, fixedCode);
    }

    return changes;
  }

  let rewrittenTally = 0;
  let errorTally = 0;
  await Promise.all(
    declarationFiles.map(async (declarationFile) => {
      try {
        const rewrites = await rewriteImportPaths(declarationFile, publishDir);
        if (rewrites.length > 0) {
          // eslint-disable-next-line no-console -- Verbose logging
          console.log(`${chalk.bgYellow`FIXED`} '${declarationFile}':\n${rewrites.join('\n')}`);
          rewrittenTally += 1;
        } else {
          // eslint-disable-next-line no-console -- Verbose logging
          console.log(`${chalk.bgGreen`OK`} '${declarationFile}'`);
        }
      } catch (error) {
        console.error(error);
        errorTally += 1;
        process.exitCode = 1;
      }
    }),
  );

  // eslint-disable-next-line no-console -- Verbose logging
  console.log(`Fixed: ${rewrittenTally}\nFailed: ${errorTally}\nTotal: ${declarationFiles.length}`);
}

yargs
  .command({
    command: '$0',
    description:
      'Builds a project with a fix for https://github.com/microsoft/TypeScript/issues/39117',
    handler: main,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
