# CSS theme variables - Configuration

<p class="description">A guide for configuring CSS theme variables in Material UI.</p>

## Customizing variable prefix

To change the default variable prefix (`--mui`), provide a string to `cssVarPrefix` property, as shown below:

```js
const theme = extendTheme({ cssVarPrefix: 'any' });

// the stylesheet will be like this:
// --any-palette-primary-main: ...;
```

To remove the prefix, use an empty string as a value:

```js
const theme = extendTheme({ cssVarPrefix: '' });

// the stylesheet will be like this:
// --palette-primary-main: ...;
```

## Toggling dark mode manually

To support toggling between light and dark modes manually, set the `strategy` with a custom selector.

Choose one of the following strategies:

<codeblock>

```js class
extendTheme({
  strategy: '.mode-%s',
});
```

```js data-attribute
extendTheme({
  strategy: '[data-mode-%s]',
});
```

</codeblock>

Then, use `useColorScheme` hook to switch between modes:

<codeblock>

```jsx client-side-app
import { useColorScheme } from '@mui/material/styles';

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();

  return (
    <select
      value={mode}
      onChange={(event) => {
        setMode(event.target.value);
      }}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

```jsx server-side-app
import { useColorScheme } from '@mui/material/styles';

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // for server-side rendering
    // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }

  return (
    <select
      value={mode}
      onChange={(event) => {
        setMode(event.target.value);
      }}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

</codeblock>

### Preventing SSR flickering

For SSR (server-side rendering) applications, Material UI can not detected user-selected mode on the server, causing the screen to flicker from light to dark during the hydration phase on the client.

To prevent the issue, you need to ensure that there is no usage of `theme.palette.mode === 'dark'` in your code base.

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

Next, if you have a custom strategy that is **not** `media`, add the `InitColorSchemeScript` component based on the framework that you are using:

:::success
The `attribute` has to be the same as the one you set in the `strategy` property:

```js
<InitColorSchemeScript attribute="{strategy}" />
```

:::

#### Next.js App Router

Add the following code to the [root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required) file:

```jsx title="app/layout.js"
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* must come before the <main> element */}
        <InitColorSchemeScript attribute=".mode-%s" />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

#### Next.js Pages Router

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
          {/* must come before the <Main> element */}
          <InitColorSchemeScript attribute=".mode-%s" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

#### Gatsby

Place the script in your [`gatsby-ssr.js`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) file:

```jsx
import * as React from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([<InitColorSchemeScript attribute=".mode-%s" />]);
}
```

### Supporting system preference and manual selection

To support system preference together with manual toggle, set `enableSystem` on the `CssVarsProvider`:

```jsx
import { CssVarsProvider, extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  strategy: '.mode-%s',
});

function App() {
  return (
    <CssVarsProvider theme={theme} enableSystem>
      {/* your application */}
    </CssVarsProvider>
  );
}
```

Material UI will automatically switch between light and dark modes based on the user's system preference.

:::warning
In development, make sure to clear local storage and refresh the page after you configure the `enableSystem` prop.
:::

You can switch between `light`, `dark`, and `system` modes using the `useColorScheme` hook:

<codeblock>

```jsx client-side-app
import { useColorScheme } from '@mui/material/styles';

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();

  return (
    <select
      value={mode}
      onChange={(event) => {
        setMode(event.target.value);
      }}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

```jsx server-side-app
import { useColorScheme } from '@mui/material/styles';

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // for server-side rendering
    // learn more at https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    return null;
  }

  return (
    <select
      value={mode}
      onChange={(event) => {
        setMode(event.target.value);
      }}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

</codeblock>

## Forcing a specific color scheme

To force a specific color scheme for some part of your application, set the selector to the component or HTML element directly.

In the example below, all the components inside the `div` will always be dark:

<codeblock>

```js class
// if the strategy is '.mode-%s'
<div className=".mode-dark">
  <Paper sx={{ p: 2 }}>
    <TextField label="Email" type="email" margin="normal" />
    <TextField label="Password" type="password" margin="normal" />
    <Button>Sign in</Button>
  </Paper>
  {/* other components */}
</div>
```

```js data-attribute
// if the strategy is '[data-mode-%s]'
<div data-mode-dark>
  <Paper sx={{ p: 2 }}>
    <TextField label="Email" type="email" margin="normal" />
    <TextField label="Password" type="password" margin="normal" />
    <Button>Sign in</Button>
  </Paper>
  {/* other components */}
</div>
```

</codeblock>

## Disabling CSS color scheme

By default, the `CssVarsProvider` attach [CSS color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) based on the palette mode. If you want to disable it, set the `disableCssColorScheme` to `false`:

```js
<CssVarsProvider disableCssColorScheme />
```

## Instant transition between modes

To disable CSS transition when switching between modes, set the `disableTransitionOnChange` to `true`:

```js
<CssVarsProvider disableTransitionOnChange />
```

<!-- add a demo -->
