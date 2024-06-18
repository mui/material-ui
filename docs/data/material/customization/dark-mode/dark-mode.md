# Dark mode

<p class="description">Material UI comes with two palette modes: light (the default) and dark.</p>

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

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>This app is using the dark mode</main>
    </ThemeProvider>
  );
}
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

## Styling in dark mode

Use the `theme.applyStyles` utility to apply styles for a specific mode.

We recommend using this function over checking `theme.palette.mode` to switch between styles as it has more benefits:

- It works with or without `CssVarsProvider`. The function automatically switches between overriding object styles or injecting pseudo-classes based on the upper provider.
- It lets you prevent [dark-mode SSR flickering](https://github.com/mui/material-ui/issues/27651) when using with `CssVarsProvider`.
- It can be used with [Pigment CSS](https://github.com/mui/material-ui/tree/master/packages/pigment-css-react), our in-house zero-runtime CSS-in-JS solution.
- It is generally more readable and maintainable.
- It is slightly more performant as it doesn't require to do style recalculation but the bundle size of SSR generated styles is larger.

### Usage

With the `**styled**` function:

```jsx
import { styled } from '@mui/material/styles';

const MyComponent = styled('div')(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.secondary.main,
  }),
  '&:hover': {
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.primary.dark,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.secondary.dark,
    }),
  },
}));
```

With the `**sx**` prop:

```jsx
import Button from '@mui/material/Button';

<Button
  sx={[
    (theme) => ({
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.secondary.main,
      }),
      '&:hover': {
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.primary.dark,
        ...theme.applyStyles('dark', {
          backgroundColor: theme.palette.secondary.dark,
        }),
      },
    }),
  ]}
>
  Submit
</Button>;
```

### Codemod

We provide codemods to migrate your codebase from using `theme.palette.mode` to use `theme.applyStyles()`.
You can run each codemod below or all of them at once.

```bash
npx @mui/codemod@next v6.0.0/styled <path/to/folder-or-file>
npx @mui/codemod@next v6.0.0/sx-prop <path/to/folder-or-file>
npx @mui/codemod@next v6.0.0/theme-v6 <path/to/theme-file>
```

> Run `v6.0.0/theme-v6` against the file that contains the custom `styleOverrides`. Ignore this codemod if you don't have a custom theme.

### API

`theme.applyStyles(mode, styles) => CSSObject`

Apply styles for a specific mode.

#### Arguments

- `mode` (`'light' | 'dark'`) - The mode for which the styles should be applied.
- `styles` (`CSSObject`) - An object which contains the styles to be applied for the specified mode.
