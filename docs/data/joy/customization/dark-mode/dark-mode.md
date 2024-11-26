# Dark mode

<p class="description">Learn about the different methods for applying dark mode to a Joy UI app.</p>

## Media prefers-color-scheme

Create a theme with `colorSchemeSelector: 'media'` to use `@media (prefers-color-scheme)` instead of the default `data-joy-color-scheme` attribute.

```js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemeSelector: 'media',
});

function App() {
  return <CssVarsProvider theme={theme}>...</CssVarsProvider>;
}
```

## Identify the system mode

Use the `useColorScheme` React hook to check if the user's preference is in light or dark mode:

```js
import { useColorScheme } from '@mui/joy/styles';

function SomeComponent() {
  const { mode, systemMode } = useColorScheme();
  console.log(mode); // "system"
  console.log(systemMode); // "light" | "dark" based on the user's preference.
}
```

{{"demo": "IdentifySystemMode.js"}}

:::warning
The `useColorScheme()` hook only works with components nested inside of `<CssVarsProvider>`—otherwise it will throw an error.
:::

## Creating a mode-toggle component

You can create a toggle component to give users the option to select between modes.

In the example below, we're using a `Select` component that calls `setMode` from the `useColorSchemes()` hook to handle the mode switching.

{{"demo": "ModeToggle.js"}}

:::warning
The `useColorScheme()` hook only works with components nested inside of `<CssVarsProvider>`—otherwise it will throw an error.
:::

## Server-side rendering notes

### Avoid hydration mismatch

Make sure to render the UI when the page is mounted on the client.

This is because the `mode` will only be available to the client-side (it is `undefined` on the server).
If you try to render your UI based on the server, before mounting on the client, you'll see a hydration mismatch error.

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

To [prevent the UI from flickering](/joy-ui/main-features/dark-mode-optimization/#the-problem-flickering-on-first-load), apply `<InitColorSchemeScript />` before the main application script－it varies across frameworks:

### Next.js Pages Router

To use the Joy UI API with a Next.js project, add the following code to the custom [`pages/_document.js`](https://nextjs.org/docs/pages/building-your-application/routing/custom-document) file:

```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';

export default class MyDocument extends Document {
  render() {
    return (
      <Html data-color-scheme="light">
        <Head>...</Head>
        <body>
          <InitColorSchemeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### Next.js App Router

To use the Joy UI API with a Next.js project with the App Router, add the following code to the [root layout](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#root-layout-required) file in order to prevent flickering:

```jsx title="app/layout.js"
import InitColorSchemeScript from '@mui/joy/InitColorSchemeScript';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

export default function RootLayout(props) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <InitColorSchemeScript />
        <CssVarsProvider>
          <CssBaseline />
          {props.children}
        </CssVarsProvider>
      </body>
    </html>
  );
}
```
