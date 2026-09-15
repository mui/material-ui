# Material UI themed JavaScript entries

This sandbox consumes Material UI as an application would, without manual package CSS imports or
Material UI-specific Vite aliases.

- `/` imports `Button` directly from `@mui/material/themes/polished/Button`.
- `/barrel.html` imports only `Button` from `@mui/material/themes/polished` and checks that the
  convenience barrel loads the complete Polished theme.
- `/multiple.html` imports `Button` and `Slider` from `@mui/material/themes/brutalist` and checks
  that their shared tokens and base styles occur only once.

Run `pnpm -F @mui-internal/multi-theme-entries-vite-sandbox dev` to inspect the pages or
`pnpm -F @mui-internal/multi-theme-entries-vite-sandbox build:with-deps` to build dependencies, build all three
pages, and verify their emitted CSS.

`build:with-deps` uses Lerna/Nx to build dependencies first. `build` runs only Vite and the verifier
against existing package output; the repository-wide `pnpm build` schedules dependencies itself.
This avoids concurrent rebuilds of the shared Material UI output.
