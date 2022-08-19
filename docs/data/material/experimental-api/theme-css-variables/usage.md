# Usage

<p class="description">Learn how to use the experimental API to adopt CSS variables.</p>

<!-- TODO: add link to the migration page -->

This page is best for starting a new project with CSS variables. If you have an existing Material UI project, check out the step-by-step [migration guide](/material-ui/experimental-api/css-variables/migration/) instead.

## Getting started

`Experimental_CssVarsProvider` is a new provider that attaches all generated CSS variables to the theme and puts them in React context.

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

:::info
The `CssVarsProvider` is basically a `ThemeProvider` with extra features like CSS variables generation, session synchronization, unlimited color schemes, etc.
:::

## Toggle between light and dark mode

The new provider has light and dark mode by default. It stores the user's selected mode and syncs it with the browser's local storage internally.

You can create your own interface and use the hook, `useColorScheme`, to read and/or update the mode programmatically:

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

<!-- If you want to customize `light` and `dark` palette, check out the [customization guide](/material-ui/experimental-api/css-variables/customization/#theming). -->

## Using the variables

There are mainly 2 ways that you can use the generated CSS variables:

- **A plain string**: The simplest and very effective way is to use a string with the format `var(--*)` to refer to a CSS variable.

  ```js
  const Button = style('button')({
    color: '#fff',
    // the mui is the default prefix.
    backgroundColor: 'var(--mui-palette-primary-main)',
  });
  ```

  :::warning
  A downside of this approach is that the prefix `mui` is hardcoded. If you want to change the generated prefix in the future, you will have to replace all of them in your project.
  :::

- `theme.vars`: Another way is to read a CSS variable from the theme object. This way, you don't need to worry about the prefix because the value comes from the configuration.

  The new provider will walk through the theme and attach an extra object to `theme.vars`. It is a plain object with similar theme structure that has values refer to the generated CSS variables.

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

By default, the theme does not have `theme.vars` attached. You need to import the theme augmentation to enable the typings:

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
