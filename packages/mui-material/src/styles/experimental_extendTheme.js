import { deepmerge } from '@mui/utils';
import {
  private_safeColorChannel as safeColorChannel,
  private_safeAlpha as safeAlpha,
  private_safeDarken as safeDarken,
  private_safeLighten as safeLighten,
  private_safeEmphasize as safeEmphasize,
  unstable_createGetCssVar as systemCreateGetCssVar,
  unstable_defaultSxConfig as defaultSxConfig,
  unstable_styleFunctionSx as styleFunctionSx,
  unstable_prepareCssVars as prepareCssVars,
} from '@mui/system';
import defaultShouldSkipGeneratingVar from './shouldSkipGeneratingVar';
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

function setColorChannel(obj, key) {
  if (!(`${key}Channel` in obj)) {
    // custom channel token is not provided, generate one.
    // if channel token can't be generated, show a warning.
    obj[`${key}Channel`] = safeColorChannel(
      obj[key],
      `MUI: Can't create \`palette.${key}Channel\` because \`palette.${key}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` +
        '\n' +
        `To suppress this warning, you need to explicitly provide the \`palette.${key}Channel\` as a string (in rgb format, e.g. "12 12 12") or undefined if you want to remove the channel token.`,
    );
  }
}

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
  const {
    colorSchemes: colorSchemesInput = {},
    cssVarPrefix = 'mui',
    shouldSkipGeneratingVar = defaultShouldSkipGeneratingVar,
    ...input
  } = options;
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

    const setCssVarColor = (cssVar) => {
      const tokens = cssVar.split('-');
      const color = tokens[1];
      const colorToken = tokens[2];
      return getCssVar(cssVar, palette[color][colorToken]);
    };

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
      'Button',
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
      setColor(palette.Alert, 'errorColor', safeDarken(palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', safeDarken(palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', safeDarken(palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', safeDarken(palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', setCssVarColor('palette-error-main'));
      setColor(palette.Alert, 'infoFilledBg', setCssVarColor('palette-info-main'));
      setColor(palette.Alert, 'successFilledBg', setCssVarColor('palette-success-main'));
      setColor(palette.Alert, 'warningFilledBg', setCssVarColor('palette-warning-main'));
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
      setColor(palette.Alert, 'errorStandardBg', safeLighten(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', safeLighten(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', safeLighten(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', safeLighten(palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', setCssVarColor('palette-error-main'));
      setColor(palette.Alert, 'infoIconColor', setCssVarColor('palette-info-main'));
      setColor(palette.Alert, 'successIconColor', setCssVarColor('palette-success-main'));
      setColor(palette.Alert, 'warningIconColor', setCssVarColor('palette-warning-main'));
      setColor(palette.AppBar, 'defaultBg', setCssVarColor('palette-grey-100'));
      setColor(palette.Avatar, 'defaultBg', setCssVarColor('palette-grey-400'));
      setColor(palette.Button, 'inheritContainedBg', setCssVarColor('palette-grey-300'));
      setColor(palette.Button, 'inheritContainedHoverBg', setCssVarColor('palette-grey-A100'));
      setColor(palette.Chip, 'defaultBorder', setCssVarColor('palette-grey-400'));
      setColor(palette.Chip, 'defaultAvatarColor', setCssVarColor('palette-grey-700'));
      setColor(palette.Chip, 'defaultIconColor', setCssVarColor('palette-grey-700'));
      setColor(palette.FilledInput, 'bg', 'rgba(0, 0, 0, 0.06)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(0, 0, 0, 0.09)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(0, 0, 0, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', safeLighten(palette.primary.main, 0.62));
      setColor(palette.LinearProgress, 'secondaryBg', safeLighten(palette.secondary.main, 0.62));
      setColor(palette.LinearProgress, 'errorBg', safeLighten(palette.error.main, 0.62));
      setColor(palette.LinearProgress, 'infoBg', safeLighten(palette.info.main, 0.62));
      setColor(palette.LinearProgress, 'successBg', safeLighten(palette.success.main, 0.62));
      setColor(palette.LinearProgress, 'warningBg', safeLighten(palette.warning.main, 0.62));
      setColor(
        palette.Skeleton,
        'bg',
        `rgba(${setCssVarColor('palette-text-primaryChannel')} / 0.11)`,
      );
      setColor(palette.Slider, 'primaryTrack', safeLighten(palette.primary.main, 0.62));
      setColor(palette.Slider, 'secondaryTrack', safeLighten(palette.secondary.main, 0.62));
      setColor(palette.Slider, 'errorTrack', safeLighten(palette.error.main, 0.62));
      setColor(palette.Slider, 'infoTrack', safeLighten(palette.info.main, 0.62));
      setColor(palette.Slider, 'successTrack', safeLighten(palette.success.main, 0.62));
      setColor(palette.Slider, 'warningTrack', safeLighten(palette.warning.main, 0.62));
      const snackbarContentBackground = safeEmphasize(palette.background.default, 0.8);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(
        palette.SnackbarContent,
        'color',
        silent(() => lightPalette.getContrastText(snackbarContentBackground)),
      );
      setColor(
        palette.SpeedDialAction,
        'fabHoverBg',
        safeEmphasize(palette.background.paper, 0.15),
      );
      setColor(palette.StepConnector, 'border', setCssVarColor('palette-grey-400'));
      setColor(palette.StepContent, 'border', setCssVarColor('palette-grey-400'));
      setColor(palette.Switch, 'defaultColor', setCssVarColor('palette-common-white'));
      setColor(palette.Switch, 'defaultDisabledColor', setCssVarColor('palette-grey-100'));
      setColor(palette.Switch, 'primaryDisabledColor', safeLighten(palette.primary.main, 0.62));
      setColor(palette.Switch, 'secondaryDisabledColor', safeLighten(palette.secondary.main, 0.62));
      setColor(palette.Switch, 'errorDisabledColor', safeLighten(palette.error.main, 0.62));
      setColor(palette.Switch, 'infoDisabledColor', safeLighten(palette.info.main, 0.62));
      setColor(palette.Switch, 'successDisabledColor', safeLighten(palette.success.main, 0.62));
      setColor(palette.Switch, 'warningDisabledColor', safeLighten(palette.warning.main, 0.62));
      setColor(palette.TableCell, 'border', safeLighten(safeAlpha(palette.divider, 1), 0.88));
      setColor(palette.Tooltip, 'bg', safeAlpha(palette.grey[700], 0.92));
    } else {
      setColor(palette.Alert, 'errorColor', safeLighten(palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', safeLighten(palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', safeLighten(palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', safeLighten(palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', setCssVarColor('palette-error-dark'));
      setColor(palette.Alert, 'infoFilledBg', setCssVarColor('palette-info-dark'));
      setColor(palette.Alert, 'successFilledBg', setCssVarColor('palette-success-dark'));
      setColor(palette.Alert, 'warningFilledBg', setCssVarColor('palette-warning-dark'));
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
      setColor(palette.Alert, 'errorStandardBg', safeDarken(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', safeDarken(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', safeDarken(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', safeDarken(palette.warning.light, 0.9));
      setColor(palette.Alert, 'errorIconColor', setCssVarColor('palette-error-main'));
      setColor(palette.Alert, 'infoIconColor', setCssVarColor('palette-info-main'));
      setColor(palette.Alert, 'successIconColor', setCssVarColor('palette-success-main'));
      setColor(palette.Alert, 'warningIconColor', setCssVarColor('palette-warning-main'));
      setColor(palette.AppBar, 'defaultBg', setCssVarColor('palette-grey-900'));
      setColor(palette.AppBar, 'darkBg', setCssVarColor('palette-background-paper')); // specific for dark mode
      setColor(palette.AppBar, 'darkColor', setCssVarColor('palette-text-primary')); // specific for dark mode
      setColor(palette.Avatar, 'defaultBg', setCssVarColor('palette-grey-600'));
      setColor(palette.Button, 'inheritContainedBg', setCssVarColor('palette-grey-800'));
      setColor(palette.Button, 'inheritContainedHoverBg', setCssVarColor('palette-grey-700'));
      setColor(palette.Chip, 'defaultBorder', setCssVarColor('palette-grey-700'));
      setColor(palette.Chip, 'defaultAvatarColor', setCssVarColor('palette-grey-300'));
      setColor(palette.Chip, 'defaultIconColor', setCssVarColor('palette-grey-300'));
      setColor(palette.FilledInput, 'bg', 'rgba(255, 255, 255, 0.09)');
      setColor(palette.FilledInput, 'hoverBg', 'rgba(255, 255, 255, 0.13)');
      setColor(palette.FilledInput, 'disabledBg', 'rgba(255, 255, 255, 0.12)');
      setColor(palette.LinearProgress, 'primaryBg', safeDarken(palette.primary.main, 0.5));
      setColor(palette.LinearProgress, 'secondaryBg', safeDarken(palette.secondary.main, 0.5));
      setColor(palette.LinearProgress, 'errorBg', safeDarken(palette.error.main, 0.5));
      setColor(palette.LinearProgress, 'infoBg', safeDarken(palette.info.main, 0.5));
      setColor(palette.LinearProgress, 'successBg', safeDarken(palette.success.main, 0.5));
      setColor(palette.LinearProgress, 'warningBg', safeDarken(palette.warning.main, 0.5));
      setColor(
        palette.Skeleton,
        'bg',
        `rgba(${setCssVarColor('palette-text-primaryChannel')} / 0.13)`,
      );
      setColor(palette.Slider, 'primaryTrack', safeDarken(palette.primary.main, 0.5));
      setColor(palette.Slider, 'secondaryTrack', safeDarken(palette.secondary.main, 0.5));
      setColor(palette.Slider, 'errorTrack', safeDarken(palette.error.main, 0.5));
      setColor(palette.Slider, 'infoTrack', safeDarken(palette.info.main, 0.5));
      setColor(palette.Slider, 'successTrack', safeDarken(palette.success.main, 0.5));
      setColor(palette.Slider, 'warningTrack', safeDarken(palette.warning.main, 0.5));
      const snackbarContentBackground = safeEmphasize(palette.background.default, 0.98);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(
        palette.SnackbarContent,
        'color',
        silent(() => darkPalette.getContrastText(snackbarContentBackground)),
      );
      setColor(
        palette.SpeedDialAction,
        'fabHoverBg',
        safeEmphasize(palette.background.paper, 0.15),
      );
      setColor(palette.StepConnector, 'border', setCssVarColor('palette-grey-600'));
      setColor(palette.StepContent, 'border', setCssVarColor('palette-grey-600'));
      setColor(palette.Switch, 'defaultColor', setCssVarColor('palette-grey-300'));
      setColor(palette.Switch, 'defaultDisabledColor', setCssVarColor('palette-grey-600'));
      setColor(palette.Switch, 'primaryDisabledColor', safeDarken(palette.primary.main, 0.55));
      setColor(palette.Switch, 'secondaryDisabledColor', safeDarken(palette.secondary.main, 0.55));
      setColor(palette.Switch, 'errorDisabledColor', safeDarken(palette.error.main, 0.55));
      setColor(palette.Switch, 'infoDisabledColor', safeDarken(palette.info.main, 0.55));
      setColor(palette.Switch, 'successDisabledColor', safeDarken(palette.success.main, 0.55));
      setColor(palette.Switch, 'warningDisabledColor', safeDarken(palette.warning.main, 0.55));
      setColor(palette.TableCell, 'border', safeDarken(safeAlpha(palette.divider, 1), 0.68));
      setColor(palette.Tooltip, 'bg', safeAlpha(palette.grey[700], 0.92));
    }

    // MUI X - DataGrid needs this token.
    setColorChannel(palette.background, 'default');

    setColorChannel(palette.common, 'background');
    setColorChannel(palette.common, 'onBackground');

    setColorChannel(palette, 'divider');

    Object.keys(palette).forEach((color) => {
      const colors = palette[color];

      // The default palettes (primary, secondary, error, info, success, and warning) errors are handled by the above `createTheme(...)`.

      if (colors && typeof colors === 'object') {
        // Silent the error for custom palettes.
        if (colors.main) {
          setColor(palette[color], 'mainChannel', safeColorChannel(colors.main));
        }
        if (colors.light) {
          setColor(palette[color], 'lightChannel', safeColorChannel(colors.light));
        }
        if (colors.dark) {
          setColor(palette[color], 'darkChannel', safeColorChannel(colors.dark));
        }
        if (colors.contrastText) {
          setColor(palette[color], 'contrastTextChannel', safeColorChannel(colors.contrastText));
        }

        if (color === 'text') {
          // Text colors: text.primary, text.secondary
          setColorChannel(palette[color], 'primary');
          setColorChannel(palette[color], 'secondary');
        }

        if (color === 'action') {
          // Action colors: action.active, action.selected
          if (colors.active) {
            setColorChannel(palette[color], 'active');
          }
          if (colors.selected) {
            setColorChannel(palette[color], 'selected');
          }
        }
      }
    });
  });

  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  const parserConfig = {
    prefix: cssVarPrefix,
    shouldSkipGeneratingVar,
  };
  const { vars: themeVars, generateCssVars } = prepareCssVars(theme, parserConfig);
  theme.vars = themeVars;
  theme.generateCssVars = generateCssVars;

  theme.shouldSkipGeneratingVar = shouldSkipGeneratingVar;
  theme.unstable_sxConfig = {
    ...defaultSxConfig,
    ...input?.unstable_sxConfig,
  };
  theme.unstable_sx = function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this,
    });
  };

  return theme;
}
