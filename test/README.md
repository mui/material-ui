# Material-UI Testing

Thanks for writing tests! Here's a quick run-down on our current setup.

## Getting started

1. Add a unit test to `packages/*/src/TheUnitInQuestion/TheUnitInQuestion.test.js` or an integration test `packages/*/test/`.
2. Run `yarn test:watch`.
3. Implement the tested behavior
4. Open a PR once the test passes or you want somebody to review your work

## Tools we use

- [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro)
- [chai](https://www.chaijs.com/)
- [sinon](https://sinonjs.org/)
- [mocha](https://mochajs.org/)
- [karma](https://karma-runner.github.io/latest/index.html)
- [enzyme](https://airbnb.io/enzyme/) (old tests only)
- [vrtest-mui](https://github.com/mui-org/vrtest-mui)
- [docker](https://docs.docker.com/)
- [jsdom](https://github.com/jsdom/jsdom)

## Writing Tests

For all unit tests, please use the return value from `test/utils/createClientRender`.
It prepares the test suite and returns a function with the same interface as
[`render` from `@testing-library/react`](https://testing-library.com/docs/react-testing-library/api#render).

For new tests please use `expect` from the BDD testing approach. Prefer to use as expressive [matchers](https://www.chaijs.com/api/bdd/) as possible. This keeps
the tests readable, and, more importantly, the message if they fail as descriptive as possible.

In addition to the core matchers from `chai` we also use matchers from [`chai-dom`](https://github.com/nathanboktae/chai-dom#readme).

Deciding where to put a test is (like naming things) a hard problem:

- When in doubt put the new test case directly in the unit test file for that component e.g. `material-ui/src/Button/Button.test.js`.
- If your test requires multiple components from the library create a new integration test.
- If you find yourself using a lot of `data-testid` attributes or you're accessing
  a lot of styles consider adding a component (that doesn't require any interaction)
  to `test/regressions/tests/` e.g. `test/regressions/tests/List/ListWithSomeStyleProp`

#### Visual regression tests

We try to use as many demos from the documentation as possible;
however, we can't replace one with the other as they address different needs.
With the regression tests:

- You might need to test a more complex situation, e.g. a stress test of the grid.
- You might need to test a simpler situation, e.g. a static progress bar.

## Commands

Material-UI uses a wide range of tests approach as each of them comes with a different
trade-off, mainly completeness vs. speed.

### React API level

#### Run the core mocha unit/integration test suite.

To run all of the unit and integration tests run `yarn test:unit`

If you want to `grep` for certain tests add `-g STRING_TO_GREP`.

#### Watch the core mocha unit/integration test suite.

`yarn test:watch`

First, we have the **unit test** suite.
It uses [mocha](https://mochajs.org) and a thin wrapper around `@testing-library/react`.
Here is an [example](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Dialog/Dialog.test.js#L87) with the `Dialog` component.

Next, we have the **integration** tests. They are mostly used for components that
act as composite widgets like `Select` or `Menu`.
Here is an [example](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/test/integration/Menu.test.js#L28) with the `Menu` component.

#### Create HTML coverage reports

`yarn test:coverage:html`

When running this command you should get under `coverage/index.html` a full coverage report in HTML format. This is created using [Istanbul](https://istanbul-js.org)'s HTML reporter and gives good data such as line, branch and function coverage.

### DOM API level

#### Run the mocha test suite using the karma runner.

`yarn test:karma`

Testing the components at the React level isn't enough;
we need to make sure they will behave as expected with a **real DOM**.
To solve that problem we use [karma](https://github.com/karma-runner/karma),
which is almost a drop in replacement of [jsdom](https://github.com/tmpvar/jsdom).
Our tests run on different browsers to increase the coverage:

- [Headless Chrome](https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md)
- Chrome, Firefox, Safari, and Edge thanks to [BrowserStack](https://www.browserstack.com)

### Browser API level

In the end, components are going to be used in a real browser.
The DOM is just one dimension of that environment,
so we also need to take into account the rendering engine.

#### Run the visual regression tests

`yarn test:regressions`

Next, we are using [docker](https://github.com/docker/docker) to take screenshots and comparing them with the baseline. It allows catching regressions like this one:

![before](/test/docs-regressions-before.png)
![diff](/test/docs-regressions-diff.png)

Here is an [example](https://github.com/mui-org/material-ui/blob/master/test/regressions/tests/Menu/SimpleMenuList.js#L6) with the `Menu` component.

#### Installation

The visual regression tests suite has a hard dependency on [docker](https://github.com/docker/docker).
You need to **install** it, then run the following commands:

```sh
docker-compose up -d
```

Due to issues with networking in OS X, getting the container to see the
test page may require additional configuration as the `docker0` interface
does not exist.

You can create an alias for the loopback interface using the instructions
provided at https://docs.docker.com/docker-for-mac/networking/#/there-is-no-docker0-bridge-on-macos

```
sudo ifconfig lo0 alias 10.200.10.1/24
```

In our `vrtest` config this is set as the default, although it can be overridden with an env var:

```
testUrl: process.env.DOCKER_TEST_URL || 'http://10.200.10.1:3090',
```

In addition to docker, the visual regression tests depend on either
[ImageMagick](https://www.imagemagick.org/)
or [GraphicsMagick](https://www.graphicsmagick.org/) being installed.
