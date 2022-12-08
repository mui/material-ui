# Material UI v5 and Next.js example with @mui/styles (in TypeScript)

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```sh
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/nextjs-with-typescript
cd nextjs-with-typescript
```

Install it and run:

```sh
npm install
npm run dev
```

or:

<!-- #default-branch-switch -->

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mui/material-ui/tree/master/examples/nextjs-with-typescript-v4-migration)

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui/material-ui/tree/master/examples/nextjs-with-typescript-v4-migration)

## The idea behind the example

The project uses [Next.js](https://github.com/vercel/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material` and its peer dependencies, including `emotion`, the default style engine in Material UI v5. If you prefer, you can [use styled-components instead](https://mui.com/material-ui/guides/interoperability/#styled-components).
It also includes `@mui/styles`, the legacy styling solution that uses JSS as an engine.
It provides all the necessary config for working with both Emotion and JSS for server-side rendering.
The project is intended as a basic starter for migrating your application from v4 to v5, as it lets the JSS style overrides take precedence over the default styles passed to the components by Emotion.
It demonstrates what results after handling v5's breaking changes to the [theme](https://mui.com/material-ui/migration/v5-style-changes/) and [components](https://mui.com/material-ui/migration/v5-component-changes/).

## The Link component

Next.js has [a custom Link component](https://nextjs.org/docs/api-reference/next/link).
The example folder provides adapters for usage with Material UI.
You can find more information [in the documentation](https://mui.com/material-ui/guides/routing/#next-js).
