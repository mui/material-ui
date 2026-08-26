import type { Components, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeFeatures {
    optimizedTheme: true;
  }

  // Selectively bring back type safety for the components that matter.
  interface ThemeComponents extends Pick<Components<Theme>, 'MuiButton'> {}
}
