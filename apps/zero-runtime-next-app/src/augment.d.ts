import type { Theme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';
import '@mui/zero-runtime/theme';

declare module '@mui/zero-runtime/theme' {
  export interface ThemeArgs {
    theme: Omit<Theme, 'applyStyles'> & {
      applyStyles: (
        colorScheme: 'light' | 'dark',
        styles: Record<string, any>,
      ) => Record<string, any>;
    };
  }
}
