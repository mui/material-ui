import { Button, createMuiTheme } from '@material-ui/core';

export function createThemeOptions() {
  return {};
}

export function createThemeOverrides(theme) {
  return {};
}

export function createTheme(options) {
  const themeOptions = createThemeOptions(options);
  const baseTheme = createMuiTheme(themeOptions);
  const overrides = createThemeOverrides(baseTheme);
  const theme = { ...baseTheme, overrides };
  return theme;
}
