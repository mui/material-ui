import { Breakpoints } from './createBreakpoints';
import { Mixins } from './createMixins';
import { Palette } from './createPalette';
import { Shadows } from './shadows';
import { Spacing } from './spacing';
import { Transitions } from './transitions';
import { Typography } from './createTypography';
import { ZIndex } from './zIndex';

export interface ThemeOptions {
  breakpoints: Breakpoints;
  mixins: Mixins;
  palette: Palette;
  typography: Typography;
}

export type Theme<T = {}> = {
  direction: 'ltr';
  shadows: Shadows;
  spacing: Spacing;
  transitions: Transitions;
  zIndex: ZIndex;
} & ThemeOptions &
  T;

export default function createMuiTheme<T = {}>(
  options?: {
    [K in keyof ThemeOptions]?: Partial<ThemeOptions[K]>
  } & T
): Theme<T>;
