# Styling v8 — Emotion-free path TODO

## Goal

Material UI components ship their **own base styles as plain CSS files** (`@layer mui.default`,
driven by `--mui-*` CSS variables). This base layer is shared by all consumers. Users who want
Emotion (`sx`, `styled()`) keep using it without any changes. Users who don't want Emotion
swap the engine and use one of two theme delivery paths.

---

## Path overview

| | **Emotion path** | **Path A — CssThemeProvider** | **Path B — Static CSS** |
|---|---|---|---|
| Engine | `@mui/styled-engine` (Emotion) | `@mui/styled-engine-noop` | `@mui/styled-engine-noop` |
| Base styles | `Component.css` | same | same |
| Theme delivery | `ThemeProvider` (runtime) | `CssThemeProvider` (runtime) | `default-theme.css` (build-time) |
| Custom theme | `createTheme()` → `ThemeProvider` | `createTheme({ cssVariables: true })` → `CssThemeProvider` | `generateThemeCss(createTheme(...))` → import `.css` |
| `useColorScheme()` | ✅ via `ThemeProvider` | ✅ via `CssThemeProvider` | ✅ standalone hook (no provider) |
| SSR flash prevention | ✅ `InitColorSchemeScript` | ✅ `InitColorSchemeScript` | ✅ `InitColorSchemeScript` |
| `useTheme()` (JS values) | ✅ | ✅ | ❌ no theme context |
| `sx` prop | ✅ | ❌ ignored + dev warning | ❌ ignored + dev warning |
| `styled()` overrides | ✅ | ❌ | ❌ |
| Analogy | — | Mantine | Radix Themes |

**Breaking changes policy:** The Emotion path has zero breaking changes. Paths A and B are
opt-in via the engine alias. `sx` is intentionally unsupported on both non-Emotion paths.

---

## Shared prerequisite — Component CSS conversion _(blocks both non-Emotion paths)_

Both non-Emotion paths require components to have their styles extracted to co-located `.css`
files. Without this, components have no base styles on the noop engine. This is the largest
body of work and is independent of the provider/static choice.

### The pattern (established by Slider)

- `Slider.js` — `styled()` calls with empty payloads: `styled('span', { name, slot })({})`.
  The engine alias determines at bundle time whether this is Emotion or noop.
- `Slider.css` — all base styles inside `@layer mui.default`, using `--mui-*` CSS variables.
  Auto-imported via a side-effect import at the top of `Slider.js`. Users never import it manually.
- Both Emotion and noop users get the same visual output from the same component file.

### CSS file convention

- `@layer mui.default` wrapper for all rules.
- Class naming: `.MuiX-slotName`, `.MuiX-variantName`, `.Mui-stateClass`.
- Logical properties (`inset-block-start`, `inset-inline-start`) instead of `top`/`left`/`right`/`bottom`.
- Media queries: `forced-colors`, `pointer: coarse`, `prefers-reduced-motion`.
- Print: `print-color-adjust: exact` (not the deprecated `color-adjust`).

### TODOs — component conversion

- [ ] Verify `Slider.js` is a full drop-in for `SliderEmotion.js` under the Emotion engine.
- [ ] Remove `SliderEmotion.js`, `SliderEmotion.d.ts`, and the `SliderEmotion` re-exports once confirmed.
- [ ] Convert `Button` as the second pilot (variants × colors × states, ripple, focus-visible).
- [ ] Capture a repeatable conversion checklist from the Slider + Button work.
- [ ] Inventory remaining components and sequence the rollout.

---

## Shared prerequisite — Engine alias _(blocks both non-Emotion paths)_

Aliasing `@mui/styled-engine` to `@mui/styled-engine-noop` is the single opt-in step for both
non-Emotion paths. The noop engine exists and works. The gap is documentation.

### TODOs — engine alias

- [ ] Document per-bundler alias config (Vite, webpack, Next.js, esbuild).
- [ ] Decide whether to also offer Option B (subpath e.g. `@mui/material/css/Slider`) or
  Option C (`exports` condition) for zero-config setup, or defer.
- [ ] Add a CI test: build the non-Emotion entry point, assert **zero** `@emotion/*` modules.
- [ ] Improve the noop engine dev warning: link to the migration guide, fire once per
  component type rather than per instance.

### Done — engine alias

- ✅ `@mui/styled-engine-noop` — zero-runtime passthrough, warns on `sx`, stubs `keyframes`/`css`.
- ✅ Confirmed: production build of `test/noop-vite-sandbox` contains zero `@emotion/*` runtime.
  (The `__emotion_real` string in the output is a property-name guard in `@mui/system/createStyled`,
  not an import.)
