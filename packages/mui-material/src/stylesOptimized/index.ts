import { DistributiveOmit } from '@mui/types';

export { default as THEME_ID } from '../styles/identifier';
export { default as createTheme } from './createTheme';
export {
  BaseTheme,
  CssThemeVariables,
  CssVarsThemeOptions,
  ThemeComponents,
  ThemeOptions,
  Theme,
} from './createTheme';
export { Shadows } from '../styles/shadows';
export { ZIndex } from '../styles/zIndex';
export {
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
export {
  TypographyVariants,
  TypographyVariantsOptions,
  TypographyStyle,
  TypographyVariant,
} from '../styles/createTypography';
export { default as responsiveFontSizes } from '../styles/responsiveFontSizes';
export {
  Duration,
  Easing,
  Transitions,
  TransitionsOptions,
  duration,
  easing,
} from '../styles/createTransitions';
export { Mixins, CSSProperties, MixinsOptions } from '../styles/createMixins';
export {
  Direction,
  Breakpoint,
  BreakpointOverrides,
  Breakpoints,
  BreakpointsOptions,
  CreateMUIStyled,
  Interpolation,
  CSSInterpolation,
  CSSObject,
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
  ColorFormat,
  ColorObject,
  StyledEngineProvider,
  SxProps,
} from '@mui/system';
export { unstable_createBreakpoints } from '@mui/system/createBreakpoints';
export { default as useTheme } from './useTheme';
export { default as useThemeProps } from './useThemeProps';
export * from './useThemeProps';
export { default as styled } from './styled';

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
