import { deepmerge } from '@mui/utils';
import { colorChannel } from '@mui/system';
import createThemeWithoutVars from './createTheme';
import createPalette from './createPalette';

export const defaultOpacity = {
  active: 0.54,
  hover: 0.04,
  selected: 0.08,
  disabled: 0.26,
  focus: 0.12,
};

function createTheme(options = {}, ...args) {
  const { colorSchemes: colorSchemesInput = {}, opacity: opacityInput = {}, ...input } = options;

  // eslint-disable-next-line prefer-const
  let { palette: lightPalette, ...muiTheme } = createThemeWithoutVars({
    ...input,
    ...(colorSchemesInput.light && { palette: colorSchemesInput.light?.palette }),
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
        palette[color].mainChannel = colorChannel(colors.main);
      }
      if (colors.light) {
        palette[color].lightChannel = colorChannel(colors.light);
      }
      if (colors.dark) {
        palette[color].darkChannel = colorChannel(colors.dark);
      }
      if (colors.primary) {
        palette[color].primaryChannel = colorChannel(colors.primary);
      }
      if (colors.secondary) {
        palette[color].secondaryChannel = colorChannel(colors.secondary);
      }
      if (colors.disabled) {
        palette[color].disabledChannel = colorChannel(colors.disabled);
      }
    });

    colorSchemes[key] = { palette };
  });

  const opacity = {
    ...defaultOpacity,
    ...opacityInput,
  };

  muiTheme.colorSchemes = colorSchemes;
  muiTheme.opacity = opacity;

  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);

  return muiTheme;
}

export default createTheme;
