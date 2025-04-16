---
productId: material-ui
title: InitColorSchemeScript component
components: InitColorSchemeScript
githubSource: packages/mui-material/src/InitColorSchemeScript
---

# InitColorSchemeScript

<p class="description">InitColorSchemeScript component removes the dark mode flicker for server-side rendering application.</p>

`InitColorSchemeScript` component is used to remove the dark mode flicker for server-side rendering (SSR) applications.
It is a client-side script that runs before React to attach an attribute based on the user preference.

It is recommended to use `InitColorSchemeScript` component whenever:

- The application supports light and dark modes.
- The application is server rendered (SSR).

## Usage

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
