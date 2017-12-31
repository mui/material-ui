# Create React App example with Flow

## Warning
An [existing bug in flow regarding the use of higher order components (HOC)](https://github.com/facebook/flow/issues/5382)
limits the usefulness of flow by an application.  As of November 27, 2017 we cannot recommend the use of flow
typing in your application in conjunction with `material-ui`.

This issue is under discussion in [#9312](https://github.com/mui-org/material-ui/issues/9312).

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
