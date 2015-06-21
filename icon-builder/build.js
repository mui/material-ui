var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

console.log('** Starting Build');

var jsxFolder = __dirname + '/jsx';
var iconRootPath = __dirname + '/node_modules/material-design-icons';
var folders = fs.readdirSync(iconRootPath);

//Clean old files
rimraf(jsxFolder, function() {
  //Process each folder
  fs.mkdirSync(jsxFolder);
  folders.forEach(processFolder);
});

function processFolder(folderName) {
  try {

    var newIconFolder = jsxFolder + '/' + folderName;
    var svgIconFolder = iconRootPath + '/' + folderName + '/svg/production';

    var files = fs.readdirSync(svgIconFolder);

    rimraf(newIconFolder, function() {
      console.log('\n ' + folderName);
      fs.mkdirSync(newIconFolder);

      files.forEach(function(file) {
        processFile(file, newIconFolder, svgIconFolder);
      });
    });

  } catch (err) {
    return;
  }
}

function processFile(file, folder, svgFolder) {
  //Only process 24px files
  var svgFile = svgFolder + '/' + file;
  var suffix = '_24px.svg';
  var newFilename;
  var newFile;

  if (file.indexOf(suffix, file.length - suffix.length) !== -1) {
    newFilename = file.replace(suffix, '.jsx');
    newFilename = newFilename.slice(3);
    newFilename = newFilename.replace(/_/g, '-');
    if (newFilename.indexOf('3d') === 0) {
      newFilename = 'three-d' + newFilename.slice(2);
    }
    newFile = folder + '/' + newFilename;

    //console.log('writing ' + newFile);
    getJsxString(newFilename, svgFile, function(fileString) {
      fs.writeFileSync(newFile, fileString);
    });
  }
}

function getJsxString(newFilename, svgFile, callback) {
  var className = newFilename.replace('.jsx', '');
  className = pascalCase(className);
  
  console.log('  ' + className);

  //var parser = new xml2js.Parser();
  fs.readFile(svgFile, {encoding: 'utf8'}, function(err, data) {

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

      "  render: function() {\n" +
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