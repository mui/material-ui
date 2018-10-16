import { assert } from 'chai';
import fs from 'fs';
import path from 'path';
import temp from 'temp';
import builder from './builder';

// Automatically track and cleanup files at exit
temp.track();

const DISABLE_LOG = true;

// To cut down on test time, use fixtures instead of node_modules
// const MUI_ICONS_ROOT = path.join(__dirname, '../node_modules/material-design-icons/');
const MUI_ICONS_ROOT = path.join(__dirname, './fixtures/material-design-icons/');
const MUI_ICONS_SVG_DIR = path.join(MUI_ICONS_ROOT, 'svg');

const GAME_ICONS_ROOT = path.join(__dirname, './fixtures/game-icons/');
const GAME_ICONS_SVG_DIR = path.join(GAME_ICONS_ROOT, 'svg/icons/');

describe('builder', () => {
  describe('#getComponentName', () => {
    it('should be a function', () => {
      assert.strictEqual(builder.hasOwnProperty('getComponentName'), true);
      assert.isFunction(builder.getComponentName);
    });

    it('should change capitalize dashes', () => {
      assert.strictEqual(builder.getComponentName('hi-world'), 'HiWorld', true);
    });

    it('should capitalize based on environment path.sep', () => {
      assert.strictEqual(builder.getComponentName(`this${path.sep}dir`), 'ThisDir', true);
    });
  });

  it('should have icons to test with', () => {
    assert.strictEqual(fs.lstatSync(MUI_ICONS_SVG_DIR).isDirectory(), true);
  });

  it('should have main', () => {
    assert.strictEqual(builder.hasOwnProperty('main'), true);
    assert.isFunction(builder.main);
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

    before(() => {
      options.outputDir = temp.mkdirSync();
    });

    after(() => {
      temp.cleanupSync();
    });

    it('script outputs to directory', async () => {
      await builder.main(options);
      assert.strictEqual(fs.lstatSync(options.outputDir).isDirectory(), true);
      assert.strictEqual(fs.lstatSync(path.join(options.outputDir, 'index.js')).isFile(), true);
    });
  });

  describe('--svg-dir, --innerPath, --fileSuffix', () => {
    const options = {
      svgDir: GAME_ICONS_SVG_DIR,
      glob: '**/*.svg',
      innerPath: '/dice/svg/000000/transparent/',
      renameFilter: builder.RENAME_FILTER_DEFAULT,
      disableLog: DISABLE_LOG,
      outputDir: null,
    };

    before(() => {
      options.outputDir = temp.mkdirSync();
    });

    after(() => {
      temp.cleanupSync();
    });

    it('script outputs to directory', async () => {
      await builder.main(options);
      assert.strictEqual(fs.lstatSync(options.outputDir).isDirectory(), true);
      assert.strictEqual(
        fs.lstatSync(path.join(options.outputDir, 'delapouite')).isDirectory(),
        true,
      );

      const actualFilePath = path.join(
        options.outputDir,
        'delapouite',
        'dice',
        'svg',
        '000000',
        'transparent',
        'Dice-six-faces-four.js',
      );
      assert.strictEqual(fs.existsSync(actualFilePath), true);

      const actualFileData = fs.readFileSync(actualFilePath, { encoding: 'utf8' });
      assert.include(actualFileData, "import createSvgIcon from './utils/createSvgIcon'");
    });
  });

  describe('Template rendering', () => {
    const options = {
      svgDir: MUI_ICONS_SVG_DIR,
      innerPath: '/svg/production/',
      glob: '/**/production/*_24px.svg',
      renameFilter: builder.RENAME_FILTER_MUI,
      disableLog: DISABLE_LOG,
      outputDir: null,
    };

    before(() => {
      options.outputDir = temp.mkdirSync();
    });

    after(() => {
      temp.cleanupSync();
    });

    it('should produce the expected output', async () => {
      await builder.main(options);
      const expectedFilePath = path.join(MUI_ICONS_ROOT, 'expected', 'Accessibility.js');
      const actualFilePath = path.join(options.outputDir, 'Accessibility.js');

      assert.strictEqual(fs.lstatSync(options.outputDir).isDirectory(), true);
      assert.strictEqual(fs.existsSync(expectedFilePath), true);
      assert.strictEqual(fs.existsSync(actualFilePath), true);

      const expected = fs.readFileSync(expectedFilePath, { encoding: 'utf8' });
      const actual = fs.readFileSync(actualFilePath, { encoding: 'utf8' });

      assert.include(actual, expected);
    });
  });
});
