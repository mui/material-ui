# Contributing to Material UI, MUI System, Joy UI

If you're reading this, you're awesome!
Thank you for being a part of the community and helping us make these projects great.
Here are a few guidelines that will help you along the way.

## Summary

- [Code of conduct](#code-of-conduct)
- [A large spectrum of contributions](#a-large-spectrum-of-contributions)
- [Your first pull request](#your-first-pull-request)
- [Sending a pull request](#sending-a-pull-request)
  - [Trying changes on the documentation site](#trying-changes-on-the-documentation-site)
  - [Trying changes on the playground](#trying-changes-on-the-playground)
  - [How to increase the chances of being accepted](#how-to-increase-the-chances-of-being-accepted)
  - [CI checks and how to fix them](#ci-checks-and-how-to-fix-them)
  - [Updating the component API documentation](#updating-the-component-api-documentation)
  - [Coding style](#coding-style)
- [Contributing to the documentation](#contributing-to-the-documentation)
  - [How to find docs issues to work on](#how-to-find-docs-issues-to-work-on)
  - [How to add a new demo to the docs](#how-to-add-a-new-demo-to-the-docs)
- [How can I use a change that hasn't been released yet?](#how-can-i-use-a-change-that-hasnt-been-released-yet)
- [Roadmap](#roadmap)
- [License](#license)

## Code of conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as our code of conduct, and we expect project participants to adhere to it.
Please read [the full text](https://github.com/mui/.github/blob/master/CODE_OF_CONDUCT.md) to understand what actions will and will not be tolerated.

## A large spectrum of contributions

There are [many ways](https://mui.com/material-ui/getting-started/faq/#mui-is-awesome-how-can-i-support-the-project) to contribute to the library, and writing code is only one part of the story—[documentation improvements](#contributing-to-the-documentation) can be just as important as code changes.
If you have an idea for an improvement to the code or the docs, we encourage you to open an issue as a first step, to discuss your proposed changes with the maintainers before proceeding.

## Your first pull request

Working on your first pull request? You can learn how in this free video series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github).

Get started with [good first issues](https://github.com/mui/material-ui/issues?q=is:open+is:issue+label:"good+first+issue"), which have a limited scope and a working solution that's already been discussed.
This makes them ideal for newer developers, or those who are new to these libraries and want to see how the contribution process works.

We also have a list of [ready to take issues](https://github.com/mui/material-ui/issues?q=is:open+is:issue+label:"ready+to+take"), which are issues that have already been at least partially resolved in discussion, to the point that it's clear what to do next.
These issues are great for developers who want to reduce their chances of falling down a rabbit hole in search of a solution.

Of course, you can work on any other issue you like—the "good first" and "ready to take" issues are simply those where the scope and timeline may be better defined.
Pull requests for other issues, or completely novel problems, may take a bit longer to review if they don't fit into our current development cycle.

If you decide to fix an issue, please make sure to check the comment thread in case somebody is already working on a fix.
If nobody is working on it at the moment, please leave a comment stating that you've started to work on it, so other people don't accidentally duplicate your effort.

If somebody claims an issue but doesn't follow up after more than a week, it's fine to take over, but you should still leave a comment.
If there has been no activity on the issue for 7 to 14 days, then it's safe to assume that nobody is working on it.

## Sending a pull request

MUI Core projects are community-driven, so pull requests are always welcome, but before working on a large change, it's best to open an issue first to discuss it with the maintainers.

When in doubt, keep your pull requests small.
For the best chances of being accepted, don't bundle more than one feature or bug fix per PR.
It's often best to create two smaller PRs rather than one big one.

1. Fork the repository.

2. Clone the fork to your local machine and add the upstream remote:

```bash
git clone https://github.com/<your username>/material-ui.git
cd material-ui
git remote add upstream https://github.com/mui/material-ui.git
```

<!-- #default-branch-switch -->

3. Synchronize your local `next` branch with the upstream one:

```bash
git checkout next
git pull upstream next
```

4. Install the dependencies with pnpm (yarn or npm aren't supported):

```bash
pnpm install
```

5. Create a new topic branch:

```bash
git checkout -b my-topic-branch
```

6. Make changes, commit, and push to your fork:

```bash
git push -u origin HEAD
```

7. Go to [the repository](https://github.com/mui/material-ui) and open a pull request.

The core team actively monitors for new pull requests.
We will review your PR and either merge it, request changes to it, or close it with an explanation.

### Trying changes on the documentation site

The documentation site is built with Material UI and contains examples of all of the components.
This is the best place to experiment with your changes—it's the local development environment used by the maintainers.

To get started, run:

```bash
pnpm start
```

You can now access the documentation site locally: http://localhost:3000.
Changes to the docs will hot reload the site.

### Trying changes on the playground

While we do recommend trying your changes on the documentation site, this is not always ideal.
You might face the following problems:

- Updating the existing demos prevents you from working in isolation on a single instance of the component
- Emptying an existing page to try your changes in isolation leads to a noisy `git diff`
- Static linters may report issues that you might not care about

To avoid these problems, you can use this playground:

```bash
pnpm docs:create-playground && pnpm start
```

Access it locally at: http://localhost:3000/playground/.

You can create as many playgrounds as you want by going to the `/docs/pages/playground/` folder and duplicating the `index.tsx` file with a different name: `<file_name>.tsx`.
The new playground will be accessible at: `http://localhost:3000/playground/<file_name>`.

### How to increase the chances of being accepted

Continuous Integration (CI) automatically runs a series of checks when a PR is opened.
If you're unsure whether your changes will pass, you can always open a PR, and the GitHub UI will display a summary of the results.
If any of these checks fail, refer to [Checks and how to fix them](#checks-and-how-to-fix-them).

Make sure the following is true:

<!-- #default-branch-switch -->

- The branch is targeted at `next` for ongoing development. All tests are passing. Code that lands in `next` must be compatible with the latest alpha/beta release. It may contain additional features but no breaking changes. We should be able to release a new minor version from the tip of `next` at any time.
- If a feature is being added:
  - If the result was already achievable with the core library, you've explained why this feature needs to be added to the core.
  - If this is a common use case, you've added an example to the documentation.
- If adding new features or modifying existing ones, you've included tests to confirm the new behavior. You can read more about our test setup in our test [README](https://github.com/mui/material-ui/blob/HEAD/test/README.md).
- If props were added or prop types were changed, you've updated the TypeScript declarations.
- If submitting a new component, you've added it to the [lab](https://github.com/mui/material-ui/tree/HEAD/packages/mui-lab).
- The branch is not [behind its target branch](https://github.community/t/branch-10-commits-behind/2403).

We will only merge a PR when all tests pass.
The following statements must be true:

- The code is formatted. If the code was changed, run `pnpm prettier`.
- The code is linted. If the code was changed, run `pnpm eslint`.
- The code is type-safe. If TypeScript sources or declarations were changed, run `pnpm typescript` to confirm that the check passes.
- The API docs are up to date. If API was changed, run `pnpm proptypes && pnpm docs:api`.
- The demos are up to date. If demos were changed, run `pnpm docs:typescript:formatted`. See [about writing demos](#2-write-the-demo-code).
- The pull request title follows the pattern `[product-name][Component] Imperative commit message`. (See: [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/) for a great explanation).

Don't worry if you miss a step—the Continuous Integration will run a thorough set of tests on your commits, and the maintainers of the project can assist you if you run into problems.

If your pull request addresses an open issue, make sure to link the PR to that issue.
Use any [supported GitHub keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword) in the PR description to automatically link them.
This makes it easier to understand where the PR is coming from, and also speeds things up because the issue will be closed automatically when the PR is merged.

### CI checks and how to fix them

If any of the checks fail, click on the **Details** link and review the logs of the build to find out why it failed.
For CircleCI, you need to log in first.
No further permissions are required to view the build logs.
The following sections give an overview of what each check is responsible for.

#### ci/codesandbox

This task creates multiple sandboxes on CodeSandbox.com that use the version of npm packages that was built from this pull request.
It should not fail in isolation. Use it to test more complex scenarios.

#### ci/circleci: checkout

This is a preflight check to see if the dependencies and lockfile are ok.
Running `pnpm` and `pnpm deduplicate` should fix most issues.

#### ci/circleci: test_static

This checks code format and lints the repository.
The log of the failed build should explain how to fix any issues.
It also runs commands that generate or change some files (like `pnpm docs:api` for API documentation).
If the CI job fails, then you most likely need to run the commands that failed locally and commit the changes.

#### ci/circleci: test_unit-1

This runs the unit tests in a `jsdom` environment.
If it fails then `pnpm test:unit` should<sup>[1](test/README.md#accessibility-tree-exclusion)</sup> fail locally as well.
You can narrow the scope of tests run with `pnpm test:unit --grep ComponentName`.
If `pnpm test:unit` passes locally, but fails in CI, consider [Accessibility tree exclusion in CI](test/README.md#accessibility-tree-exclusion).

#### ci/circleci: test_browser-1

This runs the unit tests in multiple browsers (via BrowserStack).
The log of the failed build should list which browsers failed.
If Chrome failed then `pnpm test:karma` should<sup>[1](test/README.md#accessibility-tree-exclusion)</sup> fail locally as well.
If other browsers failed, then debugging might be trickier.
If `pnpm test:karma` passes locally, but fails in CI, consider [Accessibility tree exclusion in CI](test/README.md#accessibility-tree-exclusion).

#### ci/circleci: test_regression-1

This renders tests in `test/regressions/tests` and takes screenshots.
This step shouldn't fail if the others pass.
Otherwise, a maintainer will take a look.
The screenshots are evaluated in another step.

#### ci/circleci: test_types

This typechecks the repository.
The log of the failed build should list any issues.

#### ci/circleci: test_bundle_size_monitor

This task is primarily responsible for monitoring the bundle size.
It will only report the size if the change exceeds a certain threshold.
If it fails, then there's usually something wrong with the way the packages or docs were built.

#### argos

This evaluates the screenshots taken in `test/regressions/tests`, and fails if it detects
differences.
This doesn't necessarily mean that your PR will be rejected, as a failure might be intended.
Clicking on **Details** will show you the differences.

#### deploy/netlify

This renders a preview of the docs with your changes if it succeeds.
Otherwise `pnpm docs:build` usually fails locally as well.

#### codecov/project

This monitors coverage of the tests.
A reduction in coverage isn't necessarily bad, but it's always appreciated if it can be improved.

#### Misc

There are various other checks done by Netlify to validate the integrity of the docs.
Click on **Details** to find out more about them.

### Updating the component API documentation

The component API in the component `propTypes` and under `docs/pages/api-docs` is auto-generated from the [JSDoc](https://jsdoc.app/about-getting-started.html) in the TypeScript declarations.
Be sure to update the documentation in the corresponding `.d.ts` files (for example `packages/mui-material/src/Button/Button.d.ts` for `<Button>`) and then run:

```bash
$ pnpm proptypes
$ pnpm docs:api
```

### Coding style

Please follow the coding style of the project.
It uses Prettier and ESLint, so if possible, enable linting in your editor to get real-time feedback.

- `pnpm prettier` reformats the code.
- `pnpm eslint` runs the linting rules.

When you submit a PR, these checks are run again by our continuous integration tools, but hopefully your code is already clean!

## Contributing to the documentation

Contributing to open-source docs involves a lot more than just fixing typos—developers frequently request more in-depth explanations of component features, and this requires both coding and technical writing to accomplish.
Every documentation PR will be reviewed by an editor following [MUI's writing style guide](https://mui-org.notion.site/Writing-style-guide-2a957a4168a54d47b14bae026d06a24b), and if you plan to contribute regularly, you should familiarize yourself with this guide to speed up the editing process.

### How to find docs issues to work on

If you're interested in contributing to the docs but aren't sure where to start, you can use this search prompt in the GitHub repo to find open issues tagged with both `docs` and `ready to take`:

`is:issue is:open label:docs label:"ready to take"`

Or [follow this link directly to the results of that search](https://github.com/mui/material-ui/issues?q=is%3Aissue+is%3Aopen+label%3Adocs+label%3A%22ready+to+take%22).

### How to add a new demo to the docs

The following steps explain how to add a new demo to the docs using the Button component as an example:

#### 1. Add a new component file to the directory

Add the new file to the component's corresponding directory...

```bash
docs/src/pages/components/buttons/
```

...and give it a name: how about `SuperButtons.tsx`?

#### 2. Write the demo code

We uses TypeScript to document our components.
We prefer demos written in TypeScript (using the `.tsx` file format).

After creating a TypeScript demo, run `pnpm docs:typescript:formatted` to automatically create the JavaScript version, which is also required.

If you're not familiar with TypeScript, you can write the demo in JavaScript, and a core contributor may help you migrate it to TypeScript.

#### 3. Edit the page's Markdown file

The Markdown file in the component's respective folder—in this case, `/buttons/buttons.md`—is the source of content for the document.
Any changes you make there will be reflected on the website.

Add a header and a brief description of the demo and its use case, along with the `"demo"` code snippet to inject it into the page:

```diff
+### Super buttons
+
+To create a super button for a specific use case, add the `super` prop:
+
+{{"demo": "pages/components/buttons/SuperButtons.js"}}
```

#### 4. Submit your PR

Now you're ready to [open a PR](#sending-a-pull-request) to add your new demo to the docs.

Check out [this Toggle Button demo PR](https://github.com/mui/material-ui/pull/19582/files) for an example of what your new and edited files should look like when opening your own demo PR.

## How can I use a change that hasn't been released yet?

We use [CodeSandbox CI](https://codesandbox.io/docs/ci) to publish a working version of the packages for each pull request as a "preview."

You can check the CodeSandbox CI status of a pull request to get the URL needed to install these preview packages:

```diff
diff --git a//package.json b//package.json
index 791a7da1f4..a5db13b414 100644
--- a/package.json
+++ b/package.json
@@ -61,7 +61,7 @@
   "dependencies": {
     "@babel/runtime": "^7.4.4",
     "@mui/styled-engine": "^5.0.0-alpha.16",
-    "@mui/material": "^5.0.0-alpha.15",
+    "@mui/material": "https://pkg.csb.dev/mui/material-ui/commit/371c952b/@mui/material",
     "@mui/system": "^5.0.0-alpha.16",
```

Alternatively, you can open the Netlify preview of the documentation, and open any demo in CodeSandbox.
The documentation automatically configures the dependencies to use the preview packages.

You can also package and test your changes locally.
The following example shows how to package `@mui/material`, but you can package any npm package with this process:

```bash
$> cd packages/mui-material # or path to any other mui package
$packages\mui-material> pnpm build
$packages\mui-material> cd ./build
$packages\mui-material> pnpm pack
```

Navigate to the build folder of your respective package and locate a file with the format `mui-material-x.x.x.tar.gz`.
Copy this file and move it to the project directory you want to test in, then run:

```bash
$test-project> npm i ./path-to-file/mui-material-x.x.x.tar.gz
```

> **Note**
>
> If you've already installed this package, your changes will not be reflected when you reinstall it.
> As a quick fix, you can temporarily bump the version number in your `package.json` before running `pnpm build`.

## Roadmap

Learn more about the future by visiting our different projects' roadmaps:

- [Material UI roadmap](https://mui.com/material-ui/discover-more/roadmap/).

## License

By contributing your code to the [mui/material-ui](https://github.com/mui/material-ui) GitHub repository, you agree to license your contribution under the [MIT license](/LICENSE).
