import { assert } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import {
  recomposeColor,
  hexToRgb,
  rgbToHex,
  hslToRgb,
  darken,
  decomposeColor,
  emphasize,
  fade,
  getContrastRatio,
  getLuminance,
  lighten,
} from './colorManipulator';

describe('utils/colorManipulator', () => {
  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  describe('recomposeColor', () => {
    it('converts a decomposed rgb color object to a string` ', () => {
      assert.strictEqual(
        recomposeColor({
          type: 'rgb',
          values: [255, 255, 255],
        }),
        'rgb(255, 255, 255)',
      );
    });

    it('converts a decomposed rgba color object to a string` ', () => {
      assert.strictEqual(
        recomposeColor({
          type: 'rgba',
          values: [255, 255, 255, 0.5],
        }),
        'rgba(255, 255, 255, 0.5)',
      );
    });

    it('converts a decomposed hsl color object to a string` ', () => {
      assert.strictEqual(
        recomposeColor({
          type: 'hsl',
          values: [100, 50, 25],
        }),
        'hsl(100, 50%, 25%)',
      );
    });

    it('converts a decomposed hsla color object to a string` ', () => {
      assert.strictEqual(
        recomposeColor({
          type: 'hsla',
          values: [100, 50, 25, 0.5],
        }),
        'hsla(100, 50%, 25%, 0.5)',
      );
    });
  });

  describe('hexToRgb', () => {
    it('converts a short hex color to an rgb color` ', () => {
      assert.strictEqual(hexToRgb('#9f3'), 'rgb(153, 255, 51)');
    });

    it('converts a long hex color to an rgb color` ', () => {
      assert.strictEqual(hexToRgb('#a94fd3'), 'rgb(169, 79, 211)');
    });
  });

  describe('rgbToHex', () => {
    it('converts an rgb color to a hex color` ', () => {
      assert.strictEqual(rgbToHex('rgb(169, 79, 211)'), '#a94fd3');
    });

    it('idempotent', () => {
      assert.strictEqual(rgbToHex('#A94FD3'), '#A94FD3');
    });
  });

  describe('hslToRgb', () => {
    it('converts an hsl color to an rgb color` ', () => {
      assert.strictEqual(hslToRgb('hsl(281, 60%, 57%)'), 'rgb(169, 80, 211)');
    });

    it('converts an hsla color to an rgba color` ', () => {
      assert.strictEqual(hslToRgb('hsla(281, 60%, 57%, 0.5)'), 'rgba(169, 80, 211, 0.5)');
    });

    it('allow to convert values only', () => {
      assert.deepEqual(hslToRgb(decomposeColor('hsl(281, 60%, 57%)')), 'rgb(169, 80, 211)');
    });
  });

  describe('decomposeColor', () => {
    it('converts an rgb color string to an object with `type` and `value` keys', () => {
      const { type, values } = decomposeColor('rgb(255, 255, 255)');
      assert.strictEqual(type, 'rgb');
      assert.deepEqual(values, [255, 255, 255]);
    });

    it('converts an rgba color string to an object with `type` and `value` keys', () => {
      const { type, values } = decomposeColor('rgba(255, 255, 255, 0.5)');
      assert.strictEqual(type, 'rgba');
      assert.deepEqual(values, [255, 255, 255, 0.5]);
    });

    it('converts an hsl color string to an object with `type` and `value` keys', () => {
      const { type, values } = decomposeColor('hsl(100, 50%, 25%)');
      assert.strictEqual(type, 'hsl');
      assert.deepEqual(values, [100, 50, 25]);
    });

    it('converts an hsla color string to an object with `type` and `value` keys', () => {
      const { type, values } = decomposeColor('hsla(100, 50%, 25%, 0.5)');
      assert.strictEqual(type, 'hsla');
      assert.deepEqual(values, [100, 50, 25, 0.5]);
    });

    it('idempotent', () => {
      const output1 = decomposeColor('hsla(100, 50%, 25%, 0.5)');
      const output2 = decomposeColor(output1);
      assert.strictEqual(output1, output2);
    });
  });

  describe('getContrastRatio', () => {
    it('returns a ratio for black : white', () => {
      assert.strictEqual(getContrastRatio('#000', '#FFF'), 21);
    });

    it('returns a ratio for black : black', () => {
      assert.strictEqual(getContrastRatio('#000', '#000'), 1);
    });

    it('returns a ratio for white : white', () => {
      assert.strictEqual(getContrastRatio('#FFF', '#FFF'), 1);
    });

    it('returns a ratio for dark-grey : light-grey', () => {
      assert.approximately(getContrastRatio('#707070', '#E5E5E5'), 3.93, 0.01);
    });

    it('returns a ratio for black : light-grey', () => {
      assert.approximately(getContrastRatio('#000', '#888'), 5.92, 0.01);
    });
  });

  describe('getLuminance', () => {
    it('returns a valid luminance for rgb black', () => {
      assert.strictEqual(getLuminance('rgba(0, 0, 0)'), 0);
      assert.strictEqual(getLuminance('rgb(0, 0, 0)'), 0);
    });

    it('returns a valid luminance for rgb white', () => {
      assert.strictEqual(getLuminance('rgba(255, 255, 255)'), 1);
      assert.strictEqual(getLuminance('rgb(255, 255, 255)'), 1);
    });

    it('returns a valid luminance for rgb mid-grey', () => {
      assert.strictEqual(getLuminance('rgba(127, 127, 127)'), 0.212);
      assert.strictEqual(getLuminance('rgb(127, 127, 127)'), 0.212);
    });

    it('returns a valid luminance for an rgb color', () => {
      assert.strictEqual(getLuminance('rgb(255, 127, 0)'), 0.364);
    });

    it('returns a valid luminance from an hsl color', () => {
      assert.strictEqual(getLuminance('hsl(100, 100%, 50%)'), 0.735);
    });

    it('returns an equal luminance for the same color in different formats', () => {
      const hsl = 'hsl(100, 100%, 50%)';
      const rgb = 'rgb(85, 255, 0)';
      assert.strictEqual(getLuminance(hsl), getLuminance(rgb));
    });

    it('throw on invalid colors', () => {
      assert.throw(() => {
        getLuminance('black');
      }, 'unsupported `black` color');
    });
  });

  describe('emphasize', () => {
    it('lightens a dark rgb color with the coefficient provided', () => {
      assert.strictEqual(emphasize('rgb(1, 2, 3)', 0.4), lighten('rgb(1, 2, 3)', 0.4));
    });

    it('darkens a light rgb color with the coefficient provided', () => {
      assert.strictEqual(emphasize('rgb(250, 240, 230)', 0.3), darken('rgb(250, 240, 230)', 0.3));
    });

    it('lightens a dark rgb color with the coefficient 0.15 by default', () => {
      assert.strictEqual(emphasize('rgb(1, 2, 3)'), lighten('rgb(1, 2, 3)', 0.15));
    });

    it('darkens a light rgb color with the coefficient 0.15 by default', () => {
      assert.strictEqual(emphasize('rgb(250, 240, 230)'), darken('rgb(250, 240, 230)', 0.15));
    });
  });

  describe('fade', () => {
    it('converts an rgb color to an rgba color with the value provided', () => {
      assert.strictEqual(fade('rgb(1, 2, 3)', 0.4), 'rgba(1, 2, 3, 0.4)');
    });

    it('updates an rgba color with the alpha value provided', () => {
      assert.strictEqual(fade('rgba(255, 0, 0, 0.2)', 0.5), 'rgba(255, 0, 0, 0.5)');
    });

    it('converts an hsl color to an hsla color with the value provided', () => {
      assert.strictEqual(fade('hsl(0, 100%, 50%)', 0.1), 'hsla(0, 100%, 50%, 0.1)');
    });

    it('updates an hsla color with the alpha value provided', () => {
      assert.strictEqual(fade('hsla(0, 100%, 50%, 0.2)', 0.5), 'hsla(0, 100%, 50%, 0.5)');
    });

    it('throw on invalid colors', () => {
      assert.throw(() => {
        fade('white', 0.4);
      }, 'unsupported `white` color');
    });
  });

  describe('darken', () => {
    it("doesn't modify rgb black", () => {
      assert.strictEqual(darken('rgb(0, 0, 0)', 0.1), 'rgb(0, 0, 0)');
    });

    it("doesn't overshoot if an above-range coefficient is supplied", () => {
      assert.strictEqual(darken('rgb(0, 127, 255)', 1.5), 'rgb(0, 0, 0)');
      assert.strictEqual(consoleErrorMock.callCount(), 1);
    });

    it("doesn't overshoot if a below-range coefficient is supplied", () => {
      assert.strictEqual(darken('rgb(0, 127, 255)', -0.1), 'rgb(0, 127, 255)');
      assert.strictEqual(consoleErrorMock.callCount(), 1);
    });

    it('darkens rgb white to black when coefficient is 1', () => {
      assert.strictEqual(darken('rgb(255, 255, 255)', 1), 'rgb(0, 0, 0)');
    });

    it('retains the alpha value in an rgba color', () => {
      assert.strictEqual(darken('rgb(0, 0, 0, 0.5)', 0.1), 'rgb(0, 0, 0, 0.5)');
    });

    it('darkens rgb white by 10% when coefficient is 0.1', () => {
      assert.strictEqual(darken('rgb(255, 255, 255)', 0.1), 'rgb(229, 229, 229)');
    });

    it('darkens rgb red by 50% when coefficient is 0.5', () => {
      assert.strictEqual(darken('rgb(255, 0, 0)', 0.5), 'rgb(127, 0, 0)');
    });

    it('darkens rgb grey by 50% when coefficient is 0.5', () => {
      assert.strictEqual(darken('rgb(127, 127, 127)', 0.5), 'rgb(63, 63, 63)');
    });

    it("doesn't modify rgb colors when coefficient is 0", () => {
      assert.strictEqual(darken('rgb(255, 255, 255)', 0), 'rgb(255, 255, 255)');
    });

    it('darkens hsl red by 50% when coefficient is 0.5', () => {
      assert.strictEqual(darken('hsl(0, 100%, 50%)', 0.5), 'hsl(0, 100%, 25%)');
    });

    it("doesn't modify hsl colors when coefficient is 0", () => {
      assert.strictEqual(darken('hsl(0, 100%, 50%)', 0), 'hsl(0, 100%, 50%)');
    });

    it("doesn't modify hsl colors when l is 0%", () => {
      assert.strictEqual(darken('hsl(0, 50%, 0%)', 0.5), 'hsl(0, 50%, 0%)');
    });
  });

  describe('lighten', () => {
    it("doesn't modify rgb white", () => {
      assert.strictEqual(lighten('rgb(255, 255, 255)', 0.1), 'rgb(255, 255, 255)');
    });

    it("doesn't overshoot if an above-range coefficient is supplied", () => {
      assert.strictEqual(lighten('rgb(0, 127, 255)', 1.5), 'rgb(255, 255, 255)');
      assert.strictEqual(consoleErrorMock.callCount(), 1);
    });

    it("doesn't overshoot if a below-range coefficient is supplied", () => {
      assert.strictEqual(lighten('rgb(0, 127, 255)', -0.1), 'rgb(0, 127, 255)');
      assert.strictEqual(consoleErrorMock.callCount(), 1);
    });

    it('lightens rgb black to white when coefficient is 1', () => {
      assert.strictEqual(lighten('rgb(0, 0, 0)', 1), 'rgb(255, 255, 255)');
    });

    it('retains the alpha value in an rgba color', () => {
      assert.strictEqual(lighten('rgb(255, 255, 255, 0.5)', 0.1), 'rgb(255, 255, 255, 0.5)');
    });

    it('lightens rgb black by 10% when coefficient is 0.1', () => {
      assert.strictEqual(lighten('rgb(0, 0, 0)', 0.1), 'rgb(25, 25, 25)');
    });

    it('lightens rgb red by 50% when coefficient is 0.5', () => {
      assert.strictEqual(lighten('rgb(255, 0, 0)', 0.5), 'rgb(255, 127, 127)');
    });

    it('lightens rgb grey by 50% when coefficient is 0.5', () => {
      assert.strictEqual(lighten('rgb(127, 127, 127)', 0.5), 'rgb(191, 191, 191)');
    });

    it("doesn't modify rgb colors when coefficient is 0", () => {
      assert.strictEqual(lighten('rgb(127, 127, 127)', 0), 'rgb(127, 127, 127)');
    });

    it('lightens hsl red by 50% when coefficient is 0.5', () => {
      assert.strictEqual(lighten('hsl(0, 100%, 50%)', 0.5), 'hsl(0, 100%, 75%)');
    });

    it("doesn't modify hsl colors when coefficient is 0", () => {
      assert.strictEqual(lighten('hsl(0, 100%, 50%)', 0), 'hsl(0, 100%, 50%)');
    });

    it("doesn't modify hsl colors when `l` is 100%", () => {
      assert.strictEqual(lighten('hsl(0, 50%, 100%)', 0.5), 'hsl(0, 50%, 100%)');
    });
  });
});
