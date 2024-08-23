# Dark mode

<p class="description">Material UI comes with two palette modes: light (the default) and dark.</p>

## Dark mode only

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

### Overriding the dark palette

To override the default palette, provide a [palette object](/material-ui/customization/palette/#default-colors) with custom colors in hex, RGB, or HSL format:

```jsx
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff5252',
    },
  },
});
```

Learn more about palette structure in the [Palette documentation](/material-ui/customization/palette/).

## System preference

Some users sets a preference for light or dark mode through their operation system—either systemwide, or for individual user agents.
The following sections explain how to apply these preferences to an app's theme.

### Built-in support

Use the `colorSchemes` node to build an application with multiple color schemes.
The built-in color schemes are `light` and `dark` which can be enabled by setting the value to `true`.

The light color scheme is enabled by default, so you only need to set the dark color scheme:

```js
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

When `colorSchemes` is provided, the following features are activated:

- Automatic switching between light and dark color schemes based on the user's preference
- Synchronization between window tabs—changes to the color scheme in one tab are applied to all other tabs
- An option to [disable transitions](#disable-transitions) when the color scheme changes

:::info
The `colorSchemes` API is an enhanced version of the earlier and more limited `palette` API—the aforementioned features are only accessible with the `colorSchemes` API, so we recommend using it over the `palette` API.
If both `colorSchemes` and `palette` are provided, `palette` will take precedence.
:::

:::success
To test the system preference feature, follow the guide on [emulating the CSS media feature `prefers-color-scheme`](https://developer.chrome.com/docs/devtools/rendering/emulate-css#emulate_css_media_feature_prefers-color-scheme).
:::

### Accessing media prefers-color-scheme

You can make use of this preference with the [`useMediaQuery`](/material-ui/react-use-media-query/) hook and the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media query.

The following demo shows how to check the user's preference in their OS or browser settings:

```jsx
import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return <div>prefersDarkMode: {prefersDarkMode.toString()}</div>;
}
```

## Toggling color mode

To give your users a way to toggle between modes for [built-in support](#built-in-support), use the `useColorScheme` hook to read and update the mode.

:::info
The `mode` is always `undefined` on first render, so make sure to handle this case as shown in the demo below—otherwise you may encounter a hydration mismatch error.
:::

{{"demo": "ToggleColorMode.js", "defaultCodeOpen": false}}

## Disable transitions

To instantly switch between color schemes with no transition, apply the `disableTransitionOnChange` prop to the `ThemeProvider` component:

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

## Dark mode flicker

### The problem

Server-rendered apps are built before they reach the user's device.
This means they can't automatically adjust to the user's preferred color scheme when first loaded.

Here's what typically happens:

1. You load the app and set it to dark mode.
2. You refresh the page.
3. The app briefly appears in light mode (the default).
4. Then it switches back to dark mode once the app fully loads.

This "flash" of light mode happens every time you open the app, as long as your browser remembers your dark mode preference.

This sudden change can be jarring, especially in low-light environments.
It can strain your eyes and disrupt your experience, particularly if you interact with the app during this transition.

To better understand this issue, take a look at the animated image below:

<img src="/static/joy-ui/dark-mode/dark-mode-flicker.gif" style="width: 814px; border-radius: 8px;" alt="An example video that shows a page that initially loads correctly in dark mode but quickly flickers to light mode." width="1628" height="400" />

### The solution: CSS variables

Solving this problem requires a novel approach to styling and theming.
(See this [RFC on CSS variables support](https://github.com/mui/material-ui/issues/27651) to learn more about the implementation of this feature.)

For applications that need to support light and dark mode using CSS media `prefers-color-scheme`, enabling the [CSS variables feature](/material-ui/customization/css-theme-variables/usage/#light-and-dark-modes) fixes the issue.

But if you want to be able to toggle between modes manually, avoiding the flicker requires a combination of CSS variables and the `InitColorSchemeScript` component.
Check out the [Preventing SSR flicker](/material-ui/customization/css-theme-variables/configuration/#preventing-ssr-flickering) section for more details.
