# Styling v8 — Emotion-free path TODO

## Goal

Material UI components ship their **own base styles as plain CSS files** (`@layer mui.default`, driven by `--mui-*` CSS variables). This base layer is shared by **both** consumers:

- **Emotion users** — keep using `sx` / `styled()` for _further_ customization on top of the CSS base. **No breaking changes.** Everything that works today must keep working.
- **Non-Emotion users** — customize via plain CSS / Tailwind / CSS Modules on top of the same CSS base. The **only** opt-in requirement is aliasing `@mui/styled-engine` to `@mui/styled-engine-noop` in the bundler.

Both paths must render identical base styling. The **non-Emotion path must never import Emotion** (no `@emotion/react`, `@emotion/styled`, `@emotion/cache`, `@emotion/serialize` anywhere in its module graph).

### Breaking changes policy

- **Emotion path:** zero breaking changes. Existing `ThemeProvider`, `sx`, `styled()`, `useColorScheme`, `getInitColorSchemeScript`, custom themes — all unchanged.
- **Non-Emotion path:** users explicitly opt in by setting the engine alias. Within that path, the only intentional limitations are: `sx` is ignored (with a dev warning), and `useColorScheme` / `getInitColorSchemeScript` are not available from `@mui/material` (they pull in Emotion). All other component APIs — props, slots, `slotProps`, `className` — work identically.

---

## Architecture summary

### Two paths, not three

The architecture is two paths. `CssThemeProvider` is **removed** from the non-Emotion path. The reason: it does not deliver a theme context (no `useTheme()` despite JSDoc claiming otherwise), has no color scheme switching, no `useColorScheme()`, and no SSR flash prevention — meaning every feature it is missing would have to be rebuilt from scratch, duplicating `ThemeProvider`. The value proposition does not hold up.

| | **Emotion path** | **Non-Emotion path** |
|---|---|---|
| Engine | `@mui/styled-engine` (Emotion) | `@mui/styled-engine-noop` |
| Base styles | `Component.css` (`@layer mui.default`) | same |
| Theme provider | `ThemeProvider` | none required, or `ThemeProvider` |
| Custom theme | `createTheme()` → `ThemeProvider` | `createTheme({ cssVariables: true })` → `generateThemeCss()` → import `.css` |
| Color scheme | `useColorScheme()`, localStorage | standalone `useColorScheme` hook (no Emotion), `ColorSchemeScript` |
| Dark mode | `data-mui-color-scheme` attribute (via ThemeProvider) | same attribute, toggled by the standalone hook |
| `sx` prop | ✅ full runtime evaluation | ❌ ignored with dev warning |
| `styled()` overrides | ✅ | ❌ (use `className`, Tailwind, CSS) |
| Custom theme at runtime | `ThemeProvider theme={}` | not supported — theme is CSS-only, no runtime JS theme object |

### Non-Emotion user setup steps

Users switching to the non-Emotion path need to do the following. Several pieces already exist today (marked ✅); the rest are gaps (marked ❌).

#### Step 1 — Swap the engine (required)

Alias `@mui/styled-engine` to `@mui/styled-engine-noop` in the bundler. There are three options:

| Option | Mechanism | User impact | Status |
|---|---|---|---|
| **A** (recommended for POC) | Bundler alias | No import changes; transparent to all component imports | ✅ engine exists, ❌ no per-bundler docs |
| **B** | Separate subpath e.g. `@mui/material/css` | Requires changing every component import | ❌ not built |
| **C** | `package.json` `exports` condition | Requires bundler condition config; less universal | ❌ not built |

Option A is the only one implemented in this POC and the only one documented here until a decision is made.

#### Step 2 — Import the theme CSS (required)

```js
import '@mui/material/default-theme.css';
```

`./default-theme.css` is already a named export in `@mui/material/package.json`. ✅ The file is pre-generated and committed.

Component `.css` files (e.g. `Slider.css`) are **auto-imported** by each component JS file via a side-effect import. Users do not need to import them manually. ✅

