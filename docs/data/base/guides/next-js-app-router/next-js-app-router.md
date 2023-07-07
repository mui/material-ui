# Next.js App Router

<p class="description">Learn how to use Base UI with the Next.js App Router.</p>

:::info
Starting fresh on a new App Router-based project?

Jump right into the code with this [example repo](https://github.com/mui/material-ui/blob/master/examples/base-next-app-router-ts).
:::

## Next.js and React Server Components

The Next.js App Router implements React Server Components, a [new feature](https://github.com/reactjs/rfcs/blob/main/text/0227-server-module-conventions.md#changes-since-v1) introduced in React 18.

To support the App Router, currently all components and hooks from Base UI and other MUI libraries are exported with the `"use client"` directive.

:::warning
React Server Components does not replace, and is separate from server-side rendering (SSR). Client Components are still server-rendered to HTML.

For more details, see this [explanation](https://github.com/reactwg/server-components/discussions/4) by the React team.
:::

## Setting up Base UI with the App Router

Base UI is styling-agnostic; setting up a Next.js App Router project largely depends on the styling solution:

### Emotion

If you're using Emotion, or something Emotion-based like MUI System, you can follow the [same steps](/material-ui/guides/next-js-app-router/#using-material-ui-with-a-custom-theme) outlined for Material UI.

### Tailwind CSS

[Install and initialize](https://tailwindcss.com/docs/guides/nextjs) Tailwind CSS, be sure to add the `app` directory and other directories to `tailwind.config.js`

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

Refer to this [example repo](https://github.com/mui/material-ui/blob/master/examples/base-next-app-router-tailwind-ts) for a full working demo of a Next.js 13 app using Base UI and Tailwind CSS.

### Other CSS-in-JS

Base UI works with other CSS-in-JS libraries such as `styled-components`, see the [Next.js docs](https://nextjs.org/docs/app/building-your-application/styling/css-in-js) for more details.

## Customization

### Using callbacks for slot props

A common customization method in Base UI is to pass a callback to slots in `slotProps` in order to apply dynamic props. For example, you might want to change the background color by applying a different class when a Button is disabled:

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

Unfortunately, **this will not work in a server component** since function props are [non-serializable](https://nextjs.org/docs/getting-started/react-essentials#passing-props-from-server-to-client-components-serialization).
Instead, the Next.js team recommends moving components like these ["to the leaves"](https://nextjs.org/docs/getting-started/react-essentials#moving-client-components-to-the-leaves) to avoid this issue and improve overall performance.
