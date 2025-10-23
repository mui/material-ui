export {};
/**
 * Enhance the theme types to include new properties from the CssVarsProvider.
 * The theme is typed with CSS variables in `styled`, `sx`, `useTheme`, etc.
 */
declare module '@mui/material/stylesOptimized' {
  interface CssThemeVariables {
    enabled: true;
  }
}
