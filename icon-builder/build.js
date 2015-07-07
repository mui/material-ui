#! /usr/bin/env node
/**
 * Material UI Icon Builder
 * ========================
 * 
 * Flags
 *
 * -h, --help   Print this help dialog.
 * --mui-icon-opts    Shortcut to build material-ui-icons
 *
 * Environmental Settings: 
 *
 * OUTPUT_DIR - directory to output jsx components
 * SVG_DIR - SVG directory
 * INNER_PATH - "Reach into" subdirs, since libraries like material-design-icons
 *   use arbitrary build directories to organize icons
 *   e.g. "action/svg/production/icon_3d_rotation_24px.svg"
 * FILE_SUFFIX - Filter only files ending with a suffix (pretty much only
 *   for material-ui-icons)
 * 
 * Usage:
 *
 * node ./build.js --help
 *
 * node ./build.js --mui-icon-opts
 *
 * SVG_DIR=./node_modules/material-design-icons/ OUTPUT_DIR=./jsx INNER_PATH=/svg/production ./build.js 
 *
 */
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var options = {};

var MUI_ICONS_OPTS = {
  outputDir: __dirname + '/jsx',
  svgDir: __dirname + '/node_modules/material-design-icons',
  iconInnerPath: '/svg/production',
  fileSuffix: '_24px.svg'
}

var DEFAULT_OPTS = {
  outputDir: process.env.OUTPUT_DIR,
  svgDir: process.env.SVG_DIR,
  iconInnerPath: process.env.INNER_PATH,
  fileSuffix: process.env.FILE_SUFFIX
}


function print_help() {
  var fs = require('fs'),
      readline = require('readline');

  var rd = readline.createInterface({
      input: fs.createReadStream(__filename),
      output: process.stdout,
      terminal: false
  });

  rd.on('line', function(line) {
    if (line.indexOf("*/") !== -1) {
      process.exit()
    }
    var COMMENT_REGEX = /^ ?(\/\*|\w\*|\*|\#\!.*)*/

    var l = line.replace(COMMENT_REGEX, "")
    if (l.length > 0) console.log(l);
  });
}

if (process.argv.indexOf('--help') !== -1 || process.argv.indexOf('-h') !== -1) {
  print_help();
} else {
  if (process.argv.indexOf('--mui-icon-opts') !== -1) {
    run(MUI_ICONS_OPTS);
  } else {
    run(DEFAULT_OPTS);
  }
}

function run(options) {
  console.log('** Starting Build');

  //Clean old files
  rimraf(options.outputDir, function() {
    //Process each folder
    var dirs = fs.readdirSync(options.svgDir);
    fs.mkdirSync(options.outputDir);
    dirs.forEach(function(dirName) {
      processDir(dirName, options.svgDir, options.outputDir, options.iconInnerPath, options.fileSuffix) 
    });
  });
}

function processDir(dirName, svgDir, outputDir, iconInnerPath, fileSuffix) {
  var newIconDirPath = path.join(outputDir, dirName);
  var svgIconDirPath = path.join(svgDir, dirName, iconInnerPath);
  if (!fs.existsSync(svgIconDirPath)) { return false; }
  if (!fs.lstatSync(svgIconDirPath).isDirectory()) { return false; }
  try {
    var files = fs.readdirSync(svgIconDirPath);

    rimraf(newIconDirPath, function() {
      console.log('\n ' + dirName);
      fs.mkdirSync(newIconDirPath);

      files.forEach(function(fileName) {
        processFile(dirName, fileName, newIconDirPath, svgIconDirPath, fileSuffix);
      });
    });

  } catch (err) {
    throw (err);
  }
}

function processFile(dirName, fileName, dirPath, svgDirPath, fileSuffix) {
  //Only process 24px files
  var svgFilePath = svgDirPath + '/' + fileName;
  var newFile;
  if (fileSuffix) {
    if (fileName.indexOf(fileSuffix, fileName.length - fileSuffix.length) !== -1) {
      fileName = fileName.replace(fileSuffix, '.jsx');
      fileName = fileName.slice(3);
      fileName = fileName.replace(/_/g, '-');
      if (fileName.indexOf('3d') === 0) {
        fileName = 'three-d' + fileName.slice(2);
      }
    } else {
      return;
    }
  }
  newFile = path.join(dirPath, fileName);

  //console.log('writing ' + newFile);
  getJsxString(dirName, fileName, svgFilePath, function(fileString) {
    fs.writeFileSync(newFile, fileString);
  });
}

function getJsxString(dirName, newFilename, svgFilePath, callback) {
  var className = newFilename.replace('.jsx', '');
  className = dirName + '-' + className;
  className = pascalCase(className);
  
  console.log('  ' + className);

  //var parser = new xml2js.Parser();

  fs.readFile(svgFilePath, {encoding: 'utf8'}, function(err, data) {
    if (err) {
      throw err;
    }
    //Extract the paths from the svg string
    var paths = data.slice(data.indexOf('>') + 1);
    paths = paths.slice(0, -6);
    //clean xml paths
    paths = paths.replace('xlink:href="#a"', '');
    paths = paths.replace('xlink:href="#c"', '');

    callback(
      "let React = require('react');\n" +
      "let SvgIcon = require('../../svg-icon');\n\n" +

      "let " + className + " = React.createClass({\n\n" +

      "  render() {\n" +
      "    return (\n" +
      "      <SvgIcon {...this.props}>\n" +
      "        " + paths + "\n" +
      "      </SvgIcon>\n" +
      "    );\n" +
      "  }\n\n" +

      "});\n\n" +

      "module.exports = " + className + ";"
    );

  });
}

function pascalCase(str) {
  str = str[0].toUpperCase() + str.slice(1);
  return str.replace(/-(.)/g, function(match, group1) {
    return group1.toUpperCase();
  });
}
