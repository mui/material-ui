# Module augmentation tests

Run both suites from the repository root:

```bash
pnpm typescript:module-augmentation
```

You can also use the workspace command:

```bash
pnpm -F @mui-internal/test-module-augmentation typescript:module-augmentation
```

The command builds Material UI, System, and their dependencies before it tests
the fixtures. The release build clears the output folders, copies authored
`.d.ts` files, and emits declarations from TypeScript source. The command bypasses
the Nx cache. This adds build time but prevents stale declarations from hiding
errors. Shared dependencies are built once.

This workspace has its own dependencies and a standalone TypeScript configuration.
It does not inherit the root source aliases. pnpm links the MUI dependencies to
build folders, so imports resolve through the built package exports. Keep the
fixtures here to avoid package self-references that can resolve to library source.

Each fixture runs in a separate compiler process. The compiler uses the installed
`tsc`, including the version selected by CI. The runner checks the compiler's file
list and rejects library files outside the build folders or files that are not
`.d.ts`, `.d.mts`, or `.d.cts` declarations.

Keep implementation checks separate with `pnpm typescript`. Do not apply consumer
augmentations to library source or suppress declaration diagnostics. The
breakpoint fixtures check custom keys, removed keys, invalid keys, and isolation
from other fixtures.
