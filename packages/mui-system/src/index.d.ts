import {
  ComposedStyleFunction,
  StyleFunction,
  PropsFor,
  SimpleStyleFunction,
  borders,
  display,
  flexbox,
  grid,
  palette,
  positions,
  shadows,
  sizing,
  typography,
} from './Box';
// disable automatic export
export {};

// borders.js
export const border: SimpleStyleFunction<'border'>;
export const borderTop: SimpleStyleFunction<'borderTop'>;
export const borderRight: SimpleStyleFunction<'borderRight'>;
export const borderBottom: SimpleStyleFunction<'borderBottom'>;
export const borderLeft: SimpleStyleFunction<'borderLeft'>;
export const borderColor: SimpleStyleFunction<'borderColor'>;
export const borderTopColor: SimpleStyleFunction<'borderTopColor'>;
export const borderRightColor: SimpleStyleFunction<'borderRightColor'>;
export const borderBottomColor: SimpleStyleFunction<'borderBottomColor'>;
export const borderLeftColor: SimpleStyleFunction<'borderLeftColor'>;
export const borderRadius: SimpleStyleFunction<'borderRadius'>;
export type BordersProps = PropsFor<typeof borders>;

// breakpoints.js
type DefaultBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export { handleBreakpoints } from './breakpoints';

/**
 * @returns An enhanced stylefunction that considers breakpoints
 */
export function breakpoints<Props, Breakpoints extends string = DefaultBreakPoints>(
  styleFunction: StyleFunction<Props>,
): StyleFunction<Partial<Record<Breakpoints, Props>> & Props>;

// restructures the breakpoints in the in the correct order and merges all styles args
export function mergeBreakpointsInOrder(
  breakpointsInput: { keys: string[]; up: (key: string) => string },
  ...styles: object[]
): object;

export function compose<T extends Array<StyleFunction<any>>>(...args: T): ComposedStyleFunction<T>;

export type DisplayProps = PropsFor<typeof display>;

// flexbox.js
export type FlexboxProps = PropsFor<typeof flexbox>;

// grid.js
export type GridProps = PropsFor<typeof grid>;

// palette.js
export const color: SimpleStyleFunction<'color'>;
export const bgcolor: SimpleStyleFunction<'bgcolor'>;
export type PaletteProps = PropsFor<typeof palette>;

export type PositionsProps = PropsFor<typeof positions>;

export type ShadowsProps = PropsFor<typeof shadows>;

// * sizing.js TODO
export const width: SimpleStyleFunction<'width'>;
export const maxWidth: SimpleStyleFunction<'maxWidth'>;
export const minWidth: SimpleStyleFunction<'minWidth'>;
export const height: SimpleStyleFunction<'height'>;
export const maxHeight: SimpleStyleFunction<'maxHeight'>;
export const minHeight: SimpleStyleFunction<'minHeight'>;
export const sizeWidth: SimpleStyleFunction<'sizeWidth'>;
export const sizeHeight: SimpleStyleFunction<'sizeHeight'>;
export const boxSizing: SimpleStyleFunction<'boxSizing'>;
export type SizingProps = PropsFor<typeof sizing>;

// typography.js
export const typographyVariant: SimpleStyleFunction<'typography'>;
export const fontFamily: SimpleStyleFunction<'fontFamily'>;
export const fontSize: SimpleStyleFunction<'fontSize'>;
export const fontStyle: SimpleStyleFunction<'fontStyle'>;
export const fontWeight: SimpleStyleFunction<'fontWeight'>;
export const letterSpacing: SimpleStyleFunction<'letterSpacing'>;
export const lineHeight: SimpleStyleFunction<'lineHeight'>;
export const textAlign: SimpleStyleFunction<'textAlign'>;
export const textTransform: SimpleStyleFunction<'textTransform'>;
export type TypographyProps = PropsFor<typeof typography>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export function unstable_getThemeValue(prop: string, value: any, theme: object): any;
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
  GlobalStyles,
  GlobalStylesProps,
  StyledEngineProvider,
  Interpolation,
  CSSInterpolation,
  CSSObject,
} from '@mui/styled-engine';

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

export { default as createBreakpoints } from './createTheme/createBreakpoints';
export * from './createTheme/createBreakpoints';

export { default as createSpacing } from './createTheme/createSpacing';
export { SpacingOptions, Spacing } from './createTheme/createSpacing';

export { default as shape } from './createTheme/shape';
export * from './createTheme/shape';

export { default as useThemeProps, getThemeProps } from './useThemeProps';

export { default as useTheme } from './useTheme';
export * from './useTheme';

export { default as useThemeWithoutDefault } from './useThemeWithoutDefault';
export * from './useThemeWithoutDefault';

export * from './colorManipulator';

export { default as ThemeProvider } from './ThemeProvider';
export * from './ThemeProvider';

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

export { default as Unstable_Grid } from './Unstable_Grid';
export * from './Unstable_Grid';

export { default as Stack } from './Stack';
export * from './Stack';
