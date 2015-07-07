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
var argv = require('yargs')
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
    .options('mui-require', {
      demand: false,
      default: 'absolute',
      describe: 'Load material-ui dependencies (SvgIcon) relatively or absolutely. (absolute|relative). For material-ui distributions, relative, for anything else, you probably want absolute.',
      type: 'string'
    })
    .describe('mui-icons-opts', 'Shortcut to use MUI icons options')
    .boolean('mui-icons-opts')
    .argv;

//Clean old files
rimraf(argv.outputDir, function() {
  console.log('** Starting Build');
  //Process each folder
  var dirs = fs.readdirSync(argv.svgDir);
  fs.mkdirSync(argv.outputDir);
  dirs.forEach(function(dirName) {
    processDir(dirName, argv.svgDir, argv.outputDir, argv.innerPath, argv.fileSuffix, argv.muiRequire) 
  });
});

function processDir(dirName, svgDir, outputDir, innerPath, fileSuffix, muiRequire) {
  var newIconDirPath = path.join(outputDir, dirName);
  var svgIconDirPath = path.join(svgDir, dirName, innerPath);
  if (!fs.existsSync(svgIconDirPath)) { return false; }
  if (!fs.lstatSync(svgIconDirPath).isDirectory()) { return false; }
  try {
    var files = fs.readdirSync(svgIconDirPath);

    rimraf(newIconDirPath, function() {
      console.log('\n ' + dirName);
      fs.mkdirSync(newIconDirPath);

      files.forEach(function(fileName) {
        processFile(dirName, fileName, newIconDirPath, svgIconDirPath, fileSuffix, muiRequire);
      });
    });

  } catch (err) {
    throw (err);
  }
}

function processFile(dirName, fileName, dirPath, svgDirPath, fileSuffix, muiRequire) {
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
  getJsxString(dirName, fileName, svgFilePath, muiRequire, function(fileString) {
    fs.writeFileSync(newFile, fileString);
  });
}

function getJsxString(dirName, newFilename, svgFilePath, muiRequire, callback) {
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

    // Node acts wierd if we put this directly into string concatenation
    var muiRequireStmt = muiRequire === "relative" ? "let SvgIcon = require('../../svg-icon');\n\n" : "let SvgIcon = require('material-ui/lib/svg-icon');\n\n";

    callback(
      "let React = require('react');\n" +
      muiRequireStmt +

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
