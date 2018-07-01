/* eslint-disable no-console */

import fs from 'fs';
import yargs from 'yargs';
import path from 'path';
import rimraf from 'rimraf';
import Mustache from 'mustache';
import glob from 'glob';
import mkdirp from 'mkdirp';
import SVGO from 'svgo';

const RENAME_FILTER_DEFAULT = './filters/rename/default';
const RENAME_FILTER_MUI = './filters/rename/material-design-icons';

const svgo = new SVGO({
  plugins: [
    { cleanupAttrs: true },
    { removeDoctype: true },
    { removeXMLProcInst: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { removeXMLNS: true },
    { removeEditorsNSData: true },
    { removeEmptyAttrs: true },
    { removeHiddenElems: true },
    { removeEmptyText: true },
    { removeEmptyContainers: true },
    { removeViewBox: true },
    { cleanupEnableBackground: true },
    { minifyStyles: true },
    { convertStyleToAttrs: true },
    { convertColors: true },
    { convertPathData: true },
    { convertTransform: true },
    { removeUnknownsAndDefaults: true },
    { removeNonInheritableGroupAttrs: true },
    { removeUselessStrokeAndFill: true },
    { removeUnusedNS: true },
    { cleanupIDs: true },
    { cleanupNumericValues: true },
    { cleanupListOfValues: true },
    { moveElemsAttrsToGroup: true },
    { moveGroupAttrsToElems: true },
    { collapseGroups: true },
    { removeRasterImages: true },
    { mergePaths: true },
    { convertShapeToPath: true },
    { sortAttrs: true },
    { removeDimensions: true },
    { removeAttrs: true },
    { removeElementsByAttr: true },
    { removeStyleElement: true },
    { removeScriptElement: true },
  ],
});

/**
 * Return Pascal-Cased component name.
 *
 * @param {string} svgPath
 * @returns {string} class name
 */
function getComponentName(destPath) {
  const splitregex = new RegExp(`[${path.sep}-]+`);

  const parts = destPath
    .replace('.js', '')
    .split(splitregex)
    .map(part => {
      return part.charAt(0).toUpperCase() + part.substring(1);
    });

  return parts.join('');
}

async function getJsxString(svgPath, destPath, absDestPath) {
  const componentName = getComponentName(destPath);
  console.log(`  ${componentName}`);

  const data = fs.readFileSync(svgPath, { encoding: 'utf8' });
  const template = fs.readFileSync(path.join(__dirname, 'templateSvgIcon.js'), {
    encoding: 'utf8',
  });

  const result = await svgo.optimize(data);
  // Extract the paths from the svg string
  // Clean xml paths
  const paths = result.data
    .replace(/<!--.*-->/g, '')
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<svg[^>]*>/g, '')
    .replace(/<\/svg>/g, '')
    .replace(/<g>/g, '')
    .replace(/<\/g>/g, '')
    .replace(/xlink:href="#a"/g, '')
    .replace(/xlink:href="#c"/g, '')
    .replace(/xlink:href="#SVGID_[\d]*_"/g, '')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/\s?fill=".*?"/g, '')
    .replace(/<path[^>]*0h24[^>]*>/g, '')
    .replace(/<path[^>]*0H24[^>]*>/g, '')
    .replace(/"\/>/g, '" />');

  const fileString = Mustache.render(template, {
    paths,
    componentName,
  });

  fs.writeFileSync(absDestPath, fileString);
}

/**
 * @param {string} svgPath
 * Absolute path to svg file to process.
 *
 * @param {string} destPath
 * Path to jsx file relative to {options.outputDir}
 *
 * @param {object} options
 */
async function processFile(svgPath, destPath, options) {
  const outputFileDir = path.dirname(path.join(options.outputDir, destPath));

  if (!fs.existsSync(outputFileDir)) {
    console.log(`Making dir: ${outputFileDir}`);
    mkdirp.sync(outputFileDir);
  }
  const absDestPath = path.join(options.outputDir, destPath);
  await getJsxString(svgPath, destPath, absDestPath);
}

/**
 * make index.js, it exports all of SVGIcon classes.
 * @param {object} options
 */
function processIndex(options) {
  const index = glob
    .sync(path.join(options.outputDir, '*.js'))
    .map(file => {
      const typename = path.basename(file).replace('.js', '');
      return `export { default as ${typename} } from './${typename}';\n`;
    })
    .join('');

  fs.writeFileSync(path.join(options.outputDir, 'index.js'), index);
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index]);
  }
}

async function main(options) {
  let originalWrite;

  options.glob = options.glob || '/**/*.svg';
  options.innerPath = options.innerPath || '';
  options.renameFilter = options.renameFilter || RENAME_FILTER_DEFAULT;

  // Disable console.log opt, used for tests
  if (options.disableLog) {
    originalWrite = process.stdout.write;
    process.stdout.write = () => {};
  }

  rimraf.sync(`${options.outputDir}/*.js`); // Clean old files

  let renameFilter = options.renameFilter;
  if (typeof renameFilter === 'string') {
    /* eslint-disable-next-line global-require, import/no-dynamic-require */
    renameFilter = require(renameFilter).default;
  }
  if (typeof renameFilter !== 'function') {
    throw Error('renameFilter must be a function');
  }
  if (!fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir);
  }
  const files = glob.sync(path.join(options.svgDir, options.glob));

  await asyncForEach(files, async svgPath => {
    const svgPathObj = path.parse(svgPath);
    const innerPath = path
      .dirname(svgPath)
      .replace(options.svgDir, '')
      .replace(path.relative(process.cwd(), options.svgDir), ''); // for relative dirs
    const destPath = renameFilter(svgPathObj, innerPath, options);

    await processFile(svgPath, destPath, options);
  });

  processIndex(options);

  if (options.disableLog) {
    // bring back stdout
    process.stdout.write = originalWrite;
  }
}

if (require.main === module) {
  const argv = yargs
    .usage("Build JSX components from SVG's.\nUsage: $0")
    .demand('output-dir')
    .describe('output-dir', 'Directory to output jsx components')
    .demand('svg-dir')
    .describe('svg-dir', 'SVG directory')
    .describe('glob', 'Glob to match inside of --svg-dir. Default **/*.svg')
    .describe(
      'inner-path',
      '"Reach into" subdirs, since libraries like material-design-icons' +
        ' use arbitrary build directories to organize icons' +
        ' e.g. "action/svg/production/icon_3d_rotation_24px.svg"',
    )
    .describe(
      'file-suffix',
      'Filter only files ending with a suffix (pretty much only for @material-ui/icons)',
    )
    .describe(
      'rename-filter',
      `Path to JS module used to rename destination filename and path.
        Default: ${RENAME_FILTER_DEFAULT}`,
    ).argv;
  main(argv);
}

export default {
  getComponentName,
  getJsxString,
  processFile,
  processIndex,
  main,
  RENAME_FILTER_DEFAULT,
  RENAME_FILTER_MUI,
};
