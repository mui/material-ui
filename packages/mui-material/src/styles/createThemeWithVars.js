import MuiError from '@mui/internal-babel-macros/MuiError.macro';
import deepmerge from '@mui/utils/deepmerge';
import { unstable_createGetCssVar as systemCreateGetCssVar, createSpacing } from '@mui/system';
import { createUnarySpacing } from '@mui/system/spacing';
import {
  prepareCssVars,
  prepareTypographyVars,
  createGetColorSchemeSelector,
} from '@mui/system/cssVars';
import styleFunctionSx, {
  unstable_defaultSxConfig as defaultSxConfig,
} from '@mui/system/styleFunctionSx';

import {
  private_safeColorChannel as safeColorChannel,
  private_safeAlpha as safeAlpha,
  private_safeDarken as safeDarken,
  private_safeLighten as safeLighten,
  private_safeEmphasize as safeEmphasize,
  hslToRgb,
} from '@mui/system/colorManipulator';

import createThemeNoVars from './createThemeNoVars';
import createColorScheme, { getOpacity, getOverlays } from './createColorScheme';
import defaultShouldSkipGeneratingVar from './shouldSkipGeneratingVar';
import defaultGetSelector from './createGetSelector';
import { stringifyTheme } from './stringifyTheme';

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

function toRgb(color) {
  if (!color || !color.startsWith('hsl')) {
    return color;
  }
  return hslToRgb(color);
}

function setColorChannel(obj, key) {
  if (!(`${key}Channel` in obj)) {
    // custom channel token is not provided, generate one.
    // if channel token can't be generated, show a warning.
    obj[`${key}Channel`] = safeColorChannel(
      toRgb(obj[key]),
      `MUI: Can't create \`palette.${key}Channel\` because \`palette.${key}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` +
        '\n' +
        `To suppress this warning, you need to explicitly provide the \`palette.${key}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`,
    );
  }
}

