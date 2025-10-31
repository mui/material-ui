---
productId: material-ui
title: InitColorSchemeScript component
components: InitColorSchemeScript
githubSource: packages/mui-material/src/InitColorSchemeScript
---

# InitColorSchemeScript

The InitColorSchemeScript component eliminates dark mode flickering in server-side-rendered applications.

## Introduction

The `InitColorSchemeScript` component is used to remove the dark mode flicker that can occur in server-side-rendered (SSR) applications.
This script runs before React to attach an attribute based on the user preference so that the correct color mode is applied on first render.

For the best user experience, you should implement this component in any server-rendered Material UI app that supports both light and dark modes.

## Basics

First, enable CSS variables with `colorSchemeSelector: 'data'` in your theme.

```js
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data',
  },
});

function App() {
  return <ThemeProvider theme={theme}>{/* Your app */}</ThemeProvider>;
}
```

Then, render the `InitColorSchemeScript` component as the first child of the `<body>` tag.

The sections below detail where to render the `InitColorSchemeScript` component when working with Next.js.

### Next.js App Router

Place the `InitColorSchemeScript` component in the root `layout` file:

```js title="src/app/layout.tsx"
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="data" />
        {props.children}
      </body>
    </html>
  );
}
```

### Next.js Pages Router

Place the `InitColorSchemeScript` component in a custom `_document` file:

```js title="pages/_document.tsx"
import { Html, Head, Main, NextScript } from 'next/document';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function MyDocument(props) {
  return (
    <Html lang="en">
      <Head>{/* tags */}</Head>
      <body>
        <InitColorSchemeScript attribute="data" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## Customization

### Class attribute

To attach classes to DOM elements, set the `attribute` prop to `"class"`.

```js
<InitColorSchemeScript attribute="class" />
```

This sets the class name on the color scheme node (which defaults to `<html>`) according to the user's system preference.

```html
<html class="dark"></html>
```

### Arbitrary attribute

To attach arbitrary attributes to DOM elements, use `%s` as a placeholder on the `attribute` prop.

```js
<InitColorSchemeScript attribute="[data-theme='%s']" /> // <html data-theme="dark">
<InitColorSchemeScript attribute=".mode-%s" /> // <html class="mode-dark">
```

### Default mode

Set the `defaultMode` prop to specify the default mode when the user first visits the page.

For example, if you want users to see the dark mode on their first visit, set the `defaultMode` prop to `"dark"`.

```js
<InitColorSchemeScript defaultMode="dark" />
```

## Caveats

### Attribute

When customizing the `attribute` prop, make sure to set the `colorSchemeSelector` in the theme to match the attribute you are using.

```js
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'same value as the `attribute` prop',
  },
});
```

### Default mode

When customizing the `defaultMode` prop, make sure to do the same with the `ThemeProvider` component:

```js
<ThemeProvider theme={theme} defaultMode="dark">
```

# InitColorSchemeScript API

## Demos

For examples and details on the usage of this React component, visit the component demo pages:

- [InitColorSchemeScript](https://mui.com/material-ui/react-init-color-scheme-script/)

## Import

```jsx
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
// or
import { InitColorSchemeScript } from '@mui/material';
```

## Props

| Name                    | Type                            | Default                      | Required | Description |
| ----------------------- | ------------------------------- | ---------------------------- | -------- | ----------- |
| attribute               | `string`                        | `'data-mui-color-scheme'`    | No       |             |
| colorSchemeNode         | `string`                        | `'document.documentElement'` | No       |             |
| colorSchemeStorageKey   | `string`                        | `'mui-color-scheme'`         | No       |             |
| defaultDarkColorScheme  | `string`                        | `'dark'`                     | No       |             |
| defaultLightColorScheme | `string`                        | `'light'`                    | No       |             |
| defaultMode             | `'dark' \| 'light' \| 'system'` | `'system'`                   | No       |             |
| modeStorageKey          | `string`                        | `'mui-mode'`                 | No       |             |
| nonce                   | `string`                        | -                            | No       |             |

> **Note**: The `ref` is forwarded to the root element.

> Any other props supplied will be provided to the root element (native element).

## Source code

If you did not find the information on this page, consider having a look at the implementation of the component for more detail.

- [/packages/mui-material/src/InitColorSchemeScript/InitColorSchemeScript.tsx](https://github.com/mui/material-ui/tree/HEAD/packages/mui-material/src/InitColorSchemeScript/InitColorSchemeScript.tsx)
