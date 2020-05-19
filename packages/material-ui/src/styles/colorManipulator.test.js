import { expect } from 'chai';
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
      expect(
        recomposeColor({
          type: 'rgb',
          values: [255, 255, 255],
        }),
      ).to.equal('rgb(255, 255, 255)');
    });

    it('converts a decomposed rgba color object to a string` ', () => {
      expect(
        recomposeColor({
          type: 'rgba',
          values: [255, 255, 255, 0.5],
        }),
      ).to.equal('rgba(255, 255, 255, 0.5)');
    });

    it('converts a decomposed hsl color object to a string` ', () => {
      expect(
        recomposeColor({
          type: 'hsl',
          values: [100, 50, 25],
        }),
      ).to.equal('hsl(100, 50%, 25%)');
    });

    it('converts a decomposed hsla color object to a string` ', () => {
      expect(
        recomposeColor({
          type: 'hsla',
          values: [100, 50, 25, 0.5],
        }),
      ).to.equal('hsla(100, 50%, 25%, 0.5)');
    });
  });

  describe('hexToRgb', () => {
    it('converts a short hex color to an rgb color` ', () => {
      expect(hexToRgb('#9f3')).to.equal('rgb(153, 255, 51)');
    });

    it('converts a long hex color to an rgb color` ', () => {
      expect(hexToRgb('#a94fd3')).to.equal('rgb(169, 79, 211)');
    });

    it('converts a long alpha hex color to an argb color` ', () => {
      expect(hexToRgb('#111111f8')).to.equal('rgba(17, 17, 17, 0.973)');
    });
  });

  describe('rgbToHex', () => {
    it('converts an rgb color to a hex color` ', () => {
      expect(rgbToHex('rgb(169, 79, 211)')).to.equal('#a94fd3');
    });

    it('idempotent', () => {
      expect(rgbToHex('#A94FD3')).to.equal('#A94FD3');
    });
  });

  describe('hslToRgb', () => {
    it('converts an hsl color to an rgb color` ', () => {
      expect(hslToRgb('hsl(281, 60%, 57%)')).to.equal('rgb(169, 80, 211)');
    });

    it('converts an hsla color to an rgba color` ', () => {
      expect(hslToRgb('hsla(281, 60%, 57%, 0.5)')).to.equal('rgba(169, 80, 211, 0.5)');
    });

    it('allow to convert values only', () => {
      expect(hslToRgb(decomposeColor('hsl(281, 60%, 57%)'))).to.equal('rgb(169, 80, 211)');
    });
  });

  describe('decomposeColor', () => {
    it('converts an rgb color string to an object with `type` and `value` keys', () => {
      const { type, values } = decomposeColor('rgb(255, 255, 255)');
      expect(type).to.equal('rgb');
      expect(values).to.deep.equal([255, 255, 255]);
    });

    it('converts an rgba color string to an object with `type` and `value` keys', () => {
      const { type, values } = decomposeColor('rgba(255, 255, 255, 0.5)');
      expect(type).to.equal('rgba');
      expect(values).to.deep.equal([255, 255, 255, 0.5]);
    });

    it('converts an hsl color string to an object with `type` and `value` keys', () => {
      const { type, values } = decomposeColor('hsl(100, 50%, 25%)');
      expect(type).to.equal('hsl');
      expect(values).to.deep.equal([100, 50, 25]);
    });

    it('converts an hsla color string to an object with `type` and `value` keys', () => {
      const { type, values } = decomposeColor('hsla(100, 50%, 25%, 0.5)');
      expect(type).to.equal('hsla');
      expect(values).to.deep.equal([100, 50, 25, 0.5]);
    });

    it('idempotent', () => {
      const output1 = decomposeColor('hsla(100, 50%, 25%, 0.5)');
      const output2 = decomposeColor(output1);
      expect(output1).to.deep.equal(output2);
    });

    it('converts rgba hex', () => {
      const decomposed = decomposeColor('#111111f8');
      expect(decomposed).to.deep.equal({
        type: 'rgba',
        values: [17, 17, 17, 0.973],
      });
    });
  });

  describe('getContrastRatio', () => {
    it('returns a ratio for black : white', () => {
      expect(getContrastRatio('#000', '#FFF')).to.equal(21);
    });

    it('returns a ratio for black : black', () => {
      expect(getContrastRatio('#000', '#000')).to.equal(1);
    });

    it('returns a ratio for white : white', () => {
      expect(getContrastRatio('#FFF', '#FFF')).to.equal(1);
    });

    it('returns a ratio for dark-grey : light-grey', () => {
      expect(getContrastRatio('#707070', '#E5E5E5')).to.be.approximately(3.93, 0.01);
    });

    it('returns a ratio for black : light-grey', () => {
      expect(getContrastRatio('#000', '#888')).to.be.approximately(5.92, 0.01);
    });
  });

  describe('getLuminance', () => {
    it('returns a valid luminance for rgb black', () => {
      expect(getLuminance('rgba(0, 0, 0)')).to.equal(0);
      expect(getLuminance('rgb(0, 0, 0)')).to.equal(0);
    });

    it('returns a valid luminance for rgb white', () => {
      expect(getLuminance('rgba(255, 255, 255)')).to.equal(1);
      expect(getLuminance('rgb(255, 255, 255)')).to.equal(1);
    });

    it('returns a valid luminance for rgb mid-grey', () => {
      expect(getLuminance('rgba(127, 127, 127)')).to.equal(0.212);
      expect(getLuminance('rgb(127, 127, 127)')).to.equal(0.212);
    });

    it('returns a valid luminance for an rgb color', () => {
      expect(getLuminance('rgb(255, 127, 0)')).to.equal(0.364);
    });

    it('returns a valid luminance from an hsl color', () => {
      expect(getLuminance('hsl(100, 100%, 50%)')).to.equal(0.735);
    });

    it('returns an equal luminance for the same color in different formats', () => {
      const hsl = 'hsl(100, 100%, 50%)';
      const rgb = 'rgb(85, 255, 0)';
      expect(getLuminance(hsl)).to.equal(getLuminance(rgb));
    });

    it('throw on invalid colors', () => {
      expect(() => {
        getLuminance('black');
      }).to.throw('Material-UI: Unsupported `black` color');
    });
  });

  describe('emphasize', () => {
    it('lightens a dark rgb color with the coefficient provided', () => {
      expect(emphasize('rgb(1, 2, 3)', 0.4)).to.equal(lighten('rgb(1, 2, 3)', 0.4));
    });

    it('darkens a light rgb color with the coefficient provided', () => {
      expect(emphasize('rgb(250, 240, 230)', 0.3)).to.equal(darken('rgb(250, 240, 230)', 0.3));
    });

    it('lightens a dark rgb color with the coefficient 0.15 by default', () => {
      expect(emphasize('rgb(1, 2, 3)')).to.equal(lighten('rgb(1, 2, 3)', 0.15));
    });

    it('darkens a light rgb color with the coefficient 0.15 by default', () => {
      expect(emphasize('rgb(250, 240, 230)')).to.equal(darken('rgb(250, 240, 230)', 0.15));
    });
  });

  describe('fade', () => {
    it('converts an rgb color to an rgba color with the value provided', () => {
      expect(fade('rgb(1, 2, 3)', 0.4)).to.equal('rgba(1, 2, 3, 0.4)');
    });

    it('updates an rgba color with the alpha value provided', () => {
      expect(fade('rgba(255, 0, 0, 0.2)', 0.5)).to.equal('rgba(255, 0, 0, 0.5)');
    });

    it('converts an hsl color to an hsla color with the value provided', () => {
      expect(fade('hsl(0, 100%, 50%)', 0.1)).to.equal('hsla(0, 100%, 50%, 0.1)');
    });

    it('updates an hsla color with the alpha value provided', () => {
      expect(fade('hsla(0, 100%, 50%, 0.2)', 0.5)).to.equal('hsla(0, 100%, 50%, 0.5)');
    });

    it('throw on invalid colors', () => {
      expect(() => {
        fade('white', 0.4);
      }).to.throw('Material-UI: Unsupported `white` color');
    });
  });

  describe('darken', () => {
    it("doesn't modify rgb black", () => {
      expect(darken('rgb(0, 0, 0)', 0.1)).to.equal('rgb(0, 0, 0)');
    });

    it("doesn't overshoot if an above-range coefficient is supplied", () => {
      expect(darken('rgb(0, 127, 255)', 1.5)).to.equal('rgb(0, 0, 0)');
      expect(consoleErrorMock.callCount()).to.equal(1);
    });

    it("doesn't overshoot if a below-range coefficient is supplied", () => {
      expect(darken('rgb(0, 127, 255)', -0.1)).to.equal('rgb(0, 127, 255)');
      expect(consoleErrorMock.callCount()).to.equal(1);
    });

    it('darkens rgb white to black when coefficient is 1', () => {
      expect(darken('rgb(255, 255, 255)', 1)).to.equal('rgb(0, 0, 0)');
    });

    it('retains the alpha value in an rgba color', () => {
      expect(darken('rgb(0, 0, 0, 0.5)', 0.1)).to.equal('rgb(0, 0, 0, 0.5)');
    });

    it('darkens rgb white by 10% when coefficient is 0.1', () => {
      expect(darken('rgb(255, 255, 255)', 0.1)).to.equal('rgb(229, 229, 229)');
    });

    it('darkens rgb red by 50% when coefficient is 0.5', () => {
      expect(darken('rgb(255, 0, 0)', 0.5)).to.equal('rgb(127, 0, 0)');
    });

    it('darkens rgb grey by 50% when coefficient is 0.5', () => {
      expect(darken('rgb(127, 127, 127)', 0.5)).to.equal('rgb(63, 63, 63)');
    });

    it("doesn't modify rgb colors when coefficient is 0", () => {
      expect(darken('rgb(255, 255, 255)', 0)).to.equal('rgb(255, 255, 255)');
    });

    it('darkens hsl red by 50% when coefficient is 0.5', () => {
      expect(darken('hsl(0, 100%, 50%)', 0.5)).to.equal('hsl(0, 100%, 25%)');
    });

    it("doesn't modify hsl colors when coefficient is 0", () => {
      expect(darken('hsl(0, 100%, 50%)', 0)).to.equal('hsl(0, 100%, 50%)');
    });

    it("doesn't modify hsl colors when l is 0%", () => {
      expect(darken('hsl(0, 50%, 0%)', 0.5)).to.equal('hsl(0, 50%, 0%)');
    });
  });

  describe('lighten', () => {
    it("doesn't modify rgb white", () => {
      expect(lighten('rgb(255, 255, 255)', 0.1)).to.equal('rgb(255, 255, 255)');
    });

    it("doesn't overshoot if an above-range coefficient is supplied", () => {
      expect(lighten('rgb(0, 127, 255)', 1.5)).to.equal('rgb(255, 255, 255)');
      expect(consoleErrorMock.callCount()).to.equal(1);
    });

    it("doesn't overshoot if a below-range coefficient is supplied", () => {
      expect(lighten('rgb(0, 127, 255)', -0.1)).to.equal('rgb(0, 127, 255)');
      expect(consoleErrorMock.callCount()).to.equal(1);
    });

    it('lightens rgb black to white when coefficient is 1', () => {
      expect(lighten('rgb(0, 0, 0)', 1)).to.equal('rgb(255, 255, 255)');
    });

    it('retains the alpha value in an rgba color', () => {
      expect(lighten('rgb(255, 255, 255, 0.5)', 0.1)).to.equal('rgb(255, 255, 255, 0.5)');
    });

    it('lightens rgb black by 10% when coefficient is 0.1', () => {
      expect(lighten('rgb(0, 0, 0)', 0.1)).to.equal('rgb(25, 25, 25)');
    });

    it('lightens rgb red by 50% when coefficient is 0.5', () => {
      expect(lighten('rgb(255, 0, 0)', 0.5)).to.equal('rgb(255, 127, 127)');
    });

    it('lightens rgb grey by 50% when coefficient is 0.5', () => {
      expect(lighten('rgb(127, 127, 127)', 0.5)).to.equal('rgb(191, 191, 191)');
    });

    it("doesn't modify rgb colors when coefficient is 0", () => {
      expect(lighten('rgb(127, 127, 127)', 0)).to.equal('rgb(127, 127, 127)');
    });

    it('lightens hsl red by 50% when coefficient is 0.5', () => {
      expect(lighten('hsl(0, 100%, 50%)', 0.5)).to.equal('hsl(0, 100%, 75%)');
    });

    it("doesn't modify hsl colors when coefficient is 0", () => {
      expect(lighten('hsl(0, 100%, 50%)', 0)).to.equal('hsl(0, 100%, 50%)');
    });

    it("doesn't modify hsl colors when `l` is 100%", () => {
      expect(lighten('hsl(0, 50%, 100%)', 0.5)).to.equal('hsl(0, 50%, 100%)');
    });
  });
});
