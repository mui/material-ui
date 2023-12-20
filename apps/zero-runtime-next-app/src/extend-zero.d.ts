import type { Theme } from '@mui/material/styles';

declare module '@mui/zero-runtime/theme' {
  interface ThemeArgs {
    theme: Theme & {
      applyDarkStyles<T>(obj: T): Record<string, T>;
      vars?: Theme;
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
