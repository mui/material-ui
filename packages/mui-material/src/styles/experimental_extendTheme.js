import { deepmerge } from '@mui/utils';
import { colorChannel, darken, lighten, emphasize } from '@mui/system';
import createThemeWithoutVars from './createTheme';
import { getOverlayAlpha } from '../Paper/Paper';

const defaultDarkOverlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return undefined;
  }
  const overlay = getOverlayAlpha(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
});

function assignNode(obj, keys) {
  keys.forEach((k) => {
    if (!obj[k]) {
      obj[k] = {};
    }
  });
}

function setColor(obj, key, defaultValue) {
  obj[key] = obj[key] || defaultValue;
}

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
          skeletonBg: 0.11,
          switchTrackDisabled: 0.12,
          switchTrack: 0.38,
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
          skeletonBg: 0.13,
          switchTrackDisabled: 0.2,
          switchTrack: 0.3,
          ...colorSchemesInput.dark?.opacity,
        },
        overlays: colorSchemesInput.dark?.overlays || defaultDarkOverlays,
      },
    },
  };

  Object.keys(theme.colorSchemes).forEach((key) => {
    const palette = theme.colorSchemes[key].palette;

    // attach black & white channels to common node
    if (key === 'light') {
      setColor(palette.common, 'background', '#fff');
      setColor(palette.common, 'onBackground', '#000');
    } else {
      setColor(palette.common, 'background', '#000');
      setColor(palette.common, 'onBackground', '#fff');
    }

    // assign component variables
    assignNode(palette, [
      'AppBar',
      'Chip',
      'FilledInput',
      'LinearProgress',
      'Slider',
      'SnackbarContent',
      'StepConnector',
      'StepContent',
      'Switch',
    ]);
    if (key === 'light') {
      setColor(palette.AppBar, 'defaultBgColor', 'var(--md-palette-grey-100)');
      setColor(palette.Chip, 'defaultBorderColor', 'var(--md-palette-grey-400)');
      setColor(palette.FilledInput, 'bgColor', 'rgba(0, 0, 0, 0.06)');
      setColor(palette.FilledInput, 'hoverBgColor', 'rgba(0, 0, 0, 0.09)');
      setColor(palette.FilledInput, 'disabledBgColor', 'rgba(0, 0, 0, 0.12)');
      setColor(palette.LinearProgress, 'primaryBgColor', lighten(palette.primary.main, 0.62));
      setColor(palette.LinearProgress, 'secondaryBgColor', lighten(palette.secondary.main, 0.62));
      setColor(palette.LinearProgress, 'errorBgColor', lighten(palette.error.main, 0.62));
      setColor(palette.LinearProgress, 'infoBgColor', lighten(palette.info.main, 0.62));
      setColor(palette.LinearProgress, 'successBgColor', lighten(palette.success.main, 0.62));
      setColor(palette.LinearProgress, 'warningBgColor', lighten(palette.warning.main, 0.62));
      setColor(palette.Slider, 'primaryTrack', lighten(palette.primary.main, 0.62));
      setColor(palette.Slider, 'secondaryTrack', lighten(palette.secondary.main, 0.62));
      setColor(palette.Slider, 'errorTrack', lighten(palette.error.main, 0.62));
      setColor(palette.Slider, 'infoTrack', lighten(palette.info.main, 0.62));
      setColor(palette.Slider, 'successTrack', lighten(palette.success.main, 0.62));
      setColor(palette.Slider, 'warningTrack', lighten(palette.warning.main, 0.62));
      setColor(palette.SnackbarContent, 'bgColor', emphasize(palette.background.default, 0.8));
      setColor(palette.StepConnector, 'borderColor', 'var(--md-palette-grey-400)');
      setColor(palette.StepContent, 'borderColor', 'var(--md-palette-grey-400)');
      setColor(palette.Switch, 'defaultColor', 'var(--md-palette-common-white)');
      setColor(palette.Switch, 'defaultDisabledColor', 'var(--md-palette-grey-100)');
      setColor(palette.Switch, 'primaryDisabledColor', lighten(palette.primary.main, 0.62));
      setColor(palette.Switch, 'secondaryDisabledColor', lighten(palette.secondary.main, 0.62));
      setColor(palette.Switch, 'errorDisabledColor', lighten(palette.error.main, 0.62));
      setColor(palette.Switch, 'infoDisabledColor', lighten(palette.info.main, 0.62));
      setColor(palette.Switch, 'successDisabledColor', lighten(palette.success.main, 0.62));
      setColor(palette.Switch, 'warningDisabledColor', lighten(palette.warning.main, 0.62));
    } else {
      setColor(palette.AppBar, 'defaultBgColor', 'var(--md-palette-grey-900)');
      setColor(palette.Chip, 'defaultBorderColor', 'var(--md-palette-grey-700)');
      setColor(palette.FilledInput, 'bgColor', 'rgba(255, 255, 255, 0.09)');
      setColor(palette.FilledInput, 'hoverBgColor', 'rgba(255, 255, 255, 0.13)');
      setColor(palette.FilledInput, 'disabledBgColor', 'rgba(255, 255, 255, 0.12)');
      setColor(palette.LinearProgress, 'primaryBgColor', darken(palette.primary.main, 0.5));
      setColor(palette.LinearProgress, 'secondaryBgColor', darken(palette.secondary.main, 0.5));
      setColor(palette.LinearProgress, 'errorBgColor', darken(palette.error.main, 0.5));
      setColor(palette.LinearProgress, 'infoBgColor', darken(palette.info.main, 0.5));
      setColor(palette.LinearProgress, 'successBgColor', darken(palette.success.main, 0.5));
      setColor(palette.LinearProgress, 'warningBgColor', darken(palette.warning.main, 0.5));
      setColor(palette.Slider, 'primaryTrack', darken(palette.primary.main, 0.5));
      setColor(palette.Slider, 'secondaryTrack', darken(palette.secondary.main, 0.5));
      setColor(palette.Slider, 'errorTrack', darken(palette.error.main, 0.5));
      setColor(palette.Slider, 'infoTrack', darken(palette.info.main, 0.5));
      setColor(palette.Slider, 'successTrack', darken(palette.success.main, 0.5));
      setColor(palette.Slider, 'warningTrack', darken(palette.warning.main, 0.5));
      setColor(palette.SnackbarContent, 'bgColor', emphasize(palette.background.default, 0.98));
      setColor(palette.AppBar, 'defaultBgColor', 'var(--md-palette-grey-900)');
      setColor(palette.StepConnector, 'borderColor', 'var(--md-palette-grey-600)');
      setColor(palette.StepContent, 'borderColor', 'var(--md-palette-grey-600)');
      setColor(palette.Switch, 'defaultColor', 'var(--md-palette-grey-300)');
      setColor(palette.Switch, 'defaultDisabledColor', 'var(--md-palette-grey-600)');
      setColor(palette.Switch, 'primaryDisabledColor', darken(palette.primary.main, 0.55));
      setColor(palette.Switch, 'secondaryDisabledColor', darken(palette.secondary.main, 0.55));
      setColor(palette.Switch, 'errorDisabledColor', darken(palette.error.main, 0.55));
      setColor(palette.Switch, 'infoDisabledColor', darken(palette.info.main, 0.55));
      setColor(palette.Switch, 'successDisabledColor', darken(palette.success.main, 0.55));
      setColor(palette.Switch, 'warningDisabledColor', darken(palette.warning.main, 0.55));
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
