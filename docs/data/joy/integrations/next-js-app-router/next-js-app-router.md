# Next.js App Router

<p class="description">Learn how to use Joy UI with the Next.js App Router.</p>

## Example

Starting fresh on a new App Router-based project?

Jump right into the code with [this example: Joy UI - Next.js App Router with TypeScript](https://github.com/mui/material-ui/tree/master/examples/joy-ui-nextjs-ts).

## Next.js and React Server Components

The Next.js App Router implements React Server Components, [an upcoming feature for React](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md).

To support the App Router, the components and hooks from Joy UI that need access to browser APIs are exported with the `"use client"` directive.

:::warning
React Server Components should not be conflated with the concept of server-side rendering (SSR).
So-called Client Components are still server-rendered to HTML.

For more details, see [this explanation](https://github.com/reactwg/server-components/discussions/4) of Client Components and SSR from the React Working Group.
:::

## Using Joy UI with the App Router

To set up Joy UI, import the `AppRouterCacheProvider` from our [Next.js integration package](/material-ui/guides/nextjs/) and wrap all elements under the <body> with it:

```tsx
// app/layout.tsx
'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'; // or `v14-appRouter` if you are using Next.js v14
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import theme from '/path/to/custom/theme'; // OPTIONAL

export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'joy' }}>
          <CssVarsProvider theme={theme}>
          {/* the custom theme is optional */}
          <CssBaseline />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
```
Please refer to this page to learn about theme customization.

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
