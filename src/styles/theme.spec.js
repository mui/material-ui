// @flow weak

import { assert } from 'chai';
import createMuiTheme from './theme';
import createPalette, { dark, light } from './palette';
import { indigo, pink, deepOrange, green, fullBlack } from './colors';

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
    });

    it('should throw an exception when a non-palette primary color is specified', () => {
      assert.throws(() => createPalette({ primary: fullBlack }));
    });

    it('should throw an exception when a non-palette accent color is specified', () => {
      assert.throws(() => createPalette({ accent: fullBlack }));
    });

    it('should throw an exception when a non-palette error color is specified', () => {
      assert.throws(() => createPalette({ error: fullBlack }));
    });
  });
});
