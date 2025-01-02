// disable automatic export
export {};

export * from './borders';

export { default as breakpoints, handleBreakpoints, mergeBreakpointsInOrder } from './breakpoints';

export { default as cssContainerQueries, type CssContainerQueries } from './cssContainerQueries';

export { default as compose } from './compose';

export * from './display';

export * from './flexbox';

export * from './cssGrid';

export * from './palette';

export * from './positions';

export * from './shadows';

export * from './sizing';

export * from './typography';

export { default as unstable_getThemeValue } from './getThemeValue';

/**
 * The `css` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 */
export type ResponsiveStyleValue<T> = T | Array<T | null> | { [key: string]: T | null };

export { DefaultTheme } from '@mui/private-theming';

export {
  css,
  keyframes,
  StyledEngineProvider,
  Interpolation,
  CSSInterpolation,
  CSSObject,
} from '@mui/styled-engine';
export { default as GlobalStyles } from './GlobalStyles';
export type { GlobalStylesProps } from './GlobalStyles';

export * from './style';
export * from './spacing';

export {
  default as unstable_styleFunctionSx,
  unstable_createStyleFunctionSx,
  extendSxProp as unstable_extendSxProp,
  unstable_defaultSxConfig,
} from './styleFunctionSx';
export * from './styleFunctionSx';

// TODO: Remove this function in v6.
// eslint-disable-next-line @typescript-eslint/naming-convention
export function experimental_sx(): any;

export { default as Box } from './Box';
export * from './Box';

export { default as createBox } from './createBox';
export * from './createBox';

export { default as createStyled } from './createStyled';
export * from './createStyled';

export { default as styled } from './styled';
export * from './styled';

export { default as createTheme } from './createTheme';
export * from './createTheme';

export { default as createBreakpoints } from './createBreakpoints/createBreakpoints';
export * from './createBreakpoints/createBreakpoints';

export { default as createSpacing } from './createTheme/createSpacing';
export { SpacingOptions, Spacing } from './createTheme/createSpacing';

export { default as shape } from './createTheme/shape';
export * from './createTheme/shape';

export { default as useThemeProps, getThemeProps } from './useThemeProps';

export { default as useTheme } from './useTheme';
export * from './useTheme';

export { default as useThemeWithoutDefault } from './useThemeWithoutDefault';
export * from './useThemeWithoutDefault';

export { default as useMediaQuery } from './useMediaQuery';
export * from './useMediaQuery';

export * from './colorManipulator';

export { default as ThemeProvider } from './ThemeProvider';
export * from './ThemeProvider';

export { default as unstable_memoTheme } from './memoTheme';

export { default as unstable_createCssVarsProvider, CreateCssVarsProviderResult } from './cssVars';
export { default as unstable_createGetCssVar } from './cssVars/createGetCssVar';
export { default as unstable_cssVarsParser } from './cssVars/cssVarsParser';
export { default as unstable_prepareCssVars } from './cssVars/prepareCssVars';
export { default as unstable_createCssVarsTheme } from './cssVars/createCssVarsTheme';
export * from './cssVars';

export { default as responsivePropType } from './responsivePropType';

export { default as createContainer } from './Container/createContainer';
export * from './Container/createContainer';

export { default as Container } from './Container';
export * from './Container';

export { default as Grid } from './Grid';
export * from './Grid';

export { default as Stack } from './Stack';
export * from './Stack';

export * from './version';
