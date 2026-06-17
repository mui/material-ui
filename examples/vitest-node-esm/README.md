# Material UI - Vitest Node ESM example

Minimal Vitest + jsdom setup for checking issue 48636. Vitest externalizes
dependencies, so the test loads `@mui/material` through Node's ESM resolver.

## How to use

From the repository root:

```bash
pnpm --dir examples/vitest-node-esm install --ignore-workspace
pnpm --dir examples/vitest-node-esm test
```

The tests should pass without `ERR_UNSUPPORTED_DIR_IMPORT` and without inlining
`@mui/material` into Vite.

This example installs `@mui/material` from the PR 48645 package preview.
