# Gatsby theme example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/next | tar -xz --strip=2  material-ui-next/examples/gatsby-theme
cd gatsby-theme
```

Install it and run:

```sh
npm install
npm run develop
```

or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui-org/material-ui/tree/HEAD/examples/gatsby-theme)

## The idea behind the example

This is an alternative example to [`/examples/gatsby`](https://github.com/mui-org/material-ui/tree/next/examples/gatsby) leveraging [gatsby-theme-material-ui](https://github.com/hupe1980/gatsby-theme-material-ui/tree/next/packages/gatsby-theme-material-ui).
The example bundles different Gatsby plugins into a single Gatsby theme.
It trades less freedom for fewer boilerplate.
It includes `@material-ui/core` and its peer dependencies, including `emotion`, the default style engine in Material-UI v5. If you prefer, you can [use styled-components instead](https://next.material-ui.com/guides/interoperability/#styled-components).
