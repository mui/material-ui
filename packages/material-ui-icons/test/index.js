/* eslint-disable flowtype/require-valid-file-annotation */

import { assert } from 'chai';
import fs from 'fs';
import path from 'path';
import temp from 'temp';
import _ from 'lodash';
import builder from '../builder';

// Automatically track and cleanup files at exit
temp.track();

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

describe('builder', () => {
  describe('#pascalCase', () => {
    it('should have pascalCase', () => {
      assert.strictEqual(builder.hasOwnProperty('pascalCase'), true);
    });

    it('should be a function', () => {
      assert.isFunction(builder.pascalCase);
    });

    it('should change capitalize dashes', () => {
      assert.strictEqual(builder.pascalCase('hi-world'), 'HiWorld', true);
    });

    it('should capitalize based on environment path.sep', () => {
      assert.strictEqual(builder.pascalCase(`this${path.sep}dir`), 'ThisDir', true);
    });
  });

  describe('#main', () => {
    it('should have main', () => {
      assert.strictEqual(builder.hasOwnProperty('main'), true);
    });

    it('should be a function', () => {
      assert.isFunction(builder.main);
    });
  });

  describe('#getJsxString', () => {
    it('should have getJsxString', () => {
      assert.strictEqual(builder.hasOwnProperty('getJsxString'), true);
    });

    it('should be a function', () => {
      assert.strictEqual(typeof builder.getJsxString === 'function', true);
    });
  });

  describe('#processFile', () => {
    it('should have processFile', () => {
      assert.strictEqual(builder.hasOwnProperty('processFile'), true);
    });

    it('should be a function', () => {
      assert.isFunction(builder.processFile);
    });
  });

  describe('#processIndex', () => {
    it('should have processIndex', () => {
      assert.strictEqual(builder.hasOwnProperty('processIndex'), true);
    });

    it('should be a function', () => {
      assert.isFunction(builder.processIndex);
    });
  });
});

describe('--output-dir', () => {
  const options = {
    svgDir: MUI_ICONS_SVG_DIR,
    innerPath: '/svg/production/',
    glob: '/**/production/*_24px.svg',
    renameFilter: builder.RENAME_FILTER_MUI,
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
    builder.main(options, () => {
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
    renameFilter: builder.RENAME_FILTER_DEFAULT,
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
    builder.main(options, () => {
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
      assert.include(actualFileData, builder.SVG_ICON_ABSOLUTE_REQUIRE);
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
    renameFilter: builder.RENAME_FILTER_MUI,
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
      builder.main(options, () => {
        assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
        assert.strictEqual(fs.existsSync(actualFilePath), true);

        const actualFileData = fs.readFileSync(actualFilePath, {
          encoding: 'utf8',
        });
        assert.include(actualFileData, builder.SVG_ICON_ABSOLUTE_REQUIRE);
        done();
      });
    });

    it('should load SvgIcon as absolute', done => {
      const absoluteOptions = _.extend({}, options, { muiRequire: 'absolute' });
      builder.main(absoluteOptions, () => {
        assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
        assert.strictEqual(fs.existsSync(actualFilePath), true);

        const actualFileData = fs.readFileSync(actualFilePath, {
          encoding: 'utf8',
        });
        assert.include(actualFileData, builder.SVG_ICON_ABSOLUTE_REQUIRE);
        done();
      });
    });
  });

  describe('relative', () => {
    it('should load SvgIcon as relative', done => {
      const relativeOptions = _.extend({}, options, { muiRequire: 'relative' });
      builder.main(relativeOptions, () => {
        assert.strictEqual(fs.lstatSync(tempPath).isDirectory(), true);
        assert.strictEqual(fs.existsSync(actualFilePath), true);

        const actualFileData = fs.readFileSync(actualFilePath, {
          encoding: 'utf8',
        });
        assert.include(actualFileData, builder.SVG_ICON_RELATIVE_REQUIRE);
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
    renameFilter: builder.RENAME_FILTER_MUI,
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
    builder.main(options, () => {
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
