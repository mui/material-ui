# Visual regression testing

Visual regression tests are split into two parts:

1. The rendered UI (short: fixture)
2. Instrumentation of that UI

## Rendered UI

The composition of all tests happens in `./index.js`.
The rendered UI is either:

1. located inside a separate file in `./fixtures` and written as a React component.

   Here is an [example](https://github.com/mui/material-ui/blob/814fb60bbd8e500517b2307b6a297a638838ca89/test/regressions/tests/Menu/SimpleMenuList.js#L6-L16) with the `Menu` component.

2. a demo from `docs/data`

   Most import-safe demos are included.
   Non-demo paths and interactive or flaky components are excluded in `./index.jsx`.

   Per-demo screenshot and accessibility rules live in `./demoMeta.ts`.
   This keeps screenshot exclusions separate from accessibility coverage.

If you introduce new behavior, prefer adding a demo to the documentation to solve documentation and testing with one file.
If you're adding a new test prefer a new component instead of editing existing files since that might unknowingly alter existing tests.

## Instrumentation

### Manual

`pnpm test:regressions:dev` will build all fixtures and render an overview page that lists all fixtures.
This can be used to debug individual fixtures.
By default, a devtools-like view is shown that can be disabled by appending `#no-dev` to the URL, for example `http://localhost:5001/docs-customization-typography/CustomResponsiveFontSizes#no-dev` or forced by appending `#dev` to the URL, for example `http://localhost:5001/docs-customization-typography/CustomResponsiveFontSizes#dev`.

### Automatic

We're using [`playwright`](https://playwright.dev) to iterate over each fixture in a real browser.

For screenshot-enabled fixtures, Playwright saves a screenshot in `./screenshots/$BROWSER_NAME/`.

Some demos also run axe-core accessibility checks.
Their results are saved next to the related component docs.

It allows catching regressions like this one:

![before](/test/docs-regressions-before.png)
![diff](/test/docs-regressions-diff.png)

Each test tests only a single fixture.
A fixture can be loaded with `await renderFixture(fixturePath)`, for example `renderFixture('FocusTrap/OpenFocusTrap')`.

Accessibility checks are opt-in.
Add rules in `./demoMeta.ts` under `A11Y_RULES`.

Use a slug-wide rule for many demos, or a brace-glob for specific demos:

```ts
{ test: 'docs/data/material/components/buttons/{BasicButtons,ColorButtons}', enabled: true }
```

Filtered runs with `-t` only refresh matched slugs.
Use an unfiltered run when you need to refresh all generated results.

## Commands

For development `pnpm test:regressions:dev` and `pnpm test:regressions:run --watch` in separate terminals is recommended.

| command                        | description                                                                                                           |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `pnpm test:regressions`        | Full run                                                                                                              |
| `pnpm test:regressions:dev`    | Prepares the fixtures to be able to test in watchmode                                                                 |
| `pnpm test:regressions:run`    | Runs the tests (requires `pnpm test:regressions:dev` or `pnpm test:regressions:build`+`pnpm test:regressions:server`) |
| `pnpm test:regressions:build`  | Builds the vite bundle for viewing the fixtures                                                                       |
| `pnpm test:regressions:server` | Serves the fixture bundle.                                                                                            |
