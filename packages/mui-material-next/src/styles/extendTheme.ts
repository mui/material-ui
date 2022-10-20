import { deepmerge } from '@mui/utils';
import {
  colorChannel,
  alpha,
  darken,
  lighten,
  emphasize,
  unstable_createGetCssVar as systemCreateGetCssVar,
} from '@mui/system';
import {
  createTheme as createThemeWithoutVars,
  getOverlayAlpha,
  SupportedColorScheme,
  ColorSystem as MD2ColorSystem,
  Overlays,
} from '@mui/material/styles';
import { Theme, MD3Palettes, MD3ColorSchemeTokens, CssVarsThemeOptions } from './Theme.types';
import md3CommonPalette from './palette';
import createMd3LightColorScheme from './createLightColorScheme';
import createMd3DarkColorScheme from './createDarkColorScheme';
import md3Typescale from './typescale';
import md3Typeface from './typeface';
import md3State from './states';

const defaultLightOverlays: Overlays = [...Array(25)].map(() => undefined) as Overlays;
const defaultDarkOverlays: Overlays = [...Array(25)].map((_, index) => {
  if (index === 0) {
    return undefined;
  }
  const overlay = getOverlayAlpha(index);
  return `linear-gradient(rgba(255 255 255 / ${overlay}), rgba(255 255 255 / ${overlay}))`;
}) as Overlays;

function assignNode(obj: any, keys: string[]) {
  keys.forEach((k) => {
    if (!obj[k]) {
      obj[k] = {};
    }
  });
}

function setColor(obj: any, key: string, defaultValue: any) {
  obj[key] = obj[key] || defaultValue;
}

export const createGetCssVar = (cssVarPrefix = 'mui') => systemCreateGetCssVar(cssVarPrefix);

