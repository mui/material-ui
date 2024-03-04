import type {} from '@pigmentcss/react/theme';
import type { ExtendTheme } from '@pigmentcss/react';

declare module '@pigmentcss/react/theme' {
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