#### Step 3 — SSR flash prevention (recommended if using SSR)

Add `<InitColorSchemeScript />` to `<head>`. This already exists, is already Emotion-free, and is already exported from `@mui/material`. It uses the same `data-mui-color-scheme` attribute and same localStorage keys (`mui-mode`, `mui-color-scheme`) as `default-theme.css`. ✅ No new component needed — it just needs to be documented as standalone.

#### Step 4 — Dark mode toggle

Set `data-mui-color-scheme="dark"` on `document.documentElement`. No React state, no provider.

The existing `useColorScheme()` from `@mui/material` reads React context set up by `ThemeProvider`. Non-Emotion users never render `ThemeProvider`, so the hook returns nothing. ❌ A standalone `useColorScheme` hook is needed — DOM-based, no context, no Emotion.

#### Step 5 — Custom theme (optional)

Generate a custom theme CSS file at build time and import it instead of `default-theme.css`:

```js
// my-theme.css — generated at build time
import './my-theme.css';
```

`buildDefaultThemeCss.mts` exists as an internal build script but is not a public API. ❌ A `generateThemeCss(themeOptions)` helper needs to be extracted and published.

`CssThemeProvider` is **not** part of any step. It is removed.

### What happens to ThemeProvider for non-Emotion users?

`ThemeProvider` is Emotion-coupled (it calls `styleFunctionSx`, `resolveTheme`, and wires `sx` runtime evaluation). Non-Emotion users do not use it. If they somehow pass a `ThemeProvider` wrapper, components will render fine — the CSS base styles are independent of the theme context — but `useColorScheme()` and `sx` will still be Emotion features.

### Single component file per component

`styled()` calls carry empty payloads: `styled('span', { name, slot })({})`. All base styling lives in a co-located `.css` file. The engine alias determines at bundle time which `styled` implementation is used — Emotion or noop. `SliderEmotion.js` is kept temporarily as a reference and will be removed once `Slider.js` is confirmed to be a full drop-in.

---

## Comparison with Mantine and Radix Themes

### Mantine

Mantine moved entirely away from CSS-in-JS in v7 (2023). All component styles are plain **CSS Modules** compiled at build time. Theme tokens are CSS custom properties injected by `MantineProvider`. The optional `@layer mantine` wrapper (`styles.layer.css`) solves the same import-order problem MUI's `@layer mui.default` solves.

**Key difference:** Mantine's CSS Modules are scoped and hashed — no stable `.Mantine*` class names as a customization surface. MUI keeps stable `.Mui*` names on purpose; `@layer` preserves this contract while solving import-order.

### Radix Themes

Radix Themes ships **all styles as static CSS files** — no runtime, no CSS-in-JS. The full token system is CSS variables defined by the `<Theme>` component's class. No `sx`, no runtime theming, fixed token space.

**Key difference:** Radix Themes is entirely static. MUI's `default-theme.css` covers the zero-runtime case, while `generateThemeCss()` + the standalone hook cover custom themes and dark mode — without any JS theming engine.

### MUI's advantage

Neither library offers both a zero-runtime path and a full `sx`/`styled()` path from the same components. MUI fills a gap neither competitor covers.

---

## TODO

### 1. Remove `CssThemeProvider` _(non-Emotion path)_

- [ ] Delete `packages/mui-material/src/styles/CssThemeProvider.tsx`.
- [ ] Delete `packages/mui-material/src/styles/CssVarsInjector.tsx` (only used by `CssThemeProvider`).
- [ ] Remove the `CssThemeProvider` export from `packages/mui-material/src/styles/index.js` and `index.d.ts`.
- [ ] Verify no other file in `@mui/material` imports `CssThemeProvider` or `CssVarsInjector`.
- [ ] Update `STYLING_V8_TODO.md` references once done.

### 2. Engine alias — documentation and options _(non-Emotion path)_

