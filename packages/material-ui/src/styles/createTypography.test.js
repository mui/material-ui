import { assert } from 'chai';
import createPalette from './createPalette';
import createTypography from './createTypography';

describe('createTypography', () => {
  let palette;

  before(() => {
    palette = createPalette({});
  });

  it('should create a material design typography according to spec', () => {
    const typography = createTypography(palette, {});
    assert.strictEqual(typography.fontSize, 14);
  });

  it('should create a typography with custom fontSize', () => {
    const typography = createTypography(palette, { fontSize: 15 });
    assert.strictEqual(typography.fontSize, 15);
  });

  it('should accept a function', () => {
    const typography = createTypography(palette, paletteCurrent => {
      assert.strictEqual(palette, paletteCurrent);

      return { fontSize: 15 };
    });
    assert.strictEqual(typography.fontSize, 15);
  });

  it('should accept a custom font size', () => {
    const typography = createTypography(palette, { fontSize: 16 });
    assert.strictEqual(typography.body2.fontSize, '1rem', 'should be 16px');
  });

  it('should create a typography with a custom baseFontSize', () => {
    const typography = createTypography(palette, { htmlFontSize: 10 });
    assert.strictEqual(typography.h2.fontSize, '6rem');
  });

  it('should create a typography with custom h1', () => {
    const customFontSize = '18px';
    const typography = createTypography(palette, { h1: { fontSize: customFontSize } });
    assert.strictEqual(typography.h1.fontSize, customFontSize);
  });

  it('should apply a CSS property to all the variants', () => {
    const typography = createTypography(palette, { allVariants: { marginLeft: 0 } });
    const allVariants = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'button',
      'caption',
      'overline',
    ];

    allVariants.forEach(variant => {
      assert.strictEqual(typography[variant].marginLeft, 0);
    });
  });

  it('only defines letter-spacing if the font-family is not overwritten', () => {
    assert.isDefined(createTypography(palette, {}).h1.letterSpacing);
    assert.isUndefined(createTypography(palette, { fontFamily: 'Gotham' }).h1.letterSpacing);
  });
});
