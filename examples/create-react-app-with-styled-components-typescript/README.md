# Create React App example with styled-components & TypeScript

The main difference between this and the non-typescript example is that you need to add the following path config to your tsconfig:

```json
"paths": {
  "@material-ui/styled-engine": ["./node_modules/@material-ui/styled-engine-sc"]
}
```

and install @types/styled-components:

```
npm install --save-dev @types/styled-components
```

Alternatively, to skip this configuration, you can set `skipLibCheck: true` in your tsconfig.

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/next | tar -xz --strip=2 material-ui-next/examples/create-react-app-with-styled-components-typescript
cd create-react-app-with-styled-components-typescript
```

Install it and run:

```sh
npm install
npm start
```

## CodeSandbox

Note that CodeSandbox is not supporting react-app-rewired, yet you can [still see the code](https://codesandbox.io/s/github/mui-org/material-ui/tree/HEAD/examples/create-react-app-with-styled-components-typescript).

The following link leverages this demo: https://next.material-ui.com/guides/interoperability/#change-the-default-styled-engine with Parcel's alias feature within the `package.json`

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/styled-components-interoperability-w9z9d)

## The idea behind the example

This example demonstrates how you can setup [Create React App](https://github.com/facebookincubator/create-react-app) with [styled-components](https://styled-components.com/) as a style engine for your application using TypeScript.
