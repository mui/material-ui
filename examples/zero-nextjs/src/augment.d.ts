import type {} from '@mui/zero-runtime/theme';
import type { ExtendTheme } from '@mui/zero-runtime';

declare module '@mui/zero-runtime/theme' {
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
