import { deepmerge } from '@mui/utils';
import {
  colorChannel,
  alpha,
  darken,
  lighten,
  emphasize,
  unstable_createGetCssVar as systemCreateGetCssVar,
} from '@mui/system';
import createThemeWithoutVars from './createTheme';
import getOverlayAlpha from './getOverlayAlpha';

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
  if (!obj[key] && defaultValue) {
    obj[key] = defaultValue;
  }
}

const warnDev = (key, fn) => {
  try {
    return fn();
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `MUI: The value of \`${key}\` should be one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().`,
      );
    }
  }
  return undefined;
};

const silent = (fn) => {
  try {
    return fn();
  } catch (error) {
    // ignore error
  }
  return undefined;
};

export const createGetCssVar = (cssVarPrefix = 'mui') => systemCreateGetCssVar(cssVarPrefix);

export default function extendTheme(options = {}, ...args) {
  const { colorSchemes: colorSchemesInput = {}, cssVarPrefix = 'mui', ...input } = options;
  const getCssVar = createGetCssVar(cssVarPrefix);

  const { palette: lightPalette, ...muiTheme } = createThemeWithoutVars({
    ...input,
    ...(colorSchemesInput.light && { palette: colorSchemesInput.light?.palette }),
  });
  const { palette: darkPalette } = createThemeWithoutVars({
    palette: { mode: 'dark', ...colorSchemesInput.dark?.palette },
  });

  let theme = {
    ...muiTheme,
    cssVarPrefix,
    getCssVar,
    colorSchemes: {
      ...colorSchemesInput,
      light: {
        ...colorSchemesInput.light,
        palette: lightPalette,
        opacity: {
          inputPlaceholder: 0.42,
          inputUnderline: 0.42,
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
          inputUnderline: 0.7,
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
      'Avatar',
      'Chip',
      'FilledInput',
      'LinearProgress',
      'Skeleton',
      'Slider',
      'SnackbarContent',
      'SpeedDialAction',
      'StepConnector',
      'StepContent',
      'Switch',
      'TableCell',
      'Tooltip',
    ]);
    if (key === 'light') {
      setColor(
        palette.Alert,
        'errorColor',
        silent(() => darken(palette.error.light, 0.6)),
      );
      setColor(
        palette.Alert,
        'infoColor',
        silent(() => darken(palette.info.light, 0.6)),
      );
      setColor(
        palette.Alert,
        'successColor',
        silent(() => darken(palette.success.light, 0.6)),
      );
      setColor(
        palette.Alert,
        'warningColor',
        silent(() => darken(palette.warning.light, 0.6)),
      );
      setColor(palette.Alert, 'errorFilledBg', getCssVar('palette-error-main'));
      setColor(palette.Alert, 'infoFilledBg', getCssVar('palette-info-main'));
      setColor(palette.Alert, 'successFilledBg', getCssVar('palette-success-main'));
      setColor(palette.Alert, 'warningFilledBg', getCssVar('palette-warning-main'));
      setColor(
        palette.Alert,
        'errorFilledColor',
        silent(() => lightPalette.getContrastText(palette.error.main)),
      );
      setColor(
        palette.Alert,
        'infoFilledColor',
        silent(() => lightPalette.getContrastText(palette.info.main)),
      );
      setColor(
        palette.Alert,
        'successFilledColor',
        silent(() => lightPalette.getContrastText(palette.success.main)),
      );
      setColor(
        palette.Alert,
        'warningFilledColor',
        silent(() => lightPalette.getContrastText(palette.warning.main)),
      );
      setColor(
        palette.Alert,
        'errorStandardBg',
        silent(() => lighten(palette.error.light, 0.9)),
      );
      setColor(
        palette.Alert,
        'infoStandardBg',
        silent(() => lighten(palette.info.light, 0.9)),
      );
      setColor(
        palette.Alert,
        'successStandardBg',
        silent(() => lighten(palette.success.light, 0.9)),
      );
      setColor(
        palette.Alert,
        'warningStandardBg',
        silent(() => lighten(palette.warning.light, 0.9)),
      );
      setColor(palette.Alert, 'errorIconColor', getCssVar('palette-error-light'));
      setColor(palette.Alert, 'infoIconColor', getCssVar('palette-info-light'));
      setColor(palette.Alert, 'successIconColor', getCssVar('palette-success-light'));
      setColor(palette.Alert, 'warningIconColor', getCssVar('palette-warning-light'));
      setColor(palette.AppBar, 'defaultBg', getCssVar('palette-grey-100'));
      setColor(palette.Avatar, 'defaultBg', getCssVar('palette-grey-400'));
      setColor(palette.Chip, 'defaultBorder', getCssVar('palette-grey-400'));
      setColor(palette.Chip, 'defaultAvatarColor', getCssVar('palette-grey-700'));
      setColor(palette.Chip, 'defaultIconColor', getCssVar('palette-grey-700'));
      setColor(palette.FilledInput, 'bg', 'rgba(0, 0, 0, 0.06)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(0, 0, 0, 0.09)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(0, 0, 0, 0.12)');
      setColor(
        palette.LinearProgress,
        'primaryBg',
        silent(() => lighten(palette.primary.main, 0.62)),
      );
      setColor(
        palette.LinearProgress,
        'secondaryBg',
        silent(() => lighten(palette.secondary.main, 0.62)),
      );
      setColor(
        palette.LinearProgress,
        'errorBg',
        silent(() => lighten(palette.error.main, 0.62)),
      );
      setColor(
        palette.LinearProgress,
        'infoBg',
        silent(() => lighten(palette.info.main, 0.62)),
      );
      setColor(
        palette.LinearProgress,
        'successBg',
        silent(() => lighten(palette.success.main, 0.62)),
      );
      setColor(
        palette.LinearProgress,
        'warningBg',
        silent(() => lighten(palette.warning.main, 0.62)),
      );
      setColor(palette.Skeleton, 'bg', `rgba(${getCssVar('palette-text-primaryChannel')} / 0.11)`);
      setColor(
        palette.Slider,
        'primaryTrack',
        silent(() => lighten(palette.primary.main, 0.62)),
      );
      setColor(
        palette.Slider,
        'secondaryTrack',
        silent(() => lighten(palette.secondary.main, 0.62)),
      );
      setColor(
        palette.Slider,
        'errorTrack',
        silent(() => lighten(palette.error.main, 0.62)),
      );
      setColor(
        palette.Slider,
        'infoTrack',
        silent(() => lighten(palette.info.main, 0.62)),
      );
      setColor(
        palette.Slider,
        'successTrack',
        silent(() => lighten(palette.success.main, 0.62)),
      );
      setColor(
        palette.Slider,
        'warningTrack',
        silent(() => lighten(palette.warning.main, 0.62)),
      );
      const snackbarContentBackground = silent(() => emphasize(palette.background.default, 0.8));
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(
        palette.SnackbarContent,
        'color',
        silent(() => lightPalette.getContrastText(snackbarContentBackground)),
      );
      setColor(
        palette.SpeedDialAction,
        'fabHoverBg',
        silent(() => emphasize(palette.background.paper, 0.15)),
      );
      setColor(palette.StepConnector, 'border', getCssVar('palette-grey-400'));
      setColor(palette.StepContent, 'border', getCssVar('palette-grey-400'));
      setColor(palette.Switch, 'defaultColor', getCssVar('palette-common-white'));
      setColor(palette.Switch, 'defaultDisabledColor', getCssVar('palette-grey-100'));
      setColor(
        palette.Switch,
        'primaryDisabledColor',
        silent(() => lighten(palette.primary.main, 0.62)),
      );
      setColor(
        palette.Switch,
        'secondaryDisabledColor',
        silent(() => lighten(palette.secondary.main, 0.62)),
      );
      setColor(
        palette.Switch,
        'errorDisabledColor',
        silent(() => lighten(palette.error.main, 0.62)),
      );
      setColor(
        palette.Switch,
        'infoDisabledColor',
        silent(() => lighten(palette.info.main, 0.62)),
      );
      setColor(
        palette.Switch,
        'successDisabledColor',
        silent(() => lighten(palette.success.main, 0.62)),
      );
      setColor(
        palette.Switch,
        'warningDisabledColor',
        silent(() => lighten(palette.warning.main, 0.62)),
      );
      setColor(
        palette.TableCell,
        'border',
        silent(() => lighten(alpha(palette.divider, 1), 0.88)),
      );
      setColor(
        palette.Tooltip,
        'bg',
        silent(() => alpha(palette.grey[700], 0.92)),
      );
    } else {
      setColor(
        palette.Alert,
        'errorColor',
        silent(() => lighten(palette.error.light, 0.6)),
      );
      setColor(
        palette.Alert,
        'infoColor',
        silent(() => lighten(palette.info.light, 0.6)),
      );
      setColor(
        palette.Alert,
        'successColor',
        silent(() => lighten(palette.success.light, 0.6)),
      );
      setColor(
        palette.Alert,
        'warningColor',
        silent(() => lighten(palette.warning.light, 0.6)),
      );
      setColor(palette.Alert, 'errorFilledBg', getCssVar('palette-error-dark'));
      setColor(palette.Alert, 'infoFilledBg', getCssVar('palette-info-dark'));
      setColor(palette.Alert, 'successFilledBg', getCssVar('palette-success-dark'));
      setColor(palette.Alert, 'warningFilledBg', getCssVar('palette-warning-dark'));
      setColor(
        palette.Alert,
        'errorFilledColor',
        silent(() => darkPalette.getContrastText(palette.error.dark)),
      );
      setColor(
        palette.Alert,
        'infoFilledColor',
        silent(() => darkPalette.getContrastText(palette.info.dark)),
      );
      setColor(
        palette.Alert,
        'successFilledColor',
        silent(() => darkPalette.getContrastText(palette.success.dark)),
      );
      setColor(
        palette.Alert,
        'warningFilledColor',
        silent(() => darkPalette.getContrastText(palette.warning.dark)),
      );
      setColor(
        palette.Alert,
        'errorStandardBg',
        silent(() => darken(palette.error.light, 0.9)),
      );
      setColor(
        palette.Alert,
        'infoStandardBg',
        silent(() => darken(palette.info.light, 0.9)),
      );
      setColor(
        palette.Alert,
        'successStandardBg',
        silent(() => darken(palette.success.light, 0.9)),
      );
      setColor(
        palette.Alert,
        'warningStandardBg',
        silent(() => darken(palette.warning.light, 0.9)),
      );
      setColor(palette.Alert, 'errorIconColor', getCssVar('palette-error-main'));
      setColor(palette.Alert, 'infoIconColor', getCssVar('palette-info-main'));
      setColor(palette.Alert, 'successIconColor', getCssVar('palette-success-main'));
      setColor(palette.Alert, 'warningIconColor', getCssVar('palette-warning-main'));
      setColor(palette.AppBar, 'defaultBg', getCssVar('palette-grey-900'));
      setColor(palette.AppBar, 'darkBg', getCssVar('palette-background-paper')); // specific for dark mode
      setColor(palette.AppBar, 'darkColor', getCssVar('palette-text-primary')); // specific for dark mode
      setColor(palette.Avatar, 'defaultBg', getCssVar('palette-grey-600'));
      setColor(palette.Chip, 'defaultBorder', getCssVar('palette-grey-700'));
      setColor(palette.Chip, 'defaultAvatarColor', getCssVar('palette-grey-300'));
      setColor(palette.Chip, 'defaultIconColor', getCssVar('palette-grey-300'));
      setColor(palette.FilledInput, 'bg', 'rgba(255, 255, 255, 0.09)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(255, 255, 255, 0.13)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(255, 255, 255, 0.12)');
      setColor(
        palette.LinearProgress,
        'primaryBg',
        silent(() => darken(palette.primary.main, 0.5)),
      );
      setColor(
        palette.LinearProgress,
        'secondaryBg',
        silent(() => darken(palette.secondary.main, 0.5)),
      );
      setColor(
        palette.LinearProgress,
        'errorBg',
        silent(() => darken(palette.error.main, 0.5)),
      );
      setColor(
        palette.LinearProgress,
        'infoBg',
        silent(() => darken(palette.info.main, 0.5)),
      );
      setColor(
        palette.LinearProgress,
        'successBg',
        silent(() => darken(palette.success.main, 0.5)),
      );
      setColor(
        palette.LinearProgress,
        'warningBg',
        silent(() => darken(palette.warning.main, 0.5)),
      );
      setColor(palette.Skeleton, 'bg', `rgba(${getCssVar('palette-text-primaryChannel')} / 0.13)`);
      setColor(
        palette.Slider,
        'primaryTrack',
        silent(() => darken(palette.primary.main, 0.5)),
      );
      setColor(
        palette.Slider,
        'secondaryTrack',
        silent(() => darken(palette.secondary.main, 0.5)),
      );
      setColor(
        palette.Slider,
        'errorTrack',
        silent(() => darken(palette.error.main, 0.5)),
      );
      setColor(
        palette.Slider,
        'infoTrack',
        silent(() => darken(palette.info.main, 0.5)),
      );
      setColor(
        palette.Slider,
        'successTrack',
        silent(() => darken(palette.success.main, 0.5)),
      );
      setColor(
        palette.Slider,
        'warningTrack',
        silent(() => darken(palette.warning.main, 0.5)),
      );
      const snackbarContentBackground = silent(() => emphasize(palette.background.default, 0.98));
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(
        palette.SnackbarContent,
        'color',
        silent(() => darkPalette.getContrastText(snackbarContentBackground)),
      );
      setColor(
        palette.SpeedDialAction,
        'fabHoverBg',
        silent(() => emphasize(palette.background.paper, 0.15)),
      );
      setColor(palette.StepConnector, 'border', getCssVar('palette-grey-600'));
      setColor(palette.StepContent, 'border', getCssVar('palette-grey-600'));
      setColor(palette.Switch, 'defaultColor', getCssVar('palette-grey-300'));
      setColor(palette.Switch, 'defaultDisabledColor', getCssVar('palette-grey-600'));
      setColor(
        palette.Switch,
        'primaryDisabledColor',
        silent(() => darken(palette.primary.main, 0.55)),
      );
      setColor(
        palette.Switch,
        'secondaryDisabledColor',
        silent(() => darken(palette.secondary.main, 0.55)),
      );
      setColor(
        palette.Switch,
        'errorDisabledColor',
        silent(() => darken(palette.error.main, 0.55)),
      );
      setColor(
        palette.Switch,
        'infoDisabledColor',
        silent(() => darken(palette.info.main, 0.55)),
      );
      setColor(
        palette.Switch,
        'successDisabledColor',
        silent(() => darken(palette.success.main, 0.55)),
      );
      setColor(
        palette.Switch,
        'warningDisabledColor',
        silent(() => darken(palette.warning.main, 0.55)),
      );
      setColor(
        palette.TableCell,
        'border',
        silent(() => darken(alpha(palette.divider, 1), 0.68)),
      );
      setColor(
        palette.Tooltip,
        'bg',
        silent(() => alpha(palette.grey[700], 0.92)),
      );
    }

    setColor(
      palette.background,
      'defaultChannel',
      warnDev('palette.background.default', () => colorChannel(palette.background.default)),
    ); // MUI X - DataGrid needs this token.

    setColor(
      palette.common,
      'backgroundChannel',
      warnDev('palette.common.background', () => colorChannel(palette.common.background)),
    );
    setColor(
      palette.common,
      'onBackgroundChannel',
      warnDev('palette.common.onBackground', () => colorChannel(palette.common.onBackground)),
    );

    setColor(
      palette,
      'dividerChannel',
      warnDev('palette.divider', () => colorChannel(palette.divider)),
    );

    Object.keys(palette).forEach((color) => {
      const colors = palette[color];

      // The default palettes (primary, secondary, error, info, success, and warning) errors are handled by the above `createTheme(...)`.

      if (colors && typeof colors === 'object') {
        // Silent the error for custom palettes.
        if (colors.main) {
          setColor(
            palette[color],
            'mainChannel',
            silent(() => colorChannel(colors.main)),
          );
        }
        if (colors.light) {
          setColor(
            palette[color],
            'lightChannel',
            silent(() => colorChannel(colors.light)),
          );
        }
        if (colors.dark) {
          setColor(
            palette[color],
            'darkChannel',
            silent(() => colorChannel(colors.dark)),
          );
        }
        if (colors.contrastText) {
          setColor(
            palette[color],
            'contrastTextChannel',
            silent(() => colorChannel(colors.contrastText)),
          );
        }

        if (color === 'text') {
          // Text colors: text.primary, text.secondary
          setColor(
            palette[color],
            'primaryChannel',
            warnDev('palette.text.primary', () => colorChannel(colors.primary)),
          );
          setColor(
            palette[color],
            'secondaryChannel',
            warnDev('palette.text.secondary', () => colorChannel(colors.secondary)),
          );
        }

        if (color === 'action') {
          // Action colors: action.active, action.selected
          if (colors.active) {
            setColor(
              palette[color],
              'activeChannel',
              warnDev('palette.action.active', () => colorChannel(colors.active)),
            );
          }
          if (colors.selected) {
            setColor(
              palette[color],
              'selectedChannel',
              warnDev('palette.action.selected', () => colorChannel(colors.selected)),
            );
          }
        }
      }
    });
  });

  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  return theme;
}
