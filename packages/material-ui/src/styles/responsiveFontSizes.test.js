import { assert } from 'chai';
import responsiveFontSizes from './responsiveFontSizes';
import { createMuiTheme } from '@material-ui/core/styles';

describe('responsiveFontSizes', () => {
  it('should support unitless line height', () => {
    const defaultVariant = {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '6rem',
      fontWeight: 300,
      letterSpacing: '-0.01562em',
      lineHeight: 1,
    };

    const theme = createMuiTheme({
      typography: {
        h1: defaultVariant,
      },
    });
    const { typography } = responsiveFontSizes(theme);
    assert.deepEqual(typography.h1, {
      ...defaultVariant,
      fontSize: '3.5rem',
      '@media (min-width:600px)': { fontSize: '4.75rem' },
      '@media (min-width:960px)': { fontSize: '5.5rem' },
      '@media (min-width:1280px)': { fontSize: defaultVariant.fontSize },
    });
  });

  it('should disable vertical alignment', () => {
    const defaultVariant = {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '6rem',
      fontWeight: 300,
      letterSpacing: '-0.01562em',
      lineHeight: '6rem',
    };

    const theme = createMuiTheme({
      typography: {
        h1: defaultVariant,
      },
    });
    const { typography } = responsiveFontSizes(theme, {
      disableAlign: true,
    });

    assert.deepEqual(typography.h1, {
      ...defaultVariant,
      fontSize: '3.5rem',
      '@media (min-width:600px)': { fontSize: '4.6719rem' },
      '@media (min-width:960px)': { fontSize: '5.375rem' },
      '@media (min-width:1280px)': { fontSize: defaultVariant.fontSize },
    });
  });

  describe('when requesting a responsive typography with non unitless line height and alignment', () => {
    it('should throw an error, as this is not supported', () => {
      const theme = createMuiTheme({
        typography: {
          h1: {
            lineHeight: '6rem',
          },
        },
      });

      assert.throw(() => {
        responsiveFontSizes(theme);
      });
    });
  });
});
