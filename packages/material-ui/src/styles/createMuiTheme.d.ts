import { Breakpoints, BreakpointsOptions } from './createBreakpoints';
import { Mixins, MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { Shadows } from './shadows';
import { Spacing, SpacingOptions } from './spacing';
import { Transitions, TransitionsOptions } from './transitions';
import { Typography, TypographyOptions } from './createTypography';
import { ZIndex, ZIndexOptions } from './zIndex';
import { Overrides } from './overrides';
import { ComponentsProps } from './props';

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
  props?: ComponentsProps;
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
  props?: ComponentsProps;
}

export default function createMuiTheme(options?: ThemeOptions): Theme;
