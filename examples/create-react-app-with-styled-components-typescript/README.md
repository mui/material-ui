# Create React App example with styled-components & TypeScript

The main difference between this and the non-typescript example is that you need to add the following path config to your tsconfig:

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
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/create-react-app-with-styled-components-typescript
cd create-react-app-with-styled-components-typescript
```

Install it and run:

```sh
npm install
npm start
```

## CodeSandbox

<!-- #default-branch-switch -->

Note that CodeSandbox is not supporting react-app-rewired, yet you can [still see the code](https://codesandbox.io/s/github/mui/material-ui/tree/master/examples/create-react-app-with-styled-components-typescript).

The following link leverages this demo: https://mui.com/guides/interoperability/#change-the-default-styled-engine with Parcel's alias feature within the `package.json`

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/styled-components-interoperability-w9z9d)

## The idea behind the example

This example demonstrates how you can setup [Create React App](https://github.com/facebookincubator/create-react-app) with [styled-components](https://styled-components.com/) as a style engine for your application using TypeScript.

## What's next?

<!-- #default-branch-switch -->

You now have a working example project.
You can head back to the documentation, continuing browsing it from the [templates](https://mui.com/material-ui/getting-started/templates/) section.
