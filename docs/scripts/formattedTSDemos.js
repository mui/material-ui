/* eslint-disable no-console */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

/**
 * Transpiles and formats TS demos.
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

const prettierConfig = prettier.resolveConfig(process.cwd(), {
  config: path.join(__dirname, '../../prettier.config.js'),
});

const watchMode = process.argv.some(arg => arg === '--watch');

async function getFiles(root) {
  const files = [];
  const folderItem = await fse.readdir(root);

  for (const name of folderItem) {
    const filePath = path.join(root, name);
    const stat = await fse.stat(filePath);

    if (stat.isFile()) {
      if (!filePath.endsWith('.tsx')) continue;
      if (ignoreList.some(ignorePath => filePath.endsWith(path.normalize(ignorePath)))) continue;
      files.push(filePath);
    } else if (stat.isDirectory()) {
      files.push(...(await getFiles(filePath)));
    }
  }

  return files;
}

const fixBabelIssuesRegExp = new RegExp(/(?<=(\/>)|,)(\r\n|\r|\n){2}/g);
function fixBabelGeneratorIssues(source) {
  return source.replace(fixBabelIssuesRegExp, os.EOL);
}

async function transpileFile(filePath) {
  try {
    const { code } = await babel.transformFileAsync(filePath, babelConfig);
    const prettified = prettier.format(code, { ...(await prettierConfig), filepath: filePath });
    const formatted = fixBabelGeneratorIssues(prettified);

    await fse.writeFile(filePath.replace('.tsx', '.js'), formatted);
    return true;
  } catch (err) {
    console.error(err);
    if (!watchMode) process.exit(1);
    return false;
  }
}

(async () => {
  const tsxFiles = await getFiles(path.join(__dirname, '../src/pages'));

  for (const filePath of tsxFiles) {
    if (watchMode) {
      fse.watchFile(filePath, async () => {
        const successful = await transpileFile(filePath);
        if (watchMode && successful) {
          console.log('Successfully transpiled: %s', filePath);
        }
      });
    }
    await transpileFile(filePath);
  }

  if (watchMode) {
    console.log('Watching files...');
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
