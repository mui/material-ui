# noop-vite-sandbox

Static CSS theme proof for Material UI with `@mui/styled-engine-noop`.

This sandbox uses:

- generated `src/theme.css` for root and nested theme CSS variables
- Slider and Toolbar CSS module styles
- standalone `useColorScheme`
- `ThemeScope` for the nested static theme
- `useThemeScopeProps` to bridge scope props to a portal root

Run:

```bash
pnpm -F @mui-internal/noop-vite-sandbox dev
```

Build:

```bash
pnpm -F @mui-internal/noop-vite-sandbox build
```

After building, grep `dist/` for `@emotion/` to confirm the noop path.
