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
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: Mixins;
  palette?: Record<string, any>;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: Transitions;
  components?: Record<string, any>;
  typography?: Typography;
  zIndex?: ZIndex;
  unstable_sxConfig?: SxConfig;
}

export interface Theme extends CssContainerQueries {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  palette: Record<string, any> & { mode: 'light' | 'dark' };
  shadows?: Shadows;
  spacing: Spacing;
  transitions?: Transitions;
  components?: Record<string, any>;
  mixins?: Mixins;
  typography?: Typography;
  zIndex?: ZIndex;
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
