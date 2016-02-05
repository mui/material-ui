var assert = require('chai').assert;
var fs = require('fs');
var path = require('path');

var temp = require('temp').track();
var _ = require('lodash');

const DISABLE_LOG = true;

// To cut down on test time, use fixtures instead of node_modules
// TODO: Make a flag to toggle this.
const MUI_ICONS_ROOT = path.join(__dirname, './fixtures/material-design-icons/');
// const MUI_ICONS_ROOT = path.join(__dirname, '../node_modules/material-design-icons/');
const MUI_ICONS_SVG_DIR = path.join(MUI_ICONS_ROOT, 'svg');
const GAME_ICONS_ROOT = path.join(__dirname, './fixtures/game-icons/');
const GAME_ICONS_SVG_DIR = path.join(GAME_ICONS_ROOT, 'svg/icons/');


var builder = require('../build');

describe('material-design-icons', function() {
  it('should have package installed in node_modules (we will use them to test)', function() {
    assert.ok(fs.lstatSync(MUI_ICONS_SVG_DIR).isDirectory());
  });
});

describe('builder', function() {
  describe('#pascalCase', function() {
    it('should have pascalCase', function() {
      assert.ok(builder.hasOwnProperty('pascalCase'));
    });

    it('should be a function', function() {
      assert.isFunction(builder.pascalCase);
    });

    it('should change capitalize dashes', function() {
      assert.ok(builder.pascalCase("hi-world"), "HiWorld");
    });

    it('should capitalize based on environment path.sep', function() {
      assert.ok(builder.pascalCase("this" + path.sep + "dir"), "ThisDir");
    });
  });

  describe('#main', function() {
    it('should have main', function() {
      assert.ok(builder.hasOwnProperty('main'));
    });

    it('should be a function', function() {
      assert.isFunction(builder.main);
    });
  });

  describe('#getJsxString', function() {
    it('should have getJsxString', function() {
      assert.ok(builder.hasOwnProperty('getJsxString'));
    });

    it('should be a function', function() {
      assert.ok(typeof(builder.getJsxString) == "function");
    });
  });

  describe('#processFile', function() {
    it('should have processFile', function() {
      assert.ok(builder.hasOwnProperty('processFile'));
    });

    it('should be a function', function() {
      assert.isFunction(builder.processFile);
    });
  });

});

describe('--output-dir', function() {
  var options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: "/svg/production/",
    glob: '/**/production/*_24px.svg',
    renameFilter: builder.RENAME_FILTER_MUI,
    disable_log: DISABLE_LOG
  }, tempPath;

  before(function() {
    tempPath = temp.mkdirSync();
    options.outputDir = tempPath;
  });

  after(function() {
    temp.cleanupSync();
  });

  it('script outputs to directory', function(done) {
    builder.main(options, function() {
      assert.ok(fs.lstatSync(tempPath).isDirectory());
      assert.ok(fs.lstatSync(path.join(tempPath, "action")).isDirectory());
      done();
    });
  });

});


describe('--svg-dir, --innerPath, --fileSuffix', function() {
  var options = {
    svgDir: GAME_ICONS_SVG_DIR,
    glob: "**/*.svg",
    innerPath: "/dice/svg/000000/transparent/",
    muiRequire: 'absolute',
    renameFilter: builder.RENAME_FILTER_DEFAULT,
    disable_log: DISABLE_LOG,
  }, tempPath, jsxExampleOutputPath;

  before(function() {
    tempPath = temp.mkdirSync();
    options.outputDir = tempPath;
  });

  after(function() {
    temp.cleanupSync();
  });

  it('script outputs to directory', function(done) {
    builder.main(options, function() {
      assert.ok(fs.lstatSync(tempPath).isDirectory());
      assert.ok(fs.lstatSync(path.join(tempPath, "delapouite")).isDirectory());
      jsxExampleOutputPath = path.join(tempPath, 'delapouite', 'dice', 'svg', '000000', 'transparent', 'dice-six-faces-four.jsx');
      assert.ok(fs.existsSync(jsxExampleOutputPath));
      data = fs.readFileSync(jsxExampleOutputPath, {encoding: 'utf8'});
      assert.include(data, builder.SVG_ICON_ABSOLUTE_REQUIRE);
      done();
    });
  });
});

describe('--mui-require', function() {
  var options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: "/svg/production/",
    glob: '/**/production/*_24px.svg',
    disable_log: DISABLE_LOG,
    renameFilter: builder.RENAME_FILTER_MUI,
  }, tempPath, jsxExampleOutputPath;

  before(function() {
    tempPath = temp.mkdirSync();
    jsxExampleOutputPath = path.join(tempPath, 'action', 'accessibility.jsx');
    options.outputDir = tempPath;
  });

  after(function() {
    temp.cleanupSync();
  });

  describe('absolute', function() {
    it('default should be absolute', function(done) {
      var data;
      builder.main(options, function() {
        assert.ok(fs.lstatSync(tempPath).isDirectory());
        assert.ok(fs.existsSync(jsxExampleOutputPath));
        data = fs.readFileSync(jsxExampleOutputPath, {encoding: 'utf8'});
        assert.include(data, builder.SVG_ICON_ABSOLUTE_REQUIRE);
        done();
      });
    });

    it('should load SvgIcon as absolute', function(done) {
      var data;
      var absoluteOptions = _.extend({}, options, { muiRequire: 'absolute' });
      builder.main(absoluteOptions, function() {
        assert.ok(fs.lstatSync(tempPath).isDirectory());
        assert.ok(fs.existsSync(jsxExampleOutputPath));
        data = fs.readFileSync(jsxExampleOutputPath, {encoding: 'utf8'});
        assert.include(data, builder.SVG_ICON_ABSOLUTE_REQUIRE);
        done();
      });
    });
  });

  describe('relative', function() {
    it('should load SvgIcon as relative', function(done) {
      var data;
      var relativeOptions = _.extend({}, options, { muiRequire: 'relative' });
      builder.main(relativeOptions, function() {
        assert.ok(fs.lstatSync(tempPath).isDirectory());
        assert.ok(fs.lstatSync(path.join(tempPath, "action")).isDirectory());
        assert.ok(fs.existsSync(jsxExampleOutputPath));
        data = fs.readFileSync(jsxExampleOutputPath, {encoding: 'utf8'});
        assert.include(data, builder.SVG_ICON_RELATIVE_REQUIRE);
        done();
      });
    });
  });
})

describe('Template rendering', function() {
  var options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: "/svg/production/",
    glob: '/**/production/*_24px.svg',
    renameFilter: builder.RENAME_FILTER_MUI,
    muiRequire: 'relative',
    disable_log: DISABLE_LOG
  }, tempPath;

  before(function() {
    tempPath = temp.mkdirSync();
    options.outputDir = tempPath;
  });

  after(function() {
    temp.cleanupSync();
  });

  it('should produce the expected output', function(done) {
    builder.main(options, function() {
      var result, expected, exampleFilePath, resultFilePath;
      resultFilePath = path.join(tempPath, 'action', 'accessibility.jsx');
      exampleFilePath = path.join(MUI_ICONS_ROOT, 'jsx/action/accessibility.jsx');

      assert.ok(fs.lstatSync(tempPath).isDirectory());
      assert.ok(fs.lstatSync(path.join(tempPath, "action")).isDirectory());

      expected = fs.readFileSync(exampleFilePath, {encoding: 'utf8'});
      result = fs.readFileSync(resultFilePath, {encoding: 'utf8'});
      assert.include(result, expected);
      done();
    });
  });
});
