import { Breakpoints, BreakpointsOptions } from './createBreakpoints';
import { Shape, ShapeOptions } from './shape';
import { Spacing, SpacingOptions } from './createSpacing';

export { Breakpoint, BreakpointOverrides } from './createBreakpoints';

export type Direction = 'ltr' | 'rtl';

export interface ThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: any;
  palette?: Record<string, any>;
  shadows?: any;
  spacing?: SpacingOptions;
  transitions?: any;
  components?: Record<string, any>;
  typography?: any;
  zIndex?: Record<string, number>;
}

export interface Theme {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  palette: Record<string, any> & { mode: 'light' | 'dark' };
  shadows?: any;
  spacing: Spacing;
  transitions?: any;
  components?: Record<string, any>;
  mixins?: any;
  typography?: any;
  zIndex?: any;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready to use theme object.
 */
export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;
