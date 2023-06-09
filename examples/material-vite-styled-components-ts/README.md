# Material UI - Vite.js in Typescript example

You will need to add the following path config to your `tsconfig.json`:

```json
"paths": {
  "@mui/styled-engine": ["./node_modules/@mui/styled-engine-sc"]
}
```

and install @types/styled-components:

```sh
npm install --save-dev @types/styled-components
```

Alternatively, to skip this configuration, you can set `skipLibCheck: true` in your tsconfig.

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```sh
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/material-vite-styled-components-ts
cd material-vite-styled-components-ts
```

Install it and run:

```sh
npm install
npm run dev
```

or:

<!-- #default-branch-switch -->

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mui/material-ui/tree/master/examples/material-vite-ts)

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui/material-ui/tree/master/examples/material-vite-ts)

## The idea behind the example

This example uses [Vite.js](https://github.com/vitejs/vite). It demonstrates how to set up Material UI with [Create React App](https://github.com/facebookincubator/create-react-app) with [styled-components](https://styled-components.com/) as a style engine for your application using TypeScript.

## What's next?

<!-- #default-branch-switch -->

You now have a working example project.
You can head back to the documentation, continuing browsing it from the [templates](https://mui.com/material-ui/getting-started/templates/) section.
