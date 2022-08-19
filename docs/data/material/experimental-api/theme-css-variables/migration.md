# Migrating to CSS variables

<p class="description">A step-by-step migration guide to adopt CSS variables in your existing Material UI project.</p>

This is a guide for existing Material UI project to migrate to use CSS variables that aims to fix the dark mode flickering.

## 1. Use the new provider

### Without a custom theme

Wrap you application with the new provider:

```js
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

function App() {
  return <CssVarsProvider>...your existing application</CssVarsProvider>;
}
```

You should see the generated CSS variables in the stylesheet and Material UI components start to consume the variables.

### Custom theme

Replace the `createTheme()` with the new `extendTheme()` API. Only the palette node that needs to move to `colorSchemes`. Other properties can be copied and pasted.

```diff
- import { createTheme } from '@mui/material/styles';
+ import { experimental_extendTheme as extendTheme} from '@mui/material/styles';

- const theme = createTheme({
-   palette: {
-    primary: {
-      main: '#ff5252',
-    },
-    ...
-  },
-  // ...other properties, e.g. breakpoints, spacing, shape, typography, components
- });

+ const theme = extendTheme({
+   colorSchemes: {
+     light: {
+       palette: {
+         primary: {
+           main: '#ff5252',
+         },
+         ...
+       },
+     },
+     // dark: { ... }
+   },
+   // ...other properties
+ });
```

:::info

If you have a dark theme, move the palette to the `dark` color scheme:

```diff
- const theme = createTheme({
-   palette: {
-     mode: 'dark',
-     primary: {
-       main: '#ff5252',
-     },
-   },
- });

+ const theme = extendTheme({
+   colorSchemes: {
+     dark: {
+       palette: {
+         primary: {
+           main: '#ff5252',
+         },
+       },
+     },
+   },
+ });
```

:::

Then, replace the `ThemeProvider` with the new provider:

```diff
- import { ThemeProvider } from '@mui/material/styles';
+ import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

const theme = extendTheme(...)

function App() {
- return <ThemeProvider theme={theme}>...</ThemeProvider>
+ return <CssVarsProvider theme={theme}>...</CssVarsProvider>
}
```

Save the file and start the development server, your application should be able to run without crashing.

If you inspect the page, you will see the generated CSS variables in the stylesheet and Material UI components start to consume the variables.

## 2. Remove the toggle mode logic

You can remove your existing logic that handle the user selected mode and switch to `useColorScheme` hook instead.

**Before**:

```js
// This is just a minimal example to demonstrate the migration.
function App() {
  const [mode, setMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mode') ?? 'light';
    }
    return 'light';
  });

  // new theme is created every time the mode changes
  const theme = createTheme({
    palette: {
      mode,
    },
    // ...your custom theme
  });
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
            localStorage.setItem('dark');
          } else {
            setMode('light');
            localStorage.setItem('light');
          }
        }}
      >
        {mode === 'light' ? 'Turn dark' : 'Turn light'}
      </Button>
      ...
    </ThemeProvider>
  );
}
```

**After**: the `mode` is store internally inside `CssVarsProvider` which handles the local storage synchronization for you. The `useColorScheme` hook lets you access to the user selected `mode` and a function `setMode` to update the value.

```js
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from '@mui/material/styles';

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
};

const theme = extendTheme({
  // ...your custom theme
});

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <ModeToggle />
      ...
    </CssVarsProvider>
  );
}
```

## 3. Prevent dark mode flickering for server-side application

To prevent the flickering, we expose a new API called `getInitColorSchemeScript()` which returns a script that must be run before React.

### Next.js

Places the script before `<Main />` in your [`pages/_document.js`](https://nextjs.org/docs/advanced-features/custom-document).

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

Places the script in [`gatsby-ssr.js`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) file:

```jsx
import React from 'react';
import { getInitColorSchemeScript } from '@mui/material/styles';

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([getInitColorSchemeScript()]);
}
```

## 4. Refactor custom styles to attribute selector

Users still encounter dark mode flickering, if you have custom styles like this in your codebase:

```js
extendTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(255 255 255 / 0.2)'
              : 'rgba(0 0 0 / 0.2)',
        }),
      },
    },
  },
});

// or a custom component
const Button = styled('button')(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255 255 255 / 0.2)' : 'rgba(0 0 0 / 0.2)',
}));
```

The above examples are considered as runtime calculation which creates dark mode flickering in server-side application.

To fix this problem, replace the conditional expression with attribute selector instead:

```js
extendTheme({
  components: {
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: 'rgba(0 0 0 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(255 255 255 / 0.2)',
          },
        }),
      },
    },
  },
});

// or a custom component
const Button = styled('button')(({ theme }) => ({
  backgroundColor: 'rgba(0 0 0 / 0.2)',
  [theme.getColorSchemeSelector('dark')]: {
    backgroundColor: 'rgba(255 255 255 / 0.2)',
  },
}));
```

:::info
`theme.getColorSchemeSelector()` is a function utility that returns an attribute selector `'[data-mui-color-scheme="dark"] &'`.

⚠️ Note that the attribute selector creates higher CSS specificity which is usually not great for theming. A better approach is to [`:where`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) selector, check out [how to apply it](/material-ui/experimental-api/css-variables/#using-where-selector) to your project.
:::
