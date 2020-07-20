# Testing

<p class="description">Write tests to prevent regressions and write better code.</p>

Examples in this guide use [global methods from Mocha](https://mochajs.org/api/global.html), not [Jest](https://jestjs.io/docs/en/api).

## Userspace

What about writing tests in userspace? The Material-UI styling infrastructure uses some helper functions built on top of [enzyme](https://github.com/airbnb/enzyme) to make the process easier, which we are exposing. You can take advantage of them if you so choose.
We use almost exclusively full DOM rendering APIs. We encourage you to do the same especially
if your components rely on custom themes. Tests using shallow rendering APIs become more brittle
with the amount of provider components they require.

## Internal

Material-UI has **a wide range** of tests so we can
iterate with confidence on the components, for instance, the visual regression tests provided by [Argos-CI](https://www.argos-ci.com/mui-org/material-ui) have proven to be really helpful.
To learn more about the internal tests, you can have a look at the [README](https://github.com/mui-org/material-ui/blob/next/test/README.md).
