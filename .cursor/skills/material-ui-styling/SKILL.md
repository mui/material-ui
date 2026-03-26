---
name: material-ui-styling
description: Chooses the right Material UI styling approach (sx, styled, theme overrides, global CSS) from official MUI guidance. Use when styling @mui/material components, customizing themes, overriding slots, or comparing sx vs styled.
---

# Material UI styling

> **Audience:** Agents and humans maintaining or generating Material UI code. Guidance follows [How to customize](https://mui.com/material-ui/customization/how-to-customize/) and related docs in this repo (`docs/data/material/customization/`, `docs/data/system/`).

## Abstract

Material UI stacks four strategies from **narrowest to broadest** scope. Pick the **smallest scope that solves the problem** to avoid scattering global rules. The `sx` prop is the default for one-off tweaks; `styled()` is for reusable wrappers; the theme’s `components` API is for app-wide consistency; `GlobalStyles` / `CssBaseline` is for baseline HTML or cross-cutting globals.

---

## Quick decision (use in order)

1. **Single instance or local layout?** → [`sx`](https://mui.com/system/getting-started/the-sx-prop/)
2. **Same override in many places?** → [`styled()`](https://mui.com/system/styled/) around the MUI component (or a thin wrapper component)
3. **All instances of a component should look different by default?** → [`theme.components`](https://mui.com/material-ui/customization/theme-components/) (`styleOverrides`, `variants`, `defaultProps`)
4. **Global element baselines (e.g. all `h1`) or non-component CSS?** → [`GlobalStyles`](https://mui.com/material-ui/api/global-styles/) or [`CssBaseline`](https://mui.com/material-ui/react-css-baseline/) overrides

**Do not** jump to global theme overrides for a one-off screen; **do not** use `sx` for large repeated systems if a themed variant or `styled()` wrapper is clearer.

---

## 1. One-off: `sx` prop

**Use when:** Changing one instance (or a small inline case) with access to the theme.

- All Material UI components support `sx`.
- Supports theme shortcuts (`palette`, `spacing`, breakpoints, etc.), pseudo-selectors, nested selectors, and responsive objects.

**Nested parts (slots):** Target internal slots with global class fragments, e.g. `'& .MuiSlider-thumb'`. Discover the slot name in DevTools; the pattern is `Mui[Component]-[slot]`. **Do not** rely on the full hashed class string—only the stable `Mui*` part.

**State styles:** MUI uses global state classes (`.Mui-disabled`, `.Mui-selected`, etc.) with specificity comparable to pseudo-classes. Override with **increased specificity** (e.g. combine with your class or the component root), never bare global state selectors alone.

```css
/* Bad: affects every component using .Mui-error */
.Mui-error { color: red; }

/* Good: scoped to OutlinedInput root */
.MuiOutlinedInput-root.Mui-error { color: red; }
```

See [How to customize — state classes](https://mui.com/material-ui/customization/how-to-customize/#state-classes).

**`className`:** Use when integrating with external CSS or CSS Modules; combine with the same slot/state rules as above.

---

## 2. Reusable: `styled()`

**Use when:** The same customized component appears in multiple places and deserves a named component.

```ts
import { styled } from '@mui/material/styles';
```

- Prefer **`@mui/material/styles`** when using Material UI so the default theme matches the rest of the app.
- `styled()` adds theme integration, optional `name` / `slot` for theme overrides, and `sx` on the result (unless disabled).
- For custom props, use **`shouldForwardProp`** so DOM/React does not receive invalid attributes. Extend the component’s prop types in TypeScript.

**Dynamic styling:** Prefer **CSS variables** or conditional style objects in the style callback; avoid per-field functions inside the style object for readability (see [styled() docs](https://mui.com/system/styled/)).

---

## 3. Global theme: `createTheme({ components })`

**Use when:** Default look of `Button`, `TextField`, etc. should change **everywhere**.

- **`defaultProps`:** Change defaults (e.g. `disableRipple` on `MuiButtonBase`).
- **`styleOverrides`:** Target **slots** (`root`, `input`, …) with plain CSS-in-JS objects; nested selectors allowed.
- **`variants`:** Map **props** to extra styles (built-in props like `variant: 'outlined'` or custom values you document for your design system).

**Caveat:** The theme is **not tree-shakable**. For heavy one-off customizations, a **new component** is often better than bloating the theme.

Full API: [Themed components](https://mui.com/material-ui/customization/theme-components/).

---

## 4. Global CSS: `GlobalStyles` / `CssBaseline`

**Use when:** Styling raw HTML elements or app-wide snippets that are not tied to a single MUI component instance.

- Prefer **hoisting** `<GlobalStyles />` to a module-level constant so the style tag does not churn on re-renders.
- `styles` can be a callback for theme access.
- Can extend **`MuiCssBaseline`** `styleOverrides` if the app already uses `CssBaseline`.

---

## `sx` vs `styled()` — agents must know the differences

| Topic | `sx` | `styled()` style object |
|--------|------|-------------------------|
| Theme spacing shorthand (`m`, `p`, `gap`, …) | Yes | **No** — use `theme.spacing()` in a function or plain CSS values |
| Meaning of numeric padding like `1` | Theme spacing unit | **Pixels**, not `theme.spacing(1)` |
| Theme palette strings (`'primary.main'`) | Yes | Use `theme` in a function |

To reuse **`sx` logic inside `styled()`**, use theme’s `unstable_sx` (see [styled — Difference with the `sx` prop](https://mui.com/system/styled/#difference-with-the-sx-prop)).

---

## Imports and consistency

- In application code, **prefer one-level imports** from packages (e.g. `@mui/material/Button`) to avoid pulling the entire barrel.
- **`Box` / `Stack` / `Typography` / `Grid`:** System layout props apply directly on these; other components use **`sx`** for system shortcuts, not arbitrary CSS prop shortcuts on the component itself.

---

## Further reading (repo / site)

| Topic | Doc |
|--------|-----|
| Choosing strategy | [How to customize](https://mui.com/material-ui/customization/how-to-customize/) |
| `sx` reference | [The sx prop](https://mui.com/system/getting-started/the-sx-prop/) |
| `styled()` API | [styled()](https://mui.com/system/styled/) |
| Theme per component | [Themed components](https://mui.com/material-ui/customization/theme-components/) |
| System property mapping | [System properties](https://mui.com/system/properties/) |
| State / class naming | [Class names](https://mui.com/system/styles/advanced/#class-names) (advanced) |

For **MUI-specific class and state tables**, see [reference.md](reference.md).
