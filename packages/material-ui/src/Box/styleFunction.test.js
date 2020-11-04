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
  });

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

  it('resolves typography', () => {
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

  describe('sx prop', () => {
    it('resolves system', () => {
      const result = styleFunction({
        theme,
        sx: {
          color: 'primary.main',
          bgcolor: 'secondary.main',
          m: 2,
          p: 1,
          fontFamily: 'fontFamily',
          fontWeight: 'fontWeightLight',
          fontSize: 'fontSize',
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

    it('resolves non system CSS properties if specified', () => {
      const result = styleFunction({
        theme,
        sx: {
          background: 'rgb(0, 0, 255)',
          ':hover': {
            backgroundColor: 'primary.main',
            opacity: {
              xs: 0.1,
              sm: 0.2,
              md: 0.3,
              lg: 0.4,
              xl: 0.5,
            },
            border: [1, 2, 3],
            borderColor: (t) => t.palette.secondary.main,
          },
        },
      });

      expect(result).to.deep.equal({
        background: 'rgb(0, 0, 255)',
        ':hover': {
          backgroundColor: 'rgb(0, 0, 255)',
          '@media (min-width:0px)': { opacity: 0.1, border: '1px solid' },
          '@media (min-width:600px)': { opacity: 0.2, border: '2px solid' },
          '@media (min-width:960px)': { opacity: 0.3, border: '3px solid' },
          '@media (min-width:1280px)': { opacity: 0.4 },
          '@media (min-width:1920px)': { opacity: 0.5 },
          borderColor: 'rgb(0, 255, 0)',
        },
      });
    });

    it('writes breakpoints in correct order', () => {
      const result = styleFunction({
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

    it('merges breakpoints from props and sx', () => {
      const result = styleFunction({
        theme,
        m: [1, 2, 3],
        sx: { p: [5, 6, 7] },
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
        sx: { p: { xs: 0, sm: 1, md: 2 } },
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
