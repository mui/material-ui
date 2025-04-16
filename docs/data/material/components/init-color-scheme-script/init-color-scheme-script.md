---
productId: material-ui
title: InitColorSchemeScript component
components: InitColorSchemeScript
githubSource: packages/mui-material/src/InitColorSchemeScript
---

# InitColorSchemeScript

<p class="description">InitColorSchemeScript component removes the dark mode flicker for server-side rendering application.</p>

## Introduction

`InitColorSchemeScript` component is used to remove the dark mode flicker for server-side rendering (SSR) applications.
It is a client-side script that runs before React to attach an attribute based on the user preference.

It is recommended to use `InitColorSchemeScript` component whenever:

- The application supports light and dark modes.
- The application is server rendered (SSR).

## Basics

To make the `InitColorSchemeScript` component work, you need to enable CSS variables with `colorSchemeSelector: 'data'` in your theme.

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

Below are location for rendering `InitColorSchemeScript` component in different frameworks.

### Next.js App Router

Place the `InitColorSchemeScript` component in the `layout.tsx` file:

```js title="src/app/layout.tsx"
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        {props.children}
      </body>
    </html>
  );
}
```

### Next.js Pages Router

Place the `InitColorSchemeScript` component in the `_document.tsx` file:

```js title="pages/_document.tsx"
import { Html, Head, Main, NextScript } from 'next/document';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export default function MyDocument(props) {
  return (
    <Html lang="en">
      <Head>{/* tags */}</Head>
      <body>
        <InitColorSchemeScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## Customization

### Class attribute

To attach class to DOM element, set the `attribute` prop to `"class"`.

```js
<InitColorSchemeScript attribute="class" />
```

The color scheme node (default to `html`) will be set to the class name based on the user preference.

```html
<html class="dark"></html>
```

### Arbitrary attribute

To attach arbitrary attribute to DOM element, use `%s` as a placeholder in the `attribute` prop.

```js
<InitColorSchemeScript attribute="[data-theme='%s']" /> // <html data-theme="dark">
<InitColorSchemeScript attribute=".mode-%s" /> // <html class="mode-dark">
```

### Default mode

Set this prop to specify the default mode when the user first visits the page.

For example, if you want first-visit users to see dark mode, set the `defaultMode` prop to `"dark"`.

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
