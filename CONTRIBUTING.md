# Contributing

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of the Material-UI community. Here are a few guidelines that will help you along the way.

## Submitting a Pull Request

Material-UI is a community project, so pull requests are always welcome, but before working on a large change, it is best to open an issue first to discuss it with the maintainers.

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, don't bundle more than one feature or bug fix per pull request. It's always best to create two smaller PRs than one big one.

As with issues, please begin the title with [ComponentName].

When adding new features or modifying existing, please attempt to include tests to confirm the new behaviour. You can read more about our test setup [here](https://github.com/callemall/material-ui/blob/v1-beta/test/README.md).

### Branch Structure

All stable releases are tagged ([view tags](https://github.com/callemall/material-ui/tags)). At any given time, `v1-beta` represents the latest development version of the library.
Patches or hotfix releases are prepared on an independent branch.

#### `v1-beta` is unsafe

We will do our best to keep `v1-beta` in good shape, with tests passing at all times. But in order to move fast, we will make API changes that your application might not be compatible with.

## Getting started

Please create a new branch from an up to date v1-beta on your fork. (Note, urgent hotfixes should be branched off the latest stable release rather than v1-beta)

1. Fork the Material-UI repository on Github
2. Clone your fork to your local machine `git clone git@github.com:<yourname>/material-ui.git`
3. Create a branch `git checkout -b my-topic-branch`
4. Make your changes, lint, then push to to github with `git push --set-upstream origin my-topic-branch`.
5. Visit github and make your pull request.

If you have an existing local repository, please update it before you start, to minimise the chance of merge conflicts.
```js
git remote add upstream git@github.com:callemall/material-ui.git
git checkout v1-beta
git pull upstream v1-beta
git checkout -b my-topic-branch
yarn
```

### Testing the documentation site

The documentation site is built with Material-UI, and contains examples of all the components. To get started:
```js
yarn
yarn docs:dev
```
You can now access the documentation site [locally](http://localhost:3000).

Test coverage is limited at present, but where possible, please add tests for any changes you make. Tests can be run with `yarn test`.

### Coding style

Please follow the coding style of the current code base. Material-UI uses eslint, so if possible, enable linting in your editor to get realtime feedback. The linting rules are also run when Webpack recompiles your changes, and can be run manually with `yarn lint`.

You can also run `yarn prettier` to reformat the code.

Finally, when you submit a pull request, they are run again by Circle CI, but hopefully by then your code is already clean!

## Roadmap

To get a sense of where Material-UI is heading, or for ideas on where you could contribute, take a look at the [ROADMAP](https://github.com/callemall/material-ui/blob/v1-beta/ROADMAP.md).

## License

By contributing your code to the callemall/material-ui GitHub repository, you agree to license your contribution under the MIT license.

