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
6. The Material CSS tools resolver selects components that import their CSS
   Modules.
7. The Material PostCSS adapter injects the app theme's breakpoint aliases,
   and `postcss-custom-media` translates them.
8. `pnpm build:css` generates a Tailwind v3 config from the app theme.
9. Tailwind v3 consumes the generated MUI preset and uses the custom
   `sm=720px` breakpoint.

The relevant Vite setup is:

```ts
plugins: [muiMaterialCssModules(), react()],
css: {
  postcss: {
    plugins: [muiCustomMedia({ theme }), tailwindcss(), postcssCustomMedia()],
  },
},
```

The app does not import `@mui/material/styles.css`; doing so would duplicate
the component styles imported by the parallel build.

### Components

The app intentionally exercises `Slider`, `Toolbar`, and `Dialog` so it mirrors
the non-Emotion sandbox scenarios with the Emotion engine still enabled.

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

This sandbox maps to **§8 (Bundle size validation)** in `STYLING_V8_TODO.md`.
It is the Emotion-path counterpart to `test/noop-vite-sandbox`, used to
measure the JavaScript bundle delta between the two engines.
