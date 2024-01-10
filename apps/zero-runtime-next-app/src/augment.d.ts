import type { experimental_extendTheme } from '@mui/material/styles';
import '@mui/zero-runtime/theme';

declare module '@mui/zero-runtime/theme' {
  export interface ThemeArgs {
    theme: ReturnType<typeof experimental_extendTheme> & {
      applyDarkStyles<T>(obj: T): Record<string, T>;
    };
  }
}
