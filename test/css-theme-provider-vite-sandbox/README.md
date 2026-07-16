# css-theme-provider-vite-sandbox

A minimal Vite + React app that exercises **Path A (Mantine analogy)** for
Material UI components — noop engine + runtime `CssThemeProvider`.

## Purpose

Verifies that:

1. `@mui/styled-engine` aliased to `@mui/styled-engine-noop` — zero Emotion in
   the output bundle.
2. `CssThemeProvider` injects `--mui-*` CSS variables at runtime without any
   `@emotion/*` dependency.
3. `Slider` renders using component CSS Modules + runtime CSS vars from
   `CssThemeProvider`.
4. The `sx` prop fires a dev-only `console.error` and is otherwise ignored.
5. `className`-based overrides beat `@layer mui` without `!important`.
6. Dark mode works via `CssThemeProvider` by flipping `data-mui-color-scheme`
   on `document.documentElement`.
7. `useTheme()` returns live JavaScript theme values (breakpoints, spacing, etc.).
8. The Material CSS tools resolver selects components that import their CSS
   Modules.
9. The Material Vite adapter injects the app theme's breakpoint aliases before
   Lightning CSS translates them.
10. `pnpm build:css` generates Tailwind v4 tokens from the app theme.
11. Tailwind v4 consumes the generated MUI tokens and uses the custom
    `sm=720px` breakpoint.

The relevant Vite setup is:

```ts
plugins: [
  muiMaterialCssModules(),
  muiCustomMedia({ theme }),
  react(),
  tailwindcss(),
],
```

The app does not import `@mui/material/styles.css`; doing so would duplicate
the component styles imported by the parallel build.

## How this differs from the other sandboxes

|                   | default-css sandbox | css-theme-provider sandbox | emotion sandbox       |
| :---------------- | :------------------ | :------------------------- | :-------------------- |
| Engine            | noop                | noop                       | Emotion               |
| Component CSS     | aggregate file      | per-component modules      | per-component modules |
| Breakpoints       | default, prebuilt   | custom, Lightning CSS      | custom, PostCSS       |
| Theme delivery    | runtime provider    | runtime provider           | runtime provider      |
| Emotion in bundle | no                  | no                         | yes                   |

## Dev server

```bash
pnpm -F @mui-internal/css-theme-provider-vite-sandbox dev
```

Then open <http://localhost:5173>.

## Production build

```bash
pnpm -F @mui-internal/css-theme-provider-vite-sandbox build
```

## Verifying zero Emotion

After a production build, check that no `@emotion/*` runtime is bundled:

```bash
# Should print nothing
grep -r "@emotion/react\|@emotion/styled\|@emotion/cache\|EmotionCacheContext\|insertStyles\|createCache" \
  test/css-theme-provider-vite-sandbox/dist/
```

## Bundle size comparison

Build all three sandboxes, then compare JavaScript output sizes to measure the overhead
of each approach:

```bash
pnpm -F @mui-internal/css-theme-provider-default-css-vite-sandbox build
pnpm -F @mui-internal/css-theme-provider-vite-sandbox build
pnpm -F @mui-internal/emotion-vite-sandbox build

# Compare JS sizes
ls -lh test/css-theme-provider-default-css-vite-sandbox/dist/assets/*.js
ls -lh test/css-theme-provider-vite-sandbox/dist/assets/*.js
ls -lh test/emotion-vite-sandbox/dist/assets/*.js

# Compare CSS sizes
ls -lh test/css-theme-provider-default-css-vite-sandbox/dist/assets/*.css
ls -lh test/css-theme-provider-vite-sandbox/dist/assets/*.css
ls -lh test/emotion-vite-sandbox/dist/assets/*.css
```

## Relation to the TODO

This sandbox maps to **Path A — CssThemeProvider** in `STYLING_V8_TODO.md`.
