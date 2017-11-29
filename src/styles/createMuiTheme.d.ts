import { Breakpoints, BreakpointsOptions } from './createBreakpoints';
import { Mixins } from './createMixins';
import { Palette } from './createPalette';
import { Shadows } from './shadows';
import { Spacing } from './spacing';
import { Transitions } from './transitions';
import { Typography, TypographyOptions } from './createTypography';
import { ZIndex } from './zIndex';
import { StyleRules } from './withStyles'
import { Overrides } from './overrides'

export type Direction = 'ltr' | 'rtl';

export interface ThemeOptions {
  direction?: Direction;
  palette?: Partial<Palette>;
  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  mixins?: Partial<Mixins>;
  breakpoints?: Partial<BreakpointsOptions> & Partial<Breakpoints>;
  shadows?: Shadows;
  transitions?: Partial<Transitions>;
  spacing?: Partial<Spacing>;
  zIndex?: Partial<ZIndex>;
  overrides?: Overrides;
}

export type Theme = {
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
};

export default function createMuiTheme(
  options?: ThemeOptions
): Theme;
