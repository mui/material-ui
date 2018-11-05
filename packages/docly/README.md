# Docly Material-UI

This is a fork of the [Material UI repo](https://github.com/mui-org/material-ui), customized to Docly's needs. Here're some things you need to know to use this package.

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

## Publish

```
project/root$> cd packages/docly
packages/docly$> yarn release
```

## Update material-ui version

We have the material-ui repo tracked as _upstream_, so updating to a more recent version starts with the following lines:

```
git fetch upstream
git merge upstream/master
```

There are a few different ways to go about maintaining a long-lived fork. Picking a rebase strategy makes it easier to see our modifications, since they're always replayed on top, but that also makes it weird if we for example make modifications to our components as a reaction to a api-change.

So for now we've decided to try a merge strategy. There are a few ways to filter out our modifications:

```
git log upstream/master..master --no-merges
```

[Git Tricks for Maintaining a Long-Lived Fork](https://die-antwort.eu/techblog/2016-08-git-tricks-for-maintaining-a-long-lived-fork/)

### Keep our package.json in sync with material-ui

Since we have an internal copy of the `@material-ui/core` package, we need to keep our dependencies in sync.

We've added a utility script that reads the two package.json files and updates `packages/docly/package.json`. After updating material-ui,

```
cd packages/docly
yarn sync-package-json
```

The script reports if there are any changes, and you then need to commit the package.json file.
