import { CSSObject } from '@mui/styled-engine';
import { Breakpoints, BreakpointsOptions } from '../createBreakpoints/createBreakpoints';
import { Shape, ShapeOptions } from './shape';
import { Spacing, SpacingOptions } from './createSpacing';
import { SxConfig, SxProps } from '../styleFunctionSx';
import { ApplyStyles } from './applyStyles';
import { CssContainerQueries } from '../cssContainerQueries';

export {
  Breakpoint,
  Breakpoints,
  BreakpointOverrides,
} from '../createBreakpoints/createBreakpoints';

export type Direction = 'ltr' | 'rtl';

export interface Typography {}
export interface Mixins {}
export interface Shadows {}
export interface Transitions {}
export interface ZIndex {}

export interface ThemeOptions {
  shape?: ShapeOptions | undefined;
  breakpoints?: BreakpointsOptions | undefined;
  direction?: Direction | undefined;
  mixins?: Mixins | undefined;
  palette?: Record<string, any> | undefined;
  shadows?: Shadows | undefined;
  spacing?: SpacingOptions | undefined;
  transitions?: Transitions | undefined;
  components?: Record<string, any> | undefined;
  typography?: Typography | undefined;
  zIndex?: ZIndex | undefined;
  unstable_sxConfig?: SxConfig | undefined;
}

export interface Theme extends CssContainerQueries {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  palette: Record<string, any> & { mode: 'light' | 'dark' };
  shadows?: Shadows | undefined;
  spacing: Spacing;
  transitions?: Transitions | undefined;
  components?: Record<string, any> | undefined;
  mixins?: Mixins | undefined;
  typography?: Typography | undefined;
  zIndex?: ZIndex | undefined;
  applyStyles: ApplyStyles<'light' | 'dark'>;
  unstable_sxConfig: SxConfig;
  unstable_sx: (props: SxProps<Theme>) => CSSObject;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;
