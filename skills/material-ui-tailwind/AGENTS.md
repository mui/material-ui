# Material UI and Tailwind CSS

Version 2.0.0 (Material UI v10)

> **Version notice:** This skill targets Material UI v10 (`>=10.0.0 <11.0.0`). If you are using a different major version, verify the API details before following this guidance.

> Note: For agents and LLMs combining Material UI with Tailwind CSS. Primary source for v4: `docs/data/material/integrations/tailwindcss/tailwindcss-v4.md`. v3: `docs/data/material/integrations/interoperability/interoperability.md` (Tailwind CSS v3).

---

## Abstract

Tailwind CSS v4 integration with Material UI is built on CSS cascade layers: MUI always puts its styles in `@layer mui`, and Tailwind's `utilities` layer must come after it so utilities override MUI without `!important`. There is nothing to turn on in MUI: declare the layer order (for example `@layer theme, base, mui, components, utilities;`) at the top of the global CSS file, before `@import 'tailwindcss'`, and load that file before MUI inserts its styles. The same recipe works in the Next.js App Router, the Pages Router, and Vite. Tailwind CSS v3 needs preflight off, and its utilities aren't layered, so they override MUI without `important` or a custom injection order. Prefer v4 for new work when possible.

---

## Table of contents

1. [Tailwind CSS v4 (preferred)](#tailwind-css-v4-preferred)
2. [Next.js specifics](#nextjs-specifics)
3. [Vite and other SPAs](#vite-and-other-spas)
4. [Applying utilities to MUI components](#applying-utilities-to-mui-components)
5. [Theme tokens in Tailwind (`@theme`)](#theme-tokens-in-tailwind-theme)
6. [VS Code IntelliSense](#vs-code-intellisense)
7. [Tailwind CSS v3 (legacy)](#tailwind-css-v3-legacy)
8. [Troubleshooting](#troubleshooting)
9. [Further reading](#further-reading)

---

## Tailwind CSS v4 (preferred)

### Goals

1. Generate Tailwind with the `@layer` directive.
2. Order layers so `mui` comes before `utilities`, so Tailwind utilities override MUI predictably.

See [Tailwind CSS v4 integration—Overview](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#overview).

### Layer stack (typical)

At the top of your global CSS (example from docs):

```css
@layer theme, base, mui, components, utilities;
@import 'tailwindcss';
```

Adjust file paths to your app (`src/app/global.css`, `styles/global.css`, etc.).

A layer's position is fixed where its name first appears, so this statement must load before MUI's styles. If MUI's styles come first, `mui` becomes the lowest layer and Tailwind's `base` (preflight) overrides it.

If the app opts into MUI's sub-layers (`modularCssLayers` in the theme), put the full order in `modularCssLayers` as a string instead. See [CSS layers](https://mui.com/material-ui/customization/css-layers.md).

---

## Next.js specifics

1. Complete the [Next.js integration—App Router](https://mui.com/material-ui/integrations/nextjs.md#app-router) or [Next.js integration—Pages Router](https://mui.com/material-ui/integrations/nextjs.md#pages-router) setup first.
2. App Router: import the global CSS file (with the layer order at the top) in the root layout, alongside `AppRouterCacheProvider`.
3. Pages Router: import the global CSS file (with the layer order at the top) in `pages/_app.tsx`. `documentGetInitialProps` adds MUI's styles at the end of the `<head>`, after the app's CSS, so the order the CSS file declares applies. See [Tailwind CSS v4 integration—Next.js Pages Router](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#nextjs-pages-router).

For a concise provider checklist, see the material-ui-nextjs skill and [Next.js integration—Using other styling solutions](https://mui.com/material-ui/integrations/nextjs.md#using-other-styling-solutions).

---

## Vite and other SPAs

1. Put `@layer theme, base, mui, components, utilities;` at the top of `src/index.css`, before `@import 'tailwindcss'`.
2. Import the file in `src/main.tsx`, so that it loads before MUI inserts its styles.

See [Tailwind CSS v4 integration—Vite.js or any other SPA](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#vitejs-or-any-other-spa).

Example repo: [material-ui-vite-tailwind-ts](https://github.com/mui/material-ui/tree/master/examples/material-ui-vite-tailwind-ts).

---

## Applying utilities to MUI components

- `className`: root element of the component.
- `slotProps.{slot}.className`: interior [slots](https://mui.com/material-ui/customization/overriding-component-structure.md#interior-slots).

See [Tailwind CSS v4 integration—Usage](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#usage).

---

## Theme tokens in Tailwind (`@theme`)

To reuse MUI theme variables as Tailwind tokens, map `--mui-*` CSS variables into Tailwind's `@theme`. Minimal example (extend as needed):

```css
@theme inline {
  --color-primary: var(--mui-palette-primary-main);
  --color-primary-light: var(--mui-palette-primary-light);
  --color-primary-dark: var(--mui-palette-primary-dark);
  --color-error: var(--mui-palette-error-main);
  --color-text-primary: var(--mui-palette-text-primary);
}
```

The full token list (palette, typography, breakpoints, shadows, …) is long and maintained on the doc page. Copy the complete `@theme inline { ... }` block from [Extend Material UI classes](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#extend-material-ui-classes) when you need it all.

See [Tailwind CSS v4 integration—Extend Material UI classes](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#extend-material-ui-classes) and the linked [playground](https://play.tailwindcss.com/mh7Ym0mGff).

Requirement: MUI CSS theme variables (`cssVariables: true` in `createTheme`) so the `--mui-*` variables exist. Align with the material-ui-theming skill.

---

## VS Code IntelliSense

For `slotProps` and similar, add `tailwindCSS.experimental.classRegex` in VS Code `settings.json` as in [Tailwind CSS v4 integration—Tailwind CSS IntelliSense for VS Code](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#tailwind-css-intellisense-for-vs-code).

Snippet also lives in [reference.md](reference.md).

---

## Tailwind CSS v3 (legacy)

Use the interoperability guide, not the v4 page:

1. Install Tailwind v3 per upstream docs.
2. `corePlugins: { preflight: false }` so MUI `CssBaseline` owns base resets. Preflight isn't layered, so it would override MUI's layered styles.
3. Nothing else: v3 utilities aren't layered either, so they override MUI's styles in `@layer mui` without `important`, a custom injection order, or a portal `container`.

See [Interoperability—Tailwind CSS v3](https://mui.com/material-ui/integrations/interoperability.md#tailwind-css-v3).

---

## Troubleshooting

v4: confirm Tailwind >= v4, the layer order at the top of the CSS file, and that the file loads before MUI's styles. In DevTools cascade layers, `mui` must come before `utilities`. See [Tailwind CSS v4 integration—Troubleshooting](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md#troubleshooting).

v3: if MUI components lose their styles, check that `preflight: false` is set. See [Interoperability—Tailwind CSS v3](https://mui.com/material-ui/integrations/interoperability.md#troubleshooting).

---

## Further reading

| Topic                     | Link                                                                                                                                        |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| Tailwind CSS v4 + MUI     | [Tailwind CSS v4 integration](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4.md)                                       |
| CSS layers (MUI concepts) | [CSS Layers](https://mui.com/material-ui/customization/css-layers.md)                                                                       |
| Interior slots            | [Overriding component structure—Interior slots](https://mui.com/material-ui/customization/overriding-component-structure.md#interior-slots) |
| Tailwind v3 + MUI         | [Interoperability—Tailwind CSS v3](https://mui.com/material-ui/integrations/interoperability.md#tailwind-css-v3)                            |
