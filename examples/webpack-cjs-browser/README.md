# Material UI - Webpack CJS browser example

Minimal Webpack browser app for checking issue 48636. The app uses CommonJS
`require()` calls and verifies that Material UI and `react-transition-group`
share the same transition context in the browser bundle.

## How to use

From the repository root:

```bash
pnpm --dir examples/webpack-cjs-browser install --ignore-workspace
pnpm --dir examples/webpack-cjs-browser dev
```

or:

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mj12albert/material-ui/tree/examples-rtg-esm-fix/examples/webpack-cjs-browser)

Open http://127.0.0.1:3005, click "Add item", and confirm:

```text
Last isAppearing: false
```

This example installs `@mui/material` from the PR 48645 package preview.
