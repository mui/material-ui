/**
 * This file must mirror the exports of `@mui/material/styles` for non-breaking changes in v7.
 * This entry point is an alternative for `@mui/material/styles` for optimizing TypeScript interface instantiation
 */

import { DistributiveOmit } from '@mui/types';

export { default as THEME_ID } from '../styles/identifier';
export { default as createTheme } from './createTheme';
export type {
  // New types for augmenting the Theme Components
  CreateThemeComponent,
  ThemeComponents,
  // =============================================
  ThemeOptions,
  Theme,
  CssThemeVariables,
  CssVarsThemeOptions,
  BaseTheme,
} from './createTheme';
export { default as unstable_createMuiStrictModeTheme } from './createMuiStrictModeTheme';
export type { Shadows } from '../styles/shadows';
export type { ZIndex } from '../styles/zIndex';
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
} from '../styles/createPalette';
export { default as createColorScheme } from './createColorScheme';
export { default as createStyles } from '../styles/createStyles';
export type {
  TypographyVariants,
  TypographyVariantsOptions,
  TypographyStyle,
  TypographyVariant,
} from '../styles/createTypography';
export { default as responsiveFontSizes } from '../styles/responsiveFontSizes';
export type {
  Duration,
  Easing,
  Transitions,
  TransitionsOptions,
} from '../styles/createTransitions';
export { duration, easing } from '../styles/createTransitions';
export type { Mixins, CSSProperties, MixinsOptions } from '../styles/createMixins';
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
export { default as useTheme } from './useTheme';
export { default as useThemeProps, type ThemedProps, type ThemeWithProps } from './useThemeProps';
export { default as styled } from './styled';
export { default as ThemeProvider } from './ThemeProvider';
export type { ThemeProviderProps } from './ThemeProvider';
export { getUnit as unstable_getUnit, toUnitless as unstable_toUnitless } from '../styles/cssUtils';

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

export { default as makeStyles } from '../styles/makeStyles';
export { default as withStyles } from '../styles/withStyles';
export { default as withTheme } from '../styles/withTheme';

export * from './ThemeProviderWithVars';
export type { StorageManager } from '@mui/system/cssVars';

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
  CssVarsTheme,
  ThemeVars,
  ThemeCssVar,
  ThemeCssVarOverrides,
  ColorSystemOptions,
} from '../styles/createThemeFoundation';
export { default as getOverlayAlpha } from '../styles/getOverlayAlpha';
export { default as shouldSkipGeneratingVar } from '../styles/shouldSkipGeneratingVar';

// Private methods for creating parts of the theme
export { default as private_createTypography } from '../styles/createTypography';
export { default as private_excludeVariablesFromRoot } from '../styles/excludeVariablesFromRoot';
