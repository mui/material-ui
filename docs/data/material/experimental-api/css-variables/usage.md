# Usage

<p class="description">Learn how to use the experimental API to adopt CSS variables.</p>

<!-- TODO: add link to the migration page -->

This page is best for starting a new project with CSS variables. If you have an existing Material UI project, check out the step-by-step [migration guide](/material-ui/experimental-api/css-variables/migration/) instead.

## Getting started

`Experimental_CssVarsProvider` is a new experimental provider that attaches all generated CSS variables to the theme and puts them in React's context. Children elements under this provider will also be able to read the CSS variables from the `theme.vars`.

```js
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

function App() {
  return <CssVarsProvider>...</CssVarsProvider>;
}
```

Once the `App` renders on the screen, you will see the theme CSS variables attached to html `:root` stylesheet. The theme object is flatten to variables using `-` separator:

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

If you use TypeScript, check out the [theme types setup](#typescript).

:::info
The `CssVarsProvider` is basically a `ThemeProvider` with extra features like CSS variables generation, session synchronization, unlimited color schemes, etc.
:::

## Toggle between light and dark mode

The new provider has light and dark mode by default. It stores the user's selected mode and syncs it with the browser's local storage internally.

You can use the hook, `useColorScheme`, to read and/or update the mode programmatically:

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

If you want to customize `light` and `dark` theme or create new color scheme, check out the [customization guide](/material-ui/experimental-api/css-variables/customization/).

## Using the variables

The new provider will walk through the theme and attach an extra object to `theme.vars`. It is a plain object with similar structure that has values refer to the generated CSS variables.

Here is a comparison between the existing method and the CSS variables method when you create a component:

```js
// existing method, the result is the raw value
const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // #1976d2
  color: theme.palette.primary.contrastText, // #fff
}));

// CSS variables method, the result is a string that refers to CSS variables
const Button = styled('button')(({ theme }) => ({
  backgroundColor: theme.vars.palette.primary.main, // var(--mui-palette-primary-main)
  color: theme.vars.palette.primary.contrastText, // var(--mui-palette-primary-contrastText)
}));
```

:::warning
Make sure that the components accessing `theme.vars` are rendered under the new provider, otherwise you will get TypeError.
:::

## Server-side rendering

To prevent the dark-mode SSR flickering during the hydration phase, place `getInitColorSchemeScript()` before the `<Main />` tag.

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

By default, the theme does not have `theme.vars` attached. You need to import the theme augmentation to include `theme.vars` and other utilities related to CSS variables to the theme:

```ts
// this can be at the root file of you application
import type {} from '@mui/material/themeCssVarsAugmentation';
```

Then, you will be able to access `theme.vars` in any of the styling APIs, for example the `styled`:

```ts
import { styled } from '@mui/material/styles';

const StyledComponent = styled('button')(({ theme }) => ({
  // typed-safe
  color: theme.vars.palette.primary.main,
}));
```
