# Usage

<p class="description">Learn how to use the experimental API to adopt CSS theme variables.</p>

## Getting started

`Experimental_CssVarsProvider` is a new provider that generates CSS theme variables and attach a reference to the theme (a React context).

```js
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

function App() {
  return <CssVarsProvider>...</CssVarsProvider>;
}
```

Once the `App` renders on the screen, you will see the CSS theme variables in the html `:root` stylesheet. The variables are flatten and prefixed with `--mui` by default:

```css
/* generated global stylesheet */
:root {
  --mui-palette-primary-main: #1976d2;
  --mui-palette-primary-light: #42a5f5;
  --mui-palette-primary-dark: #1565c0;
  --mui-palette-primary-contrastText: #fff;
  /* ...other variables */
}
```

:::info
💡 The `CssVarsProvider` is built on top of the [`ThemeProvider`](/material-ui/customization/theming/#themeprovider) with extra features like CSS variables generation, storage synchronization, unlimited color schemes, etc.
:::

## Toggle between light and dark mode

Use the hook, `useColorScheme`, to read and update the user selected mode:

```jsx
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
} from '@mui/material/styles';

// ModeSwitcher is an example interface that users use to toggle between modes.
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

## Using the theme variables

- `theme.vars` (recommended): is an object that refers to the CSS theme variables:

  ```js
  const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.vars.palette.primary.main, // var(--mui-palette-primary-main)
    color: theme.vars.palette.primary.contrastText, // var(--mui-palette-primary-contrastText)
  }));
  ```

  For **TypeScript**, the typings do not come by default. Check out the [theme types setup](#typescript) to enable the types.

  :::warning
  Make sure that the components accessing `theme.vars` are rendered under the new provider, otherwise you will get TypeError.
  :::

- **Native CSS**: if the can't access the theme, e.g. in a pure CSS file, you can use [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/var) directly:

  ```css
  <!-- external.css -- > .external-section {
    background-color: var(--mui-palette-grey-50);
  }
  ```

  :::info
  💡 If you have a custom prefix, make sure to replace the `--mui` with it.
  :::

## Server-side rendering

Place the `getInitColorSchemeScript()` before the `<Main />` tag to prevent the dark-mode SSR flickering during the hydration phase.

### Next.js

To use the API with a Next.js project, add the following code to the custom [`pages/_document.js`](https://nextjs.org/docs/advanced-features/custom-document) file:

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

To use the API with a Gatsby project, add the following code to the custom [`gatsby-ssr.js`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) file:

```jsx
import React from 'react';
import { getInitColorSchemeScript } from '@mui/material/styles';

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([getInitColorSchemeScript()]);
}
```

## TypeScript

The theme does not have `theme.vars` attached by default. You need to import the theme augmentation to enable the typings:

```ts
// this can be at the root file of you application
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';

const StyledComponent = styled('button')(({ theme }) => ({
  // ✅ typed-safe
  color: theme.vars.palette.primary.main,
}));
```
