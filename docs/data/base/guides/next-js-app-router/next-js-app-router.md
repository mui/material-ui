# Next.js App Router

<p class="description">Learn how to use Base UI with the Next.js App Router.</p>

## Example

Starting fresh on a new App Router-based project?

Jump right into the code with [this example: Base UI - Next.js App Router with Tailwind CSS in TypeScript](https://github.com/mui/material-ui/tree/master/examples/base-ui-nextjs-tailwind-ts).

## Next.js and React Server Components

The Next.js App Router implements React Server Components, [an upcoming feature for React](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md).

To support the App Router, the components and hooks from Base UI that need access to browser APIs are exported with the `"use client"` directive.

:::warning
React Server Components should not be conflated with the concept of server-side rendering (SSR).
So-called Client Components are still server-rendered to HTML.

For more details, see [this explanation](https://github.com/reactwg/server-components/discussions/4) of Client Components and SSR from the React Working Group.
:::

## Setting up Base UI with the App Router

Base UI gives you the freedom to choose your own styling solution, so setting up a Next.js App Router project largely depends on what you choose.
This guide covers Tailwind CSS, Emotion, and other CSS-in-JS solutions like styled-components.

### Tailwind CSS

Follow the [Tailwind CSS guide on working with Next.js](https://tailwindcss.com/docs/guides/nextjs), and be sure to add the `app` directory and other directories to `tailwind.config.js`, as shown below:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}'
    // or if not using the `src` directory:
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Refer to this [example repo](https://github.com/mui/material-ui/tree/master/examples/base-ui-nextjs-tailwind-ts) for a full working demo of a Next.js 13 app using Base UI and Tailwind CSS.

### Emotion

If you're using Emotion, or something Emotion-based like MUI System, create a custom `ThemeRegistry` component that combines the Emotion `CacheProvider`, the Material UI `ThemeProvider`, and the `useServerInsertedHTML` hook from `next/navigation` as follows:

```tsx
// app/ThemeRegistry.tsx
'use client';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider, ThemeProvider } from '@emotion/react';
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
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}

// app/layout.js
export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>{props.children}</ThemeRegistry>
      </body>
    </html>
  );
}
```

If you need to further override theme styles (for example using CSS Modules), Emotion provides the `prepend: true` option for `createCache` to reverse the injection order, so custom styles can override the theme without using `!important`.

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

### Other CSS-in-JS libraries

To use Next.js with Base UI and styled-components or other CSS-in-JS solutions, follow the [Next.js doc on CSS-in-JS](https://nextjs.org/docs/app/building-your-application/styling/css-in-js).

## Customization

### Using callbacks for slot props

A common customization method in Base UI is to pass a callback to slots in `slotProps` in order to apply dynamic props. For example, you might want to change the background color by applying a different class when a Button is disabled:

```tsx
// page.tsx

export default function Page() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}
```

Unfortunately, **this does not work in a Server Component** since function props are [non-serializable](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#passing-props-from-server-to-client-components-serialization).
Instead, the Next.js team recommend moving components like these ["down the tree"](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#moving-client-components-down-the-tree) to avoid this issue and improve overall performance.
