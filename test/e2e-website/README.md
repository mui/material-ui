# Docs end-to-end testing

## Running locally

1. Run `yarn docs:dev` to start docs in development server.
2. Run `yarn test:e2e-website` in a separate terminal to run the test suites (`*.spec.ts`) inside `test/e2e-website` folder.

> use --headed to run tests in headed browsers, check out [Playwright CLI](https://playwright.dev/docs/intro#command-line) for more options

## CI

After netlify deploy the preview site, the `netlify/functions/deploy-succeeded.js` hook calls CircleCI API to run the `e2e-website` workflow against the deployed url.
