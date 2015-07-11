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

const SVG_ICON_RELATIVE_REQUIRE = "require('../../svg-icon')"
  , SVG_ICON_ABSOLUTE_REQUIRE = "require('material-ui/lib/svg-icon')"
  , RENAME_FILTER_DEFAULT = './filters/rename/default'
  , RENAME_FILTER_MUI = './filters/rename/material-design-icons';

function parseArgs() {
  return require('yargs')
      .usage('Build JSX components from SVG\'s.\nUsage: $0')
      .demand('output-dir')
      .describe('output-dir', 'Directory to output jsx components')
      .demand('svg-dir')
      .describe('svg-dir', 'SVG directory')
      .describe('inner-path', '"Reach into" subdirs, since libraries like material-design-icons' +
        ' use arbitrary build directories to organize icons' +
        ' e.g. "action/svg/production/icon_3d_rotation_24px.svg"')
      .describe('file-suffix', 'Filter only files ending with a suffix (pretty much only' +
       ' for material-ui-icons)')
      .options('rename-filter', {
        default: RENAME_FILTER_DEFAULT 
      })
      .options('mui-require', {
        demand: false,
        default: 'absolute',
        describe: 'Load material-ui dependencies (SvgIcon) relatively or absolutely. (absolute|relative). For material-ui distributions, relative, for anything else, you probably want absolute.',
        type: 'string'
      })
      .describe('mui-icons-opts', 'Shortcut to use MUI icons options')
      .boolean('mui-icons-opts')
      .argv;
}

function main(options, cb) {
  var originalWrite;  // todo, add wiston / other logging tool
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

  dirs.forEach(function(dirName) {
    processDir(dirName, options.svgDir, options.outputDir, options.innerPath, options.fileSuffix,  renameFilter, options.muiRequire) 
  });

  if (cb) {
    cb();
  }

  if (options.disable_log) { // bring back stdout 
    process.stdout.write = originalWrite;
  }
}

function processDir(dirName, svgDir, outputDir, innerPath, fileSuffix, renameFilter, muiRequire) {
  var newIconDirPath = path.join(outputDir, dirName);
  var svgIconDirPath = path.join(svgDir, dirName, innerPath);
  if (!fs.existsSync(svgIconDirPath)) { return false; }
  if (!fs.lstatSync(svgIconDirPath).isDirectory()) { return false; }
  var files = fs.readdirSync(svgIconDirPath);

  rimraf.sync(newIconDirPath);
  console.log('\n ' + dirName);
  fs.mkdirSync(newIconDirPath);

  files.forEach(function(fileName) {
    processFile(dirName, fileName, newIconDirPath, svgIconDirPath, fileSuffix, renameFilter, muiRequire);
  });
}

function processFile(dirName, fileName, dirPath, svgDirPath, fileSuffix, renameFilter, muiRequire) {
  var fullPath;
  var svgFilePath = svgDirPath + '/' + fileName;

  fileName = renameFilter(fileName, fileSuffix);
  if (!fileName) return;  // filter can return a falsey to skip
  fullPath = path.join(dirPath, fileName);

  //console.log('writing ' + newFile);
  var fileString = getJsxString(dirName, fileName, svgFilePath, muiRequire);
  fs.writeFileSync(fullPath, fileString);
}

function getJsxString(dirName, newFilename, svgFilePath, muiRequire, fileString) {
  var className = newFilename.replace('.jsx', '');
  className = dirName + '-' + className;
  className = pascalCase(className);
  
  console.log('  ' + className);

  //var parser = new xml2js.Parser();

  var data = fs.readFileSync(svgFilePath, {encoding: 'utf8'});
  var template = fs.readFileSync(path.join(__dirname, "tpl/SvgIcon.js"), {encoding: 'utf8'});
  //Extract the paths from the svg string
  var paths = data.slice(data.indexOf('>') + 1);
  paths = paths.slice(0, -6);
  //clean xml paths
  paths = paths.replace('xlink:href="#a"', '');
  paths = paths.replace('xlink:href="#c"', '');

  // Node acts wierd if we put this directly into string concatenation

  var muiRequireStmt = muiRequire === "relative" ? SVG_ICON_RELATIVE_REQUIRE : SVG_ICON_ABSOLUTE_REQUIRE;

  return Mustache.render(
    template, {
      muiRequireStmt: muiRequireStmt,
      paths: paths,
      className: className
    }
  );

}

function pascalCase(str) {
  str = str[0].toUpperCase() + str.slice(1);
  return str.replace(/-(.)/g, function(match, group1) {
    return group1.toUpperCase();
  });
}

if (require.main === module) {
  var argv = parseArgs();
  main(argv);
}

module.exports = {
  pascalCase: pascalCase, 
  getJsxString: getJsxString,
  processDir: processDir,
  processFile: processFile,
  main: main,
  SVG_ICON_RELATIVE_REQUIRE: SVG_ICON_RELATIVE_REQUIRE,
  SVG_ICON_ABSOLUTE_REQUIRE: SVG_ICON_ABSOLUTE_REQUIRE,
  RENAME_FILTER_DEFAULT: RENAME_FILTER_DEFAULT,
  RENAME_FILTER_MUI: RENAME_FILTER_MUI
}
