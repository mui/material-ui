import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import temp from 'temp';
import { RENAME_FILTER_MUI, RENAME_FILTER_DEFAULT, main, getComponentName } from './builder';

const DISABLE_LOG = true;

// To cut down on test time, use fixtures instead of node_modules
// const MUI_ICONS_ROOT = path.join(__dirname, '../node_modules/material-design-icons/');
const MUI_ICONS_ROOT = path.join(__dirname, './fixtures/material-design-icons/');
const MUI_ICONS_SVG_DIR = path.join(MUI_ICONS_ROOT, 'svg');

const GAME_ICONS_ROOT = path.join(__dirname, './fixtures/game-icons/');
const GAME_ICONS_SVG_DIR = path.join(GAME_ICONS_ROOT, 'svg/icons/');

describe('builder', () => {
  before(() => {
    // Automatically track and cleanup files at exit
    temp.track();
  });

  describe('#getComponentName', () => {
    it('should change capitalize dashes', () => {
      expect(getComponentName('hi-world')).to.equal('HiWorld');
    });

    it('should capitalize based on environment path.sep', () => {
      expect(getComponentName(`this${path.sep}dir`)).to.equal('ThisDir');
    });
  });

  it('should have icons to test with', () => {
    expect(fs.lstatSync(MUI_ICONS_SVG_DIR).isDirectory()).to.equal(true);
  });

  it('should have main', () => {
    expect(typeof main).to.equal('function');
  });

  describe('--output-dir', () => {
    const options = {
      svgDir: MUI_ICONS_SVG_DIR,
      innerPath: '/svg/production/',
      glob: '/**/production/*_24px.svg',
      renameFilter: RENAME_FILTER_MUI,
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
      await main(options);
      expect(fs.lstatSync(options.outputDir).isDirectory()).to.equal(true);
      expect(fs.lstatSync(path.join(options.outputDir, 'index.js')).isFile()).to.equal(true);
    });
  });

  describe('--svg-dir, --innerPath, --fileSuffix', () => {
    const options = {
      svgDir: GAME_ICONS_SVG_DIR,
      glob: '**/*.svg',
      innerPath: '/dice/svg/000000/transparent/',
      renameFilter: RENAME_FILTER_DEFAULT,
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
      await main(options);
      expect(fs.lstatSync(options.outputDir).isDirectory()).to.equal(true);
      expect(fs.lstatSync(path.join(options.outputDir, 'delapouite')).isDirectory()).to.equal(true);

      const actualFilePath = path.join(
        options.outputDir,
        'delapouite',
        'dice',
        'svg',
        '000000',
        'transparent',
        'Dice-six-faces-four.js',
      );
      expect(fs.existsSync(actualFilePath)).to.equal(true);

      const actualFileData = fs.readFileSync(actualFilePath, { encoding: 'utf8' });
      expect(actualFileData).to.include("import createSvgIcon from './utils/createSvgIcon'");
    });
  });

  describe('Template rendering', () => {
    const options = {
      svgDir: MUI_ICONS_SVG_DIR,
      innerPath: '/svg/',
      glob: '/*_24px.svg',
      renameFilter: RENAME_FILTER_MUI,
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
      await main(options);
      expect(fs.lstatSync(options.outputDir).isDirectory()).to.equal(true);

      const cases = [
        'Accessibility.js',
        'StarRounded.js',
        'QueueMusicOutlined.js',
        'AccessAlarms.js',
      ];

      cases.forEach((name) => {
        const actual = fs.readFileSync(path.join(options.outputDir, name), { encoding: 'utf8' });
        // Update the snapshots
        // fs.writeFileSync(path.join(MUI_ICONS_ROOT, 'expected', name), actual, { encoding: 'utf8' });

        const expected = fs.readFileSync(path.join(MUI_ICONS_ROOT, 'expected', name), {
          encoding: 'utf8',
        });

        expect(actual).to.include(expected);
      });
    });
  });
});
