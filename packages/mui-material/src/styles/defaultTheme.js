'use client';
// `createTheme()` with no arguments is definitionally identical to `createThemeNoVars()`
// (the public `createTheme` returns `createThemeNoVars(options)` for the default
// `cssVariables: false` path). Importing `createThemeNoVars` directly keeps the CSS
// theme-variables machinery (`createThemeWithVars` and friends) out of every component
// bundle that only needs this default fallback theme.
import createThemeNoVars from './createThemeNoVars';

const defaultTheme = createThemeNoVars();

export default defaultTheme;
