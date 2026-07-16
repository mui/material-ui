# CssThemeProvider default CSS sandbox

This Vite app exercises the low-configuration no-Emotion path:

- components use the standard `@mui/material/*` exports;
- the app imports `@mui/material/styles.css` once;
- `styles.css` contains all component styles with MUI's default breakpoints;
- `CssThemeProvider` supplies runtime CSS variables and nested theme scopes;
- Tailwind v4 consumes tokens and default breakpoints generated from the same default theme;
- no custom-media processor or Material CSS resolver is required.

Run it with:

```bash
pnpm -F @mui-internal/css-theme-provider-default-css-vite-sandbox dev
```

Build it with:

```bash
pnpm -F @mui-internal/css-theme-provider-default-css-vite-sandbox build
```
