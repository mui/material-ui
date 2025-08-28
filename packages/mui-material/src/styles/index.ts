import { DistributiveOmit } from '@mui/types';

export { default as THEME_ID } from './identifier';
export { default as createTheme } from './createTheme';
export type { ThemeOptions, Theme, CssThemeVariables } from './createTheme';
export { default as unstable_createMuiStrictModeTheme } from './createMuiStrictModeTheme';
export { default as adaptV4Theme } from './adaptV4Theme';
export type { DeprecatedThemeOptions } from './adaptV4Theme';
export type { Shadows } from './shadows';
export type { ZIndex } from './zIndex';
export type {
  CommonColors,
  Palette,
  PaletteColor,
  PaletteColorOptions,
  PaletteOptions,
  SimplePaletteColorOptions,
  TypeText,
  TypeAction,
  TypeBackground,
  PaletteMode,
  Color,
} from './createPalette';
export { default as createColorScheme } from './createColorScheme';
export { default as createStyles } from './createStyles';
export type {
  TypographyVariants,
  TypographyVariantsOptions,
  TypographyStyle,
  TypographyVariant,
} from './createTypography';
export { default as responsiveFontSizes } from './responsiveFontSizes';
export type { Duration, Easing, Transitions, TransitionsOptions } from './createTransitions';
export { duration, easing } from './createTransitions';
export type {
  Direction,
  Breakpoint,
  BreakpointOverrides,
  Breakpoints,
  BreakpointsOptions,
  CreateMUIStyled,
  Interpolation,
  CSSInterpolation,
  CSSObject,
  ColorFormat,
  ColorObject,
  SxProps,
} from '@mui/system';
export {
  css,
  keyframes,
  // color manipulators
  hexToRgb,
  rgbToHex,
  hslToRgb,
  decomposeColor,
  recomposeColor,
  getContrastRatio,
  getLuminance,
  emphasize,
  alpha,
  darken,
  lighten,
  StyledEngineProvider,
} from '@mui/system';
export { unstable_createBreakpoints } from '@mui/system/createBreakpoints';
// TODO: Remove this function in v6.
// eslint-disable-next-line @typescript-eslint/naming-convention
export function experimental_sx() {
  throw /* minify-error */ new Error(
    'MUI: The `experimental_sx` has been moved to `theme.unstable_sx`.' +
      'For more details, see https://github.com/mui/material-ui/pull/35150.',
  );
}
export { default as useTheme } from './useTheme';
export { default as useThemeProps } from './useThemeProps';
export type * from './useThemeProps';
export { default as styled } from './styled';
export { default as ThemeProvider } from './ThemeProvider';
export type { ThemeProviderProps } from './ThemeProvider';
export type { ComponentsProps, ComponentsPropsList } from './props';
export type { ComponentsVariants } from './variants';
export type { ComponentsOverrides, ComponentNameToClassKey } from './overrides';
export type { Components } from './components';
export { getUnit as unstable_getUnit, toUnitless as unstable_toUnitless } from './cssUtils';

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
}

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 * @deprecated will be removed in v5 for internal usage only
 */
export type StandardProps<
  ComponentProps,
  ClassKey extends string,
  Removals extends keyof ComponentProps = never,
> = DistributiveOmit<ComponentProps, 'classes' | Removals> &
  StyledComponentProps<ClassKey> & {
    className?: string;
    ref?: ComponentProps extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
    style?: React.CSSProperties;
  };

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PropTypes {
  // keeping the type structure for backwards compat
  export type Color = 'inherit' | 'primary' | 'secondary' | 'default';
}

export { default as makeStyles } from './makeStyles';
export { default as withStyles } from './withStyles';
export { default as withTheme } from './withTheme';

export * from './ThemeProviderWithVars';
export type { StorageManager } from '@mui/system/cssVars';
export { default as experimental_extendTheme } from './experimental_extendTheme'; // TODO: Remove in v7

export { default as extendTheme } from './createThemeWithVars';

export type {
  ColorSchemeOverrides,
  SupportedColorScheme,
  ColorSystem,
  CssVarsPalette,
  Opacity,
  Overlays,
  PaletteAlert,
  PaletteActionChannel,
  PaletteAppBar,
  PaletteAvatar,
  PaletteChip,
  PaletteColorChannel,
  PaletteCommonChannel,
  PaletteFilledInput,
  PaletteLinearProgress,
  PaletteSkeleton,
  PaletteSlider,
  PaletteSnackbarContent,
  PaletteSpeedDialAction,
  PaletteStepConnector,
  PaletteStepContent,
  PaletteSwitch,
  PaletteTableCell,
  PaletteTextChannel,
  PaletteTooltip,
  CssVarsThemeOptions,
  CssVarsTheme,
  ThemeVars,
  ThemeCssVar,
  ThemeCssVarOverrides,
  ColorSystemOptions,
} from './createThemeWithVars';
export { default as getOverlayAlpha } from './getOverlayAlpha';
export { default as shouldSkipGeneratingVar } from './shouldSkipGeneratingVar';

// Private methods for creating parts of the theme
export { default as private_createTypography } from './createTypography';
export type { Mixins, CSSProperties, MixinsOptions } from './createMixins';
export { default as private_createMixins } from './createMixins';
export { default as private_excludeVariablesFromRoot } from './excludeVariablesFromRoot';
