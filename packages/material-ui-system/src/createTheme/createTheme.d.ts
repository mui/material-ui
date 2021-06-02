import { Breakpoints, BreakpointsOptions } from './createBreakpoints';
import { Mixins, MixinsOptions } from './createMixins';
import { Shadows } from './shadows';
import { Shape, ShapeOptions } from './shape';
import { Spacing, SpacingOptions } from './createSpacing';
import { Transitions, TransitionsOptions } from './createTransitions';

export { Breakpoint, BreakpointOverrides } from './createBreakpoints';

export type Direction = 'ltr' | 'rtl';

export interface ThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: MixinsOptions;
  palette?: Record<string, any>;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  components?: Record<string, any>;
  zIndex?: Record<string, number>;
  typography?: any;
}

export interface Theme {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  mixins: Mixins;
  palette: Record<string, any> & { mode: 'light' | 'dark' };
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  components?: Record<string, any>;
  zIndex?: any;
  typography?: any;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready to use theme object.
 */
export default function createTheme(options?: ThemeOptions, ...args: object[]): Theme;
