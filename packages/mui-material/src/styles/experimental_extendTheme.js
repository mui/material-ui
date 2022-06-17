import { deepmerge } from '@mui/utils';
import { colorChannel, alpha, darken, lighten, emphasize } from '@mui/system';
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
          inputPlaceholder: 0.42,
          inputTouchBottomLine: 0.42,
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
          inputPlaceholder: 0.5,
          inputTouchBottomLine: 0.7,
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
      'Alert',
      'AppBar',
      'Chip',
      'FilledInput',
      'LinearProgress',
      'Skeleton',
      'Slider',
      'SnackbarContent',
      'StepConnector',
      'StepContent',
      'Switch',
      'TableCell',
      'Tooltip',
    ]);
    if (key === 'light') {
      setColor(palette.Alert, 'errorColor', darken(palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', darken(palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', darken(palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', darken(palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', 'var(--mui-palette-error-main)');
      setColor(palette.Alert, 'infoFilledBg', 'var(--mui-palette-info-main)');
      setColor(palette.Alert, 'successFilledBg', 'var(--mui-palette-success-main)');
      setColor(palette.Alert, 'warningFilledBg', 'var(--mui-palette-warning-main)');
      setColor(palette.Alert, 'errorStandardBg', lighten(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', lighten(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', lighten(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', lighten(palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', 'var(--mui-palette-error-light)');
      setColor(palette.Alert, 'infoIconColor', 'var(--mui-palette-info-light)');
      setColor(palette.Alert, 'successIconColor', 'var(--mui-palette-success-light)');
      setColor(palette.Alert, 'warningIconColor', 'var(--mui-palette-warning-light)');
      setColor(palette.AppBar, 'defaultBg', 'var(--mui-palette-grey-100)');
      setColor(palette.Chip, 'defaultBorder', 'var(--mui-palette-grey-400)');
      setColor(palette.Chip, 'defaultAvatarColor', 'var(--mui-palette-grey-700)');
      setColor(palette.Chip, 'defaultIconColor', 'var(--mui-palette-grey-700)');
      setColor(palette.FilledInput, 'bg', 'rgba(0, 0, 0, 0.06)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(0, 0, 0, 0.09)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(0, 0, 0, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', lighten(palette.primary.main, 0.62));
      setColor(palette.LinearProgress, 'secondaryBg', lighten(palette.secondary.main, 0.62));
      setColor(palette.LinearProgress, 'errorBg', lighten(palette.error.main, 0.62));
      setColor(palette.LinearProgress, 'infoBg', lighten(palette.info.main, 0.62));
      setColor(palette.LinearProgress, 'successBg', lighten(palette.success.main, 0.62));
      setColor(palette.LinearProgress, 'warningBg', lighten(palette.warning.main, 0.62));
      setColor(palette.Skeleton, 'bg', 'rgba(var(--mui-palette-text-primaryChannel) / 0.11)');
      setColor(palette.Slider, 'primaryTrack', lighten(palette.primary.main, 0.62));
      setColor(palette.Slider, 'secondaryTrack', lighten(palette.secondary.main, 0.62));
      setColor(palette.Slider, 'errorTrack', lighten(palette.error.main, 0.62));
      setColor(palette.Slider, 'infoTrack', lighten(palette.info.main, 0.62));
      setColor(palette.Slider, 'successTrack', lighten(palette.success.main, 0.62));
      setColor(palette.Slider, 'warningTrack', lighten(palette.warning.main, 0.62));
      setColor(palette.SnackbarContent, 'bg', emphasize(palette.background.default, 0.8));
      setColor(palette.StepConnector, 'border', 'var(--mui-palette-grey-400)');
      setColor(palette.StepContent, 'border', 'var(--mui-palette-grey-400)');
      setColor(palette.Switch, 'defaultColor', 'var(--mui-palette-common-white)');
      setColor(palette.Switch, 'defaultDisabledColor', 'var(--mui-palette-grey-100)');
      setColor(palette.Switch, 'primaryDisabledColor', lighten(palette.primary.main, 0.62));
      setColor(palette.Switch, 'secondaryDisabledColor', lighten(palette.secondary.main, 0.62));
      setColor(palette.Switch, 'errorDisabledColor', lighten(palette.error.main, 0.62));
      setColor(palette.Switch, 'infoDisabledColor', lighten(palette.info.main, 0.62));
      setColor(palette.Switch, 'successDisabledColor', lighten(palette.success.main, 0.62));
      setColor(palette.Switch, 'warningDisabledColor', lighten(palette.warning.main, 0.62));
      setColor(palette.TableCell, 'border', lighten(alpha(palette.divider, 1), 0.88));
      setColor(palette.Tooltip, 'bg', alpha(palette.grey[700], 0.92));
    } else {
      setColor(palette.Alert, 'errorColor', lighten(palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', lighten(palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', lighten(palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', lighten(palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', 'var(--mui-palette-error-dark)');
      setColor(palette.Alert, 'infoFilledBg', 'var(--mui-palette-info-dark)');
      setColor(palette.Alert, 'successFilledBg', 'var(--mui-palette-success-dark)');
      setColor(palette.Alert, 'warningFilledBg', 'var(--mui-palette-warning-dark)');
      setColor(palette.Alert, 'errorStandardBg', darken(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', darken(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', darken(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', darken(palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', 'var(--mui-palette-error-main)');
      setColor(palette.Alert, 'infoIconColor', 'var(--mui-palette-info-main)');
      setColor(palette.Alert, 'successIconColor', 'var(--mui-palette-success-main)');
      setColor(palette.Alert, 'warningIconColor', 'var(--mui-palette-warning-main)');
      setColor(palette.AppBar, 'defaultBg', 'var(--mui-palette-grey-900)');
      setColor(palette.AppBar, 'darkBg', 'var(--mui-palette-background-paper)'); // specific for dark mode
      setColor(palette.AppBar, 'darkColor', 'var(--mui-palette-text-primary)'); // specific for dark mode
      setColor(palette.Chip, 'defaultBorder', 'var(--mui-palette-grey-700)');
      setColor(palette.Chip, 'defaultAvatarColor', 'var(--mui-palette-grey-300)');
      setColor(palette.Chip, 'defaultIconColor', 'var(--mui-palette-grey-300)');
      setColor(palette.FilledInput, 'bg', 'rgba(255, 255, 255, 0.09)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(255, 255, 255, 0.13)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(255, 255, 255, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', darken(palette.primary.main, 0.5));
      setColor(palette.LinearProgress, 'secondaryBg', darken(palette.secondary.main, 0.5));
      setColor(palette.LinearProgress, 'errorBg', darken(palette.error.main, 0.5));
      setColor(palette.LinearProgress, 'infoBg', darken(palette.info.main, 0.5));
      setColor(palette.LinearProgress, 'successBg', darken(palette.success.main, 0.5));
      setColor(palette.LinearProgress, 'warningBg', darken(palette.warning.main, 0.5));
      setColor(palette.Skeleton, 'bg', 'rgba(var(--mui-palette-text-primaryChannel) / 0.13)');
      setColor(palette.Slider, 'primaryTrack', darken(palette.primary.main, 0.5));
      setColor(palette.Slider, 'secondaryTrack', darken(palette.secondary.main, 0.5));
      setColor(palette.Slider, 'errorTrack', darken(palette.error.main, 0.5));
      setColor(palette.Slider, 'infoTrack', darken(palette.info.main, 0.5));
      setColor(palette.Slider, 'successTrack', darken(palette.success.main, 0.5));
      setColor(palette.Slider, 'warningTrack', darken(palette.warning.main, 0.5));
      setColor(palette.SnackbarContent, 'bg', emphasize(palette.background.default, 0.98));
      setColor(palette.StepConnector, 'border', 'var(--mui-palette-grey-600)');
      setColor(palette.StepContent, 'border', 'var(--mui-palette-grey-600)');
      setColor(palette.Switch, 'defaultColor', 'var(--mui-palette-grey-300)');
      setColor(palette.Switch, 'defaultDisabledColor', 'var(--mui-palette-grey-600)');
      setColor(palette.Switch, 'primaryDisabledColor', darken(palette.primary.main, 0.55));
      setColor(palette.Switch, 'secondaryDisabledColor', darken(palette.secondary.main, 0.55));
      setColor(palette.Switch, 'errorDisabledColor', darken(palette.error.main, 0.55));
      setColor(palette.Switch, 'infoDisabledColor', darken(palette.info.main, 0.55));
      setColor(palette.Switch, 'successDisabledColor', darken(palette.success.main, 0.55));
      setColor(palette.Switch, 'warningDisabledColor', darken(palette.warning.main, 0.55));
      setColor(palette.TableCell, 'border', darken(alpha(palette.divider, 1), 0.68));
      setColor(palette.Tooltip, 'bg', alpha(palette.grey[700], 0.92));
    }

    palette.common.backgroundChannel = colorChannel(palette.common.background);
    palette.common.onBackgroundChannel = colorChannel(palette.common.onBackground);

    palette.dividerChannel = colorChannel(palette.divider);

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

      // Action colors: action.active, action.selected
      if (colors.active) {
        palette[color].activeChannel = colorChannel(colors.active);
      }
      if (colors.selected) {
        palette[color].selectedChannel = colorChannel(colors.selected);
      }
    });
  });

  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  return theme;
}
