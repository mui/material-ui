# Next.js App Router

<p class="description">Learn how to use MUI libraries with the Next.js App Router.</p>

## Next.js and React Server Components

The Next.js App Router implements React Server Components, a [new feature](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md#changes-since-v1) introduced in React 18.

To support the App Router, currently all components and hooks from MUI libraries (Material UI, Joy UI, Base UI etc) are designated as Client Components and exported with the `"use client"` directive.

:::info
Starting fresh on a new App Router-based project?
Jump right into the code with one of these example repos:

- [Material UI - A React UI library that implements Material Design](https://github.com/mui/material-ui/blob/master/examples/material-next-app-router-ts)
- [Joy UI - Our newest customizable UI library designed to spark joy](https://github.com/mui/material-ui/blob/master/examples/joy-next-app-router-ts)
- [Base UI – A collection of headless components and hooks](https://github.com/mui/material-ui/blob/master/examples/base-next-app-router-tailwind-ts)
  :::

## Using Material UI with the default theme

If you're using the default theme, you can add Material UI components to Next.js routing files such as `layout.js` or `page.js` (which are Server Components by default) without any additional configuration, as shown below:

<!-- TODO: investigate whether it still needs an explicit <head/> to prevent FOUC https://github.com/mui/material-ui/issues/34905#issuecomment-1332040656 -->

```jsx
// app/layout.js - no directives needed
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// app/page.js - no directives needed
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <main>
      <Container>
        <Box>
          <Card>
            <Typography variant="h2">Hello World ~</Typography>
          </Card>
        </Box>
      </Container>
    </main>
  );
}
```

## Using Material UI with a custom theme

### Theme Registry

To set up the theme context, create a custom `ThemeRegistry` component that combines the Emotion `CacheProvider`, the Material UI `ThemeProvider` and the `useServerInsertedHTML` hook from `next/navigation` as follows:

```tsx
// app/ThemeRegistry.tsx
'use client';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '/path/to/your/theme';

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props) {
  const { options, children } = props;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
```

### CSS injection order

<!-- https://github.com/emotion-js/emotion/issues/3059 -->

By default, Emotion inject Material UI styles at the bottom of the HTML `<head>`, which gives them precedence over custom styles (for example, from CSS modules, Tailwind CSS, or even plain CSS).

In client-side React, the `prepend: true` option is passed to `createCache` to reverse the injection order, so custom styles can override Material UI styles without using `!important`.

Currently, `prepend` does not work reliably with the App Router, but you can work around it by wrapping Emotion styles in a CSS `@layer` with a modification to the snippet above:

```diff
 useServerInsertedHTML(() => {
   const names = flush();
   if (names.length === 0) {
     return null;
   }
   let styles = '';
   for (const name of names) {
     styles += cache.inserted[name];
   }
   return (
     <style
       key={cache.key}
       data-emotion={`${cache.key} ${names.join(' ')}`}
       dangerouslySetInnerHTML={{
-        __html: styles,
+        __html: options.prepend ? `@layer emotion {${styles}}` : styles,
       }}
     />
   );
 });
```

## Using Joy UI

The setup for Joy UI is the same as [Material UI with a custom theme](#using-material-ui-with-a-custom-theme), except you must replace Material UI's `ThemeProvider` with Joy UI's `CssVarsProvider`:

```diff
 // ThemeRegistry
-import { ThemeProvider } from '@mui/material/styles';
+import { CssVarsProvider } from '@mui/joy/styles';
```

See this [example repo](https://github.com/mui/material-ui/blob/master/examples/joy-next-app-router-ts) for a working demo of Joy UI with the Next.js App Router.

## Using Base UI

Base UI is styling-agnostic; if you're using Emotion you can follow the same steps outlined for Material UI.

If you're using Tailwind CSS, see this [example repo](https://github.com/mui/material-ui/blob/master/examples/base-next-app-router-tailwind-ts) for a working demo.

### Customizing Base UI with function props

A common customization method in Base UI is to pass a function to slots in `slotProps` in order to apply dynamic props to slots. For example, you might want to change the background color by applying a different class when a Button is disabled:

```tsx
// page.tsx

export default function Page() {
  return (
    <>
      {/* Next.js won't render this button without 'use-client'*/}
      <Button
        slotProps={{
          root: (ownerState: ButtonOwnerState) => ({
            className: ownerState.disabled ? 'bg-gray-400' : 'bg-blue-400',
          }),
        }}
      >
        Submit
      </Button>

      {/* Next.js can render this */}
      <Button
        slotProps={{
          root: {
            className: 'bg-gray-400',
          },
        }}
      >
        Return
      </Button>
    </>
  );
}
```

Unfortunately, **this will not work** since function props are [non-serializable](https://nextjs.org/docs/getting-started/react-essentials#passing-props-from-server-to-client-components-serialization).
Instead, the Next.js team recommends moving components like these ["to the leaves"](https://nextjs.org/docs/getting-started/react-essentials#moving-client-components-to-the-leaves) to avoid this issue and improve overall performance.
