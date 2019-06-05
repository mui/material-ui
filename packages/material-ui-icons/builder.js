/* eslint-disable no-console */

import fse from 'fs-extra';
import yargs from 'yargs';
import path from 'path';
import rimraf from 'rimraf';
import Mustache from 'mustache';
import Queue from 'modules/waterfall/Queue';
import util from 'util';
import glob from 'glob';
import mkdirp from 'mkdirp';
import SVGO from 'svgo';

const globAsync = util.promisify(glob);
const RENAME_FILTER_DEFAULT = './renameFilters/default';
const RENAME_FILTER_MUI = './renameFilters/material-design-icons';

const svgo = new SVGO({
  floatPrecision: 4,
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
 * @param {string} destPath
 * @returns {string} class name
 */
function getComponentName(destPath) {
  const splitregex = new RegExp(`[\\${path.sep}-]+`);

  const parts = destPath
    .replace('.js', '')
    .split(splitregex)
    .map(part => part.charAt(0).toUpperCase() + part.substring(1));

  return parts.join('');
}

async function generateIndex(options) {
  const files = await globAsync(path.join(options.outputDir, '*.js'));
  const index = files
    .map(file => {
      const typename = path.basename(file).replace('.js', '');
      return `export { default as ${typename} } from './${typename}';\n`;
    })
    .join('');

  await fse.writeFile(path.join(options.outputDir, 'index.js'), index);
}

async function worker({ svgPath, options, renameFilter, template }) {
  process.stdout.write('.');

  const normalizedSvgPath = path.normalize(svgPath);
  const svgPathObj = path.parse(normalizedSvgPath);
  const innerPath = path
    .dirname(normalizedSvgPath)
    .replace(options.svgDir, '')
    .replace(path.relative(process.cwd(), options.svgDir), ''); // for relative dirs
  const destPath = renameFilter(svgPathObj, innerPath, options);

  const outputFileDir = path.dirname(path.join(options.outputDir, destPath));
  const exists2 = await fse.exists(outputFileDir);

  if (!exists2) {
    console.log(`Making dir: ${outputFileDir}`);
    mkdirp.sync(outputFileDir);
  }

  const data = await fse.readFile(svgPath, { encoding: 'utf8' });

  // Remove hardcoded color fill before optimizing so that empty groups are removed
  const input = data
    .replace(/ fill="#010101"/g, '')
    .replace(/<rect fill="none" width="24" height="24"\/>/g, '')
    .replace(/<rect id="SVGID_1_" width="24" height="24"\/>/g, '');

  const result = await svgo.optimize(input);

  // Extract the paths from the svg string
  // Clean xml paths
  let paths = result.data
    .replace(/<svg[^>]*>/g, '')
    .replace(/<\/svg>/g, '')
    .replace(/"\/>/g, '" />')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/xlink:href=/g, 'xlinkHref=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/ clip-path=".+?"/g, '') // Fix visibility issue and save some bytes.
    .replace(/<clipPath.+?<\/clipPath>/g, ''); // Remove unused definitions

  const sizeMatch = svgPath.match(/^.*_([0-9]+)px.svg$/);
  const size = sizeMatch ? Number(sizeMatch[1]) : null;

  if (size !== 24) {
    const scale = Math.round((24 / size) * 100) / 100; // Keep a maximum of 2 decimals
    paths = paths.replace('clipPath="url(#b)" ', '');
    paths = paths.replace(/<path /g, `<path transform="scale(${scale}, ${scale})" `);
  }

  const fileString = Mustache.render(template, {
    paths,
    componentName: getComponentName(destPath),
  });

  const absDestPath = path.join(options.outputDir, destPath);
  await fse.writeFile(absDestPath, fileString);
}

async function main(options) {
  try {
    let originalWrite;

    options.glob = options.glob || '/**/*.svg';
    options.innerPath = options.innerPath || '';
    options.renameFilter = options.renameFilter || RENAME_FILTER_DEFAULT;
    options.disableLog = options.disableLog || false;

    // Disable console.log opt, used for tests
    if (options.disableLog) {
      originalWrite = process.stdout.write;
      process.stdout.write = () => {};
    }

    rimraf.sync(`${options.outputDir}/*.js`); // Clean old files

    let renameFilter = options.renameFilter;
    if (typeof renameFilter === 'string') {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      renameFilter = require(renameFilter).default;
    }
    if (typeof renameFilter !== 'function') {
      throw Error('renameFilter must be a function');
    }
    const exists1 = await fse.exists(options.outputDir);
    if (!exists1) {
      await fse.mkdir(options.outputDir);
    }

    const [svgPaths, template] = await Promise.all([
      globAsync(path.join(options.svgDir, options.glob)),
      fse.readFile(path.join(__dirname, 'templateSvgIcon.js'), {
        encoding: 'utf8',
      }),
    ]);

    const queue = new Queue(
      svgPath =>
        worker({
          svgPath,
          options,
          renameFilter,
          template,
        }),
      { concurrency: 8 },
    );

    queue.push(svgPaths);
    await queue.wait({ empty: true });

    await generateIndex(options);

    if (options.disableLog) {
      // bring back stdout
      process.stdout.write = originalWrite;
    }
  } catch (err) {
    console.log(err);
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
  main,
  RENAME_FILTER_DEFAULT,
  RENAME_FILTER_MUI,
};
