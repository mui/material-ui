# css-theme-provider-vite-sandbox

A minimal Vite + React app that exercises **Path A (Mantine analogy)** for
Material UI components — noop engine + runtime `CssThemeProvider`.

## Purpose

Verifies that:

1. `@mui/styled-engine` aliased to `@mui/styled-engine-noop` — zero Emotion in
   the output bundle.
2. `CssThemeProvider` injects `--mui-*` CSS variables at runtime without any
   `@emotion/*` dependency.
3. `Slider` renders correctly using generated source CSS + runtime CSS vars from
   `CssThemeProvider`.
4. The `sx` prop fires a dev-only `console.error` and is otherwise ignored.
5. `className`-based overrides beat `@layer mui` without `!important`.
6. Dark mode works via `CssThemeProvider` by flipping `data-mui-color-scheme`
   on `document.documentElement`.
7. `useTheme()` returns live JavaScript theme values (breakpoints, spacing, etc.).
8. Generated source CSS is imported by the app and translated by the app CSS
   pipeline.

## How this differs from the other sandboxes

|                   | noop-vite-sandbox            | css-theme-provider-vite-sandbox | emotion-vite-sandbox      |
| :---------------- | :--------------------------- | :------------------------------ | :------------------------ |
| Engine            | noop                         | noop                            | Emotion                   |
| Theme delivery    | `default-theme.css` (static) | `CssThemeProvider` (runtime)    | `ThemeProvider` (runtime) |
| Emotion in bundle | ❌                           | ❌                              | ✅                        |
| `sx` prop         | ignored + warning            | ignored + warning               | ✅ works                  |
| `useTheme()`      | ❌ no provider               | ✅                              | ✅                        |
| Analogy           | Radix Themes                 | Mantine                         | MUI default               |

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
pnpm -F @mui-internal/noop-vite-sandbox build
pnpm -F @mui-internal/css-theme-provider-vite-sandbox build
pnpm -F @mui-internal/emotion-vite-sandbox build

# Compare JS sizes
ls -lh test/noop-vite-sandbox/dist/assets/*.js
ls -lh test/css-theme-provider-vite-sandbox/dist/assets/*.js
ls -lh test/emotion-vite-sandbox/dist/assets/*.js

# Compare CSS sizes
ls -lh test/noop-vite-sandbox/dist/assets/*.css
ls -lh test/css-theme-provider-vite-sandbox/dist/assets/*.css
ls -lh test/emotion-vite-sandbox/dist/assets/*.css
```

## Relation to the TODO

This sandbox maps to **Path A — CssThemeProvider** in `STYLING_V8_TODO.md`.
