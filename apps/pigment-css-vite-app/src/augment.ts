import type { extendTheme } from '@mui/material/styles';
import '@mui/material-pigment-css';

declare module '@mui/material-pigment-css/theme' {
  export interface ThemeArgs {
    theme: ReturnType<typeof extendTheme> & {
      applyDarkStyles<T>(obj: T): Record<string, T>;
    };
  }
}

declare module '@mui/material' {
  interface Palette {
    Slider: Record<string, string>;
  }
  interface PaletteColor {
    mainChannel: string;
  }
}
