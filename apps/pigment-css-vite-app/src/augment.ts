import type { extendTheme } from '@mui/material/styles';
import '@mui/material-pigment-css';

type CustomTheme = ReturnType<typeof extendTheme> & {
  applyDarkStyles<T>(obj: T): Record<string, T>;
};
declare module '@mui/material-pigment-css/theme' {
  export interface ThemeArgs {
    theme: CustomTheme;
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

declare global {
  namespace React {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> {
      sx?:
        | React.CSSProperties
        | ((theme: CustomTheme) => React.CSSProperties)
        | ReadonlyArray<React.CSSProperties | ((theme: CustomTheme) => React.CSSProperties)>;
    }
  }
}
