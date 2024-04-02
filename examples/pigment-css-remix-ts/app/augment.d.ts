import type { ExtendTheme } from '@pigment-css/react/theme';

declare module '@pigment-css/react/theme' {
  export interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: 'light' | 'dark';
      tokens: {
        palette: {
          background: string;
          foreground: string;
          primary: string;
          primaryForeground: string;
          border: string;
        };
      };
    }>;
  }
}
