const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');

const temp = require('temp').track();
const _ = require('lodash');

const DISABLE_LOG = true;

// To cut down on test time, use fixtures instead of node_modules
// TODO: Make a flag to toggle this.
const MUI_ICONS_ROOT = path.join(__dirname, './fixtures/material-design-icons/');
// const MUI_ICONS_ROOT = path.join(__dirname, '../node_modules/material-design-icons/');
const MUI_ICONS_SVG_DIR = path.join(MUI_ICONS_ROOT, 'svg');
const GAME_ICONS_ROOT = path.join(__dirname, './fixtures/game-icons/');
const GAME_ICONS_SVG_DIR = path.join(GAME_ICONS_ROOT, 'svg/icons/');


const builder = require('../build');

describe('material-design-icons', function() {
  it('should have icons to test with', function() {
    assert.strictEqual(fs.lstatSync(MUI_ICONS_SVG_DIR).isDirectory(), true);
  });
});

describe('builder', function() {
  describe('#pascalCase', function() {
    it('should have pascalCase', function() {
      assert.strictEqual(builder.hasOwnProperty('pascalCase'), true);
    });

    it('should be a function', function() {
      assert.isFunction(builder.pascalCase);
    });

    it('should change capitalize dashes', function() {
      assert.strictEqual(builder.pascalCase("hi-world"), "HiWorld", true);
    });

    it('should capitalize based on environment path.sep', function() {
      assert.strictEqual(builder.pascalCase("this" + path.sep + "dir"), "ThisDir", true);
    });
  });

  describe('#main', function() {
    it('should have main', function() {
      assert.strictEqual(builder.hasOwnProperty('main'), true);
    });

    it('should be a function', function() {
      assert.isFunction(builder.main);
    });
  });

  describe('#getJsxString', function() {
    it('should have getJsxString', function() {
      assert.strictEqual(builder.hasOwnProperty('getJsxString'), true);
    });

    it('should be a function', function() {
      assert.strictEqual(typeof(builder.getJsxString) == "function", true);
    });
  });

  describe('#processFile', function() {
    it('should have processFile', function() {
      assert.strictEqual(builder.hasOwnProperty('processFile'), true);
    });

    it('should be a function', function() {
      assert.isFunction(builder.processFile);
    });
  });

  describe('#processIndex', function() {
    it('should have processIndex', function() {
      assert.strictEqual(builder.hasOwnProperty('processIndex'), true);
    });

    it('should be a function', function() {
      assert.isFunction(builder.processIndex);
    });
  });

});

describe('--output-dir', function() {
  const options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: "/svg/production/",
    glob: '/**/production/*_24px.svg',
    renameFilter: builder.RENAME_FILTER_MUI,
    disable_log: DISABLE_LOG
  };
  let tempPath;

  before(function() {
    tempPath = temp.mkdirSync();
    options.outputDir = tempPath;
  });

  after(function() {
    temp.cleanupSync();
  });

  it('script outputs to directory', function(done) {
    builder.main(options, function() {
      assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
      assert.strictEqual(fs.lstatSync(path.join(tempPath, 'index.js')).isFile(), true)
      done();
    });
  });
});


describe('--svg-dir, --innerPath, --fileSuffix', function() {
  const options = {
    svgDir: GAME_ICONS_SVG_DIR,
    glob: "**/*.svg",
    innerPath: "/dice/svg/000000/transparent/",
    muiRequire: 'absolute',
    renameFilter: builder.RENAME_FILTER_DEFAULT,
    disable_log: DISABLE_LOG,
  };
  let tempPath;

  before(function() {
    tempPath = temp.mkdirSync();
    options.outputDir = tempPath;
  });

  after(function() {
    temp.cleanupSync();
  });

  it('script outputs to directory', function(done) {
    builder.main(options, function() {
      assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
      assert.strictEqual(fs.lstatSync(path.join(tempPath, "delapouite")).isDirectory(), true);

      const outputFilePath = path.join(tempPath, 'delapouite', 'dice', 'svg', '000000', 'transparent', 'dice-six-faces-four.js');
      assert.strictEqual(fs.existsSync(outputFilePath), true);

      const outputFileData = fs.readFileSync(outputFilePath, {encoding: 'utf8'});
      assert.include(outputFileData, builder.SVG_ICON_ABSOLUTE_REQUIRE);
      done();
    });
  });
});

describe('--mui-require', function() {
  const options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: "/svg/production/",
    glob: '/**/production/*_24px.svg',
    disable_log: DISABLE_LOG,
    renameFilter: builder.RENAME_FILTER_MUI,
  };
  let tempPath, outputFilePath;

  before(function() {
    tempPath = temp.mkdirSync();
    outputFilePath = path.join(tempPath, 'Accessibility.js');
    options.outputDir = tempPath;
  });

  after(function() {
    temp.cleanupSync();
  });

  describe('absolute', function() {
    it('default should be absolute', function(done) {
      builder.main(options, function() {
        assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
        assert.strictEqual(fs.existsSync(outputFilePath), true);

        let outputFileData = fs.readFileSync(outputFilePath, {encoding: 'utf8'});
        assert.include(outputFileData, builder.SVG_ICON_ABSOLUTE_REQUIRE);
        done();
      });
    });

    it('should load SvgIcon as absolute', function(done) {
      const absoluteOptions = _.extend({}, options, { muiRequire: 'absolute' });
      builder.main(absoluteOptions, function() {
        assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
        assert.strictEqual(fs.existsSync(outputFilePath), true);

        let outputFileData = fs.readFileSync(outputFilePath, {encoding: 'utf8'});
        assert.include(outputFileData, builder.SVG_ICON_ABSOLUTE_REQUIRE);
        done();
      });
    });
  });

  describe('relative', function() {
    it('should load SvgIcon as relative', function(done) {
      const relativeOptions = _.extend({}, options, { muiRequire: 'relative' });
      builder.main(relativeOptions, function() {
        assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
        assert.strictEqual(fs.existsSync(outputFilePath), true);

        let outputFileData = fs.readFileSync(outputFilePath, {encoding: 'utf8'});
        assert.include(outputFileData, builder.SVG_ICON_RELATIVE_REQUIRE);
        done();
      });
    });
  });
});


describe('Template rendering', function() {
  const options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: "/svg/production/",
    glob: '/**/production/*_24px.svg',
    renameFilter: builder.RENAME_FILTER_MUI,
    muiRequire: 'absolute',
    disable_log: DISABLE_LOG,
  };
  let tempPath;

  before(function() {
    tempPath = temp.mkdirSync();
    options.outputDir = tempPath;

  });

  after(function() {
    temp.cleanupSync();
  });

  it('should produce the expected output', function(done) {
    builder.main(options, function() {
      let exampleFilePath = path.join(MUI_ICONS_ROOT, 'expected', 'Accessibility.js');
      let outputFilePath = path.join(tempPath, 'Accessibility.js');

      assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
      assert.strictEqual(fs.existsSync(exampleFilePath), true);
      assert.strictEqual(fs.existsSync(outputFilePath), true);

      const expected = fs.readFileSync(exampleFilePath, {
        encoding: 'utf8',
      });
      const result = fs.readFileSync(outputFilePath, {
        encoding: 'utf8',
      });
      assert.include(result, expected);
      done();
    });
  });
});
