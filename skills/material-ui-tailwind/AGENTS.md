# Material UI and Tailwind CSS

Version 1.0.0

> Note: For agents and LLMs combining Material UI with Tailwind CSS. Primary source for v4: `docs/data/material/integrations/tailwindcss/tailwindcss-v4.md`. v3: `docs/data/material/integrations/interoperability/interoperability.md` (Tailwind CSS v3).

---

## Abstract

Tailwind CSS v4 integration with Material UI is built on CSS cascade layers: MUI emits styles inside `@layer mui`, and Tailwind's `utilities` layer must come after so utilities can override without `!important`. Enable MUI's layer mode with `enableCssLayer: true` (Next.js via `AppRouterCacheProvider` / shared `createEmotionCache`) or `StyledEngineProvider` with `enableCssLayer` (Vite and other SPAs). Declare layer order (for example `@layer theme, base, mui, components, utilities`) before `@import 'tailwindcss'` (or inject the same string with `GlobalStyles` where the docs show). Tailwind CSS v3 uses a different recipe (preflight off, `important`, `StyledEngineProvider` with `injectFirst`, portal `container`). Prefer v4 for new work when possible.

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

See [Tailwind CSS v4 integrationâ€”Overview](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/#overview).

### Layer stack (typical)

At the top of your global CSS (example from docs):

```css
@layer theme, base, mui, components, utilities;
@import 'tailwindcss';
```

Adjust file paths to your app (`src/app/global.css`, `styles/global.css`, etc.).

---

## Next.js specifics

1. Complete the [Next.js integrationâ€”App Router](https://mui.com/material-ui/integrations/nextjs/#app-router) or [Next.js integrationâ€”Pages Router](https://mui.com/material-ui/integrations/nextjs/#pages-router) setup first.
2. App Router: `<AppRouterCacheProvider options={{ enableCssLayer: true }}>` in the root layout. `suppressHydrationWarning` on `<html>` appears in the doc example when relevant.
3. Pages Router: shared `createEmotionCache({ enableCssLayer: true })` from `@mui/material-nextjs`, passed through `documentGetInitialProps`; `AppCacheProvider` uses the same cache; layer order via `GlobalStyles` as the first child inside `AppCacheProvider`. See [Tailwind CSS v4 integrationâ€”Next.js Pages Router](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/#nextjs-pages-router).

For a concise provider checklist, see the material-ui-nextjs skill and [Next.js integrationâ€”Using other styling solutions](https://mui.com/material-ui/integrations/nextjs/#using-other-styling-solutions).

---

## Vite and other SPAs

1. `StyledEngineProvider` with `enableCssLayer`.
2. `GlobalStyles` injecting `@layer theme, base, mui, components, utilities;` before the app tree.

See [Tailwind CSS v4 integrationâ€”Vite.js or any other SPA](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/#vitejs-or-any-other-spa).

Example repo: [material-ui-vite-tailwind-ts](https://github.com/mui/material-ui/tree/master/examples/material-ui-vite-tailwind-ts).

---

## Applying utilities to MUI components

- `className`: root element of the component.
- `slotProps.{slot}.className`: interior [slots](https://mui.com/material-ui/customization/overriding-component-structure/#interior-slots).

See [Tailwind CSS v4 integrationâ€”Usage](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/#usage).

---

## Theme tokens in Tailwind (`@theme`)

To reuse MUI theme variables (for example `--mui-palette-primary-main`, typography, breakpoints) as Tailwind tokens, copy the `@theme inline { ... }` block from the docs into your CSS. It is long and maintained on the doc page; do not hand-roll partial lists unless you know exactly which tokens you need.

See [Tailwind CSS v4 integrationâ€”Extend Material UI classes](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/#extend-material-ui-classes) and the linked [playground](https://play.tailwindcss.com/mh7Ym0mGff).

Requirement: MUI CSS theme variables (`cssVariables: true` in `createTheme`) so the `--mui-*` variables exist. Align with the material-ui-theming skill.

---

## VS Code IntelliSense

For `slotProps` and similar, add `tailwindCSS.experimental.classRegex` in VS Code `settings.json` as in [Tailwind CSS v4 integrationâ€”Tailwind CSS IntelliSense for VS Code](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/#tailwind-css-intellisense-for-vs-code).

Snippet also lives in [reference.md](reference.md).

---

## Tailwind CSS v3 (legacy)

Use the interoperability guide, not the v4 page:

1. Install Tailwind v3 per upstream docs.
2. `corePlugins: { preflight: false }` so MUI `CssBaseline` owns base resets.
3. `important: '#__next'` or `'#root'`; App Router may need `id="__next"` on `<body>` manually.
4. `StyledEngineProvider` with `injectFirst` (or Emotion `prepend: true` cache) for injection order.
5. Theme `defaultProps` `container` on `Modal`, `Dialog`, `Popover`, `Popper` to the same root as `important`.

See [Interoperabilityâ€”Tailwind CSS v3](https://mui.com/material-ui/integrations/interoperability/#tailwind-css-v3) and [Interoperabilityâ€”Troubleshooting](https://mui.com/material-ui/integrations/interoperability/#troubleshooting) (table of root IDs).

---

## Troubleshooting

v4: confirm Tailwind >= v4, layer order, and DevTools cascade layers (`mui` before `utilities`). See [Tailwind CSS v4 integrationâ€”Troubleshooting](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/#troubleshooting).

v3: verify `important` selector matches root `id`, `preflight: false`, and `injectFirst`. See the interoperability Troubleshooting subsection linked above.

---

## Further reading

| Topic                     | Link                                                                                                                                      |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| Tailwind CSS v4 + MUI     | [Tailwind CSS v4 integration](https://mui.com/material-ui/integrations/tailwindcss/tailwindcss-v4/)                                       |
| CSS layers (MUI concepts) | [CSS Layers](https://mui.com/material-ui/customization/css-layers/)                                                                       |
| Interior slots            | [Overriding component structureâ€”Interior slots](https://mui.com/material-ui/customization/overriding-component-structure/#interior-slots) |
| Tailwind v3 + MUI         | [Interoperabilityâ€”Tailwind CSS v3](https://mui.com/material-ui/integrations/interoperability/#tailwind-css-v3)                            |
