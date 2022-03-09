import { deepmerge } from '@mui/utils';
import { decomposeColor } from '@mui/system';
import createThemeWithoutVars from './createTheme';
import createPalette from './createPalette';

function createTheme(options = {}, ...args) {
  const { colorSchemes: colorSchemesInput = {}, opacity: opacityInput = {}, ...input } = options;

  // eslint-disable-next-line prefer-const
  let { palette: lightPalette, ...muiTheme } = createThemeWithoutVars({
    ...input,
    ...(colorSchemesInput.light && { palette: colorSchemesInput.light.palette }),
  });
  const { palette: darkPalette } = createThemeWithoutVars({
    palette: { mode: 'dark', ...colorSchemesInput.dark?.palette },
  });

  colorSchemesInput.light = { palette: lightPalette };
  colorSchemesInput.dark = { palette: darkPalette };

  const colorSchemes = {};

  Object.keys(colorSchemesInput).forEach((key) => {
    const palette = createPalette(colorSchemesInput[key].palette);

    Object.keys(palette).forEach((color) => {
      const colors = palette[color];

      if (colors.main) {
        palette[color].mainChannel = decomposeColor(colors.main).values.slice(0, 3).join(' ');
      }
      if (colors.light) {
        palette[color].lightChannel = decomposeColor(colors.light).values.slice(0, 3).join(' ');
      }
      if (colors.dark) {
        palette[color].darkChannel = decomposeColor(colors.dark).values.slice(0, 3).join(' ');
      }
      if (colors.primary) {
        palette[color].primaryChannel = decomposeColor(colors.primary).values.slice(0, 3).join(' ');
      }
      if (colors.secondary) {
        palette[color].secondaryChannel = decomposeColor(colors.secondary)
          .values.slice(0, 3)
          .join(' ');
      }
      if (colors.disabled) {
        palette[color].disabledChannel = decomposeColor(colors.disabled)
          .values.slice(0, 3)
          .join(' ');
      }
    });

    colorSchemes[key] = { palette };
  });

  const opacity = {
    active: 0.54,
    hover: 0.04,
    selected: 0.08,
    disabled: 0.26,
    focus: 0.12,
    ...opacityInput,
  };

  muiTheme.colorSchemes = colorSchemes;
  muiTheme.opacity = opacity;

  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);

  return muiTheme;
}

export default createTheme;
