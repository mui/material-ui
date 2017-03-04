# Material-UI Testing

Thanks for writing tests! Here's a quick run-down on our current setup.

## Tools we use

Please familiarise yourself with these if you plan on contributing! :+1:

- [mocha](https://github.com/mochajs/mocha)
- [enzyme](https://github.com/airbnb/enzyme)
- [jsdom](https://github.com/tmpvar/jsdom)
- [karma](https://github.com/karma-runner/karma)
- [chai](https://github.com/chaijs/chai)
- [sinon](https://github.com/sinonjs/sinon)
- [docker](https://github.com/docker/docker)
- [vrtest](https://github.com/nathanmarks/vrtest)

## Commands

Material-UI uses a wide range of tests approach as each of them comes with a different
trade-off, mainly completeness vs. speed.

### React API level

#### Run the core mocha unit/integration test suite.
`npm run test:unit`

#### Watch the core mocha unit/integration test suite.
`npm run test:watch`

First, we have the **unit test** suite.
It uses [mocha](https://mochajs.org) and the *shallow* API of [enzyme](https://github.com/airbnb/enzyme) to allow testing the components in isolation.
It's the fastest approach, and is best suited for testing many combinations.

Next, we have the **integration** tests.
We are using the *mount* API of [enzyme](https://github.com/airbnb/enzyme).
It allows testing the integration of different components using a virtual DOM.
This virtual DOM is provided by [jsdom](https://github.com/tmpvar/jsdom).
It's here to make sure components work together.

### DOM API level

#### Run the mocha test suite using the karma runner.
`npm run test:karma`

Testing the components at the React level isn't enough;
we need to make sure they will behave as expected with a **real DOM**.
To solve that problem we use [karma](https://github.com/karma-runner/karma),
which is almost a drop in replacement of [jsdom](https://github.com/tmpvar/jsdom).

### Browser API level

In the end, components are going to be used in a real browser.
The DOM is just one dimension of that environment,
so we also need to take into account the rendering engine.

#### Run the visual regression tests
`npm run test:regressions`

Next, we are using [docker](https://github.com/docker/docker) to take screenshots and comparing them with the baseline. It allows catching regressions like this one:

![before](/test/docs-regressions-before.png)
![diff](/test/docs-regressions-diff.png)

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

#### Update the baseline

You can update the baseline images by running the following command:
`npm run test:regressions -- --record`

## Writing Tests

For all unit tests, please use the [shallow renderer](https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md) from `enzyme` unless the Component being tested requires a DOM. [Here's](https://github.com/callemall/material-ui/blob/master/src/Avatar/Avatar.spec.js) a small shallow rendered test to get you started.

If the Component being unit tested requires a DOM, you can use the [mount api](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md) from `enzyme`. For some operations, you may still need to use the React test utils, but try to use the `enzyme` API as much as possible.

Stick to test assertions such as `assert.strictEqual` and `assert.ok`. This helps keep tests simple and readable.
