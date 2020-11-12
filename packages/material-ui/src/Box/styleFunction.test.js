import { expect } from 'chai';
import { createMuiTheme } from '@material-ui/core/styles';
import styleFunction from './styleFunction';

describe('styleFunction', () => {
  const theme = createMuiTheme({
    spacing: 10,
    palette: {
      primary: {
        main: 'rgb(0, 0, 255)',
      },
      secondary: {
        main: 'rgb(0, 255, 0)',
      },
    },
    typography: { pxToRem: (pxValue) => `${pxValue / 16}rem` },
  });

  const round = (value) => Math.round(value * 1e5) / 1e5;

  it('resolves palette', () => {
    const result = styleFunction({
      theme,
      color: 'primary.main',
      bgcolor: 'secondary.main',
    });

    expect(result).to.deep.equal({
      color: 'rgb(0, 0, 255)',
      backgroundColor: 'rgb(0, 255, 0)',
    });
  });

  it('resolves spacing', () => {
    const result = styleFunction({
      theme,
      m: 2,
      p: 1,
    });

    expect(result).to.deep.equal({
      margin: '20px',
      padding: '10px',
    });
  });

  describe('typography', () => {
    it('resolves typography prop', () => {
      const result = styleFunction({
        theme,
        typography: ['body2', 'body1'],
      });

      expect(result).to.deep.equal({
        '@media (min-width:0px)': {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: `${14 / 16}rem`,
          letterSpacing: `${round(0.15 / 14)}em`,
          fontWeight: 400,
          lineHeight: 1.43,
        },
        '@media (min-width:600px)': {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: '1rem',
          letterSpacing: `${round(0.15 / 16)}em`,
          fontWeight: 400,
          lineHeight: 1.5,
        },
      });
    });

    it('resolves longhand font props', () => {
      const result = styleFunction({
        theme,
        fontFamily: 'fontFamily',
        fontWeight: 'fontWeightLight',
        fontSize: 'fontSize',
      });

      expect(result).to.deep.equal({
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 300,
        fontSize: 14,
      });
    });
  });

  it('resolves display', () => {
    const result = styleFunction({
      theme,
      displayPrint: 'block',
    });

    expect(result).to.deep.equal({
      '@media print': {
        display: 'block',
      },
    });
  });

  it('resolves borders', () => {
    const result = styleFunction({
      theme,
      border: 1,
      borderColor: 'black',
    });

    expect(result).to.deep.equal({
      border: '1px solid',
      borderColor: 'black',
    });
  });

  describe('breakpoints', () => {
    const breakpointsExpectedResult = {
      '@media (min-width:0px)': { border: '1px solid' },
      '@media (min-width:600px)': { border: '2px solid' },
      '@media (min-width:960px)': { border: '3px solid' },
      '@media (min-width:1280px)': { border: '4px solid' },
      '@media (min-width:1920px)': { border: '5px solid' },
    };

    it('resolves breakpoints array', () => {
      const result = styleFunction({
        theme,
        border: [1, 2, 3, 4, 5],
      });

      expect(result).to.deep.equal(breakpointsExpectedResult);
    });

    it('resolves breakpoints object', () => {
      const result = styleFunction({
        theme,
        border: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        },
      });

      expect(result).to.deep.equal(breakpointsExpectedResult);
    });

    it('merges multiple breakpoints object', () => {
      const result = styleFunction({
        theme,
        m: [1, 2, 3],
        p: [5, 6, 7],
      });

      expect(result).to.deep.equal({
        '@media (min-width:0px)': { padding: '50px', margin: '10px' },
        '@media (min-width:600px)': { padding: '60px', margin: '20px' },
        '@media (min-width:960px)': { padding: '70px', margin: '30px' },
      });
    });

    it('writes breakpoints in correct order', () => {
      const result = styleFunction({
        theme,
        m: { md: 1, lg: 2 },
        p: { xs: 0, sm: 1, md: 2 },
      });

      // Test the order
      expect(Object.keys(result)).to.deep.equal([
        '@media (min-width:0px)',
        '@media (min-width:600px)',
        '@media (min-width:960px)',
        '@media (min-width:1280px)',
      ]);

      expect(result).to.deep.equal({
        '@media (min-width:0px)': { padding: '0px' },
        '@media (min-width:600px)': { padding: '10px' },
        '@media (min-width:960px)': { padding: '20px', margin: '10px' },
        '@media (min-width:1280px)': { margin: '20px' },
      });
    });
  });
});
