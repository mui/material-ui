// @flow weak

import { assert } from 'chai';
import createMuiTheme from './theme';
import createPalette, { dark, light } from './palette';
import { indigo, pink, deepOrange, green, common } from '../colors';
import consoleErrorMock from '../../test/utils/consoleErrorMock';

describe('styles/theme', () => {
  describe('createMuiTheme()', () => {
    it('should be a function', () => {
      assert.strictEqual(typeof createMuiTheme, 'function', 'should be a function');
    });
  });

  describe('muiTheme', () => {
    const muiTheme = createMuiTheme();

    it('should have a palette', () => {
      assert.ok(muiTheme.palette, 'should have a palette');
    });
  });

  describe('custom muiTheme', () => {
    const muiTheme = createMuiTheme({
      palette: createPalette({ primary: deepOrange, accent: green }),
    });

    it('should have the custom palette', () => {
      assert.strictEqual(muiTheme.palette.primary, deepOrange, 'should have a palette');
    });
  });

  describe('createPalette()', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should create a material design palette according to spec', () => {
      const palette = createPalette();
      assert.strictEqual(palette.primary, indigo, 'should use indigo as the default primary color');
      assert.strictEqual(palette.accent, pink, 'should use pink as the default accent color');
      assert.strictEqual(
        palette.text,
        light.text,
        'should use light theme text for a light theme by default',
      );
    });

    it('should create a palette with custom colours', () => {
      const palette = createPalette({ primary: deepOrange, accent: green });
      assert.strictEqual(palette.primary, deepOrange, 'should use deepOrange as the primary color');
      assert.strictEqual(palette.accent, green, 'should use green as the accent color');
      assert.strictEqual(palette.text, light.text, 'should use light theme text');
    });

    it('should create a dark palette', () => {
      const palette = createPalette({ type: 'dark' });
      assert.strictEqual(palette.primary, indigo, 'should use indigo as the default primary color');
      assert.strictEqual(palette.accent, pink, 'should use pink as the default accent color');
      assert.strictEqual(palette.text, dark.text, 'should use dark theme text');
      assert.strictEqual(consoleErrorMock.callCount(), 0);
    });

    it('should throw an exception when a non-palette primary color is specified', () => {
      createPalette({ primary: null });
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.match(
        consoleErrorMock.args()[0][0],
        /Material-UI: primary color is missing the following hues: 50,100,200,300,400/,
      );
    });

    it('should throw an exception when a non-palette accent color is specified', () => {
      createPalette({ accent: common.fullBlack });
      assert.strictEqual(consoleErrorMock.callCount(), 2);
      assert.match(
        consoleErrorMock.args()[1][0],
        /Material-UI: accent color is missing the following hues: 50,100,200,300,400/,
      );
    });

    it('should throw an exception when a non-palette error color is specified', () => {
      createPalette({ error: common.fullBlack });
      assert.strictEqual(consoleErrorMock.callCount(), 3);
      assert.match(
        consoleErrorMock.args()[2][0],
        /Material-UI: error color is missing the following hues: 50,100,200,300,400/,
      );
    });
  });
});