- ✅ Two gotchas documented for Vite: `process.env.NODE_ENV` must be defined via `vite.config.ts`
  `define`; a JSX-in-`.js` transform plugin is required because MUI source uses `.js` + JSX.

---

## Path A — CssThemeProvider _(non-Emotion, runtime)_

The Mantine analogy. Users write `createTheme()` in JS, pass it to a provider. The provider
renders CSS variables into the document at runtime — no Emotion, no build step. API-identical
to `ThemeProvider` minus `sx` and `styled()`.

### What users need to do (Path A)

```tsx
// 1. Alias engine in bundler config (see §Engine alias above)

// 2. Create a theme (must use cssVariables: true)
import { createTheme } from '@mui/material/styles';
const theme = createTheme({ cssVariables: true, colorSchemes: { light: true, dark: true } });

// 3. Wrap the app — no ThemeProvider, no Emotion
import { CssThemeProvider } from '@mui/material/styles';
<CssThemeProvider theme={theme}>
  <App />
</CssThemeProvider>

// 4. SSR flash prevention (Next.js / Remix — put in <head>)
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
<InitColorSchemeScript />

// 5. Dark mode toggle
import { useColorScheme } from '@mui/material/styles'; // from CssThemeProvider context
const { mode, setMode } = useColorScheme();
setMode('dark');

// 6. JS theme values (breakpoints, transitions, spacing)
import { useTheme } from '@mui/material/styles';
const theme = useTheme(); // theme.breakpoints.up('md'), etc.
```

### TODOs — Path A

- [ ] Build `CssThemeProvider` as a real provider:
  - Provide a theme context so `useTheme()` works (currently missing despite JSDoc claiming otherwise).
  - Wire `useColorScheme()` — manage mode state, read/write `data-mui-color-scheme` attribute,
    persist to localStorage, subscribe to `prefers-color-scheme` for `system` mode.
  - `disableTransitionOnChange` to suppress CSS transitions during color scheme switch.
  - `defaultMode` prop (`'light' | 'dark' | 'system'`).
- [ ] Fix `CssVarsInjector` for nested providers: use scoped injection (not a global
  `<style id="mui-css-vars">`) so two `CssThemeProvider` instances don't overwrite each other.
- [ ] Verify SSR: `CssVarsInjector` renders a `<style>` tag server-side; confirm no FOUC in
  Next.js App Router and Pages Router.
- [ ] Verify `documentNode` (iframe support).

### Done — Path A

- ✅ `CssVarsInjector` — injects CSS vars into document; renders `<style>` server-side, uses
  `useInsertionEffect` client-side.
- ✅ `RtlProvider` and `DefaultPropsProvider` wired in the current stub.
- ✅ `CssThemeProvider` validates that the theme was created with `cssVariables: true`.

---

## Path B — Static CSS _(non-Emotion, build-time)_

The Radix Themes analogy. A pre-generated `.css` file contains all `--mui-*` CSS variables for
light and dark. Import it once. No provider, no JS runtime cost.

### What users need to do (Path B)

```tsx
// 1. Alias engine in bundler config (see §Engine alias above)

// 2. Import the pre-generated theme CSS once at the app root
import '@mui/material/default-theme.css';
// (or a custom-generated file — see §Custom theme below)

// 3. SSR flash prevention (put in <head> before React hydrates)
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
<InitColorSchemeScript />
// In a Vite SPA (no SSR), extract the script text to paste into index.html directly.
// See §getInitColorSchemeScriptText below.

// 4. Dark mode toggle — standalone hook, no provider
import { useColorScheme } from '@mui/material/colorScheme'; // Emotion-free subpath
const { mode, setMode } = useColorScheme();
setMode('dark'); // writes localStorage + data-mui-color-scheme attribute

// 5. (Optional) custom theme — generate CSS at build time
import { generateThemeCss } from '@mui/material/generateThemeCss';
import { createTheme } from '@mui/material/styles';
// In a build script:
const css = generateThemeCss(createTheme({ palette: { primary: { main: '#e91e63' } } }));
fs.writeFileSync('my-theme.css', css);
// Then import './my-theme.css' instead of default-theme.css
```

### TODOs — Path B

- [ ] **Standalone `useColorScheme` hook** (`@mui/material/colorScheme` — new Emotion-free subpath):
  - Reads/writes `data-mui-color-scheme` on `document.documentElement`.
  - Persists mode under the same localStorage key as `InitColorSchemeScript` (`mui-mode`).
  - Supports `'light' | 'dark' | 'system'`; `'system'` subscribes to
    `window.matchMedia('(prefers-color-scheme: dark)')`.
  - No Emotion, no React context provider.
  - Must not be mixed with `ThemeProvider`'s `useColorScheme` in the same tree.
