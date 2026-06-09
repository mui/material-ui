# Material UI - Node ESM SSR example

This is a minimal server-rendered React app that runs in Node's native ESM mode.
It imports transition components from `@mui/material` and renders them on the
server without a bundler rewriting package imports first. It also imports
`TransitionGroup` from `react-transition-group`, like the Material UI transition
docs demo.

This setup is useful for locally checking the package shape involved in
https://github.com/mui/material-ui/issues/48636.

## How to use

From the repository root:

```bash
pnpm -F @mui/types -F @mui/utils -F @mui/private-theming -F @mui/styled-engine -F @mui/system -F @mui/material build
pnpm --dir examples/node-esm-ssr install --ignore-workspace
pnpm --dir examples/node-esm-ssr render
```

To run it as a small HTTP server:

```bash
pnpm --dir examples/node-esm-ssr start
```

Then open http://localhost:3000.

## Why this example uses local package paths

The app depends directly on `@mui/material`, `react-transition-group`, React,
and Emotion. `@mui/material` points at `../../packages/mui-material/build` so
this example can test the current checkout before the package is published.

The `pnpm.overrides` entries are only for local development. They make
`@mui/material`'s workspace dependencies resolve to this checkout's built
packages inside the standalone example.
