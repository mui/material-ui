# emotion-vite-sandbox

A minimal Vite + React app that exercises the **Emotion (default) path** for
Material UI components.

## Purpose

Verifies that:

1. `@mui/styled-engine` resolves to the real Emotion-backed engine (bundle
   contains `@emotion/*`).
2. `Slider` renders correctly via `ThemeProvider` + Emotion-generated styles.
3. The `sx` prop works and applies styles at runtime via Emotion.
4. `className`-based overrides work alongside Emotion-generated class names.
5. Dark mode works via `ThemeProvider`'s `colorSchemes` / `CssVarsProvider`
   by flipping `data-mui-color-scheme="dark"` on `document.documentElement`.

### Why only Slider?

Only `Slider` is used because it is the first component converted to the
CSS-base pattern. It serves as the comparison baseline against
`test/noop-vite-sandbox` — same component, same visual output, different
engine. Bundle size delta between the two sandboxes measures the Emotion
overhead.

## Dev server

```bash
pnpm -F @mui-internal/emotion-vite-sandbox dev
```

Then open <http://localhost:5173>.

## Production build

```bash
pnpm -F @mui-internal/emotion-vite-sandbox build
```

## Verifying Emotion is bundled

After a production build, confirm `@emotion/*` runtime is present:

```bash
# Should print matches
grep -r "@emotion" test/emotion-vite-sandbox/dist/
```

## Bundle size comparison

Build both sandboxes, then compare JavaScript output sizes to measure the
Emotion overhead:

```bash
pnpm -F @mui-internal/noop-vite-sandbox build
pnpm -F @mui-internal/emotion-vite-sandbox build

# Compare JS sizes
ls -lh test/noop-vite-sandbox/dist/assets/*.js
ls -lh test/emotion-vite-sandbox/dist/assets/*.js

# Compare CSS sizes
ls -lh test/noop-vite-sandbox/dist/assets/*.css
ls -lh test/emotion-vite-sandbox/dist/assets/*.css
```
