# Material UI - Create React App example with styled-components in TypeScript

The main difference between this and the non-TypeScript example is that you need to add the following path config to your `tsconfig.json`:

```json
"paths": {
  "@mui/styled-engine": ["./node_modules/@mui/styled-engine-sc"]
}
```

and install @types/styled-components:

```bash
npm install --save-dev @types/styled-components
```

Alternatively, to skip this configuration, you can set `skipLibCheck: true` in your tsconfig.

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/next | tar -xz --strip=2 material-ui-next/examples/material-ui-cra-styled-components-ts
cd material-ui-cra-styled-components-ts
```

Install it and run:

```bash
npm install
npm start
```

## CodeSandbox

<!-- #default-branch-switch -->

Note that CodeSandbox is not supporting react-app-rewired, yet you can [still see the code](https://codesandbox.io/p/sandbox/github/mui/material-ui/tree/master/examples/material-ui-cra-styled-components-ts).

The following link leverages this demo: https://next.mui.com/material-ui/integrations/interoperability/#change-the-default-styled-engine with Parcel's alias feature within the `package.json`.

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/styled-components-interoperability-w9z9d)

## The idea behind the example

This example demonstrates how to set up Material UI with [Create React App](https://github.com/facebookincubator/create-react-app) with [styled-components](https://styled-components.com/) as a style engine for your application using TypeScript.

## Versions compatibility

Note, the version 5 of `@mui/styled-engine-sc` is compatible with version 5 of `styled-components`, while the version 6 of `@mui/styled-engine-sc` (currently in alpha), is compatible with v6 of `styled-components`. When incorporating these dependencies into your project, consider this compatibility requirement. In this example application, both libraries are using version 6.

## What's next?

<!-- #default-branch-switch -->

You now have a working example project.
You can head back to the documentation and continue by browsing the [templates](https://next.mui.com/material-ui/getting-started/templates/) section.
