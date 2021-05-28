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
  components?: Record<string, any>;
  palette?: Record<string, any>;
  shadows?: Shadows;
  spacing?: SpacingOptions;
  transitions?: TransitionsOptions;
  zIndex?: Record<string, any>;
  unstable_strictMode?: boolean;
}

export interface Theme {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  mixins: Mixins;
  components?: Record<string, any>;
  palette: Record<string, any> & { mode: 'light' | 'dark'; };
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  zIndex: Record<string, any>;
  unstable_strictMode?: boolean;
}
