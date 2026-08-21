# Multi-theme no-op sandbox

This experiment renders real Material UI `Button` and `Switch` components while replacing
`@mui/styled-engine` with a local no-op implementation in `vite.config.ts`.

The no-op keeps component markup, utility classes, accessibility, state, and event handling, but it
does not inject Material UI's component CSS. Each theme therefore owns a complete stylesheet for
each component:

```text
src/reset.css       # browser normalization only; no component selectors
src/tokens.css      # one foundational palette, spacing, density, typography, and motion contract
src/app.css         # experiment shell; no Material UI component selectors
src/themes/
  polished/
    button.css
    switch.css
    index.css
  brutalist/
    button.css
    switch.css
    index.css
```

Both themes are loaded for this docs-like scenario and scoped with `data-mui-theme`. Switching the
attribute changes the active theme without remounting the components, so their state is preserved.

## How it works

- `vite.config.ts` aliases `@mui/styled-engine` to `src/noopStyledEngine.tsx`.
- `reset.css` contains only rules that cannot vary by component theme, such as `box-sizing`, body
  margin normalization, and inherited form-control fonts.
- Both themes consume the same `tokens.css` values. They create different appearances by selecting,
  combining, and applying those foundational tokens differently rather than redefining them.
- Every theme component file includes its own structure, dimensions, states, and visual skin. The
  duplication is intentional so one theme never has to undo another shared component base.
- This experiment loads both scoped theme indexes. A normal single-theme build should import only
  the selected theme; scoped multi-theme output is for docs and runtime switching.

Run the experiment from the repository root:

```bash
pnpm -F @mui-internal/multi-theme-vite-sandbox dev
```

Then open the URL printed by Vite. Build it with:

```bash
pnpm -F @mui-internal/multi-theme-vite-sandbox build
```
