# Material UI - React Router Node ESM SSR example

This is a minimal React Router SSR app that imports Material UI from the local
built package and uses `TransitionGroup` from `react-transition-group`, like the
Material UI transition docs demo. It mirrors the package-resolution path involved in
https://github.com/mui/material-ui/issues/48636 without the extra template code
from larger React Router examples.

## How to use

From the repository root, build the local Material UI packages first:

```bash
pnpm -F @mui/types -F @mui/utils -F @mui/private-theming -F @mui/styled-engine -F @mui/system -F @mui/material build
```

Then from this example directory:

```bash
pnpm install --ignore-workspace
pnpm build
pnpm start
```

Open http://localhost:3000.

For a non-server smoke test after `pnpm build`, import the server build:

```bash
node -e "import('./build/server/index.js').then(() => console.log('server build import ok'))"
```

Before the fix for issue 48636, that import path can fail when Node resolves
Material UI's built ESM transition module and reaches
`react-transition-group/TransitionGroupContext`.

## Why this example uses local package paths

The app depends directly on `@mui/material`, `react-transition-group`, React,
Emotion, and React Router. `@mui/material` points at
`../../packages/mui-material/build` so this example can test the current checkout
before the package is published.

The `pnpm.overrides` entries are only for local development. They make
`@mui/material`'s workspace dependencies resolve to this checkout's built
packages inside the standalone example.
