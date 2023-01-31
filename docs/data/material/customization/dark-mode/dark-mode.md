# Dark mode

<p class="description">Material UI comes with two palette modes: light (the default) and dark.</p>

## Dark mode by default

You can make your application use the dark theme as the default—regardless of the user's preference—by adding `mode: 'dark'` to the `createTheme` helper:

```js
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>This app is using the dark mode</main>
    </ThemeProvider>
  );
}

export default App;
```

Adding `mode: 'dark'` to the `createTheme` helper modifies several palette values, as shown in the following demo:

{{"demo": "DarkTheme.js", "bg": "inline", "hideToolbar": true}}

Adding `<CssBaseline />` inside of the `<ThemeProvider>` component will also enable dark mode for the app's background.

:::warning
Setting the dark mode this way only works if you are using [the default palette](/material-ui/customization/default-theme/). If you have a custom palette, make sure that you have the correct values based on the `mode`. The next section explains how to do this.
:::

## Dark mode with a custom palette

To use custom palettes for light and dark modes, you can create a function that will return the correct palette depending on the selected mode, as shown here:

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

To give your users a way to toggle between modes, you can add React's context to a button's `onClick` event, as shown in the following demo:

{{"demo": "ToggleColorMode.js", "defaultCodeOpen": false}}

## System preference

Users might have a preference for light or dark mode that they've set through their operating system—either systemwide, or for a single user agent.

You can make use of this preference with the [useMediaQuery](/material-ui/react-use-media-query/) hook and the [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query.

The following demo shows how to enable dark mode automatically by checking for the user's preference in their OS or browser settings:

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
