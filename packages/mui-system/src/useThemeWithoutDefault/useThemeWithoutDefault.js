'use client';
import { useTheme as usePrivateTheme } from '@mui/private-theming';

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// ToDo Silviu: Why do I need to import from private? It also breaks ThemeProvider tests.
function useTheme(defaultTheme = null) {
  // Read from the `@mui/private-theming` context. Both `SystemThemeProvider`
  // (Emotion path) and the lightweight `CssThemeProvider` (CSS-only path)
  // write to this context, so a single read covers every supported setup.
  //
  // Importing `ThemeContext` from `@mui/styled-engine` here used to force
  // Emotion into the bundle of every component that called `useTheme()`
  // (i.e. every MUI component). Reading only from private-theming lets the
  // tree-shaker drop Emotion when an app uses `CssThemeProvider` without
  // `styled()` or `sx`.
  const theme = usePrivateTheme();
  return !theme || isObjectEmpty(theme) ? defaultTheme : theme;
}

export default useTheme;
