# noop-vite-sandbox

Static CSS theme proof for Material UI with `@mui/styled-engine-noop`.

This sandbox uses:

- generated `src/theme.css` for root and nested theme CSS variables
- per-component CSS Modules from the parallel Material package build
- generated `src/tailwind.css` for Tailwind v4 utilities
- generated `src/tailwind-theme.css` for Tailwind v4 tokens derived from the
  MUI theme
- standalone `useColorScheme`
- `ThemeScope` for the nested static theme
- `useThemeScopeProps` to bridge scope props to a portal root

## CSS and Tailwind

`pnpm build:theme-css` generates all static CSS used by the sandbox:

- `src/theme.css` from `generateThemeCss(...)`, including root and nested theme
  scopes.
- `src/tailwind.css`, which loads only Tailwind v4 theme and utility layers.
- `src/tailwind-theme.css` from `generateTailwindThemeCss(theme)`, so Tailwind v4
  utilities use MUI palette, radius, shadow, typography, spacing, and breakpoint
  tokens.

The Material Vite adapters select the parallel CSS Modules package and inject
the theme's breakpoint aliases before Lightning CSS translates them. The app
uses `@mui/styled-engine-noop`, so `sx` is intentionally ignored and styling
comes from generated CSS, component CSS, plain classes, and Tailwind.
The sandbox uses `sm=720px` to prove the MUI component CSS and Tailwind's `sm:`
utilities share the custom value.

Run:

```bash
pnpm -F @mui-internal/noop-vite-sandbox dev
```

Build:

```bash
pnpm -F @mui-internal/noop-vite-sandbox build
```

After building, grep `dist/` for `@emotion/` to confirm the noop path.
