import { deepmerge } from '@mui/utils';
import { colorChannel } from '@mui/system';
import createThemeWithoutVars from './createTheme';

export const defaultOpacity = {
  active: 0.54,
  hover: 0.04,
  selected: 0.08,
  disabled: 0.26,
  focus: 0.12,
};

export default function extendTheme(options = {}, ...args) {
  const { colorSchemes: colorSchemesInput = {}, ...input } = options;

  const { palette: lightPalette, ...muiTheme } = createThemeWithoutVars({
    ...input,
    ...(colorSchemesInput.light && { palette: colorSchemesInput.light?.palette }),
  });
  const { palette: darkPalette } = createThemeWithoutVars({
    palette: { mode: 'dark', ...colorSchemesInput.dark?.palette },
  });

  let theme = {
    colorSchemes: {
      ...colorSchemesInput,
      light: {
        palette: lightPalette,
        opacity: {
          ...defaultOpacity,
          placeholder: 0.42,
          inputTouchBottomLine: 0.42,
          ...colorSchemesInput.light?.opacity,
        },
      },
      dark: {
        palette: darkPalette,
        opacity: {
          ...defaultOpacity,
          placeholder: 0.5,
          inputTouchBottomLine: 0.7,
          ...colorSchemesInput.dark?.opacity,
        },
      },
    },
    ...muiTheme,
  };

  Object.keys(theme.colorSchemes).forEach((key) => {
    const palette = theme.colorSchemes[key].palette;
    if (palette.background && !palette.background.defaultChannel) {
      if (key === 'dark') {
        palette.background.defaultChannel = '0 0 0';
      } else {
        palette.background.defaultChannel = '255 255 255';
      }
    }
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
  });

  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  return theme;
}
