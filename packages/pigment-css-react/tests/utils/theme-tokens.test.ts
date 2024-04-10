import { extendTheme, generateTokenCss, generateThemeTokens } from '@pigment-css/react/utils';
import { expect } from 'chai';

describe('theme-tokens', () => {
  describe('generateTokenCss', () => {
    it('should work with plain theme', () => {
      expect(
        generateTokenCss({
          colors: {
            primary: 'red',
            secondary: 'blue',
          },
          fontSizes: [12, 14, 16, 20, 24, 32],
        }),
      ).to.equal('');
    });

    it('should generate stylesheet correctly', () => {
      expect(
        generateTokenCss(
          extendTheme({
            colorSchemes: {
              light: {
                palette: {
                  primary: 'red',
                  secondary: 'blue',
                },
              },
              dark: {
                palette: {
                  primary: 'darkred',
                  secondary: 'darkblue',
                },
              },
            },
            radius: {
              xs: 4,
              sm: 8,
              md: 16,
            },
          }),
        ),
      ).to.equal(
        ':root{--radius-xs:4px;--radius-sm:8px;--radius-md:16px;}:root{--palette-primary:red;--palette-secondary:blue;}@media (prefers-color-scheme: dark){:root{--palette-primary:darkred;--palette-secondary:darkblue;}}',
      );
    });
  });

  describe('generateThemeTokens', () => {
    it('should work with plain theme', () => {
      expect(
        generateThemeTokens({
          colors: {
            primary: 'red',
            secondary: 'blue',
          },
          fontSizes: [12, 14, 16, 20, 24, 32],
        }),
      ).to.deep.equal({});
    });

    it('should use `vars` object', () => {
      expect(
        generateThemeTokens(
          extendTheme({
            colorSchemes: {
              light: {
                palette: {
                  primary: 'red',
                  secondary: 'blue',
                },
              },
              dark: {
                palette: {
                  primary: 'darkred',
                  secondary: 'darkblue',
                },
              },
            },
            radius: {
              xs: 4,
              sm: 8,
              md: 16,
            },
          }),
        ),
      ).to.deep.equal({
        vars: {
          palette: {
            primary: 'var(--palette-primary)',
            secondary: 'var(--palette-secondary)',
          },
          radius: {
            md: 'var(--radius-md)',
            sm: 'var(--radius-sm)',
            xs: 'var(--radius-xs)',
          },
        },
      });
    });
  });
});
