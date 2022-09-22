# Migrating to CSS variables

<p class="description">A step-by-step migration guide to start using CSS theme variables in your project.</p>

This is a guide for an existing Material UI project to migrate to CSS theme variables. The migration aims to fix the dark mode flickering issue.

## 1. Use the new provider

### Without a custom theme

If you haven't used [`ThemeProvider`](/material-ui/customization/theming/#theme-provider), simply wrap you application with the new provider:

```js
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

function App() {
  return <CssVarsProvider>...your existing application</CssVarsProvider>;
}
```

You should see the generated CSS theme variables in the stylesheet. Material UI components that render inside the new provider will automatically consume the variables.

### Custom theme

If you have a custom theme, replace the `createTheme()` with the new `extendTheme()` API.

Moves the palette customization inside the `colorSchemes` node. Other properties can be copied and pasted.

```diff
- import { createTheme } from '@mui/material/styles';
+ import { experimental_extendTheme as extendTheme} from '@mui/material/styles';

- const lightTheme = createTheme({
-   palette: {
-    primary: {
-      main: '#ff5252',
-    },
-    ...
-  },
-  // ...other properties, e.g. breakpoints, spacing, shape, typography, components
- });

- const darkTheme = createTheme({
-   palette: {
-    mode: 'dark',
-    primary: {
-      main: '#000',
-    },
-    ...
-  },
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
+     dark: {
+       palette: {
+         primary: {
+           main: '#000',
+         },
+         ...
+       },
+     },
+   },
+   // ...other properties
+ });
```

Then, replace the `ThemeProvider` with the `CssVarsProvider`:

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

:::info
If you experience any error, [open an issue](https://github.com/mui/material-ui/issues/new?assignees=&labels=status%3A+needs+triage&template=1.bug.yml) with the error you got. We'd love to help.
:::

If you inspect the page, you will see the generated CSS variables in the stylesheet. Material UI components that render inside the new provider will automatically use the CSS theme variables.

## 2. Remove the toggle mode logic

You can remove your existing logic that handle the user selected mode and switch to `useColorScheme` hook.

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

**After**:

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

The `useColorScheme` hook provides the user selected `mode` and a function `setMode` to update the value.

The `mode` is store internally inside `CssVarsProvider` which handles the local storage synchronization for you.

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

## 4. Refactor custom styles to use attribute selector

Users still encounter dark mode flickering, if you have custom styles like this in your codebase:

```js
// theming example
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

// or a custom component example
const Button = styled('button')(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255 255 255 / 0.2)' : 'rgba(0 0 0 / 0.2)',
}));
```

This is because the `theme.palette.mode` is always `light` on the server.

To fix this problem, replace the conditional expression with the attribute selector instead:

```js
// theming example
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

// or a custom component example
const Button = styled('button')(({ theme }) => ({
  backgroundColor: 'rgba(0 0 0 / 0.2)',
  [theme.getColorSchemeSelector('dark')]: {
    backgroundColor: 'rgba(255 255 255 / 0.2)',
  },
}));
```

:::info
The `theme.getColorSchemeSelector()` is a utility function that returns an attribute selector `'[data-mui-color-scheme="dark"] &'`.

⚠️ Note that the attribute selector creates higher CSS specificity which could be cubersome for theming.
:::

## 5. Test dark mode flickering

1. Toggle dark mode in your application
2. Open DevTools and set the [CPU throttling](https://developer.chrome.com/docs/devtools/evaluate-performance/#simulate_a_mobile_cpu) to the lowest value (don't close the DevTools).
3. Refresh the page, you should see the all of the components in dark theme at first glance.
