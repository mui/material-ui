/* eslint-disable no-console, flowtype/require-valid-file-annotation */

import fs from 'fs';
import yargs from 'yargs';
import path from 'path';
import rimraf from 'rimraf';
import Mustache from 'mustache';
import _ from 'lodash';
import glob from 'glob';
import mkdirp from 'mkdirp';

const SVG_ICON_RELATIVE_REQUIRE = '../../SvgIcon';
const SVG_ICON_ABSOLUTE_REQUIRE = 'material-ui/SvgIcon';
const RENAME_FILTER_DEFAULT = './filters/rename/default';
const RENAME_FILTER_MUI = './filters/rename/material-design-icons';

const DEFAULT_OPTIONS = {
  muiRequire: 'absolute',
  glob: '/**/*.svg',
  innerPath: '',
  renameFilter: RENAME_FILTER_DEFAULT,
};

/**
 * Return Pascal-Cased classname.
 *
 * @param {string} svgPath
 * @returns {string} class name
 */
function pascalCase(destPath) {
  const splitregex = new RegExp(`[${path.sep}-]+`);

  let parts = destPath.replace('.js', '').split(splitregex);
  parts = _.map(parts, part => {
    return part.charAt(0).toUpperCase() + part.substring(1);
  });

  const className = parts.join('');

  return className;
}

function getJsxString(svgPath, destPath, options) {
  const className = pascalCase(destPath);

  console.log(`  ${className}`);

  const data = fs.readFileSync(svgPath, {
    encoding: 'utf8',
  });
  const template = fs.readFileSync(path.join(__dirname, 'tpl/SvgIcon.js'), {
    encoding: 'utf8',
  });

  // Extract the paths from the svg string
  let paths = data.slice(data.indexOf('>') + 1);
  paths = paths.slice(0, -6);
  // Clean xml paths
  paths = paths.replace(/xlink:href="#a"/g, '');
  paths = paths.replace(/xlink:href="#c"/g, '');
  paths = paths.replace(/fill-opacity=/g, 'fillOpacity=');
  paths = paths.replace(/\s?fill=".*?"/g, '');
  paths = paths.replace(/"\/>/g, '" />');

  // Node acts weird if we put this directly into string concatenation
  const muiRequireStmt =
    options.muiRequire === 'relative' ? SVG_ICON_RELATIVE_REQUIRE : SVG_ICON_ABSOLUTE_REQUIRE;

  return Mustache.render(template, {
    muiRequireStmt,
    paths,
    className,
  });
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
function processFile(svgPath, destPath, options) {
  const outputFileDir = path.dirname(path.join(options.outputDir, destPath));

  if (!fs.existsSync(outputFileDir)) {
    console.log(`Making dir: ${outputFileDir}`);
    mkdirp.sync(outputFileDir);
  }
  const fileString = getJsxString(svgPath, destPath, options);
  const absDestPath = path.join(options.outputDir, destPath);
  fs.writeFileSync(absDestPath, fileString);
}

/**
 * make index.js, it exports all of SVGIcon classes.
 * @param {object} options
 */
function processIndex(options) {
  const files = glob.sync(path.join(options.outputDir, '*.js'));
  const results = [];
  files.forEach(jsPath => {
    const typename = path.basename(jsPath).replace('.js', '');
    results.push(`export { default as ${typename} } from './${typename}';\n`);
  });
  const index = results.join('');
  const absDestPath = path.join(options.outputDir, 'index.js');
  fs.writeFileSync(absDestPath, index);
}

function parseArgs() {
  return yargs
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
      'Filter only files ending with a suffix (pretty much only for material-ui-icons)',
    )
    .describe(
      'rename-filter',
      `Path to JS module used to rename destination filename and path.
        Default: ${RENAME_FILTER_DEFAULT}`,
    )
    .options('mui-require', {
      demand: false,
      type: 'string',
      describe: `Load material-ui dependencies (SvgIcon) relatively or absolutely.
        (absolute|relative).
        For material-ui distributions, relative, for anything else, you probably want absolute.`,
    }).argv;
}

function main(options, callback) {
  let originalWrite; // todo, add wiston / other logging tool

  options = _.defaults(options, DEFAULT_OPTIONS);
  if (options.disableLog) {
    // disable console.log opt, used for tests.
    originalWrite = process.stdout.write;
    process.stdout.write = () => {};
  }

  rimraf.sync(`${options.outputDir}/*.js`); // Clean old files
  console.log('** Starting Build');

  let renameFilter = options.renameFilter;
  if (_.isString(renameFilter)) {
    /* eslint-disable global-require, import/no-dynamic-require */
    renameFilter = require(renameFilter);
    /* eslint-enable */
  }
  if (!_.isFunction(renameFilter)) {
    throw Error('renameFilter must be a function');
  }
  if (!fs.existsSync(options.outputDir)) {
    fs.mkdirSync(options.outputDir);
  }
  const files = glob.sync(path.join(options.svgDir, options.glob));

  files.forEach(svgPath => {
    const svgPathObj = path.parse(svgPath);
    const innerPath = path
      .dirname(svgPath)
      .replace(options.svgDir, '')
      .replace(path.relative(process.cwd(), options.svgDir), ''); // for relative dirs
    const destPath = renameFilter(svgPathObj, innerPath, options);

    processFile(svgPath, destPath, options);
  });

  processIndex(options);

  if (options.disableLog) {
    // bring back stdout
    process.stdout.write = originalWrite;
  }

  if (callback) {
    callback();
  }
}

if (require.main === module) {
  const argv = parseArgs();
  main(argv);
}

module.exports = {
  pascalCase,
  getJsxString,
  processFile,
  processIndex,
  main,
  SVG_ICON_RELATIVE_REQUIRE,
  SVG_ICON_ABSOLUTE_REQUIRE,
  RENAME_FILTER_DEFAULT,
  RENAME_FILTER_MUI,
};
