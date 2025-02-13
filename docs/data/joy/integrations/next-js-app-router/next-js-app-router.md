# Next.js App Router

<p class="description">Learn how to use Joy UI with the Next.js App Router.</p>

## Example

Starting fresh on a new App Router-based project?

Jump right into the code with [this example: Joy UI - Next.js App Router with TypeScript](https://github.com/mui/material-ui/tree/master/examples/joy-ui-nextjs-ts).

## Next.js and React Server Components

The Next.js App Router implements React Server Components, [an upcoming feature for React](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md).

To support the App Router, the components and hooks from Joy UI that need access to browser APIs are exported with the `"use client"` directive.

:::warning
React Server Components should not be conflated with the concept of server-side rendering (SSR).
So-called Client Components are still server-rendered to HTML.

For more details, see [this explanation](https://github.com/reactwg/server-components/discussions/4) of Client Components and SSR from the React Working Group.
:::

## Using Joy UI with the App Router

To set up Joy UI, create a custom `ThemeRegistry` component that combines the Emotion `CacheProvider`, Joy UI's `CssVarsProvider` and the `useServerInsertedHTML` hook from `next/navigation` as follows:

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
export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'joy' }}>{props.children}</ThemeRegistry>
      </body>
    </html>
  );
}
```

## Props serialization

Props passed from server components-for example `page.js` or other routing files-must be [serializable](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#passing-props-from-server-to-client-components-serialization).

:::success
This works without any additional directives:

```tsx
// app/page.tsx
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function Page() {
  return (
    <Sheet>
      <Typography fontSize="sm">Hello World</Typography>
    </Sheet>
  );
}
```

:::

:::error
This _doesn't work_ because the Button's click handler is **non-serializable**:

```tsx
// app/page.tsx
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';

export default function Page() {
  return (
    <Sheet>
      {/* Next.js won't render this button without 'use-client' */}
      <Button
        onClick={() => {
          console.log('handle click');
        }}
      >
        Submit
      </Button>
    </Sheet>
  );
}
```

Instead, the Next.js team recommend moving components like these ["down the tree"](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#moving-client-components-down-the-tree) to avoid this issue and improve overall performance.
:::
