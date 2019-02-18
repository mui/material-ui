import { assert } from 'chai';
import fontGrid from './fontGrid';

describe('fontGrid', () => {
  const tests = [
    { lineHeight: 1.3, pixels: 4, htmlFontSize: 16 },
    { lineHeight: 1.6, pixels: 9, htmlFontSize: 15 },
    { lineHeight: 1.0, pixels: 3, htmlFontSize: 14 },
  ];

  tests.forEach(test => {
    const { lineHeight, pixels, htmlFontSize } = test;

    describe(`when ${lineHeight} lineHeight, ${pixels} pixels,
      ${htmlFontSize} htmlFontSize`, () => {
      const grid = fontGrid({ lineHeight, pixels, htmlFontSize });

      it(`should return a font grid such that the relative lineHeight is aligned`, () => {
        const absoluteLineHeight = grid * lineHeight * htmlFontSize;
        assert.strictEqual(Math.round((absoluteLineHeight % pixels) * 100000) / 100000, 0);
      });
    });

    it(`with ${lineHeight} lineHeight, ${pixels} pixels,
      ${htmlFontSize} htmlFontSize, the font grid is such that
      there is no smaller font aligning the lineHeight`, () => {
      const grid = fontGrid({ lineHeight, pixels, htmlFontSize });
      const absoluteLineHeight = grid * lineHeight * htmlFontSize;
      assert.strictEqual(Math.floor(absoluteLineHeight / pixels), 1);
    });
  });
});
