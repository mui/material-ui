import { expect } from 'chai';
import { unstable_sx as sx } from '@mui/system';

describe('sx', () => {
  const breakpointsValues = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  const round = (value) => Math.round(value * 1e5) / 1e5;

  const theme = {
    spacing: (val) => `${val * 10}px`,
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl'],
      values: breakpointsValues,
      up: (key) => {
        return `@media (min-width:${breakpointsValues[key]}px)`;
      },
    },
    unit: 'px',
    palette: {
      primary: {
        main: 'rgb(0, 0, 255)',
      },
      secondary: {
        main: 'rgb(0, 255, 0)',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightLight: 300,
      fontSize: 14,
      body1: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '1rem',
        letterSpacing: `${round(0.15 / 16)}em`,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: `${14 / 16}rem`,
        letterSpacing: `${round(0.15 / 14)}em`,
        fontWeight: 400,
        lineHeight: 1.43,
      },
    },
  };

  describe('system', () => {
    it('resolves system ', () => {
      const result = sx(
        {
          color: 'primary.main',
          bgcolor: 'secondary.main',
          m: 2,
          p: 1,
          fontFamily: 'default',
          fontWeight: 'light',
          fontSize: 'fontSize',
          maxWidth: 'sm',
          displayPrint: 'block',
          border: [1, 2, 3, 4, 5],
        },
        theme,
      );

      expect(result).to.deep.equal({
        color: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(0, 255, 0)',
        margin: '20px',
        padding: '10px',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 300,
        fontSize: 14,
        maxWidth: 600,
        '@media print': {
          display: 'block',
        },
        '@media (min-width:0px)': { border: '1px solid' },
        '@media (min-width:600px)': { border: '2px solid' },
        '@media (min-width:960px)': { border: '3px solid' },
        '@media (min-width:1280px)': { border: '4px solid' },
        '@media (min-width:1920px)': { border: '5px solid' },
      });
    });

    it('resolves system typography', () => {
      const result = sx(
        {
          typography: ['body2', 'body1'],
        },
        theme,
      );

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

    it('allow values to be `null` or `undefined`', () => {
      const result = sx({ typography: null, m: 0, p: null, transform: null }, theme);
      expect(result).to.deep.equal({
        margin: '0px',
      });
    });
  });
});
