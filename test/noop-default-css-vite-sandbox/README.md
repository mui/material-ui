# Static theme with default component CSS

This sandbox exercises the low-configuration static theme path:

- generated `theme.css` supplies root and nested theme variables;
- `@mui/material/styles.css` supplies aggregate component styles;
- Material and Tailwind use the default `sm=600px` breakpoint;
- no custom-media processor or Material package resolver is required;
- `ThemeScope` applies generated theme classes and bridges nested portal scopes.

Run it with:

```bash
pnpm -F @mui-internal/noop-default-css-vite-sandbox dev
```

Build it with:

```bash
pnpm -F @mui-internal/noop-default-css-vite-sandbox build
```
