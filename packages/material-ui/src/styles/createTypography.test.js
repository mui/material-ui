import { assert } from 'chai';
import createPalette from './createPalette';
import createTypography from './createTypography';
import consoleErrorMock from 'test/utils/consoleErrorMock';

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
    assert.strictEqual(typography.display4.fontSize, '11.2rem');
  });

  it('should create a typography with custom h1', () => {
    const customFontSize = '18px';
    const typography = createTypography(palette, { h1: { fontSize: customFontSize } });
    assert.strictEqual(typography.h1.fontSize, customFontSize);
  });

  it('should apply a CSS property to all the variants', () => {
    const typography = createTypography(palette, { allVariants: { marginLeft: 0 } });
    const allVariants = [
      'display4',
      'display3',
      'display2',
      'display1',
      'headline',
      'title',
      'subheading',
      'body2',
      'body1',
      'caption',
      'button',
    ];

    allVariants.forEach(variant => {
      assert.strictEqual(typography[variant].marginLeft, 0);
    });
  });

  it('only defines letter-spacing if the font-family is not overwritten', () => {
    assert.isDefined(createTypography(palette, {}).h1.letterSpacing);
    assert.isUndefined(createTypography(palette, { fontFamily: 'Gotham' }).h1.letterSpacing);
  });

  describe('typography v2 migration', () => {
    beforeEach(() => {
      // eslint-disable-next-line no-underscore-dangle
      global.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = false;
      consoleErrorMock.spy();
    });

    afterEach(() => {
      // eslint-disable-next-line no-underscore-dangle
      global.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
      consoleErrorMock.reset();
    });

    const testTypography = (options, expectWarning) => {
      createTypography(palette, options);

      if (expectWarning) {
        assert.strictEqual(consoleErrorMock.callCount(), 1);
        assert.include(consoleErrorMock.args()[0][0], 'Material-UI:');
      } else {
        assert.strictEqual(consoleErrorMock.callCount(), 0);
      }
    };

    it('warns if the old typography is used', () => {
      testTypography({}, true);
    });

    it('warns if deprecated variants are overwritten even if typography v2 is enabled', () => {
      testTypography({ useNextVariants: true }, false);
    });
  });
});