export default function extendTheme(
  options: CssVarsThemeOptions & { useMaterialYou?: boolean } = {},
  ...args: any[]
) {
  const {
    colorSchemes: colorSchemesInput = {},
    cssVarPrefix = 'mui',
    useMaterialYou = true,
    ...input
  } = options;
  const getCssVar = createGetCssVar(cssVarPrefix);

  const md3LightPalette = {
    ...md3CommonPalette,
    ...createMd3LightColorScheme(getCssVar, md3CommonPalette),
  };

  const md3DarkPalette = {
    ...md3CommonPalette,
    ...createMd3DarkColorScheme(getCssVar, md3CommonPalette),
  };

  // @ts-ignore - it's fine, everything that is not supported will be spread
  const { palette: lightPalette, ...muiTheme } = createThemeWithoutVars({
    ...input,
    ...(useMaterialYou && {
      useMaterialYou: true,
      typescale: md3Typescale,
      typeface: md3Typeface,
      state: md3State,
      shape: {
        borderRadius: 100,
        ...input?.shape,
      },
    }),
    palette: {
      ...(colorSchemesInput.light && colorSchemesInput.light?.palette),
      ...(useMaterialYou && {
        md3: {
          ...md3LightPalette,
          ...colorSchemesInput.light?.palette?.md3,
        },
      }),
    },
  });
  const { palette: darkPalette } = createThemeWithoutVars({
    palette: {
      mode: 'dark',
      ...colorSchemesInput.dark?.palette,
      ...(useMaterialYou && {
        md3: {
          ...md3DarkPalette,
          ...colorSchemesInput.dark?.palette?.md3,
        },
      }),
    },
  });

  let theme: Theme = {
    ...muiTheme,
    cssVarPrefix,
    getCssVar,
    colorSchemes: {
      ...colorSchemesInput,
      light: {
        ...colorSchemesInput.light,
        // @ts-ignore they are added below
        palette: lightPalette,
        opacity: {
          inputPlaceholder: 0.42,
          inputUnderline: 0.42,
          switchTrackDisabled: 0.12,
          switchTrack: 0.38,
          ...colorSchemesInput.light?.opacity,
        },
        overlays: colorSchemesInput.light?.overlays || defaultLightOverlays,
      },
      dark: {
        ...colorSchemesInput.dark,
        // @ts-ignore they are added below
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
    const palette = theme.colorSchemes[key as SupportedColorScheme]
      .palette as MD2ColorSystem['palette'] & {
      md3: MD3Palettes & { colors: MD3ColorSchemeTokens };
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
      setColor(palette.Alert, 'errorColor', darken(palette.error.light, 0.6));
      setColor(palette.Alert, 'infoColor', darken(palette.info.light, 0.6));
      setColor(palette.Alert, 'successColor', darken(palette.success.light, 0.6));
      setColor(palette.Alert, 'warningColor', darken(palette.warning.light, 0.6));
      setColor(palette.Alert, 'errorFilledBg', getCssVar('palette-error-main'));
      setColor(palette.Alert, 'infoFilledBg', getCssVar('palette-info-main'));
      setColor(palette.Alert, 'successFilledBg', getCssVar('palette-success-main'));
      setColor(palette.Alert, 'warningFilledBg', getCssVar('palette-warning-main'));
      setColor(palette.Alert, 'errorFilledColor', lightPalette.getContrastText(palette.error.main));
      setColor(palette.Alert, 'infoFilledColor', lightPalette.getContrastText(palette.info.main));
      setColor(
        palette.Alert,
        'successFilledColor',
        lightPalette.getContrastText(palette.success.main),
      );
      setColor(
        palette.Alert,
        'warningFilledColor',
        lightPalette.getContrastText(palette.warning.main),
      );
      setColor(palette.Alert, 'errorStandardBg', lighten(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', lighten(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', lighten(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', lighten(palette.warning.light, 0.9));
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
      setColor(palette.LinearProgress, 'primaryBg', lighten(palette.primary.main, 0.62));
      setColor(palette.LinearProgress, 'secondaryBg', lighten(palette.secondary.main, 0.62));
      setColor(palette.LinearProgress, 'errorBg', lighten(palette.error.main, 0.62));
      setColor(palette.LinearProgress, 'infoBg', lighten(palette.info.main, 0.62));
      setColor(palette.LinearProgress, 'successBg', lighten(palette.success.main, 0.62));
      setColor(palette.LinearProgress, 'warningBg', lighten(palette.warning.main, 0.62));
      setColor(palette.Skeleton, 'bg', `rgba(${getCssVar('palette-text-primaryChannel')} / 0.11)`);
      setColor(palette.Slider, 'primaryTrack', lighten(palette.primary.main, 0.62));
      setColor(palette.Slider, 'secondaryTrack', lighten(palette.secondary.main, 0.62));
      setColor(palette.Slider, 'errorTrack', lighten(palette.error.main, 0.62));
      setColor(palette.Slider, 'infoTrack', lighten(palette.info.main, 0.62));
      setColor(palette.Slider, 'successTrack', lighten(palette.success.main, 0.62));
      setColor(palette.Slider, 'warningTrack', lighten(palette.warning.main, 0.62));
      const snackbarContentBackground = emphasize(palette.background.default, 0.8);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(
        palette.SnackbarContent,
        'color',
        lightPalette.getContrastText(snackbarContentBackground),
      );
      setColor(palette.SpeedDialAction, 'fabHoverBg', emphasize(palette.background.paper, 0.15));
      setColor(palette.StepConnector, 'border', getCssVar('palette-grey-400'));
      setColor(palette.StepContent, 'border', getCssVar('palette-grey-400'));
      setColor(palette.Switch, 'defaultColor', getCssVar('palette-common-white'));
      setColor(palette.Switch, 'defaultDisabledColor', getCssVar('palette-grey-100'));
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
      setColor(palette.Alert, 'errorFilledBg', getCssVar('palette-error-dark'));
      setColor(palette.Alert, 'infoFilledBg', getCssVar('palette-info-dark'));
      setColor(palette.Alert, 'successFilledBg', getCssVar('palette-success-dark'));
      setColor(palette.Alert, 'warningFilledBg', getCssVar('palette-warning-dark'));
      setColor(palette.Alert, 'errorFilledColor', darkPalette.getContrastText(palette.error.dark));
      setColor(palette.Alert, 'infoFilledColor', darkPalette.getContrastText(palette.info.dark));
      setColor(
        palette.Alert,
        'successFilledColor',
        darkPalette.getContrastText(palette.success.dark),
      );
      setColor(
        palette.Alert,
        'warningFilledColor',
        darkPalette.getContrastText(palette.warning.dark),
      );
      setColor(palette.Alert, 'errorStandardBg', darken(palette.error.light, 0.9));
      setColor(palette.Alert, 'infoStandardBg', darken(palette.info.light, 0.9));
      setColor(palette.Alert, 'successStandardBg', darken(palette.success.light, 0.9));
      setColor(palette.Alert, 'warningStandardBg', darken(palette.warning.light, 0.9));
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
      setColor(palette.LinearProgress, 'primaryBg', darken(palette.primary.main, 0.5));
      setColor(palette.LinearProgress, 'secondaryBg', darken(palette.secondary.main, 0.5));
      setColor(palette.LinearProgress, 'errorBg', darken(palette.error.main, 0.5));
      setColor(palette.LinearProgress, 'infoBg', darken(palette.info.main, 0.5));
      setColor(palette.LinearProgress, 'successBg', darken(palette.success.main, 0.5));
      setColor(palette.LinearProgress, 'warningBg', darken(palette.warning.main, 0.5));
      setColor(palette.Skeleton, 'bg', `rgba(${getCssVar('palette-text-primaryChannel')} / 0.13)`);
      setColor(palette.Slider, 'primaryTrack', darken(palette.primary.main, 0.5));
      setColor(palette.Slider, 'secondaryTrack', darken(palette.secondary.main, 0.5));
      setColor(palette.Slider, 'errorTrack', darken(palette.error.main, 0.5));
      setColor(palette.Slider, 'infoTrack', darken(palette.info.main, 0.5));
      setColor(palette.Slider, 'successTrack', darken(palette.success.main, 0.5));
      setColor(palette.Slider, 'warningTrack', darken(palette.warning.main, 0.5));
      const snackbarContentBackground = emphasize(palette.background.default, 0.98);
      setColor(palette.SnackbarContent, 'bg', snackbarContentBackground);
      setColor(
        palette.SnackbarContent,
        'color',
        darkPalette.getContrastText(snackbarContentBackground),
      );
      setColor(palette.SpeedDialAction, 'fabHoverBg', emphasize(palette.background.paper, 0.15));
      setColor(palette.StepConnector, 'border', getCssVar('palette-grey-600'));
      setColor(palette.StepContent, 'border', getCssVar('palette-grey-600'));
      setColor(palette.Switch, 'defaultColor', getCssVar('palette-grey-300'));
      setColor(palette.Switch, 'defaultDisabledColor', getCssVar('palette-grey-600'));
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

    Object.keys(palette).forEach((c) => {
      const color = c as keyof MD2ColorSystem['palette'];
      const colors: any = palette[color];

      // Color palettes: primary, secondary, error, info, success, and warning
      if (colors.main) {
        // @ts-ignore
        palette[color].mainChannel = colorChannel(colors.main);
      }
      if (colors.light) {
        // @ts-ignore
        palette[color].lightChannel = colorChannel(colors.light);
      }
      if (colors.dark) {
        // @ts-ignore
        palette[color].darkChannel = colorChannel(colors.dark);
      }
      if (colors.contrastText) {
        // @ts-ignore
        palette[color].contrastTextChannel = colorChannel(colors.contrastText);
      }

      // Text colors: text.primary, text.secondary
      if (colors.primary && typeof colors.primary === 'string') {
        // @ts-ignore
        palette[color].primaryChannel = colorChannel(colors.primary);
      }
      if (colors.secondary && typeof colors.primary === 'string') {
        // @ts-ignore
        palette[color].secondaryChannel = colorChannel(colors.secondary);
      }

      // Action colors: action.active, action.selected
      if (colors.active) {
        // @ts-ignore
        palette[color].activeChannel = colorChannel(colors.active);
      }
      if (colors.selected) {
        // @ts-ignore
        palette[color].selectedChannel = colorChannel(colors.selected);
      }
    });

    // Needs to be handled better, the values are now hardcoded to the default values for these tokens
    if (useMaterialYou) {
      if (key === 'light') {
        palette.md3.colors.primaryChannel = colorChannel(palette.md3.primary['40']);
        palette.md3.colors.secondaryChannel = colorChannel(palette.md3.secondary['40']);
        palette.md3.colors.tertiaryChannel = colorChannel(palette.md3.tertiary['40']);
        palette.md3.colors.secondaryContainerChannel = colorChannel(palette.md3.secondary['90']);
        palette.md3.colors.onSurfaceChannel = colorChannel(palette.md3.neutral['10']);
      } else {
        palette.md3.colors.primaryChannel = colorChannel(palette.md3.primary['80']);
        palette.md3.colors.secondaryChannel = colorChannel(palette.md3.secondary['80']);
        palette.md3.colors.tertiaryChannel = colorChannel(palette.md3.tertiary['80']);
        palette.md3.colors.secondaryContainerChannel = colorChannel(palette.md3.secondary['30']);
        palette.md3.colors.onSurfaceChannel = colorChannel(palette.md3.neutral['90']);
      }
    }
  });

  theme = args.reduce((acc, argument) => deepmerge(acc, argument), theme);

  return theme;
}
