# Next.js App Router

<p class="description">Learn how to use Joy UI with the Next.js App Router.</p>

:::info
Starting fresh on a new App Router-based project?

Jump right into the code with this [example repo](https://github.com/mui/material-ui/blob/master/examples/joy-next-app-router-ts).
:::

## Next.js and React Server Components

The Next.js App Router implements React Server Components, a [new feature](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md#changes-since-v1) introduced in React 18.

To support the App Router, currently all components and hooks from Joy UI and other MUI libraries are exported with the `"use client"` directive.

:::warning
React Server Components does not replace, and is separate from server-side rendering (SSR). Client Components are still server-rendered to HTML.

For more details, see this [explanation](https://github.com/reactwg/server-components/discussions/4) by the React team.
:::

## Using Joy UI with the App Router

To set up Joy UI, create a custom `ThemeRegistry` component that combines the Emotion `CacheProvider`, Joy UI's `CssVarsProvider` and the `useServerInsertedHTML` hook from `next/navigation` as follows:

```tsx
// app/ThemeRegistry.tsx
'use client';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import theme from '/path/to/custom/theme'; // OPTIONAL

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
      <CssVarsProvider theme={theme}>
        {/* the custom theme is optional */}
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </CacheProvider>
  );
}

// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'joy' }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
```

## Function props

Props passed from server components - for example `page.js` or other routing files - must be [serializable](https://nextjs.org/docs/getting-started/react-essentials#passing-props-from-server-to-client-components-serialization).

This works without any additional directives:

```jsx
// app/page.tsx
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function Page() {
  return (
    <>
      <Sheet variant="outlined">
        <Typography fontSize="sm">Hello World</Typography>
      </Sheet>
    </>
  );
}
```

However, function props such as event handlers or render props are **non-serializable** - this won't work in a server component:

```tsx
// page.tsx
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';

export default function Page() {
  return (
    <>
      <Sheet variant="outlined">
        {/* Next.js won't render this button without 'use-client' */}
        <Button
          variant="outlined"
          onClick={() => {
            console.log('handle click');
          }}
        >
          Submit
        </Button>
      </Sheet>
    </>
  );
}
```

Instead, the Next.js team recommends moving components like these ["to the leaves"](https://nextjs.org/docs/getting-started/react-essentials#moving-client-components-to-the-leaves) to avoid this issue and improve overall performance.
