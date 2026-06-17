# Material UI - Node ESM SSR example

Minimal Node ESM server-rendered React app for checking issue 48636. It renders
Material UI transition components without a bundler rewriting package imports.

## How to use

From the repository root:

```bash
pnpm --dir examples/node-esm-ssr install --ignore-workspace
pnpm --dir examples/node-esm-ssr render
```

or:

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mj12albert/material-ui/tree/examples-rtg-esm-fix/examples/node-esm-ssr)

To run the HTTP server:

```bash
pnpm --dir examples/node-esm-ssr start
```

Open http://localhost:3000. Rendering should complete without
`ERR_UNSUPPORTED_DIR_IMPORT`.

This example installs `@mui/material` from the PR 48645 package preview.
