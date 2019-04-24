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
const os = require('os');

const babelConfig = {
  presets: ['@babel/preset-typescript'],
  plugins: ['unwrap-createStyles'],
  generatorOpts: { retainLines: true },
  babelrc: false,
  configFile: false,
};

const watchMode = process.argv.some(arg => arg === '--watch');
const cacheDisabled = process.argv.some(arg => arg === '--disable-cache');

const workspaceRoot = path.join(__dirname, '../../');

const prettierConfig = prettier.resolveConfig.sync(process.cwd(), {
  config: path.join(workspaceRoot, 'prettier.config.js'),
});

async function getFiles(root) {
  const files = [];

  await Promise.all(
    (await fse.readdir(root)).map(async name => {
      const filePath = path.join(root, name);
      const stat = await fse.stat(filePath);

      if (stat.isDirectory()) {
        files.push(...(await getFiles(filePath)));
      } else if (
        stat.isFile() &&
        filePath.endsWith('.tsx') &&
        !ignoreList.some(ignorePath => filePath.endsWith(path.normalize(ignorePath)))
      ) {
        files.push(filePath);
      }
    }),
  );

  return files;
}

function getLineFeed(source) {
  const match = source.match(/\r?\n/);
  if (match === null) {
    return os.EOL;
  }
  return match[0];
}

const fixBabelIssuesRegExp = new RegExp(/(?<=(\/>)|,)(\r?\n){2}/g);
function fixBabelGeneratorIssues(source) {
  return source.replace(fixBabelIssuesRegExp, getLineFeed(source));
}

async function transpileFile(tsxPath, ignoreCache = false) {
  const jsPath = tsxPath.replace('.tsx', '.js');
  try {
    if (!cacheDisabled && !ignoreCache && fse.exists(jsPath)) {
      const [jsStat, tsxStat] = await Promise.all([fse.stat(jsPath), fse.stat(tsxPath)]);
      if (jsStat.mtimeMs > tsxStat.mtimeMs) {
        // JavaScript version is newer, skip transpiling
        return -1;
      }
    }

    const { code } = await babel.transformFileAsync(tsxPath, babelConfig);
    const prettified = prettier.format(code, { ...prettierConfig, filepath: tsxPath });
    const formatted = fixBabelGeneratorIssues(prettified);

    await fse.writeFile(jsPath, formatted);
    return 0;
  } catch (err) {
    console.error(err);
    return 1;
  }
}

(async () => {
  const tsxFiles = await getFiles(path.join(workspaceRoot, 'docs/src/pages'));

  let successful = 0;
  let failed = 0;
  let skipped = 0;
  (await Promise.all(tsxFiles.map(file => transpileFile(file)))).forEach(result => {
    if (result === 0) successful += 1;
    else if (result === 1) failed += 1;
    else if (result === -1) skipped += 1;
  });

  console.log(
    [
      '------ Summary ------',
      '%i demo(s) were successfully transpiled',
      '%i demo(s) were skipped',
      '%i demo(s) were unsuccessful',
    ].join('\n'),
    successful,
    skipped,
    failed,
  );

  if (!watchMode) {
    if (failed > 0) {
      process.exit(1);
    }
    return;
  }

  tsxFiles.forEach(filePath => {
    fse.watchFile(filePath, { interval: 500 }, async () => {
      if ((await transpileFile(filePath, true)) === 0) {
        console.log('Success - %s', filePath);
      }
    });
  });

  console.log('\nWatching for file changes...');
})();