The noop engine exists and works. The gap is documentation and long-term mechanism.

- [ ] Document Option A (bundler alias) with concrete config snippets for each bundler:
  - **Vite** (`vite.config.ts`): `resolve: { alias: { '@mui/styled-engine': '@mui/styled-engine-noop' } }`
  - **webpack** (`webpack.config.js`): `resolve: { alias: { '@mui/styled-engine': require.resolve('@mui/styled-engine-noop') } }`
  - **Next.js** (`next.config.js`): `webpack(config) { config.resolve.alias['@mui/styled-engine'] = require.resolve('@mui/styled-engine-noop'); return config; }`
  - **esbuild** / Vite plugin
- [ ] Decide whether to also implement Option B (subpath `@mui/material/css/Slider`) or Option C (`exports` condition) for a future zero-config setup, or defer.
- [ ] Add an automated CI test: build the non-Emotion entry point and assert **zero** `@emotion/*` modules in the output graph.
- [ ] Audit transitive deps for accidental Emotion imports (`@mui/system`, `zero-styled`, `styleFunctionSx`, `GlobalStyles`, `keyframes`/`css`).
- [ ] Confirm `zero-styled` → `styles/styled` → `@mui/styled-engine` alias fully resolves to `-noop` on the non-Emotion path (including `css`, `keyframes`, `internal_serializeStyles`, `StyledEngineProvider`, `GlobalStyles`).

### 3. Finish the single-component model for Slider _(both paths)_

- [ ] Verify `Slider.js` (CSS base) is a full drop-in for `SliderEmotion.js` — same props, same behavior, same visual output under the Emotion engine.
- [ ] Remove `SliderEmotion.js` and `SliderEmotion.d.ts` once confirmed.
- [ ] Remove the `SliderEmotion` re-export from `index.js` / `index.d.ts`.
- [ ] Define and document the CSS file convention for component conversions:
  - `@layer mui.default` wrapper for all rules.
  - Class naming: `.MuiX-slotName`, `.MuiX-variantName`, `.Mui-stateClass`.
  - Logical properties instead of `top`/`left`/`right`/`bottom`.
  - Media queries: `forced-colors`, `pointer: coarse`, `prefers-reduced-motion`, `print-color-adjust` (not the deprecated `color-adjust`).

### 4. `sx` on the non-Emotion path _(non-Emotion path)_

The `sx` prop requires Emotion and is intentionally unsupported on the non-Emotion path.

- [ ] Improve the noop engine dev warning: point to the migration guide (use `className` / Tailwind), fire once per component type (not per instance).
- [ ] Explicitly document: `sx` is an Emotion-path feature. Non-Emotion users use `className`, CSS overrides, or Tailwind utilities.
- [ ] Decide and document whether a future lightweight `sx → inline style` adapter is in scope (best-effort, no Emotion dependency, limited feature set).

### 5. Theme delivery — non-Emotion path _(non-Emotion path)_

#### 5a. Static CSS workflow — what already exists

- ✅ `@mui/material/default-theme.css` is pre-generated and shipped (`./default-theme.css` entry in `package.json`). No work needed.
- ✅ Per-component `.css` files (e.g. `Slider.css`) are auto-imported via side-effect imports inside component JS files. Users never import them manually.
- ✅ `InitColorSchemeScript` is already Emotion-free and already exported from `@mui/material`. It uses the same `data-mui-color-scheme` attribute and same localStorage keys (`mui-mode`, `mui-color-scheme`) as `default-theme.css`. It works standalone without `ThemeProvider`.

#### 5b. What's missing

