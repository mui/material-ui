import { expect } from 'chai';
import styleFunctionSx from './styleFunctionSx';

describe('styleFunctionSx', () => {
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
      const result = styleFunctionSx({
        theme,
        sx: {
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
      });

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
      const result = styleFunctionSx({
        theme,
        sx: { typography: ['body2', 'body1'] },
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
  });

  it('resolves non system CSS properties if specified', () => {
    const result = styleFunctionSx({
      theme,
      sx: {
        background: 'rgb(0, 0, 255)',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: {
            xs: 0.1,
            sm: 0.2,
            md: 0.3,
            lg: 0.4,
            xl: 0.5,
          },
          translate: ['transform(10px)', 'transform(20px)'],
          border: [1, 2, 3],
          borderColor: (t) => [t.palette.secondary.main, t.palette.primary.main],
        },
      },
    });

    expect(result).to.deep.equal({
      background: 'rgb(0, 0, 255)',
      '&:hover': {
        backgroundColor: 'rgb(0, 0, 255)',
        '@media (min-width:0px)': {
          opacity: 0.1,
          border: '1px solid',
          borderColor: 'rgb(0, 255, 0)',
          translate: 'transform(10px)',
        },
        '@media (min-width:600px)': {
          opacity: 0.2,
          border: '2px solid',
          borderColor: 'rgb(0, 0, 255)',
          translate: 'transform(20px)',
        },
        '@media (min-width:960px)': { opacity: 0.3, border: '3px solid' },
        '@media (min-width:1280px)': { opacity: 0.4 },
        '@media (min-width:1920px)': { opacity: 0.5 },
      },
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
      const result = styleFunctionSx({
        theme,
        sx: { border: [1, 2, 3, 4, 5] },
      });

      expect(result).to.deep.equal(breakpointsExpectedResult);
    });

    it('resolves breakpoints object', () => {
      const result = styleFunctionSx({
        theme,
        sx: {
          border: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          },
        },
      });

      expect(result).to.deep.equal(breakpointsExpectedResult);
    });

    it('merges multiple breakpoints object', () => {
      const result = styleFunctionSx({
        theme,
        sx: { m: [1, 2, 3], p: [5, 6, 7] },
      });

      expect(result).to.deep.equal({
        '@media (min-width:0px)': { padding: '50px', margin: '10px' },
        '@media (min-width:600px)': { padding: '60px', margin: '20px' },
        '@media (min-width:960px)': { padding: '70px', margin: '30px' },
      });
    });

    it('writes breakpoints in correct order', () => {
      const result = styleFunctionSx({
        theme,
        sx: { m: { md: 1, lg: 2 }, p: { xs: 0, sm: 1, md: 2 } },
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
