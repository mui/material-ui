import chalk from 'chalk';
import glob from 'fast-glob';
import fse from 'fs-extra';
import path from 'path';
import yargs from 'yargs';
import { $ } from 'execa';

const $$ = $({ stdio: 'inherit' });

/**
 * Fixes a wrong import path caused by https://github.com/microsoft/TypeScript/issues/39117
 * @remarks Paths are hardcoded since it is unclear if all these broken import paths target "public paths".
 * @param {string} importPath - POSIX path
 */
function rewriteImportPath(importPath) {
  const coreSrcPath = path.posix.join('..', 'mui-material', 'src');
  if (importPath.startsWith(coreSrcPath)) {
    return importPath.replace(coreSrcPath, '@mui/material');
  }

  const stylesSrcPath = path.posix.join('..', 'mui-styles', 'src');
  if (importPath.startsWith(stylesSrcPath)) {
    return importPath.replace(stylesSrcPath, '@mui/styles');
  }

  const systemSrcPath = path.posix.join('..', 'mui-system', 'src');
  if (importPath.startsWith(systemSrcPath)) {
    return importPath.replace(systemSrcPath, '@mui/system');
  }

  throw new Error(`Don't know where to rewrite '${importPath}' to`);
}

async function rewriteImportPaths(declarationFile, publishDir) {
  const code = await fse.readFile(declarationFile, { encoding: 'utf8' });
  const basename = path.basename(declarationFile);

  if (
    // Only consider React components
    basename[0] === basename[0].toUpperCase() &&
    code.indexOf("import PropTypes from 'prop-types';") !== -1
  ) {
    throw new Error(
      [
        `${declarationFile} imports from 'prop-types', this is wrong.`,
        "It's likely missing a cast to any on the propTypes declaration:",
        'ComponentName.propTypes = { /* prop */ } as any;',
      ].join('\n'),
    );
  }

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
    // In filesystem semantics `@mui/material` is a relative path.
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

  await $$`pnpm tsc -b ${tsconfigPath}`;

  const publishDir = path.join(packageRoot, 'build');
  const declarationFiles = await glob('**/*.d.ts', { absolute: true, cwd: publishDir });
  if (declarationFiles.length === 0) {
    throw new Error(`Unable to find declaration files in '${publishDir}'`);
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

yargs(process.argv.slice(2))
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
