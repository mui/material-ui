import MuiError from '@mui/internal-babel-macros/MuiError.macro';

export { css, keyframes, StyledEngineProvider } from '@mui/styled-engine';
export { default as GlobalStyles } from './GlobalStyles';
export { default as borders } from './borders';
export * from './borders';
export { default as breakpoints } from './breakpoints';
export { default as cssContainerQueries } from './cssContainerQueries';
export {
  handleBreakpoints,
  mergeBreakpointsInOrder,
  resolveBreakpointValues as unstable_resolveBreakpointValues,
} from './breakpoints';
export { default as compose } from './compose';
export { default as display } from './display';
export { default as flexbox } from './flexbox';
export * from './flexbox';
export { default as grid } from './cssGrid';
export * from './cssGrid';
export { default as palette } from './palette';
export * from './palette';
export { default as positions } from './positions';
export * from './positions';
export { default as shadows } from './shadows';
export { default as sizing } from './sizing';
export * from './sizing';
export { default as spacing } from './spacing';
export * from './spacing';
export { default as style, getPath, getStyleValue } from './style';
export { default as typography } from './typography';
export * from './typography';
export {
  default as unstable_styleFunctionSx,
  unstable_createStyleFunctionSx,
  extendSxProp as unstable_extendSxProp,
  unstable_defaultSxConfig,
} from './styleFunctionSx';
// TODO: Remove this function in v6
// eslint-disable-next-line @typescript-eslint/naming-convention
export function experimental_sx() {
  throw new MuiError(
    'MUI: The `experimental_sx` has been moved to `theme.unstable_sx`.' +
      'For more details, see https://github.com/mui/material-ui/pull/35150.',
  );
}
export { default as unstable_getThemeValue } from './getThemeValue';
export { default as Box } from './Box';
export { default as createBox } from './createBox';
export { default as createStyled } from './createStyled';
export * from './createStyled';
export { default as styled } from './styled';
export { default as createTheme } from './createTheme';
export { default as createBreakpoints } from './createBreakpoints/createBreakpoints';
export { default as createSpacing } from './createTheme/createSpacing';
export { default as shape } from './createTheme/shape';
export { default as useThemeProps, getThemeProps } from './useThemeProps';
export { default as useTheme } from './useTheme';
export { default as useThemeWithoutDefault } from './useThemeWithoutDefault';
export { default as useMediaQuery } from './useMediaQuery';
export * from './colorManipulator';
export { default as ThemeProvider } from './ThemeProvider';
export { default as unstable_createCssVarsProvider } from './cssVars/createCssVarsProvider';
export { default as unstable_createGetCssVar } from './cssVars/createGetCssVar';
export { default as unstable_cssVarsParser } from './cssVars/cssVarsParser';
export { default as unstable_prepareCssVars } from './cssVars/prepareCssVars';
export { default as unstable_createCssVarsTheme } from './cssVars/createCssVarsTheme';
export { default as responsivePropType } from './responsivePropType';
export { default as RtlProvider } from './RtlProvider';
export * from './RtlProvider';
export * from './version';

/** ----------------- */
/** Layout components */
export { default as createContainer } from './Container/createContainer';
export { default as Container } from './Container';
export * from './Container';

export { default as Grid } from './Grid/Grid';
export * from './Grid';

export { default as Stack } from './Stack/Stack';
export * from './Stack';
