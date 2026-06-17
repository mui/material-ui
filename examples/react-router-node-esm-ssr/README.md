# Material UI - React Router Node ESM SSR example

Minimal React Router SSR app for checking issue 48636. It keeps
`@mui/material` external in the server build so Node resolves the package at
runtime.

## How to use

From the repository root:

```bash
pnpm --dir examples/react-router-node-esm-ssr install --ignore-workspace
pnpm --dir examples/react-router-node-esm-ssr build
pnpm --dir examples/react-router-node-esm-ssr start
```

or:

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mj12albert/material-ui/tree/examples-rtg-esm-fix/examples/react-router-node-esm-ssr)

Open http://localhost:3000. The server build should import and render without
`ERR_UNSUPPORTED_DIR_IMPORT`.

This example installs `@mui/material` from the PR 48645 package preview.
