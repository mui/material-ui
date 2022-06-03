# Apply dark mode

<p class="description">A how-to-guide for applying dark mode to your application.</p>

## Switch to dark

You have to create a custom component and call `setMode` from the `useColorScheme()` hook to switch between modes.

```js
import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? 'Turn light' : 'Turn dark'}
    </Button>
  );
};
```

{{"demo": "ModeToggle.js"}}

:::warning
Make sure to use `useColorScheme()` in a component that renders inside `<CssVarsProvider>`, otherwise it will throw an error.
:::

## Server-side rendering

### Avoid hydration mismatch

The `mode` will be available only on the client side (it is `undefined` on the server), so if you try to render UI based on it before mounting on the client, you will see a hydration mismatch error.

Make sure to render the UI when the page is mounted on the client:

```diff
const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

+ React.useEffect(() => {
+   setMounted(true);
+ }, []);

+ if (!mounted) {
+   // to avoid layout shift, render a placeholder button
+   return <Button variant="outlined" color="neutral" sx={{ width: 120 }} />;
+ }

  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? 'Turn light' : 'Turn dark'}
    </Button>
  );
};
```

### Avoid screen flicker

To prevent [the flicker](/joy-ui/core-features/perfect-dark-mode/#the-flicker), apply `getInitColorSchemeScript()` before the main application script (varies across frameworks). Take a look at the specific framework setup below.

### Next.js

To use the API with a Next.js project, add the following code to the custom [`pages/_document.js`](https://nextjs.org/docs/advanced-features/custom-document) file:

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getInitColorSchemeScript } from '@mui/joy/styles';

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
import { getInitColorSchemeScript } from '@mui/joy/styles';

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([getInitColorSchemeScript()]);
}
```
