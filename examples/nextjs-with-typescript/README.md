# Next.js with TypeScript example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

<!-- #default-branch-switch -->

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/next | tar -xz --strip=2  material-ui-next/examples/nextjs-with-typescript
cd nextjs-with-typescript
```

Install it and run:

```sh
npm install
npm run dev
```

or:

<!-- #default-branch-switch -->

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui-org/material-ui/tree/next/examples/nextjs-with-typescript)

## The idea behind the example

The project uses [Next.js](https://github.com/zeit/next.js), which is a framework for server-rendered React apps.
It includes `@material-ui/core` and its peer dependencies, including `emotion`, the default style engine in Material-UI v5. If you prefer, you can [use styled-components instead](https://next.material-ui.com/guides/interoperability/#styled-components).

## The link component

Next.js has [a custom Link component](https://nextjs.org/docs/api-reference/next/link).
The example folder provides adapters for usage with Material-UI.
More information [in the documentation](https://next.material-ui.com/guides/routing/#next-js).
