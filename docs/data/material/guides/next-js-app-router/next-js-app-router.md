# Next.js App Router

<p class="description">Learn how to use Material UI with the Next.js App Router.</p>

:::info
Starting fresh on a new App Router-based project?

Jump right into the code with [this example: Material UI - Next.js App Router example in TypeScript](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts).
:::

## Next.js and React Server Components

The Next.js App Router implements React Server Components, [an upcoming feature for React](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md).

To support the App Router, currently all components and hooks from MUI libraries (Material UI, Joy UI, Base UI etc.) are exported with the `"use client"` directive.

:::warning
React Server Components should not be conflated with the concept of server-side rendering (SSR).
So-called Client Components are still server-rendered to HTML.

For more details, see [this explanation](https://github.com/reactwg/server-components/discussions/4) of Client Components and SSR from the React Working Group.
:::

## Using Material UI with the default theme

If you're using the default theme, you can add Material UI components to Next.js routing files such as `layout.js` or `page.js` (which are Server Components by default) without any additional configuration, as shown below:

<!-- TODO: investigate whether it still needs an explicit <head/> to prevent FOUC https://github.com/mui/material-ui/issues/34905#issuecomment-1332040656 -->

```jsx
// app/layout.js - no directives needed
export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// app/page.js - no directives needed
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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

To set up the theme context, create a custom `ThemeRegistry` component that combines the Emotion `CacheProvider`, the Material UI `ThemeProvider`, and the `useServerInsertedHTML` hook from `next/navigation` as follows:

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
export default function RootLayout(props) {
  const { children } = props;
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

By default, Emotion injects Material UI styles at the bottom of the HTML `<head>`, which gives them precedence over custom styles—for example if you are customizing Material UI with CSS modules, Tailwind CSS, or even plain CSS.

Emotion provides the `prepend: true` option for `createCache` to reverse the injection order, so custom styles can override Material UI styles without using `!important`.

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

## Function props

Props passed from Server Components—for example `page.js` or other routing files—must be [serializable](https://nextjs.org/docs/getting-started/react-essentials#passing-props-from-server-to-client-components-serialization).

This works without any additional directives:

```jsx
// app/page.tsx
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Page() {
  return (
    <Container maxWidth="lg">
      <Box>
        <Card raised>
          <Typography variant="h2">Hello World</Typography>
        </Card>
      </Box>
    </Container>
  );
}
```

:::error
This code snippet _doesn't work_, because the Button's click handler is **non-serializable**:

```tsx
// page.tsx
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export default function Page() {
  return (
    <Container maxWidth="lg">
      {/* Next.js won't render this button without 'use-client' */}
      <Button
        variant="text"
        onClick={() => {
          console.log('handle click');
        }}
      >
        Submit
      </Button>
    </Container>
  );
}
```

Instead, the Next.js team recommend moving components like these ["to the leaves"](https://nextjs.org/docs/getting-started/react-essentials#moving-client-components-to-the-leaves) to avoid this issue and improve overall performance.
:::
