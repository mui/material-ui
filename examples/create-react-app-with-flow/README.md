# Create React App example with Flow

## flow-typed

[flow-typed](https://github.com/flowtype/flow-typed) is a repository of third-party library interface definitions for use with Flow.
The community is maintaining [the definitions under this project](https://github.com/flowtype/flow-typed/tree/master/definitions/npm/material-ui_v1.x.x).

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```bash
curl https://codeload.github.com/mui-org/material-ui/tar.gz/v1-beta | tar -xz --strip=2 material-ui-1-beta/examples/create-react-app-with-flow
cd create-react-app-with-flow
```

Install it and run:

```bash
yarn install
yarn global add flow-typed
flow-typed install
yarn flow
yarn start
```

## The idea behind the example

This example demonstrate how you can use [Create React App](https://github.com/facebookincubator/create-react-app) with [Flow](https://github.com/facebook/flow).

