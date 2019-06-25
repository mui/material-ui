# Contributing

If you're reading this, you're awesome! Thank you for helping us make this project great and being a part of the Material-UI community. Here are a few guidelines that will help you along the way.

## Submitting a pull request

Material-UI is a community project, so pull requests are always welcome, but, before working on a large change, it is best to open an issue first to discuss it with the maintainers.

When in doubt, keep your pull requests small. To give a PR the best chance of getting accepted, don't bundle more than one feature or bug fix per pull request. It's always best to create two smaller PRs than one big one.

As with issues, please begin the title with [ComponentName].

When adding new features or modifying existing, please attempt to include tests to confirm the new behaviour. You can read more about our test setup in our test [README](https://github.com/mui-org/material-ui/blob/master/test/README.md).

When submitting a new component, please add it to the [lab](https://github.com/mui-org/material-ui/tree/master/packages/material-ui-lab).

### Branch Structure

All stable releases are tagged ([view tags](https://github.com/mui-org/material-ui/tags)).
At any given time, `master` represents the latest development version of the library.
Patches or hotfix releases are prepared on an independent branch.

#### `master` is for 4.x

We will do our best to keep `master` in good shape, with tests passing at all times.

### How to increase the chance of being accepted?

We will only accept a pull request for which all tests pass. Make sure the following is true:
- The branch is targeted at:
  - `master` for ongoing development.
- The branch is not behind its target.
- If a feature is being added:
   - If the result was already achievable with the core library, explain why this
      feature needs to be added to the core.
   - It includes relevant tests.
   - If this is a common use case, considered adding an example to the documentation.
- If a bug is being fixed, test cases that fail without the fix are included.
- The code is formatted (run `yarn prettier`).
- The code is linted (run `yarn lint`).
- If API documentation is being changed in the source, `yarn docs:api` was run.
- If props were added or prop types were changed, the TypeScript declarations were updated.
- If TypeScript declarations were changed, `yarn typescript` passed.
- If demos were changed, make sure `yarn docs:typescript:formatted` does not introduce changes.
  See [About TypeScript demos](#about-typescript-demos).
- The PR title follows the pattern `[Component] Imperative commit message`. (See: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/#imperative) for a great explanation)

## Getting started

Please create a new branch from an up to date master on your fork. (Note, urgent hotfixes should be branched off the latest stable release rather than master)

1. Fork the Material-UI repository on Github
2. Clone your fork to your local machine `git clone git@github.com:<yourname>/material-ui.git`
3. Create a branch `git checkout -b my-topic-branch`
4. Make your changes, lint, then push to to GitHub with `git push --set-upstream origin my-topic-branch`.
5. Visit GitHub and make your pull request.

If you have an existing local repository, please update it before you start, to minimise the chance of merge conflicts.
```sh
git remote add upstream git@github.com:mui-org/material-ui.git
git checkout master
git pull upstream master
git checkout -b my-topic-branch
yarn
```

### Testing the documentation site

The documentation site is built with Material-UI and contains examples of all the components.
To get started:
```sh
yarn
yarn docs:dev
```
You can now access the documentation site [locally](http://localhost:3000).
Changes to the docs will hot reload the site. If you make changes to TypeScript files
in the docs run `yarn docs:typescript --watch` in a separate terminal.

Test coverage is limited at present, but where possible, please add tests for any changes you make. Tests can be run with `yarn test`.

### Updating the component API documentation

To update the component API documentation (auto generated from component PropTypes comments), run:
```sh
yarn docs:api
```

### Building locally

To use the provided build scripts with yarn you have to install `yarn@^1.9.0`.
Depending on the package you want to build just run `yarn workspace @material-ui/PACKAGE build`.

### Coding style

Please follow the coding style of the project. Material-UI uses eslint, so if possible, enable linting in your editor to get real-time feedback. The linting rules can be run manually with the following command `yarn lint`.

You can also run `yarn prettier` to reformat the code.

Finally, when you submit a pull request, they are run again by Circle CI, but hopefully by then your code is already clean!

## How do I add a new demo in the documentation?

### Let's get started.

It's simple. You just need to **create** a new file and **modify** two files.
For example, let say you want to add new demos for buttons component, then you have to go through the following steps:

#### 1. Add a new React component file under the related directory.

In this case, I'm going to add the new file to the following directory:
```
docs/src/pages/components/buttons/
```
And let's give it a name: `SuperButtons.js`.

We try to also document how to use this library with TypeScript. If you are familiar with
that language try writing that demo in TypeScript in a *.tsx file. When you're done
run `yarn docs:typescript:formatted` to automatically add a JavaScript version.

Apart from the inherent pros and cons of TypeScript the demos are also used to test our
type declarations. This helps a lot in catching regressions when updating our type
declarations.

#### 2. Edit the page Markdown file.

The Markdown file is the source for the website documentation. So, whatever you wrote there will be reflected on the website.
In this case, the file you need to edit is `docs/src/pages/components/buttons/buttons.md`, and I'm going to add a description about SuperButtons.

Changes should only be applied to the english version e.g. only `app-bar.md` and
not `app-bar-de.md`. For contributions concerning translations please read the [section
about translations](#Translations).

```diff
+ ### Super buttons
+
+ Sometimes, you need a super button to make your app looks **superb**. Yea ...
+
+ {{"demo": "pages/components/buttons/SuperButtons.js"}}
```

#### 3. You are done 🎉!

In case you missed something, [we have a real example that can be used as a summary report]((https://github.com/mui-org/material-ui/pull/8922/files)).

### About TypeScript demos

To help people use this library with TypeScript we try to provide equivalent demos
in TypeScript.

Changing demos in JavaScript requires a manual update of the TypeScript
version. If you are not familiar with this language you can add the filepath
of the TS demo to `docs/scripts/formattedTSDemos.js`. Otherwise our CI will fail the
`test_build` job. A contributor can later update the TypeScript version of that demo.

If you are already familiar with TypeScript you can simply write the demo in TypeScript.
`yarn docs:typescript:formatted` will transpile it down to JavaScript.

## How do I use my local distribution of material-ui in any project?

Sometimes it is good to test your changes in a real world scenario, in order to do that you can install your local distribution of Material-UI in any project with [yarn link](https://yarnpkg.com/lang/en/docs/cli/link/).

First, you have to build your local distribution of Material-UI:

```shell
# From the root folder of the material-ui project
cd packages/material-ui
yarn build
```

Then, you create a link to your local distribution:

```shell
cd build
yarn link
```

Next, you link your local distribution of Material-UI to any project you want to try your changes:

```shell
# From the root folder of any project
yarn link "@material-ui/core"
```

Now, every time you import `material-ui` in your project, it is going to use your local distribution.

## Translations

Translations are handled via [Crowdin](https://translate.material-ui.com).
You don't need to apply any changes to localized versions of our markdown files
i.e. files having a `-someLocale` suffix. Crowdin automatically takes care of syncing
these changes across the localized versions.

## Roadmap

To get a sense of where Material-UI is heading, or for ideas on where you could contribute, take a look at the [ROADMAP](https://github.com/mui-org/material-ui/blob/master/ROADMAP.md).

## License

By contributing your code to the mui-org/material-ui GitHub repository, you agree to license your contribution under the MIT license.
