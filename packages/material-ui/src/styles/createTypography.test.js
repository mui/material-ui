import { assert } from 'chai';
import { mock } from 'sinon';
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
    assert.strictEqual(typography.body1.fontSize, '1rem', 'should be 16px');
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
    let warning;

    beforeEach(() => {
      warning = mock(console).expects('error');
    });

    afterEach(() => {
      warning.restore();
    });

    const testTypography = (options, expectDeprecation) => {
      warning.resetHistory();

      const typography = createTypography(palette, options);

      if (expectDeprecation) {
        assert.strictEqual(warning.calledOnce, true);
        assert.include(warning.firstCall.args[0], 'Material-UI:');
      }

      return typography;
    };

    it('warns if deprecated variants are overwritten', () => {
      const customFontSize = '1px';
      const typography = testTypography(
        {
          display1: {
            fontSize: customFontSize,
          },
        },
        true,
      );
      assert.strictEqual(typography.display1.fontSize, customFontSize);
    });

    it('warns if deprecated variants are overwritten even if typography v2 is enabled', () => {
      testTypography({ display1: { fontSize: '1px' }, useNextVariants: true }, true);
    });

    it('warns if restyled variants are overwritten', () => {
      const customFontSize = '1px';
      const typography = testTypography(
        {
          body1: {
            fontSize: customFontSize,
          },
        },
        true,
      );

      assert.strictEqual(typography.body1.fontSize, customFontSize);
    });

    it('does not warn if restyled variants are overwritten in typography v2', () => {
      testTypography({ body1: { fontSize: '1px' }, useNextVariants: true }, false);
    });

    it('overwrites restyled variants with `useNextVariants: true`', () => {
      const typography = testTypography({ useNextVariants: true }, false);
      assert.strictEqual(typography.body1, typography.body1Next);
    });
  });
});
