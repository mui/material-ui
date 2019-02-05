# Gatsby example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/next | tar -xz --strip=2  material-ui-next/examples/gatsby
cd gatsby
```

Install it and run:

```sh
npm install
npm run develop
```

## The idea behind the example

[Gatsby](https://github.com/gatsbyjs/gatsby) is a static site generator for React.

## `withRoot` usage

We are using the `withRoot` higher-order component to accommodate Material-UI's styling solution with Gatsby.

⚠️ You should only use a single `withRoot` for rendering one page.
