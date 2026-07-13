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
6. Toolbar source CSS breakpoint rules are processed by the app CSS pipeline.
7. Tailwind v3 can consume MUI theme tokens and the same custom breakpoint
   values through generated config/CSS.

### Components

The app intentionally exercises `Slider`, `Toolbar`, and `Dialog` so it mirrors
the static/noop sandbox scenarios with the Emotion engine still enabled.

## CSS and Tailwind

`pnpm build:css` generates:

- `src/mui.css`, which imports `@mui/material/components-source.css`, emits
  MUI breakpoint aliases with `generateBreakpointCustomMedia(theme)`, and loads
  Tailwind v3 layers.
- `tailwind.config.cjs`, which uses
  `createTailwindPreset(createTheme({ breakpoints }))` so Tailwind utilities use
  the same MUI theme tokens.

Vite runs Tailwind v3 through PostCSS and uses `postcss-custom-media` to
translate the `@custom-media` breakpoint aliases. The sandbox uses
`sm=720px` to prove both MUI component CSS and Tailwind's `sm:` utilities share
the custom value.

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
