/* eslint-disable flowtype/require-valid-file-annotation */
const assert = require('chai').assert;
const fs = require('fs');
const path = require('path');
const temp = require('temp').track();
const _ = require('lodash');
const build = require('../build');

const DISABLE_LOG = true;

// To cut down on test time, use fixtures instead of node_modules
// TODO: Make a flag to toggle this.
const MUI_ICONS_ROOT = path.join(__dirname, './fixtures/material-design-icons/');
// const MUI_ICONS_ROOT = path.join(__dirname, '../node_modules/material-design-icons/');
const MUI_ICONS_SVG_DIR = path.join(MUI_ICONS_ROOT, 'svg');
const GAME_ICONS_ROOT = path.join(__dirname, './fixtures/game-icons/');
const GAME_ICONS_SVG_DIR = path.join(GAME_ICONS_ROOT, 'svg/icons/');

describe('material-design-icons', () => {
  it('should have icons to test with', () => {
    assert.strictEqual(fs.lstatSync(MUI_ICONS_SVG_DIR).isDirectory(), true);
  });
});

describe('build', () => {
  describe('#pascalCase', () => {
    it('should have pascalCase', () => {
      assert.strictEqual(build.hasOwnProperty('pascalCase'), true);
    });

    it('should be a function', () => {
      assert.isFunction(build.pascalCase);
    });

    it('should change capitalize dashes', () => {
      assert.strictEqual(build.pascalCase('hi-world'), 'HiWorld', true);
    });

    it('should capitalize based on environment path.sep', () => {
      assert.strictEqual(build.pascalCase(`this${path.sep}dir`), 'ThisDir', true);
    });
  });

  describe('#main', () => {
    it('should have main', () => {
      assert.strictEqual(build.hasOwnProperty('main'), true);
    });

    it('should be a function', () => {
      assert.isFunction(build.main);
    });
  });

  describe('#getJsxString', () => {
    it('should have getJsxString', () => {
      assert.strictEqual(build.hasOwnProperty('getJsxString'), true);
    });

    it('should be a function', () => {
      assert.strictEqual(typeof build.getJsxString === 'function', true);
    });
  });

  describe('#processFile', () => {
    it('should have processFile', () => {
      assert.strictEqual(build.hasOwnProperty('processFile'), true);
    });

    it('should be a function', () => {
      assert.isFunction(build.processFile);
    });
  });

  describe('#processIndex', () => {
    it('should have processIndex', () => {
      assert.strictEqual(build.hasOwnProperty('processIndex'), true);
    });

    it('should be a function', () => {
      assert.isFunction(build.processIndex);
    });
  });
});

describe('--output-dir', () => {
  const options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: '/svg/production/',
    glob: '/**/production/*_24px.svg',
    renameFilter: build.RENAME_FILTER_MUI,
    disableLog: DISABLE_LOG,
    outputDir: null,
  };
  let tempPath;

  before(() => {
    tempPath = temp.mkdirSync();
    options.outputDir = tempPath;
  });

  after(() => {
    temp.cleanupSync();
  });

  it('script outputs to directory', done => {
    build.main(options, () => {
      assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
      assert.strictEqual(fs.lstatSync(path.join(tempPath, 'index.js')).isFile(), true);
      done();
    });
  });
});

describe('--svg-dir, --innerPath, --fileSuffix', () => {
  const options = {
    svgDir: GAME_ICONS_SVG_DIR,
    glob: '**/*.svg',
    innerPath: '/dice/svg/000000/transparent/',
    muiRequire: 'absolute',
    renameFilter: build.RENAME_FILTER_DEFAULT,
    disableLog: DISABLE_LOG,
    outputDir: null,
  };
  let tempPath;

  before(() => {
    tempPath = temp.mkdirSync();
    options.outputDir = tempPath;
  });

  after(() => {
    temp.cleanupSync();
  });

  it('script outputs to directory', done => {
    build.main(options, () => {
      assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
      assert.strictEqual(fs.lstatSync(path.join(tempPath, 'delapouite')).isDirectory(), true);

      const actualFilePath = path.join(
        tempPath,
        'delapouite',
        'dice',
        'svg',
        '000000',
        'transparent',
        'dice-six-faces-four.js',
      );
      assert.strictEqual(fs.existsSync(actualFilePath), true);

      const actualFileData = fs.readFileSync(actualFilePath, {
        encoding: 'utf8',
      });
      assert.include(actualFileData, build.SVG_ICON_ABSOLUTE_REQUIRE);
      done();
    });
  });
});

describe('--mui-require', () => {
  const options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: '/svg/production/',
    glob: '/**/production/*_24px.svg',
    disableLog: DISABLE_LOG,
    renameFilter: build.RENAME_FILTER_MUI,
    outputDir: null,
  };
  let tempPath;
  let actualFilePath;

  before(() => {
    tempPath = temp.mkdirSync();
    actualFilePath = path.join(tempPath, 'Accessibility.js');
    options.outputDir = tempPath;
  });

  after(() => {
    temp.cleanupSync();
  });

  describe('absolute', () => {
    it('default should be absolute', done => {
      build.main(options, () => {
        assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
        assert.strictEqual(fs.existsSync(actualFilePath), true);

        const actualFileData = fs.readFileSync(actualFilePath, {
          encoding: 'utf8',
        });
        assert.include(actualFileData, build.SVG_ICON_ABSOLUTE_REQUIRE);
        done();
      });
    });

    it('should load SvgIcon as absolute', done => {
      const absoluteOptions = _.extend({}, options, { muiRequire: 'absolute' });
      build.main(absoluteOptions, () => {
        assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
        assert.strictEqual(fs.existsSync(actualFilePath), true);

        const actualFileData = fs.readFileSync(actualFilePath, {
          encoding: 'utf8',
        });
        assert.include(actualFileData, build.SVG_ICON_ABSOLUTE_REQUIRE);
        done();
      });
    });
  });

  describe('relative', () => {
    it('should load SvgIcon as relative', done => {
      const relativeOptions = _.extend({}, options, { muiRequire: 'relative' });
      build.main(relativeOptions, () => {
        assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
        assert.strictEqual(fs.existsSync(actualFilePath), true);

        const actualFileData = fs.readFileSync(actualFilePath, {
          encoding: 'utf8',
        });
        assert.include(actualFileData, build.SVG_ICON_RELATIVE_REQUIRE);
        done();
      });
    });
  });
});

describe('Template rendering', () => {
  const options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: '/svg/production/',
    glob: '/**/production/*_24px.svg',
    renameFilter: build.RENAME_FILTER_MUI,
    muiRequire: 'absolute',
    disableLog: DISABLE_LOG,
    outputDir: null,
  };
  let tempPath;

  before(() => {
    tempPath = temp.mkdirSync();
    options.outputDir = tempPath;
  });

  after(() => {
    temp.cleanupSync();
  });

  it('should produce the expected output', done => {
    build.main(options, () => {
      const expectedFilePath = path.join(MUI_ICONS_ROOT, 'expected', 'Accessibility.js');
      const actualFilePath = path.join(tempPath, 'Accessibility.js');

      assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
      assert.strictEqual(fs.existsSync(expectedFilePath), true);
      assert.strictEqual(fs.existsSync(actualFilePath), true);

      const expected = fs.readFileSync(expectedFilePath, {
        encoding: 'utf8',
      });
      const actual = fs.readFileSync(actualFilePath, {
        encoding: 'utf8',
      });

      assert.include(actual, expected);
      done();
    });
  });
});
