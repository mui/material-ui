# Dark mode

<p class="description">Material UI comes with two palette modes: light (the default) and dark.</p>

## Dark mode by default

You can make your application use the dark theme by default setting the `mode: 'dark'`.

```js
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },

  function App() {
    return (
      <ThemeProvider theme={darkTheme}>
        <main>
          This app is using the dark mode
        </main>
      </ThemeProvider>
    );
}

export default App;
```

While it seems like only a single value change, the `createTheme` helper actually modifies several palette values, adapting them accordingly to the dark mode.
The modified colors are the following:

{{"demo": "DarkTheme.js", "bg": "inline", "hideToolbar": true}}

> Note: The colors are modified only if you use [the default palette](/customization/default-theme/). If you have a custom palette, you need to make sure that you have the correct values based on the `mode`. The following section explains how you can do it.

## Dark mode with a custom palette

If you want to have a certain palette for when each mode is set, you can create a function that will return the correct palette depending on the selected mode.
For example:

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

{{"demo": "DarkThemeWithCustomPalette.js", "defaultCodeOpen": false}}

## Toggling color mode

If you want to provide your users a way to toggle between modes, you can use React's context adding it to a button's `onClick` event:

{{"demo": "ToggleColorMode.js", "defaultCodeOpen": false}}

## System preference

The method by which users express their mode preference can vary. It might be a system-wide setting exposed by the Operating System, or a setting controlled by the User Agent (user specifying a preference for a light or dark theme).

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
