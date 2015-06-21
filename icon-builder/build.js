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

    var newIconFolderPath = jsxFolder + '/' + folderName;
    var svgIconFolderPath = iconRootPath + '/' + folderName + '/svg/production';

    var files = fs.readdirSync(svgIconFolderPath);

    rimraf(newIconFolderPath, function() {
      console.log('\n ' + folderName);
      fs.mkdirSync(newIconFolderPath);

      files.forEach(function(fileName) {
        processFile(folderName, fileName, newIconFolderPath, svgIconFolderPath);
      });
    });

  } catch (err) {
    return;
  }
}

function processFile(folderName, fileName, folderPath, svgFolderPath) {
  //Only process 24px files
  var svgFilePath = svgFolderPath + '/' + fileName;
  var suffix = '_24px.svg';
  var newFilename;
  var newFile;

  if (fileName.indexOf(suffix, fileName.length - suffix.length) !== -1) {
    newFilename = fileName.replace(suffix, '.jsx');
    newFilename = newFilename.slice(3);
    newFilename = newFilename.replace(/_/g, '-');
    if (newFilename.indexOf('3d') === 0) {
      newFilename = 'three-d' + newFilename.slice(2);
    }
    newFile = folderPath + '/' + newFilename;

    //console.log('writing ' + newFile);
    getJsxString(folderName, newFilename, svgFilePath, function(fileString) {
      fs.writeFileSync(newFile, fileString);
    });
  }
}

function getJsxString(folderName, newFilename, svgFilePath, callback) {
  var className = newFilename.replace('.jsx', '');
  className = folderName + '-' + className;
  className = pascalCase(className);
  
  console.log('  ' + className);

  //var parser = new xml2js.Parser();
  fs.readFile(svgFilePath, {encoding: 'utf8'}, function(err, data) {

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