# Module augmentation tests

Run both suites from the repository root:

```sh
pnpm typescript:module-augmentation
```

To run one package, use `pnpm -F @mui/material typescript:module-augmentation`
or `pnpm -F @mui/system typescript:module-augmentation`.

Each command builds the selected packages and their dependencies before it tests
the fixtures. The release build clears the output folders, copies authored
`.d.ts` files, and emits declarations from TypeScript source. The command bypasses
the Nx cache. This adds build time but prevents stale declarations from hiding
errors. The root command builds shared dependencies once.

The shared configuration replaces the source aliases with build paths. Clearing
`paths` is not sufficient because workspace package exports point to source.
These tests check the declaration types. The separate module resolution suite
checks package exports.

Each fixture runs in a separate compiler process. The compiler uses the installed
`tsc`, including the version selected by CI. The runner checks the compiler's file
list and rejects library files outside the build folders or files that are not
`.d.ts` declarations. Add build paths here if a fixture needs another package.

Keep implementation checks separate with `pnpm typescript`. Do not apply consumer
augmentations to library source or suppress declaration diagnostics. The
breakpoint fixtures check custom keys, removed keys, invalid keys, and isolation
from other fixtures.
