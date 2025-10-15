import type { extendTheme } from '@mui/material/styles';

declare module '@mui/material-pigment-css/theme' {
  interface ThemeArgs {
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
