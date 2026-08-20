# Multi-theme no-op sandbox

This experiment renders real Material UI `Button` and `Switch` components while replacing
`@mui/styled-engine` with a local no-op implementation in `vite.config.ts`.

The no-op keeps component markup, utility classes, accessibility, state, and event handling, but it
does not inject Material UI's component CSS. Each theme therefore owns a complete stylesheet for
each component:

```text
src/themes/
  polished/
    tokens.css
    button.css
    switch.css
    index.css
  brutalist/
    tokens.css
    button.css
    switch.css
    index.css
```

Both themes are loaded for this docs-like scenario and scoped with `data-mui-theme`. Switching the
attribute changes the active theme without remounting the components, so their state is preserved.

Run the experiment from the repository root:

```bash
pnpm -F @mui-internal/multi-theme-vite-sandbox dev
```

Then open the URL printed by Vite. Build it with:

```bash
pnpm -F @mui-internal/multi-theme-vite-sandbox build
```
