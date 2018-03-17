// @flow

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
    assert.strictEqual(typography.body1.fontSize, '1rem', 'should be 16px');
  });

  it('should create a typography with a custom baseFontSize', () => {
    const typography = createTypography(palette, { htmlFontSize: 10 });
    assert.strictEqual(typography.display4.fontSize, '11.2rem');
  });

  it('should create a typography with custom display4', () => {
    const customFontSize = '18px';
    const typography = createTypography(palette, { display4: { fontSize: customFontSize } });
    assert.strictEqual(typography.display4.fontSize, customFontSize);
  });
});
