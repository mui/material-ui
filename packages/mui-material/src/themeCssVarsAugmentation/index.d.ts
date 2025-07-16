export {};
/**
 * Enhance the theme types to include new properties from the CssVarsProvider.
 * The theme is typed with CSS variables in `styled`, `sx`, `useTheme`, etc.
 */
// @ts-ignore
declare module '@mui/material/styles' {
  interface CssThemeVariables {
    enabled: true;
  }
}
