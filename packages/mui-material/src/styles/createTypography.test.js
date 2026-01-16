import { expect } from 'chai';
import createPalette from './createPalette';
import createTypography from './createTypography';

describe('createTypography', () => {
  let palette;

  beforeAll(() => {
    palette = createPalette({});
  });

  it('should create a material design typography according to spec', () => {
    const typography = createTypography(palette, {});
    expect(typography.fontSize).to.equal(14);
  });

  it('should create a typography with custom fontSize', () => {
    const typography = createTypography(palette, { fontSize: 15 });
    expect(typography.fontSize).to.equal(15);
  });

  it('should accept a function', () => {
    const typography = createTypography(palette, (paletteCurrent) => {
      expect(palette).to.equal(paletteCurrent);

      return { fontSize: 15 };
    });
    expect(typography.fontSize).to.equal(15);
  });

  it('should accept a custom font size', () => {
    const typography = createTypography(palette, { fontSize: 16 });
    expect(typography.body2.fontSize).to.equal('1rem');
  });

  it('should create a typography with a custom baseFontSize', () => {
    const typography = createTypography(palette, { htmlFontSize: 10 });
    expect(typography.h2.fontSize).to.equal('6rem');
  });

  it('should create a typography with custom h1', () => {
    const customFontSize = '18px';
    const typography = createTypography(palette, { h1: { fontSize: customFontSize } });
    expect(typography.h1.fontSize).to.equal(customFontSize);
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

    allVariants.forEach((variant) => {
      expect(typography[variant].marginLeft).to.equal(0);
    });
  });

  it('only defines letter-spacing if the font-family is not overwritten', () => {
    expect(createTypography(palette, {}).h1.letterSpacing).not.to.equal(undefined);
    expect(createTypography(palette, { fontFamily: 'Gotham' }).h1.letterSpacing).to.equal(
      undefined,
    );
  });

  // Issue #47575: letterSpacing behavior with various fontFamily values
  describe('Roboto font detection (#47575)', () => {
    const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

    it('applies letterSpacing with exact defaultFontFamily string', () => {
      // This is the baseline - exact match should work
      const typography = createTypography(palette, { fontFamily: defaultFontFamily });
      expect(typography.h1.letterSpacing).not.to.equal(undefined);
      expect(typography.h1.letterSpacing).to.equal('-0.01562em');
    });

    it('applies letterSpacing with CSS variable var(--font-roboto)', () => {
      // FIXED: CSS variable now correctly triggers letterSpacing
      const typography = createTypography(palette, { fontFamily: 'var(--font-roboto)' });
      expect(typography.h1.letterSpacing).to.equal('-0.01562em');
    });

    it('applies letterSpacing with Next.js Roboto Fallback pattern', () => {
      // FIXED: Next.js pattern now correctly triggers letterSpacing
      const typography = createTypography(palette, { fontFamily: '"Roboto", "Roboto Fallback"' });
      expect(typography.h1.letterSpacing).to.equal('-0.01562em');
    });

    it('applies letterSpacing with Next.js hashed class names', () => {
      // FIXED: Next.js hashed class names now correctly trigger letterSpacing
      const typography = createTypography(palette, {
        fontFamily: '__Roboto_e0ab1e, __Roboto_Fallback_e0ab1e',
      });
      expect(typography.h1.letterSpacing).to.equal('-0.01562em');
    });

    it('verifies fontFamily values are correctly set', () => {
      // Diagnostic test to capture exact values
      const cssVarTypo = createTypography(palette, { fontFamily: 'var(--font-roboto)' });
      const nextjsTypo = createTypography(palette, { fontFamily: '"Roboto", "Roboto Fallback"' });
      const defaultTypo = createTypography(palette, {});

      // Assertions to see the values
      expect(defaultTypo.fontFamily).to.equal(defaultFontFamily);
      expect(cssVarTypo.fontFamily).to.equal('var(--font-roboto)');
      expect(nextjsTypo.fontFamily).to.equal('"Roboto", "Roboto Fallback"');
    });
  });

  // Edge cases for Roboto font detection
  describe('Roboto detection edge cases', () => {
    describe('Roboto Variants (should NOT get Roboto letterSpacing)', () => {
      it('Roboto Slab - different font, different kerning', () => {
        const typography = createTypography(palette, { fontFamily: '"Roboto Slab", sans-serif' });
        // Currently undefined - this is CORRECT behavior, should remain undefined
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('Roboto Mono - monospace font, different metrics', () => {
        const typography = createTypography(palette, { fontFamily: '"Roboto Mono", monospace' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('Roboto Condensed - different width, different kerning', () => {
        const typography = createTypography(palette, {
          fontFamily: '"Roboto Condensed", sans-serif',
        });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('Roboto Serif - serif variant, different design', () => {
        const typography = createTypography(palette, { fontFamily: '"Roboto Serif", serif' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('Roboto Flex - variable font, different handling', () => {
        const typography = createTypography(palette, { fontFamily: '"Roboto Flex", sans-serif' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });
    });

    describe('Case Sensitivity', () => {
      it('lowercase "roboto" - now correctly matched (case-insensitive)', () => {
        const typography = createTypography(palette, { fontFamily: '"roboto", sans-serif' });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });

      it('UPPERCASE "ROBOTO" - now correctly matched (case-insensitive)', () => {
        const typography = createTypography(palette, { fontFamily: '"ROBOTO", sans-serif' });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });
    });

    describe('Font Stack Position', () => {
      it('Roboto NOT first in stack - primary font is different', () => {
        const typography = createTypography(palette, {
          fontFamily: '"Arial", "Roboto", sans-serif',
        });
        // Roboto spacing should NOT apply when it's not the primary font
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('Helvetica first, Roboto fallback', () => {
        const typography = createTypography(palette, {
          fontFamily: '"Helvetica", "Roboto", "Arial", sans-serif',
        });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });
    });

    describe('Quote and Whitespace Variations', () => {
      it('No quotes around font names - correctly matched', () => {
        const typography = createTypography(palette, {
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });

      it('Single quotes instead of double - correctly matched', () => {
        const typography = createTypography(palette, {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });

      it('Extra whitespace around fonts - correctly matched', () => {
        const typography = createTypography(palette, {
          fontFamily: '"Roboto" , "Helvetica" , "Arial" , sans-serif',
        });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });

      it('Leading whitespace - now trimmed and correctly matched', () => {
        const typography = createTypography(palette, {
          fontFamily: ' "Roboto", "Helvetica", "Arial", sans-serif',
        });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });
    });

    describe('CSS Variable Edge Cases', () => {
      it('CSS variable with fallback value', () => {
        const typography = createTypography(palette, {
          fontFamily: 'var(--font-roboto, "Helvetica")',
        });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('Different variable name containing roboto', () => {
        const typography = createTypography(palette, { fontFamily: 'var(--my-roboto-font)' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('Variable name robotica (not roboto)', () => {
        const typography = createTypography(palette, { fontFamily: 'var(--font-robotica)' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('Generic variable name', () => {
        const typography = createTypography(palette, { fontFamily: 'var(--primary-font)' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });
    });

    describe('Non-Roboto Fonts Containing "Roboto" substring', () => {
      it('Noto Roboto (hypothetical)', () => {
        const typography = createTypography(palette, { fontFamily: '"Noto Roboto", sans-serif' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('My-Roboto-Font (custom font)', () => {
        const typography = createTypography(palette, {
          fontFamily: '"My-Roboto-Font", sans-serif',
        });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });
    });

    describe('allVariants override', () => {
      it('allows manual letterSpacing override via allVariants', () => {
        const typography = createTypography(palette, {
          fontFamily: 'var(--font-roboto)',
          allVariants: { letterSpacing: '-0.01562em' },
        });
        // allVariants should apply letterSpacing as a workaround
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });
    });

    describe('Next.js variant hashed class names', () => {
      it('rejects __Roboto_Slab_ hashed variant', () => {
        const typography = createTypography(palette, { fontFamily: '__Roboto_Slab_e0ab1e' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('rejects __Roboto_Mono_ hashed variant', () => {
        const typography = createTypography(palette, { fontFamily: '__Roboto_Mono_abc123' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('matches "Roboto" alone without trailing comma', () => {
        const typography = createTypography(palette, { fontFamily: '"Roboto"' });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });

      it('matches var(--font-roboto) with leading whitespace', () => {
        const typography = createTypography(palette, { fontFamily: ' var(--font-roboto)' });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });

      it('rejects My__Roboto_Font (word boundary check)', () => {
        const typography = createTypography(palette, { fontFamily: 'My__Roboto_Font' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('rejects empty string fontFamily', () => {
        const typography = createTypography(palette, { fontFamily: '' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('rejects whitespace-only fontFamily', () => {
        const typography = createTypography(palette, { fontFamily: '   ' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });
    });

    describe('Next.js hash pattern validation', () => {
      it('rejects non-hex characters in hash pattern', () => {
        // [a-f0-9] pattern should reject non-hex characters
        const typography = createTypography(palette, { fontFamily: '__Roboto_ZZZZZZ' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('matches uppercase hex characters in hash', () => {
        // Hex is case-insensitive, E0AB1E is valid
        const typography = createTypography(palette, { fontFamily: '__Roboto_E0AB1E' });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });

      it('rejects var(--font-roboto) with additional fallback', () => {
        // MUI docs show var(--font-roboto) alone, not with fallbacks
        // This is intentional to avoid false positives
        const typography = createTypography(palette, {
          fontFamily: 'var(--font-roboto), sans-serif',
        });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('matches Roboto with generic fallback', () => {
        // "Roboto" as primary font should get letter-spacing
        const typography = createTypography(palette, { fontFamily: '"Roboto", sans-serif' });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });

      it('matches Roboto with trailing space (permissive)', () => {
        // 'Roboto ' is technically invalid CSS, but our regex is permissive
        // This is acceptable - users won't have this in real configs
        const typography = createTypography(palette, { fontFamily: 'Roboto ' });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });

      it('matches just Roboto alone', () => {
        const typography = createTypography(palette, { fontFamily: 'Roboto' });
        expect(typography.h1.letterSpacing).to.equal('-0.01562em');
      });
    });

    describe('Intentional non-matches (conservative scope)', () => {
      // These tests document patterns we intentionally do NOT match
      // to avoid false positives (per MUI maintainer concerns)

      it('rejects var() with internal whitespace', () => {
        // Technically valid CSS, but not MUI's documented pattern
        const typography = createTypography(palette, { fontFamily: 'var( --font-roboto )' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('rejects var(--font-roboto) followed by fallback stack', () => {
        // We only match the exact documented pattern, not variations
        const typography = createTypography(palette, {
          fontFamily: 'var(--font-roboto), sans-serif',
        });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });

      it('rejects non-hex Next.js-like hash patterns', () => {
        // Hex constraint [a-f0-9] is intentional to avoid user-defined fonts
        const typography = createTypography(palette, { fontFamily: '__Roboto_custom' });
        expect(typography.h1.letterSpacing).to.equal(undefined);
      });
    });
  });

  // TODO v6: remove, see https://github.com/mui/material-ui/pull/38123
  it('should apply font CSS properties to inherit variant', () => {
    const typography = createTypography(palette, {});
    const fontProperties = ['fontFamily', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing'];

    fontProperties.forEach((prop) => {
      expect(typography.inherit[prop]).to.equal('inherit');
    });
  });

  describe('warnings', () => {
    it('logs an error if `fontSize` is not of type number', () => {
      expect(() => {
        createTypography({}, { fontSize: '1' });
      }).toErrorDev('MUI: `fontSize` is required to be a number.');
    });

    it('logs an error if `htmlFontSize` is not of type number', () => {
      expect(() => {
        createTypography({}, { htmlFontSize: '1' });
      }).toErrorDev('MUI: `htmlFontSize` is required to be a number.');
    });
  });
});
