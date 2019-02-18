import { assert } from 'chai';
import responsiveTypography from './responsiveTypography';
import { createMuiTheme } from '@material-ui/core/styles';

describe('responsiveTypography', () => {
  const defaultVariant = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '6rem',
    fontWeight: 300,
    letterSpacing: '-0.01562em',
    lineHeight: 1,
  };

  it('should return a new theme with a responsive typography for unitless line height', () => {
    const theme = createMuiTheme({
      typography: {
        h1: defaultVariant,
      },
    });
    const typography = responsiveTypography(theme.typography, {
      breakpointSettings: theme.breakpoints,
      maxScale: 2.0,
      breakpoints: ['sm', 'lg'],
      align: true,
    });

    assert.deepEqual(theme.typography.h1, defaultVariant);
    assert.deepEqual(typography.h1, {
      ...defaultVariant,
      '@media (min-width:400px)': {
        fontSize: '8.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '12rem',
      },
    });
  });

  it('should return a new theme with a responsive typography for non unitless line height', () => {
    const newVariant = {
      ...defaultVariant,
      lineHeight: '6rem',
    };

    const theme = createMuiTheme({
      typography: {
        h1: newVariant,
      },
    });
    const typography = responsiveTypography(theme.typography, {
      breakpointSettings: theme.breakpoints,
      maxScale: 2.0,
      breakpoints: ['sm', 'lg'],
      align: false,
    });

    assert.deepEqual(theme.typography.h1, newVariant);
    assert.deepEqual(typography.h1, {
      ...newVariant,
      '@media (min-width:400px)': {
        fontSize: '8.5rem',
      },
      '@media (min-width:960px)': {
        fontSize: '12rem',
      },
    });
  });

  describe('when requesting a responsive typography with non unitless line height and alignment', () => {
    const theme = createMuiTheme({
      typography: {
        h1: {
          lineHeight: '6rem',
        },
      },
    });

    it('should throw an error, as this is not supported', () => {
      assert.throw(() => {
        responsiveTypography(theme.typography, {
          breakpointSettings: theme.breakpoints,
          maxScale: 2.0,
          breakpoints: ['sm', 'lg'],
          align: true,
        });
      });
    });
  });
});
