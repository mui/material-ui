import * as deepmerge from 'deepmerge';
import * as warning from 'warning';
import createTypography from './createTypography';
import createBreakpoints from './createBreakpoints';
import createPalette from './createPalette';
import createMixins from './createMixins';
import shadows from './shadows';
import transitions from './transitions';
import zIndex from './zIndex';
import spacing from './spacing';
import { Breakpoints, BreakpointsOptions } from './createBreakpoints';
import { Mixins, MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { Shadows } from './shadows';
import { Spacing, SpacingOptions } from './spacing';
import { Transitions, TransitionsOptions } from './transitions';
import { Typography, TypographyOptions } from './createTypography';
import { ZIndex, ZIndexOptions } from './zIndex';
import { Overrides } from './overrides';

export type Direction = 'ltr' | 'rtl';

export interface ThemeOptions {
  direction?: Direction;
  palette?: PaletteOptions;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  mixins?: MixinsOptions;
  breakpoints?: BreakpointsOptions;
  shadows?: Shadows;
  transitions?: TransitionsOptions;
  spacing?: SpacingOptions;
  zIndex?: ZIndexOptions;
  overrides?: Overrides;
}

export interface Theme {
  direction: Direction;
  palette: Palette;
  typography: Typography;
  mixins: Mixins;
  breakpoints: Breakpoints;
  shadows: Shadows;
  transitions: Transitions;
  spacing: Spacing;
  zIndex: ZIndex;
  overrides?: Overrides;
}

function createMuiTheme(options?: ThemeOptions): Theme {
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    typography: typographyInput = {},
    shadows: shadowsInput,
    ...other,
  } = options;

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);

  const muiTheme: Theme = {
    direction: 'ltr',
    palette,
    typography: createTypography(palette, typographyInput),
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    breakpoints,
    shadows: shadowsInput || shadows,
    ...deepmerge(
      {
        transitions,
        spacing,
        zIndex,
      },
      other,
    ),
  };

  warning(
    muiTheme.shadows.length === 25,
    'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.',
  );

  return muiTheme;
}

export default createMuiTheme;
