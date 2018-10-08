Docly Material-UI
===

This is a fork of the [Material UI repo](https://github.com/mui-org/material-ui), customized to Docly's needs.  Here're some things you need to know to use this package.

# Install

- Install from npm - `yarn add @docly/web`.

# Develop

## A note on setup

The `@docly/web` package is setup with an "internal" copy of the `@material-ui/core` package. This is done to be able to bundle the two together, removing the need for implementing applications to install `@material-ui/core` separately. The files in `packages/material-ui/src` are copied to `packages/docly/src/material-core` when `@docly/web` is built. 

The `material-core` folder is not tracked by git, meaning it can get cleaned out. If you ever end up in a situation with missing dependencies, run `yarn run copy-material-core` in `packages/docly`.

## Install dependencies

This repo is using yarn workspaces, meaning that dependencies should be managed from the root, while the Docly package that is distributed is found in `packages/docly`.

```
project/root$> yarn
project/root$> cd packages/docly
```

## Develop

The most convenient way to develop is by using the documentation site. Start the development server by running `project/root$> yarn docs:dev`, then update the package as needed in `packages/docly`.

Once your changes are ready, you can test them in an external application by using `yarn link` as described below.

## Use link to test in external application

```
packages/docly$> yarn build
packages/docly$> cd build
packages/docly$> yarn link
packages/docly$> cd path/to/other/app
packages/docly$> yarn link "@docly/web"
```

# Publish

```
project/root$> cd packages/docly
packages/docly$> yarn release
