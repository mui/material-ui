# Styling v8 — Emotion-free path TODO

## Goal

Material UI components ship their **own base styles as plain CSS files** (`@layer mui.default`, driven by `--mui-*` CSS variables). This base layer is shared by **both** consumers:

- **Emotion users** — keep using `sx` / `styled()` for _further_ customization on top of the CSS base.
- **Non-Emotion users** — customize via plain CSS / Tailwind / CSS Modules on top of the same CSS base.

Both paths must render identical base styling. The **non-Emotion path must never import Emotion** (no `@emotion/react`, `@emotion/styled`, `@emotion/cache`, `@emotion/serialize` anywhere in its module graph).

---

## Architecture summary (current state)

- `styled()` calls in component files are reduced to empty payloads — `styled('span', {...})({})`. All real styling moves to a co-located `.css` file (Slider is the pilot: `Slider.css`).
- The engine is swapped via the `@mui/styled-engine` alias:
  - Emotion path → `@mui/styled-engine` (Emotion).
  - Non-Emotion path → `@mui/styled-engine-noop` (zero-runtime passthrough; warns + ignores `sx`).
- Theme tokens are delivered as CSS variables:
  - `default-theme.css` — static, pre-generated, no runtime. Dark mode via `data-mui-color-scheme` attribute.
  - `CssThemeProvider` + `CssVarsInjector` — runtime injection for custom themes without Emotion.
- `@mui/tailwind` preset bridges `--mui-palette-*Channel` vars to Tailwind utilities.

---

## TODO

### 1. Lock down the "no Emotion" guarantee

- [ ] Add an automated test that builds the non-Emotion entry and asserts **zero** `@emotion/*` modules in the output graph (fail CI if any appear).
- [ ] Audit the non-Emotion module graph for accidental Emotion imports via transitive deps (`@mui/system`, `zero-styled`, `styleFunctionSx`, `GlobalStyles`, `keyframes`/`css`).
- [ ] Confirm `zero-styled` → `styles/styled` → `@mui/styled-engine` alias fully resolves to `-noop` on the non-Emotion path (including `css`, `keyframes`, `internal_serializeStyles`, `StyledEngineProvider`, `GlobalStyles`).
- [ ] Decide how the alias is selected for end users (bundler alias vs package `exports` conditions vs separate entry point) and document the supported mechanism per bundler (Vite, webpack, Next, esbuild).

### 2. Single source of base styles per component

- [ ] Decide the canonical model: **one** component file + **one** `.css` file serving both engines (preferred), vs. the current `Slider` / `SliderEmotion` split.
- [ ] Reconcile the `SliderEmotion.js` duplication — `SliderEmotion` currently keeps full inline `styled()` styles, which contradicts the "CSS base shared by both" goal. Either:
  - [ ] Remove `SliderEmotion` and have a single `Slider` (CSS base) work under both engines, or
  - [ ] Keep `SliderEmotion` only as a documented legacy/escape hatch with a clear deprecation note.
- [ ] Define the convention for new `.css` files: `@layer mui.default`, class naming (`.MuiX-*`, `.Mui-*` state classes), logical properties, media queries (`forced-colors`, `pointer: coarse`, `prefers-reduced-motion`).

### 3. `sx` behavior on the non-Emotion path

- [ ] Confirm desired behavior when `sx` is passed on the noop engine. Current: dev-time `console.error` + ignore.
- [ ] Decide whether to upgrade the warning to point at the migration doc (Tailwind/`className`) and whether the message should fire once per component vs once per type.
- [ ] Evaluate an optional lightweight `sx → style` adapter (no Emotion) for the non-Emotion path, or explicitly document that `sx` requires the Emotion path.

### 4. Theme delivery

- [ ] Promote `buildDefaultThemeCss.mts` into a reusable `generateThemeCss(themeOptions)` helper so users can emit a `my-theme.css` for a custom theme in their own build.
- [ ] Document the static-CSS workflow (`import '@mui/material/default-theme.css'`, toggle `data-mui-color-scheme`) as the recommended zero-runtime setup.
- [ ] `CssVarsInjector` SSR: render the `<style>` during server render (avoid the `useEffect` flash). Cover nested providers and starting in dark mode + refresh (see existing `ToDo Silviu` notes in `CssVarsInjector.tsx`).
- [ ] Verify iframe support (`documentNode`) for both static and runtime paths.

### 5. Customization contract (`@layer`)

- [ ] Document the override model: unlayered user CSS (and Tailwind v4 utilities) win over `@layer mui.default` automatically.
- [ ] Validate layer ordering with Tailwind v3 (`@mui/tailwind` preset) and v4 (`@mui/tailwind/v4.css`).
- [ ] Verify `slotProps.className` / `className` overrides compose correctly with the layered base styles for each slot.

### 6. Expand component coverage

- [ ] Convert `Button` to the CSS-base pattern (variants × colors × states, ripple, focus-visible) as the second pilot.
- [ ] Capture a repeatable conversion checklist from the Slider + Button work (what `styled()` patterns map to which CSS, how channel vars replace runtime `rgba()` computation).
- [ ] Inventory remaining components and sequence the rollout.

### 7. Bundle size validation

- [ ] Build two minimal Vite apps (`Slider` via Emotion path vs non-Emotion path); report JS bundle deltas (raw + gzip).
- [ ] Add the measurement to the size-snapshot tooling so regressions (e.g. Emotion leaking back into the non-Emotion path) are caught.

### 8. Types, tests, docs

- [ ] Ensure `index.d.ts` for dual-path components stays in sync with `index.js` (Slider already mirrors `SliderEmotion`).
- [ ] Run existing Slider unit + visual regression tests against the CSS base; confirm parity with the Emotion output.
- [ ] Add docs pages for: non-Emotion setup, Tailwind integration, custom theme CSS generation, migration from `styled()`/`sx`.
- [ ] Clean up experiment pages (`static-theme-playground`, `slider-*-benchmark`, `css-playground`, `emotion-playground`, `tailwind-playground`) before productionizing — keep what becomes a real demo.
