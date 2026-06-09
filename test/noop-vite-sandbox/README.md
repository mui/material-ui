# noop-vite-sandbox

A minimal Vite + React app that exercises the **non-Emotion (CSS-only) path** for
Material UI components.

## Purpose

Verifies that:

1. `@mui/styled-engine` can be aliased to `@mui/styled-engine-noop` with zero
   Emotion in the output bundle.
2. `Slider` renders correctly using `Slider.css` + `default-theme.css` (CSS
   variables, no runtime theming).
3. The `sx` prop fires a dev-only `console.error` and is otherwise ignored (open
   the browser DevTools console to see it).
4. `className`-based overrides beat `@layer mui.default` without any
   `!important`.
5. Dark mode works by flipping `data-mui-color-scheme="dark"` on
   `document.documentElement` — no provider, no React context.

### Why only Slider?

Only components that have been converted to the CSS-base pattern are safe to use
here. Non-converted components (e.g. `Box`, `Typography`) still contain
theme-dependent style functions that call `useTheme()` at render time. Without a
`ThemeProvider` in the tree, `useTheme()` returns `undefined` and the first
`theme.palette.*` access throws, crashing the render. As more components are
converted to CSS base styles, they can be added to this sandbox.

## Dev server

```bash
pnpm -F @mui-internal/noop-vite-sandbox dev
```

Then open <http://localhost:5173>.

## Production build

```bash
pnpm -F @mui-internal/noop-vite-sandbox build
```

Expected output (approximate):

```
dist/assets/index-*.css   ~32 kB  (default-theme.css + Slider.css)
dist/assets/index-*.js   ~280 kB  (~90 kB gzip)
```

## Verifying zero Emotion

After a production build, check that no `@emotion/*` runtime is bundled:

```bash
# Should print nothing
grep -r "@emotion/react\|@emotion/styled\|@emotion/cache\|EmotionCacheContext\|insertStyles\|createCache" \
  test/noop-vite-sandbox/dist/
```

The string `__emotion_real` appears once — it is a property-name guard inside
`@mui/system/createStyled` (`style.__emotion_real === style`), not an Emotion
package import. It is safe to ignore.

## How the engine alias works

`vite.config.ts` uses an **array-form alias** (order matters):

```ts
alias: [
  // 1. Exact CSS path must come before the package catch-all
  { find: '@mui/material/default-theme.css', replacement: '…/packages/mui-material/default-theme.css' },
  // 2. Package source (monorepo)
  { find: '@mui/material', replacement: '…/packages/mui-material/src' },
  // 3. THE KEY SWAP — replaces Emotion with the zero-runtime noop engine
  { find: '@mui/styled-engine', replacement: '…/packages/mui-styled-engine-noop/src' },
  // 4. Other @mui/* from monorepo source
  …
]
```

This mirrors exactly what a non-Emotion user would add to their own
`vite.config.ts`:

```ts
// User's project vite.config.ts
resolve: {
  alias: {
    '@mui/styled-engine': '@mui/styled-engine-noop',
  },
},
```

## Bundle size comparison

Build all three sandboxes, then compare JS output sizes to measure the overhead
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

This sandbox maps to **§8 (Bundle size validation)** in `STYLING_V8_TODO.md`.
It serves as both a live demo of the non-Emotion path and the harness for
measuring JS bundle deltas between the Emotion and noop engines.
