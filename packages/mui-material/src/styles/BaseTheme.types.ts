import { Theme as SystemTheme } from '@mui/system';
import { Mixins } from './createMixins';
import { Palette } from './createPalette';
import { Typography } from './createTypography';
import { Shadows } from './shadows';
import { Transitions } from './createTransitions';
import { ZIndex } from './zIndex';

// This is a basic theme interface, not including the components key
export interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  palette: Palette;
  shadows: Shadows;
  transitions: Transitions;
  typography: Typography;
  zIndex: ZIndex;
  unstable_strictMode?: boolean;
}
