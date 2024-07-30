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

export interface ThemeOptions {
  shape?: ShapeOptions;
  breakpoints?: BreakpointsOptions;
  direction?: Direction;
  mixins?: unknown;
  palette?: Record<string, any>;
  shadows?: unknown;
  spacing?: SpacingOptions;
  transitions?: unknown;
  components?: Record<string, any>;
  typography?: unknown;
  zIndex?: Record<string, number>;
  unstable_sxConfig?: SxConfig;
}

export interface Theme extends CssContainerQueries {
  shape: Shape;
  breakpoints: Breakpoints;
  direction: Direction;
  palette: Record<string, any> & { mode: 'light' | 'dark' };
  shadows?: unknown;
  spacing: Spacing;
  transitions?: unknown;
  components?: Record<string, any>;
  mixins?: unknown;
  typography?: unknown;
  zIndex?: unknown;
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
