import { deepmerge } from '@mui/utils';
import { colorChannel } from '@mui/system';
import createThemeWithoutVars from './createTheme';
import { getOverlayAlpha } from '../Paper/Paper';

const defaultDarkOverlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return undefined;
  }
  const overlay = getOverlayAlpha(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});

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
    ...muiTheme,
    colorSchemes: {
      ...colorSchemesInput,
      light: {
        ...colorSchemesInput.light,
        palette: lightPalette,
        opacity: {
          placeholder: 0.42,
          inputTouchBottomLine: 0.42,
          ...colorSchemesInput.light?.opacity,
        },
        overlays: colorSchemesInput.light?.overlays || [],
      },
      dark: {
        ...colorSchemesInput.dark,
        palette: darkPalette,
        opacity: {
          placeholder: 0.5,
          inputTouchBottomLine: 0.7,
          ...colorSchemesInput.dark?.opacity,
        },
        overlays: colorSchemesInput.dark?.overlays || defaultDarkOverlays,
      },
    },
  };

  Object.keys(theme.colorSchemes).forEach((key) => {
    const palette = theme.colorSchemes[key].palette;

    // attach black & white channels to common node
    if (key === 'dark') {
      palette.common.background = palette.common.background || '#000';
      palette.common.onBackground = palette.common.onBackground || '#fff';
    } else {
      palette.common.background = palette.common.background || '#fff';
      palette.common.onBackground = palette.common.onBackground || '#000';
    }

    palette.common.backgroundChannel = colorChannel(palette.common.background);
    palette.common.onBackgroundChannel = colorChannel(palette.common.onBackground);

    palette.dividerChannel = colorChannel(palette.divider);

    // special token for Tooltip
    // TODO: consider adding `main`, and `light` to palette.grey to make it consistent.
    if (!palette.grey.dark) {
      palette.grey.dark = palette.grey[700];
    }

    Object.keys(palette).forEach((color) => {
      const colors = palette[color];

      // Color palettes: primary, secondary, error, info, success, and warning
      if (colors.main) {
        palette[color].mainChannel = colorChannel(colors.main);
      }
      if (colors.light) {
        palette[color].lightChannel = colorChannel(colors.light);
      }
      if (colors.dark) {
        palette[color].darkChannel = colorChannel(colors.dark);
      }
      if (colors.contrastText) {
        palette[color].contrastTextChannel = colorChannel(colors.contrastText);
      }

      // Text colors: text.primary, text.secondary
      if (colors.primary) {
        palette[color].primaryChannel = colorChannel(colors.primary);
      }
      if (colors.secondary) {
        palette[color].secondaryChannel = colorChannel(colors.secondary);
      }

      // Action colors: action.activeChannel
      if (colors.active) {
        palette[color].activeChannel = colorChannel(colors.active);
      }
    });
  });

  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  return theme;
}
