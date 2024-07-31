# Dark mode

<p class="description">Material UI comes with two palette modes: light (the default) and dark.</p>

## Dark mode only

You can make your application use the dark theme as the default—regardless of the user's preference—by adding `mode: 'dark'` to the `createTheme` helper:

<codeblock>

```js Default
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

```js Custom
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink[200], // to learn more, check out the Color customization page
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <main>This app is using the dark mode</main>
    </ThemeProvider>
  );
}
```

</codeblock>

Adding `mode: 'dark'` to the `createTheme` helper modifies several palette values, as shown in the following demo:

{{"demo": "DarkTheme.js", "bg": "inline", "hideToolbar": true}}

Adding `<CssBaseline />` inside of the `<ThemeProvider>` component will also enable dark mode for the app's background.

:::warning
Setting the dark mode this way only works if you are using [the default palette](/material-ui/customization/default-theme/). If you have a custom palette, make sure that you have the correct values based on the `mode`. The next section explains how to do this.
:::

## System preference

Users might have a preference for light or dark mode that they've set through their operating system—either systemwide, or for a single user agent.

### Built-in support

Material UI has built-in support for system preference when dark color scheme is provided:

<codeblock>

```js Default
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return <ThemeProvider theme={theme}>...</ThemeProvider>;
}
```

```js Custom
import { pink } from '@mui/material/colors';

const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: pink[200], // to learn more, check out the Palette tokens page
        },
      },
    },
  },
});
```

</codeblock>

The built-in support includes the following features:

- Automatic switching between light and dark color schemes based on the user's preference.
- Synchronize between window tabs. If the user changes the color scheme in one tab, the other tabs will also update.
- An option to [disable transitions](#disable-transitions) when the color scheme changes.

:::success
To test the system preference feature, follow the guide on [emulating the CSS media feature `prefers-color-scheme`](https://developer.chrome.com/docs/devtools/rendering/emulate-css#emulate_css_media_feature_prefers-color-scheme).
:::

### Manual implementation

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

## Toggling color mode

To give your users a way to toggle between modes, use `useColorScheme` hook to read and update the mode.

:::info
`mode` is always `undefined` on the first render, so make sure to handle this case.
:::

{{"demo": "ToggleColorMode.js", "defaultCodeOpen": false}}

## Disable transitions

To instantly switch between color schemes, you can disable transitions by setting `disableTransitionOnChange` prop on the `ThemeProvider` component:

```jsx
<ThemeProvider theme={theme} disableTransitionOnChange>
  ...
</ThemeProvider>
```

## Styling in dark mode

Use the `theme.applyStyles` utility to apply styles for a specific mode.

We recommend using this function over checking `theme.palette.mode` to switch between styles as it has more benefits:

- It can be used with [Pigment CSS](https://github.com/mui/material-ui/tree/master/packages/pigment-css-react), our in-house zero-runtime CSS-in-JS solution.
- It is generally more readable and maintainable.
- It is slightly more performant as it doesn't require to do style recalculation but the bundle size of SSR generated styles is larger.

### Usage

With the `styled` function:

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

With the `sx` prop:

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
