import { Breakpoints } from './breakpoints';
import { Mixins } from './mixins';
import { Palette } from './palette';
import { Shadows } from './shadows';
import { Spacing } from './spacing';
import { Transitions } from './transitions';
import { Typography } from './typography';
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
  options?: Partial<ThemeOptions> & T
): Theme<T>;
