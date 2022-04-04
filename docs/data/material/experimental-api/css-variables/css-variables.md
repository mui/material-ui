# CSS variables

<p class="description">Learn about the experimental API for using CSS variables on Material UI components.</p>

CSS variables provide significant improvements in developer experience related to theming and customization.
With these variables, you can inject a theme into your app's stylesheet _at build time_ to apply the user's selected settings before the whole app is rendered.
This solves the problem of dark-mode SSR flickering; lets you provide your users with multiple themes beyond light and dark; and offers a better debugging experience overall, among other benefits.

Previously, these CSS variables were only available as an experimental API in the MUI System package.
Now they are ready for experimental use with Material UI components.

> If you want to see wider support for this API across Material UI's component library, please feel free to contribute to the ongoing development. Make sure to check the [GitHub issue](https://github.com/mui/material-ui/issues/32049) that keeps track of our progress, to see if anyone else is currently working on a component you're interested in.

## Introduction

The CSS variables API relies on a new experimental provider for the theme called `Experimental_CssVarsProvider` to inject styles into Material UI components.
In addition to providing the theme in the inner React context, this new provider also generates CSS variables out of all tokens in the theme that are not functions, and makes them available in the context as well.

All of these variables are accessible in an object in the theme called `vars`.
The structure of this object is nearly identical to the theme structure, the only difference is that the values represent CSS variables.

## Usage

`Experimental_CssVarsProvider` is a new experimental provider that attaches all generated CSS variables to the theme and put it in React context. Children elements under this provider will also be able to read the CSS variables from the theme.

```js
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

function App() {
  return <CssVarsProvider>...</CssVarsProvider>;
}
```

### Toggle between light and dark mode

`Experimental_CssVarsProvider` provides light and dark mode by default. It stores the selected user mode and syncs it with the browser's local storage internally. You can read or update the mode using the `useColorScheme` API.

```jsx
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';

const ModeSwitcher = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // for server-side rendering
    // Read more on https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? 'Dark' : 'Light'}
    </Button>
  );
};

function App() {
  return (
    <CssVarsProvider>
      <ModeSwitcher />
    </CssVarsProvider>
  );
}
```

### Server-side rendering

To prevent the dark-mode SSR flickering at hydration phase, place `getInitColorSchemeScript()` before the `<Main />` tag.

### Next JS

Add the following code to `pages/_document.js`.

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getInitColorSchemeScript } from '@mui/material/styles';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>...</Head>
        <body>
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Gatsby

Add the following code to `gatsby-ssr.js`

```jsx
import React from 'react';
import { getInitColorSchemeScript } from '@mui/material/styles';

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([getInitColorSchemeScript()]);
}
```

### Customizing the theme

If you want to override Material UI's default color schemes, you can use the `experimental_extendTheme` utility.

```jsx
const theme = experimental_extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
    },
  },
});
```

{{"demo": "CssVarsCustomTheme.js", "iframe": true }}

If you are using [`ThemeProvider`](/material-ui/customization/theming/#theme-provider), you can replace it with the new experimental provider.

```diff
- import { ThemeProvider, createTheme } from '@mui/material/styles';
+ import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

function App() {
  return (
-    <ThemeProvider theme={createTheme()}>
-      ...
-    </ThemeProvider>
+    <CssVarsProvider>
+      ...
+    </CssVarsProvider>
  )
}
```

### Customizing components

Because the CSS variables API is an experimental feature, it is currently only supported by the `Button` component.
To customize it using CSS variables, you'll need to wrap your application with `Experimental_CssVarsProvider`.
Play around with the demo below!
We'd appreciate any feedback about this API, as it is still in development.

{{"demo": "CssVariablesCustomization.js", "iframe": true }}

If you are using TypeScript you should use module augmentation to update the `Theme` structure:

```tsx
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    vars: Omit<
      MuiTheme,
      'typography' | 'mixins' | 'breakpoints' | 'direction' | 'transitions'
    >;
  }
}
```

## API

### `<CssVarsProvider>` props

- `defaultColorScheme: ColorScheme | { light: ColorScheme; dark: ColorScheme }` - Design system default color scheme; provides a string if the design system has one default color scheme (either light or dark) or an object if the design system has default light & dark color schemes
- `defaultMode?: Mode` - Design system default mode
- `disableTransitionOnChange : boolean` - Disable CSS transitions when switching between modes or color schemes
- `enableColorScheme: boolean` - Indicate to the browser which color scheme is used (light or dark) for rendering built-in UI
- `prefix: string` - CSS variable prefix
- `theme: ThemeInput`
- `modeStorageKey?: string` - localStorage key used to store application `mode`
- `attribute?: string` - DOM attribute for applying color scheme

### `useColorScheme: () => ColorSchemeContextValue`

- `allColorSchemes: string[]` - All color schemes available in the theme
- `colorScheme: string`: - The current application color scheme
- `darkColorScheme: string`- The color scheme for the dark mode
- `lightColorScheme: string` - The color scheme for the light mode
- `mode: string` - The user selected mode
- `setColorScheme: : value => {…}` - Function for setting the `colorScheme`. The `colorScheme` is saved to internal state and local storage; if `colorScheme` is null, it will be reset to the default color scheme (light | dark)
- `setMode: mode => {…}` - Function for setting the `mode`. The `mode` is saved to internal state and local storage; if `mode` is null, it will be reset to the default mode

### `getInitColorSchemeScript: (options) => React.ReactElement`

**options**

- `enableSystem?: boolean`: - If `true` and the selected mode is not `light` or `dark`, the system mode is used
- `defaultLightColorScheme?: string`: - The default color scheme for the light mode
- `defaultDarkColorScheme?: string`: - The default color scheme for the dark mode
- `modeStorageKey?: string`: - localStorage key used to store application `mode`
- `colorSchemeStorageKey?: string`: - localStorage key used to store application `colorScheme`
- `attribute?: string` - DOM attribute for applying color scheme
