# Material UI - Vitest Node ESM example

This is a minimal Vitest + jsdom test setup for an app that renders Material UI
transition components inside `TransitionGroup` from `react-transition-group`,
like the Material UI transition docs demo.

Vitest externalizes `node_modules` dependencies by default, so these tests load
`@mui/material` through Node's native ESM resolver â€” the same module resolution
path that the test-runner reports in
https://github.com/mui/material-ui/issues/48636 hit. The Vitest config
intentionally has no `server.deps.inline` workaround for `@mui/material` or
`react-transition-group`.

## How to use

From the repository root:

```bash
pnpm -F @mui/types -F @mui/utils -F @mui/private-theming -F @mui/styled-engine -F @mui/system -F @mui/material build
pnpm --dir examples/vitest-node-esm install --ignore-workspace
pnpm --dir examples/vitest-node-esm test
```

The important signal is that the tests pass without `ERR_UNSUPPORTED_DIR_IMPORT`
and without inlining `@mui/material` into the Vite transform pipeline.

## Why this example uses local package paths

The app depends directly on `@mui/material`, `react-transition-group`, React,
and Emotion. `@mui/material` points at `../../packages/mui-material/build` so
this example can test the current checkout before the package is published.

The `pnpm.overrides` entries are only for local development. They make
`@mui/material`'s workspace dependencies resolve to this checkout's built
packages inside the standalone example.
