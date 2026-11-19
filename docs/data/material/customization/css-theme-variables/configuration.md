# CSS theme variables - Configuration

<p class="description">A guide for configuring CSS theme variables in Material UI.</p>

## Customizing variable prefix

To change the default variable prefix (`--mui`), provide a string to `cssVarPrefix` property, as shown below:

```js
createTheme({ cssVariables: { cssVarPrefix: 'any' } });

// generated stylesheet:
// --any-palette-primary-main: ...;
```

To remove the prefix, use an empty string as a value:

```js
createTheme({ cssVariables: { cssVarPrefix: '' } });

// generated stylesheet:
// --palette-primary-main: ...;
```

## Toggling dark mode manually

To toggle between modes manually, set the `colorSchemeSelector` with one of the following selectors:

- `class`: adds a class to the `<html>` element.

  ```js class
  createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: 'class'
    }
  });

  // CSS Result
  .light { ... }
  .dark { ... }
  ```

- `data`: adds a data attribute to the `<html>` element.

  ```js data
  createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: 'data'
    }
  });

  // CSS Result
  [data-light] { ... }
  [data-dark] { ... }
  ```

- `string`: adds a custom selector to the `<html>` element.

  ```js string
  // The value must start with dot (.) for class or square brackets ([]) for data
  createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: '.theme-%s'
    }
  });

  // CSS Result
  .theme-light { ... }
  .theme-dark { ... }
  ```

Then, use `useColorScheme` hook to switch between modes:

```jsx
import { useColorScheme } from '@mui/material/styles';

function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <select
      value={mode}
      onChange={(event) => {
        setMode(event.target.value);
        // For TypeScript, cast `event.target.value as 'light' | 'dark' | 'system'`:
      }}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
```

:::success
After React hydrates the tree, the mode is set to `system` to follow the user's preference.
:::

### Determining the system mode

To determine if the system mode is `light` or `dark`, use the `systemMode` property:

```js
const { mode, systemMode } = useColorScheme();

console.log(mode); // 'system'
console.log(systemMode); // 'light' | 'dark'
```

However, if the mode is **not** `system`, the `systemMode` will be `undefined`.

```js
const { mode, systemMode } = useColorScheme();

console.log(mode); // 'light' | 'dark'
console.log(systemMode); // undefined
```

### Preventing SSR flickering

For SSR (server-side rendering) applications, Material UI cannot detect the user-selected mode on the server, causing the screen to flicker from light to dark during the hydration phase on the client.

To prevent the issue, you need to ensure that there is no usage of `theme.palette.mode === 'dark'` in your code base.

