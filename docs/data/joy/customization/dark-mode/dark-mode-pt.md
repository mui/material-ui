# Applying dark mode

<p class="description">A how-to-guide for applying dark mode to your application with Joy UI.</p>

## The mode-toggle component

In the example below, we're using a `Button` component that calls `setMode` from the `useColorSchemes()` hook to handle the mode toggling.

```js
import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';

function ModeToggle() {
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
}
```

{{"demo": "ModeToggle.js"}}

:::warning
**Note:** Make sure to use `useColorScheme()` in a component that's inside `<CssVarsProvider>`, otherwise it will throw an error.
:::

## Server-side rendering

### Avoid hydration mismatch

Make sure to render the UI when the page is mounted on the client.

This is because the `mode` will only be available to the client-side (it is `undefined` on the server). If you try to render your UI based on the server, before mounting on the client, you'll see a hydration mismatch error.

```diff
 function ModeToggle() {
   const { mode, setMode } = useColorScheme();
   const [mounted, setMounted] = React.useState(false);

+  React.useEffect(() => {
+    setMounted(true);
+  }, []);
+
+  if (!mounted) {
+    // to avoid layout shift, render a placeholder button
+    return <Button variant="outlined" color="neutral" sx={{ width: 120 }} />;
+  }

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

### Avoiding screen flickering

To prevent [the UI of flickering](/joy-ui/main-features/perfect-dark-mode/#the-current-flickering-problem), apply `getInitColorSchemeScript()` before the main application script－it varies across frameworks:

### Next.js

To use the Joy UI API with a Next.js project, add the following code to the custom [`pages/_document.js`](https://nextjs.org/docs/advanced-features/custom-document) file:

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

To use the Joy UI API with a Next.js project, add the following code to the custom [`gatsby-ssr.js`](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) file:

```jsx
import React from 'react';
import { getInitColorSchemeScript } from '@mui/joy/styles';

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([getInitColorSchemeScript()]);
}
```
