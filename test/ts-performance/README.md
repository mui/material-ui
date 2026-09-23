# TypeScript theme performance tests

This suite uses workspace linking to resolve build folders and guards the
`optimizedTheme` type feature (`TypeFeatures` augmentation in `@mui/material/styles`).

`theme.tsx` is a shared fixture that creates a theme customizing every component.
Two TypeScript projects check it:

- `tsconfig.strict.json` (`strict/`) does not enable the flag. It asserts with
  `@ts-expect-error` that `theme.components` keeps the strict types by default,
  and reports the baseline instantiation count (>100k).
- `tsconfig.optimized.json` (`optimized/`) enables the flag, imports from the root
  barrel, and selectively re-enables `MuiButton` type safety with `satisfies` at
  the callsite. The instantiation count must stay below the limit in `test.mjs`,
  and an `@ts-expect-error` fixture asserts that the local check rejects invalid
  values.

Three additional projects compare identical two-component themes with the flag
enabled:

- `tsconfig.satisfies-loose.json` establishes the loose optimized baseline.
- `tsconfig.satisfies-pick.json` checks the components with a selective
  `Pick<Components<Theme>, ...>` and must stay below the optimized limit.
- `tsconfig.satisfies-full.json` measures the same theme with
  `Components<Theme>` and must also stay below the optimized limit. This is the
  form recommended in the guide because it does not repeat the customized
  component names.

You can only run `pnpm test:performance` after the project has been built with
`pnpm release:build` (wired in CI after the build step). Run locally with:

```bash
pnpm -F "@mui/material..." build
pnpm -F @mui-internal/test-ts-performance test:performance
```