If you have such a condition, replace it with the [`theme.applyStyles()` function](/material-ui/customization/dark-mode/#styling-in-dark-mode):

```diff
 import Card from '@mui/material/Card';

 function App() {
   return (
     <Card
-      sx={(theme) => ({
-        backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
-        '&:hover': {
-          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
-        },
-      })}
+      sx={[
+        {
+          backgroundColor: '#fff',
+          '&:hover': {
+            backgroundColor: '#f5f5f5',
+          },
+        },
+        (theme) =>
+          theme.applyStyles('dark', {
+            backgroundColor: '#000',
+            '&:hover': {
+              backgroundColor: '#333',
+            },
+          }),
+      ]}
     />
   );
 }
```

Next, if you have a custom selector that is **not** `media`, add the [`InitColorSchemeScript`](/material-ui/react-init-color-scheme-script/) component based on the framework that you are using:

:::success
The `attribute` has to be the same as the one you set in the `colorSchemeSelector` property:

```js
createTheme({
  cssVariables: {
    colorSchemeSelector: 'class'
  }
})

<InitColorSchemeScript attribute="class" />
```

:::

### Next.js App Router

Add the following code to the [root layout](https://nextjs.org/docs/app/api-reference/file-conventions/layout#root-layouts) file:

```jsx title="app/layout.js"
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function RootLayout(props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* must come before the <main> element */}
        <InitColorSchemeScript attribute="class" />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

:::warning
If you don't add `suppressHydrationWarning` to your `<html>` tag, you will see warnings about `"Extra attributes from the server"` because `InitColorSchemeScript` updates that element.
:::

### Next.js Pages Router

Add the following code to the custom [`pages/_document.js`](https://nextjs.org/docs/pages/building-your-application/routing/custom-document) file:

```jsx title="pages/_document.js"
import Document, { Html, Head, Main, NextScript } from 'next/document';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>...</Head>
        <body>
          {/* must come before the <Main> element */}
          <InitColorSchemeScript attribute="class" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Gatsby

Place the script in your [`gatsby-ssr.js`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) file:

```jsx
import * as React from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([<InitColorSchemeScript attribute="class" />]);
}
```

## Forcing a specific color scheme

To force a specific color scheme for some part of your application, set the selector to the component or HTML element directly.

In the example below, all the components inside the `div` will always be dark:

<codeblock>

```js class
// if the selector is '.mode-%s'
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
// if the selector is '[data-mode-%s]'
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

## Nested and multiple theme providers

The top-level `ThemeProvider` writes the CSS theme variables to `:root`, so they apply to the whole page.
Every other provider renders an element and sets them on it, so they only apply to its children.

### Nested providers

A nested `ThemeProvider` renders a `div` with `display: contents`, so it doesn't change the layout.
When its variables differ from the outer theme, the `div` gets a generated class that sets only the variables that differ, and the ones that reference them through `var()`.
It follows the outer light or dark mode:

```jsx
<ThemeProvider theme={appTheme}>
  <Button>Uses appTheme</Button>
  <ThemeProvider theme={promoTheme}>
    <Button>Uses promoTheme</Button>
  </ThemeProvider>
</ThemeProvider>
```

```html
<div class="MuiThemeProvider-root mui-theme-1x2y3z">…</div>
```

```css
:root {
  --mui-palette-primary-main: #1976d2;
}
.mui-theme-1x2y3z {
  --mui-palette-primary-main: #9c27b0;
}
```

A theme passed as a function, like `theme={(outer) => createTheme(outer, { palette })}`, is applied the same way.
Providers with the same theme, like the ones of a themed card in a list, share one class and one stylesheet.

Dialogs, menus, popovers, tooltips, and other components that render in a portal apply the class to their own root, so they use the nested theme too.
For elements that other libraries portal, use the `useThemeScope()` hook to get the class:

```jsx
import { useThemeScope } from '@mui/material/styles';

function Toast() {
  const themeScope = useThemeScope();
  return ReactDOM.createPortal(<div {...themeScope}>…</div>, document.body);
}
```

### Choosing the element

Use the `render` prop where a `div` isn't valid, like in a list or a table, or where CSS selectors like `>` and `:nth-child()` depend on the DOM structure:

```jsx
<ul>
  <ThemeProvider theme={promoTheme} render={<li />}>
    <Button>Uses promoTheme</Button>
  </ThemeProvider>
</ul>
```

The element gets the provider's props, like its class, merged with its own, and doesn't get `display: contents`.
To read the props or the mode, pass a function that receives them:

```jsx
<ThemeProvider
  theme={promoTheme}
  render={(props, state) => <section {...props} data-mode={state.mode} />}
>
```

A component that you render has to pass `className` and `ref` on to its DOM element.
In development, an error is logged when the provider has variables to set and the `ref` isn't attached.

The top-level provider only renders an element when it's given `render`.

### Isolated providers

A provider with the `isolated` prop doesn't follow an outer provider.
It sets all of its variables on its element instead of `:root`, and has its own light or dark mode, set with `defaultMode` and `useColorScheme()`.
Use it for a sibling of the top-level provider, like an embedded widget, or for a section with its own mode:

```jsx
<React.Fragment>
  <ThemeProvider theme={appTheme}>
    <App />
  </ThemeProvider>
  <ThemeProvider theme={widgetTheme} isolated>
    <Widget />
  </ThemeProvider>
</React.Fragment>
```

```jsx
<ThemeProvider theme={appTheme}>
  <ThemeProvider theme={appTheme} isolated defaultMode="dark">
    <Preview />
  </ThemeProvider>
</ThemeProvider>
```

Two providers that aren't nested in each other and aren't isolated both write to `:root` and overwrite each other, which logs a warning in development.
A nested provider without `isolated` follows the outer mode, so `defaultMode` doesn't apply to it and logs a warning in development.

The element of an isolated provider holds its mode in its own `data-mui-scheme` attribute, whatever the theme's `colorSchemeSelector` is.
The page's mode doesn't apply inside it, including the styles of `theme.applyStyles()`, and its mode doesn't change the page.
Its mode isn't stored, so it doesn't overwrite the page's mode.
To remember it across visits, pass your own `modeStorageKey` and `colorSchemeStorageKey`, or a `storageManager`.
With the storage keys, the provider also renders a small script that applies the stored mode before the page hydrates, for server-side rendering.

:::info
A CSS variable that you override on `:root` doesn't reach the elements under a provider that sets it, because the closest declaration wins.
Override it on an element inside the provider instead.
:::

## Disabling CSS color scheme

By default, `createTheme()` attaches a [CSS `color-scheme` property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme) based on the palette mode.
You can disable this by setting `disableCssColorScheme` to `true`:

```js
createTheme({
  cssVariables: { disableCssColorScheme: true },
});
```

The generated CSS will not include the `color-scheme` property:

```diff
 @media (prefers-color-scheme: dark) {
   :root {
-    color-scheme: dark;
     --mui-palette-primary-main: #90caf9;
     ...
   }
 }
```

## Instant transition between color schemes

To disable CSS transitions when switching between modes, apply the `disableTransitionOnChange` prop:

```js
<ThemeProvider disableTransitionOnChange />
```

{{"component": "file://./demos/disable-transition-on-change/index.ts"}}

## Force theme recalculation between modes

By default, the `ThemeProvider` does not re-render when switching between light and dark modes when `cssVariables: true` is set in the theme.

If you want to opt-out from this behavior, use the `forceThemeRerender` prop in the ThemeProvider:

```js
<ThemeProvider forceThemeRerender />
```
