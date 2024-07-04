# CSS theme variables - Usage

<p class="description">Learn how to adopt CSS theme variables.</p>

## Getting started

The CSS variables API relies on a provider called `CssVarsProvider` to inject styles into Material UI components.
`CssVarsProvider` generates CSS variables out of all tokens in the theme that are serializable, and makes them available in the React context along with the theme itself via [`ThemeProvider`](/material-ui/customization/theming/#theme-provider).

Once the `App` renders on the screen, you will see the CSS theme variables in the HTML `:root` stylesheet.
The variables are flattened and prefixed with `--mui` by default:

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
The `CssVarsProvider` is built on top of the [`ThemeProvider`](/material-ui/customization/theming/#themeprovider) with extra features like CSS variable generation, storage synchronization, unlimited color schemes, and more.

If you have an existing theme, you can migrate to CSS theme variables by following the [migration guide](/material-ui/migration/migration-css-theme-variables/).
:::

## Dark mode

To generate dark CSS variables, extend the default theme by providing a `strategy` option.
The example below uses `"media"` ([prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)) as the strategy:

<codeblock>

```jsx JSX
import { CssVarsProvider, extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  strategy: 'media',
});

function App() {
  return <CssVarsProvider theme={theme}>{/* ...you app */}</CssVarsProvider>;
}
```

```css CSS
/* generated global stylesheet */

:root {
  --mui-palette-primary-main: #1976d2;
  /* ...other variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    --mui-palette-primary-main: #90caf9;
    /* ...other variables */
  }
}
```

</codeblock>

<!-- TODO: fix the link -->

If you want to customize the selector instead of using `prefers-color-scheme`, check out the [advanced configuration](/material-ui/customization/css-theme-variables/configuration/#advanced-configuration).

## Using theme variables

All of these variables are accessible in an object in the theme called `vars`.
The structure of this object is a serializable theme structure with the values represent CSS variables.

- `theme.vars` (recommended): an object that refers to the CSS theme variables.

  ```js
  const Button = styled('button')(({ theme }) => ({
    backgroundColor: theme.vars.palette.primary.main, // var(--mui-palette-primary-main)
    color: theme.vars.palette.primary.contrastText, // var(--mui-palette-primary-contrastText)
  }));
  ```

  For **TypeScript**, the typings are not enabled by default.
  Follow the [TypeScript setup](#typescript) to enable the typings.

  :::success
  If the components need to render outside of the `CssVarsProvider`, add fallback to the theme object.

  ```js
  backgroundColor: (theme.vars || theme).palette.primary.main;
  ```

  :::

- **Native CSS**: if you can't access the theme object, for example in a pure CSS file, you can use [`var()`](https://developer.mozilla.org/en-US/docs/Web/CSS/var) directly:

  ```css
  /* external-scope.css */
  .external-section {
    background-color: var(--mui-palette-grey-50);
  }
  ```

  :::warning
  If you have set up a [custom prefix](/material-ui/customization/css-theme-variables/configuration/#changing-variable-prefixes), make sure to replace the default `--mui`.
  :::

## Applying dark styles

To customize styles for dark mode, use `theme.applyStyles` function.
This utility function will take care of applying the right selector based on the strategy configuration.

The example below shows how to customize the Card component for dark mode:

```js
import Card from '@mui/material/Card';

<Card sx={theme => ({
  backgroundColor: theme.vars.palette.background.default,
  ...theme.applyStyles('dark', {
    boxShadow: 'none',
  })
})}>
```

## Prevent SSR flickering

To prevent the dark-mode SSR flickering during the hydration phase, you need to ensure that there is no usage of `theme.palette.mode === 'dark'` in your code base.
If you have such a condition, replace it with the [`theme.applyStyles`](#appling-dark-styles) function:

```diff
import Card from '@mui/material/Card';

function App() {
  return (
    <Card
      sx={(theme) => ({
-        backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
-        '&:hover': {
-          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
-        },
+        backgroundColor: '#fff',
+        '&:hover': {
+          backgroundColor: '#f5f5f5',
+          ...theme.applyStyles('dark', {
+            backgroundColor: '#333',
+          }),
+        },
+        ...theme.applyStyles('dark', {
+          backgroundColor: '#000',
+        }),
      })}
    />
  );
}
```

Next, if you have a custom strategy that is **not** `"media"`, add the `InitColorSchemeScript` component based on the framework that you are using:

### Next.js

#### App Router

Add the following code to the [root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required) file:

```jsx title="app/layout.js"
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <InitColorSchemeScript /> {/* must come before the <main> element */}
        <main>{children}</main>
      </body>
    </html>
  );
}
```

#### Pages Router

Add the following code to the custom [`pages/_document.js`](https://nextjs.org/docs/pages/building-your-application/routing/custom-document) file:

```jsx title="pages/_document.js"
import Document, { Html, Head, Main, NextScript } from 'next/document';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default class MyDocument extends Document {
  render() {
    return (
      <Html data-color-scheme="light">
        <Head>...</Head>
        <body>
          <InitColorSchemeScript /> {/* must come before the <Main> element */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## TypeScript

The theme variables type is not enabled by default. You need to import the module augmentation to enable the typings:

```ts
// The import can be in any file that is included in your `tsconfig.json`
import type {} from '@mui/material/themeCssVarsAugmentation';
import { styled } from '@mui/material/styles';

const StyledComponent = styled('button')(({ theme }) => ({
  // ✅ typed-safe
  color: theme.vars.palette.primary.main,
}));
```