- [ ] **Standalone `useColorScheme` hook** — the only real gap for non-Emotion users who need runtime dark mode toggling. Spec:
  - Reads and writes `data-mui-color-scheme` on `document.documentElement` (same attribute as `default-theme.css` and `InitColorSchemeScript`).
  - Persists mode to localStorage under the same key as `InitColorSchemeScript` (`mui-mode`) so SSR flash prevention and the runtime hook stay in sync.
  - Supports `'light' | 'dark' | 'system'`; `'system'` subscribes to `window.matchMedia('(prefers-color-scheme: dark)')` and updates the attribute on change.
  - No Emotion, no React context provider needed — pure DOM + React state in the component that calls it.
  - Exported from a path that does not pull in `@mui/styled-engine` (e.g. `@mui/material/colorScheme`).
  - Must not be mixed in the same tree as `ThemeProvider`'s `useColorScheme` (they write the same attribute — last-write wins).
- [ ] Document `InitColorSchemeScript` as standalone (no `ThemeProvider` needed). Add usage example for the static CSS path to the docs.
- [ ] Verify `InitColorSchemeScript`'s `colorSchemeNode` prop (targets `document.documentElement` by default) works for iframe scenarios.

#### 5c. Custom theme

- [ ] Extract `buildDefaultThemeCss.mts` into a public `generateThemeCss(themeOptions: ThemeOptions): string` helper. The function should: call `createTheme({ cssVariables: true, colorSchemes: { light: true, dark: true }, ...themeOptions })`, run `styleSheetsToString(theme.generateStyleSheets())`, and return the CSS string.
- [ ] Publish the helper — decide between: a standalone import `@mui/material/generateThemeCss`, a Node-only build utility in `@mui/material/scripts`, or a CLI (`npx @mui/material generate-theme-css`). Recommend the import path for programmatic use.
- [ ] Document the custom theme workflow: `generateThemeCss(createTheme({ palette: { primary: { main: '#e91e63' } } }))` → write to `my-theme.css` → `import './my-theme.css'` instead of `default-theme.css`.

### 6. Customization contract (`@layer`) _(both paths)_

- [ ] Document the override model: unlayered user CSS (and Tailwind v4 utilities) always win over `@layer mui.default` — no specificity fight needed.
- [ ] Validate layer ordering with Tailwind v3 (`@mui/tailwind` preset) and v4 (`@mui/tailwind/v4.css`).
- [ ] Verify `slotProps.className` / `className` compose correctly with layered base styles for all converted components.
- [ ] Confirm the Emotion path: Emotion-generated class names (from `sx` / `styled()`) are not in any layer, so they also win over `@layer mui.default` automatically.

### 7. Expand component coverage _(both paths)_

- [ ] Convert `Button` as the second pilot (variants × colors × states, ripple, focus-visible).
- [ ] Capture a repeatable conversion checklist: which `styled()` patterns map to which CSS patterns, how `rgba()` runtime computation maps to channel variable expressions.
- [ ] Inventory remaining components and sequence the rollout.

### 8. Bundle size validation _(both paths, as a comparison)_

- [ ] Build two minimal Vite apps (`Slider` + `Button` via Emotion path vs non-Emotion path); report JS bundle sizes (raw + gzip).
- [ ] Add the measurement to the size-snapshot tooling so a regression (Emotion leaking into the non-Emotion path) fails CI.

### 9. Types, tests, docs _(both paths)_

- [ ] Run existing Slider unit + visual regression tests under the Emotion engine — confirm no regression vs today.
- [ ] Run the same Slider tests under the noop engine — confirm visual and behavioral parity.
- [ ] Update `index.d.ts` after `SliderEmotion` is removed.
- [ ] Docs — Emotion path: document that base styles now come from a CSS file; `sx` / `styled()` overrides still work as before and layer on top.
- [ ] Docs — non-Emotion path: setup guide covering the 5 steps in the architecture summary above (engine alias, `default-theme.css`, `InitColorSchemeScript`, standalone `useColorScheme`, `generateThemeCss()`). Cover Tailwind integration and `className`-based customization.
- [ ] Clean up experiment pages (`static-theme-playground`, `slider-*-benchmark`, `css-playground`, `emotion-playground`, `tailwind-playground`) — keep what becomes a real demo, remove the rest before productionizing.
