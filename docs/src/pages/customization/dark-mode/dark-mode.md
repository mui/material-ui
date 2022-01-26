# Dark mode

<p class="description">MUI comes with two palette modes: light (the default) and dark.</p>

You can make the theme dark by setting `mode: 'dark'`.

```js
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
```

While it's only a single value change, the `createTheme` helper modifies several palette values.
The colors modified by the palette mode are the following:

{{"demo": "pages/customization/dark-mode/DarkTheme.js", "bg": "inline", "hideToolbar": true}}

> Note: The colors are modified only if you use the default palette. If you have a custom palette, you need to make sure that you have the correct values based on the `mode`. The following section explains how you can do it.

## Dark mode with custom palette

The easiest way of how you can implement your custom palette that depends on mode is to have a dedicated function that will return the palette based on the mode. For example:

```ts
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});
```

You can see on the example that there are different colors used based on whether the mode is light or dark. The next step is to use this function when creating the theme.

```tsx
export default function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Page />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
```

Here is a fully working example:

{{"demo": "pages/customization/dark-mode/DarkThemeWithCustomPalette.js", "defaultCodeOpen": false}}

## Toggling color mode

You can use the React context to toggle the mode with a button inside your page.

{{"demo": "pages/customization/dark-mode/ToggleColorMode.js", "defaultCodeOpen": false}}

## System preference

Users might have specified a preference for a light or dark theme.
The method by which the user expresses their preference can vary. It might be a system-wide setting exposed by the Operating System, or a setting controlled by the User Agent.

You can leverage this preference dynamically with the [useMediaQuery](/components/use-media-query/) hook and the [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query.

For instance, you can enable the dark mode automatically:

```jsx
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
}
```
