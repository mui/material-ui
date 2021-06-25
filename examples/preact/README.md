# Preact example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/next | tar -xz --strip=2  material-ui-next/examples/preact
cd preact
```

Install it and run:

```sh
npm install
npm run start
```

or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui-org/material-ui/tree/HEAD/examples/preact)

## The idea behind the example

The project uses [Preact](https://github.com/developit/preact), which is a fast 3kB alternative to React with the same modern API.

This example uses CRA with `react-app-rewired` for adding webpack aliases for preact.

It includes `@material-ui/core` and its peer dependencies, including `emotion`, the default style engine in Material-UI v5. If you prefer, you can [use styled-components instead](https://next.material-ui.com/guides/interoperability/#styled-components).
