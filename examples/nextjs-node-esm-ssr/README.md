# Material UI - Next.js Node ESM SSR example

Minimal Next.js Pages Router app for checking issue 48636. The server render
loads `@mui/material` through `@mui/x-date-pickers`, using Node's ESM package
resolution path.

## How to use

From the repository root:

```bash
pnpm --dir examples/nextjs-node-esm-ssr install --ignore-workspace
pnpm --dir examples/nextjs-node-esm-ssr build
pnpm --dir examples/nextjs-node-esm-ssr start
```

or:

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mj12albert/material-ui/tree/examples-rtg-esm-fix/examples/nextjs-node-esm-ssr)

Open http://localhost:3000. The build and page render should complete without
`ERR_UNSUPPORTED_DIR_IMPORT`.

This example installs `@mui/material` from the PR 48645 package preview.