function getSpacingVal(spacingInput) {
  if (typeof spacingInput === 'number') {
    return `${spacingInput}px`;
  }
  if (
    typeof spacingInput === 'string' ||
    typeof spacingInput === 'function' ||
    Array.isArray(spacingInput)
  ) {
    return spacingInput;
  }
  return '8px';
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

function attachColorScheme(colorSchemes, scheme, restTheme, colorScheme) {
  if (!scheme) {
    return undefined;
  }
  scheme = scheme === true ? {} : scheme;
  const mode = colorScheme === 'dark' ? 'dark' : 'light';
  if (!restTheme) {
    colorSchemes[colorScheme] = createColorScheme({
      ...scheme,
      palette: { mode, ...scheme?.palette },
    });
    return undefined;
  }
  const { palette, ...muiTheme } = createThemeNoVars({
    ...restTheme,
    palette: { mode, ...scheme?.palette },
  });
  colorSchemes[colorScheme] = {
    ...scheme,
    palette,
    opacity: {
      ...getOpacity(mode),
      ...scheme?.opacity,
    },
    overlays: scheme?.overlays || getOverlays(mode),
  };
  return muiTheme;
}

/**
 * A default `createThemeWithVars` comes with a single color scheme, either `light` or `dark` based on the `defaultColorScheme`.
 * This is better suited for apps that only need a single color scheme.
 *
 * To enable built-in `light` and `dark` color schemes, either:
 * 1. provide a `colorSchemeSelector` to define how the color schemes will change.
 * 2. provide `colorSchemes.dark` will set `colorSchemeSelector: 'media'` by default.
 */
export default function createThemeWithVars(options = {}, ...args) {
  const {
    colorSchemes: colorSchemesInput = { light: true },
    defaultColorScheme: defaultColorSchemeInput,
    disableCssColorScheme = false,
    cssVarPrefix = 'mui',
    shouldSkipGeneratingVar = defaultShouldSkipGeneratingVar,
    colorSchemeSelector: selector = colorSchemesInput.light && colorSchemesInput.dark
      ? 'media'
      : undefined,
    ...input
  } = options;
  const firstColorScheme = Object.keys(colorSchemesInput)[0];
  const defaultColorScheme =
    defaultColorSchemeInput ||
    (colorSchemesInput.light && firstColorScheme !== 'light' ? 'light' : firstColorScheme);
  const getCssVar = createGetCssVar(cssVarPrefix);
  const {
    [defaultColorScheme]: defaultSchemeInput,
    light: builtInLight,
    dark: builtInDark,
    ...customColorSchemes
  } = colorSchemesInput;
  const colorSchemes = { ...customColorSchemes };
  let defaultScheme = defaultSchemeInput;

  // For built-in light and dark color schemes, ensure that the value is valid if they are the default color scheme.
  if (
    (defaultColorScheme === 'dark' && !('dark' in colorSchemesInput)) ||
    (defaultColorScheme === 'light' && !('light' in colorSchemesInput))
  ) {
    defaultScheme = true;
  }

  if (!defaultScheme) {
    throw new MuiError(
      'MUI: The `colorSchemes.%s` option is either missing or invalid.',
      defaultColorScheme,
    );
  }

  // Create the palette for the default color scheme, either `light`, `dark`, or custom color scheme.
  const muiTheme = attachColorScheme(colorSchemes, defaultScheme, input, defaultColorScheme);

  if (builtInLight && !colorSchemes.light) {
    attachColorScheme(colorSchemes, builtInLight, undefined, 'light');
  }

  if (builtInDark && !colorSchemes.dark) {
    attachColorScheme(colorSchemes, builtInDark, undefined, 'dark');
  }

  let theme = {
    defaultColorScheme,
    ...muiTheme,
    cssVarPrefix,
    colorSchemeSelector: selector,
    getCssVar,
    colorSchemes,
    font: { ...prepareTypographyVars(muiTheme.typography), ...muiTheme.font },
    spacing: getSpacingVal(input.spacing),
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
    if (palette.mode === 'light') {
      setColor(palette.common, 'background', '#fff');
      setColor(palette.common, 'onBackground', '#000');
    }
    if (palette.mode === 'dark') {
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
    if (palette.mode === 'light') {
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
        silent(() => palette.getContrastText(palette.error.main)),
      );
      setColor(
        palette.Alert,
        'infoFilledColor',
        silent(() => palette.getContrastText(palette.info.main)),
      );
      setColor(
        palette.Alert,
        'successFilledColor',
        silent(() => palette.getContrastText(palette.success.main)),
      );
      setColor(
        palette.Alert,
        'warningFilledColor',
        silent(() => palette.getContrastText(palette.warning.main)),
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
        silent(() => palette.getContrastText(snackbarContentBackground)),
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
    }
    if (palette.mode === 'dark') {
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
        silent(() => palette.getContrastText(palette.error.dark)),
      );
      setColor(
        palette.Alert,
        'infoFilledColor',
        silent(() => palette.getContrastText(palette.info.dark)),
      );
      setColor(
        palette.Alert,
        'successFilledColor',
        silent(() => palette.getContrastText(palette.success.dark)),
      );
      setColor(
        palette.Alert,
        'warningFilledColor',
        silent(() => palette.getContrastText(palette.warning.dark)),
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
        silent(() => palette.getContrastText(snackbarContentBackground)),
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

    // added for consistency with the `background.default` token
    setColorChannel(palette.background, 'paper');

    setColorChannel(palette.common, 'background');
    setColorChannel(palette.common, 'onBackground');

    setColorChannel(palette, 'divider');

    Object.keys(palette).forEach((color) => {
      const colors = palette[color];

      // The default palettes (primary, secondary, error, info, success, and warning) errors are handled by the above `createTheme(...)`.

      if (colors && typeof colors === 'object') {
        // Silent the error for custom palettes.
        if (colors.main) {
          setColor(palette[color], 'mainChannel', safeColorChannel(toRgb(colors.main)));
        }
        if (colors.light) {
          setColor(palette[color], 'lightChannel', safeColorChannel(toRgb(colors.light)));
        }
        if (colors.dark) {
          setColor(palette[color], 'darkChannel', safeColorChannel(toRgb(colors.dark)));
        }
        if (colors.contrastText) {
          setColor(
            palette[color],
            'contrastTextChannel',
            safeColorChannel(toRgb(colors.contrastText)),
          );
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
    disableCssColorScheme,
    shouldSkipGeneratingVar,
    getSelector: defaultGetSelector(theme),
  };
  const { vars, generateThemeVars, generateStyleSheets } = prepareCssVars(theme, parserConfig);
  theme.vars = vars;
  Object.entries(theme.colorSchemes[theme.defaultColorScheme]).forEach(([key, value]) => {
    theme[key] = value;
  });
  theme.generateThemeVars = generateThemeVars;
  theme.generateStyleSheets = generateStyleSheets;
  theme.generateSpacing = function generateSpacing() {
    return createSpacing(input.spacing, createUnarySpacing(this));
  };
  theme.getColorSchemeSelector = createGetColorSchemeSelector(selector);
  theme.spacing = theme.generateSpacing();
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
  theme.toRuntimeSource = stringifyTheme; // for Pigment CSS integration

  return theme;
}