- [ ] **`getInitColorSchemeScriptText(props?)`** — named export from
  `@mui/material/InitColorSchemeScript` that returns the inline script as a string, so Vite SPAs
  can paste it directly into `index.html` without a React wrapper.
- [ ] **`generateThemeCss(options: ThemeOptions): string`** — thin wrapper over
  `createTheme` + `styleSheetsToString(theme.generateStyleSheets())`. Forces
  `colorSchemeSelector: 'data-mui-color-scheme'` so the output matches what
  `InitColorSchemeScript` and the standalone hook expect. Published at
  `@mui/material/generateThemeCss`.
- [ ] Refactor `buildDefaultThemeCss.mts` to call `generateThemeCss({})` internally.
- [ ] Document: CSS variable overrides (no build step needed for simple changes like
  `--mui-palette-primary-main: #e91e63` in plain CSS).
- [ ] Document `InitColorSchemeScript` as standalone (no `ThemeProvider` needed).

### Done — Path B

- ✅ `@mui/material/default-theme.css` — pre-generated, shipped, named `exports` entry.
- ✅ `InitColorSchemeScript` — Emotion-free, same attribute + localStorage keys as
  `default-theme.css`.
- ✅ `buildDefaultThemeCss.mts` — internal build script that generates `default-theme.css`.
- ✅ Component `.css` files auto-imported by component JS files (no manual import needed).
- ✅ `test/noop-vite-sandbox` — Slider rendered on Path B with dark mode toggle (DOM-only).

---

## Comparison with Mantine and Radix Themes

### Mantine → Path A (CssThemeProvider)

Mantine dropped CSS-in-JS entirely in v7 and replaced it with CSS Modules + a runtime provider
(`MantineProvider`) that injects CSS variables. Users still call `createTheme()` in JS and pass
it as a prop. No build step for theming.

**Key differences from MUI Path A:**
- Mantine uses hashed CSS Module class names — no stable `.Mantine*` customization surface.
  MUI keeps stable `.Mui*` class names; `@layer` solves the specificity problem without
  sacrificing the class-name contract.
- Mantine dropped CSS-in-JS with no compatibility layer. MUI's Path A co-exists with the
  Emotion path — users migrate at their own pace.

### Radix Themes → Path B (Static CSS)

Radix Themes ships all styles as static CSS files. Theme tokens are CSS variables. No runtime,
no JS theming engine. Customization is CSS variable overrides or a palette generation tool.

**Key differences from MUI Path B:**
- Radix's token space is fixed (12-step Radix Colors scales, ~6 accent choices). MUI has
  ~400 computed variables — palette channels, alpha overlays, typography scale — derived from
  `createTheme()`. The build-time `generateThemeCss()` fills this gap.
- Radix has no `sx` on any path. MUI's Path B coexists with the Emotion path.

### MUI's advantage over both

Neither library offers both a zero-runtime path and a full `sx`/`styled()` path from the same
component files. MUI will be the first to do this.

---

## Shared — Customization contract (`@layer`)

- [ ] Document the override model: unlayered user CSS (and Tailwind v4 utilities) always win
  over `@layer mui.default` — no specificity fight, no `!important`.
- [ ] Validate layer ordering with Tailwind v3 (`@mui/tailwind` preset) and v4 (`@mui/tailwind/v4.css`).
- [ ] Verify `slotProps.className` / `className` compose correctly with layered base styles for
  all converted components.
- [ ] Confirm: Emotion-generated class names (from `sx` / `styled()`) are not in any layer, so
  they also win over `@layer mui.default` automatically.

---

## Shared — Bundle size validation

- ✅ `test/noop-vite-sandbox` — Slider, Path B. Baseline: **276 KB raw / 88 KB gzip JS**, 32 KB CSS.
- [ ] Build `test/emotion-vite-sandbox` — Slider, Emotion path. Report the JS delta.
- [ ] Add to size-snapshot tooling: regression if Emotion leaks into a non-Emotion build.

---

## Shared — Tests, types, docs

- [ ] Run existing Slider tests under the Emotion engine — confirm no regression.
- [ ] Run the same Slider tests under the noop engine — confirm visual and behavioral parity.
- [ ] Update `index.d.ts` after `SliderEmotion` is removed.
- [ ] Docs — Emotion path: note that base styles now come from a CSS file; `sx`/`styled()`
  overrides layer on top as before.
- [ ] Docs — Path A: `CssThemeProvider` setup guide, migration from `ThemeProvider`.
- [ ] Docs — Path B: static CSS setup, `InitColorSchemeScript`, standalone `useColorScheme`,
  `generateThemeCss()`, CSS variable overrides, Tailwind integration.
- [ ] Clean up experiment pages (`static-theme-playground`, `slider-*-benchmark`,
  `css-playground`, `emotion-playground`, `tailwind-playground`) before productionizing.
