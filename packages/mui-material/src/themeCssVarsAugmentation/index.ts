export {};
/**
 * The theme is always typed with CSS theme variables, so importing this module is no longer needed.
 * It's kept for backward compatibility.
 * @deprecated Remove the import of `@mui/material/themeCssVarsAugmentation`.
 */
declare module '@mui/material/styles' {
  interface CssThemeVariables {
    enabled: true;
  }
}
