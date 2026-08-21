# ts-performance

Guards the TypeScript instantiation count of the `optimizedTheme` type feature
(`TypeFeatures` augmentation in `@mui/material/styles`).

The program in `src/` enables the flag, creates a theme that customizes every component,
imports from the root barrel, and selectively re-enables type safety for `MuiButton`.
Without the flag the same program produces >100k type instantiations; with the flag
it must stay below the limit defined in `instantiations.test.mjs`.

The test resolves `@mui/material` to the build output, so it must run after
`pnpm release:build` (wired in CI as `pnpm -r run release:test`). Run locally with:

```bash
pnpm --filter @mui/material... build
pnpm run release:test
```
