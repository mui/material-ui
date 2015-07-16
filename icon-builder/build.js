#! /usr/bin/env node
/**
 * Material UI Icon Builder
 * ========================
 * 
 * Usage: 
 *
 * node ./build.js --help
 *
 */
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var Mustache = require("mustache");
var _ = require('lodash');
var glob = require("glob");
var mkdirp = require("mkdirp");

const SVG_ICON_RELATIVE_REQUIRE = "require('../../svg-icon')"
  , SVG_ICON_ABSOLUTE_REQUIRE = "require('material-ui/lib/svg-icon')"
  , RENAME_FILTER_DEFAULT = './filters/rename/default'
  , RENAME_FILTER_MUI = './filters/rename/material-design-icons';

const DEFAULT_OPTIONS = {
  muiRequire: 'absolute',
  glob: '/**/*.svg',
  innerPath: '',
  renameFilter: RENAME_FILTER_DEFAULT
}

function parseArgs() {
  return require('yargs')
  .usage('Build JSX components from SVG\'s.\nUsage: $0')
  .demand('output-dir')
  .describe('output-dir', 'Directory to output jsx components')
  .demand('svg-dir')
  .describe('svg-dir', 'SVG directory')
  .describe('glob', 'Glob to match inside of --svg-dir. Default **/*.svg')
  .describe('inner-path', '"Reach into" subdirs, since libraries like material-design-icons' +
            ' use arbitrary build directories to organize icons' +
            ' e.g. "action/svg/production/icon_3d_rotation_24px.svg"')
  .describe('file-suffix', 'Filter only files ending with a suffix (pretty much only' +
            ' for material-ui-icons)')
  .describe('rename-filter', 'Path to JS module used to rename destination filename and path. Default: ' + RENAME_FILTER_DEFAULT)
  .options('mui-require', {
    demand: false,
    describe: 'Load material-ui dependencies (SvgIcon) relatively or absolutely. (absolute|relative). For material-ui distributions, relative, for anything else, you probably want absolute.',
    type: 'string'
  })
  .describe('mui-icons-opts', 'Shortcut to use MUI icons options')
  .boolean('mui-icons-opts')
  .argv;
}

function main(options, cb) {
  var originalWrite;  // todo, add wiston / other logging tool

  options = _.defaults(options, DEFAULT_OPTIONS);
  if (options.disable_log) { // disable console.log opt, used for tests.
    originalWrite = process.stdout.write;
  process.stdout.write = function() {};
  }

  rimraf.sync(options.outputDir); // Clean old files
  console.log('** Starting Build');
  var dirs = fs.readdirSync(options.svgDir);

  var renameFilter = options.renameFilter;
  if (_.isString(renameFilter)) {
    renameFilter = require(renameFilter);
  }
  if (!_.isFunction(renameFilter)) {
    throw Error("renameFilter must be a function");
  }

  fs.mkdirSync(options.outputDir);
  var files = glob.sync(path.join(options.svgDir, options.glob))
  _.each(files, function(svgPath) {
    var svgPathObj = path.parse(svgPath);
    var innerPath = path.dirname(svgPath)
      .replace(options.svgDir, "")
      .replace(path.relative(process.cwd(), options.svgDir), "");  // for relative dirs
    var destPath = renameFilter(svgPathObj, innerPath, options);

    processFile(svgPath, destPath, options);
  });

  if (cb) {
    cb();
  }

  if (options.disable_log) { // bring back stdout 
    process.stdout.write = originalWrite;
  }
}

/*
 * @param {string} svgPath
 * Absolute path to svg file to process.
 *
 * @param {string} destPath
 * Path to jsx file relative to {options.outputDir}
 *
 * @param {object} options
 */
function processFile(svgPath, destPath, options) {
  var outputFileDir = path.dirname(path.join(options.outputDir, destPath));

  if (!fs.existsSync(outputFileDir)) {
    console.log("Making dir: " + outputFileDir);
    mkdirp.sync(outputFileDir);
  }
  var fileString = getJsxString(svgPath, destPath, options);
  var absDestPath = path.join(options.outputDir, destPath);
  fs.writeFileSync(absDestPath, fileString);
}


/**
 * Return Pascal-Cased classname.
 *
 * @param {string} svgPath
 * @returns {string} class name
 */
function pascalCase(destPath) {
  var splitregex = new RegExp("[" + path.sep + "-]+");
  var parts = destPath.replace(".jsx", "").split(splitregex);
  parts = _.map(parts, function(part) { return part.charAt(0).toUpperCase() + part.substring(1); });
  var className = parts.join('');
  return className;
}

function getJsxString(svgPath, destPath, options) {
  var className = pascalCase(destPath);

  console.log('  ' + className);

  var data = fs.readFileSync(svgPath, {encoding: 'utf8'});
  var template = fs.readFileSync(path.join(__dirname, "tpl/SvgIcon.js"), {encoding: 'utf8'});
  //Extract the paths from the svg string
  var paths = data.slice(data.indexOf('>') + 1);
  paths = paths.slice(0, -6);
  //clean xml paths
  paths = paths.replace('xlink:href="#a"', '');
  paths = paths.replace('xlink:href="#c"', '');

  // Node acts wierd if we put this directly into string concatenation

  var muiRequireStmt = options.muiRequire === "relative" ? SVG_ICON_RELATIVE_REQUIRE : SVG_ICON_ABSOLUTE_REQUIRE;

  return Mustache.render(
    template, {
      muiRequireStmt: muiRequireStmt,
      paths: paths,
      className: className
    }
  );

}

if (require.main === module) {
  var argv = parseArgs();
  main(argv);
}

module.exports = {
  pascalCase: pascalCase, 
  getJsxString: getJsxString,
  processFile: processFile,
  main: main,
  SVG_ICON_RELATIVE_REQUIRE: SVG_ICON_RELATIVE_REQUIRE,
  SVG_ICON_ABSOLUTE_REQUIRE: SVG_ICON_ABSOLUTE_REQUIRE,
  RENAME_FILTER_DEFAULT: RENAME_FILTER_DEFAULT,
  RENAME_FILTER_MUI: RENAME_FILTER_MUI
}
