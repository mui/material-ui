import { expect } from 'chai';
import { deepOrange } from '@mui/material/colors';
import createTheme from './createTheme';
import createPalette from '../createPalette';

const lightPalette = createPalette({ mode: 'light' });
const darkPalette = createPalette({ mode: 'dark' });

describe('createTheme', () => {
  describe('Without custom properties', () => {
    it('should not have custom properties', () => {
      const theme = createTheme({ customProperties: false });
      expect(theme.customProperties).to.equal(false);
      expect('vars' in theme).to.equal(false);
    });

    it('color schemes dark: true', () => {
      const theme = createTheme({ customProperties: false, colorSchemes: { dark: true } });
      const { light, dark } = theme.colorSchemes || {};
      expect(light?.palette.primary.main).to.deep.equal(lightPalette.primary.main);
      expect(dark?.palette.primary.main).to.deep.equal(darkPalette.primary.main);
    });

    it('color schemes light: true', () => {
      const theme = createTheme({
        customProperties: false,
        colorSchemes: { light: true },
        palette: { mode: 'dark' },
      });
      const { light, dark } = theme.colorSchemes || {};
      expect(light?.palette.primary.main).to.deep.equal(lightPalette.primary.main);
      expect(dark?.palette.primary.main).to.deep.equal(darkPalette.primary.main);
    });
  });

  it('should have a light as a default colorScheme if only `palette` is provided', () => {
    const theme = createTheme({
      palette: {
        primary: { main: deepOrange[500] },
      },
    });
    expect(theme.defaultColorScheme).to.equal('light');
    expect(theme.palette.primary.main).to.equal(deepOrange[500]);
    expect(theme.vars.palette.primary.main).to.equal(
      `var(--mui-palette-primary-main, ${deepOrange[500]})`,
    );
  });

  it('should have a dark as a default colorScheme if only `palette` is provided', () => {
    const theme = createTheme({
      palette: {
        mode: 'dark',
        primary: { main: deepOrange[500] },
      },
    });
    expect(theme.defaultColorScheme).to.equal('dark');
    expect(theme.palette.primary.main).to.equal(deepOrange[500]);
    expect(theme.vars.palette.primary.main).to.equal(
      `var(--mui-palette-primary-main, ${deepOrange[500]})`,
    );
  });
});
