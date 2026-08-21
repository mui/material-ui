# Multi-theme static CSS sandbox

This PoC renders real Material UI `Button` and `Slider` components while moving their styles
out of JavaScript. Their CSS-in-JS style bodies are empty, and Vite maps
`@mui/styled-engine` to a no-op so other Material UI internals cannot inject styles.

It follows the RFC's v1 model: one theme is selected per page/build. Runtime switching is not tested.

## How the CSS is organized

Material UI publishes CSS through `@mui/material/css/*`:

```text
packages/mui-material/src/css/
  tokens.css
  base/{button,slider}.css
  themes/
    polished/{button,slider,index}.css
    brutalist/{button,slider,index}.css
```

- `tokens.css` defines the shared palette, spacing, typography, shape, and motion variables.
- `base/*.css` contains theme-independent component structure and behavior hooks.
- `themes/*/{component}.css` imports its tokens and base, then adds one component's visual skin.
- `themes/*/index.css` is the convenience barrel containing the whole theme.

Cascade layers establish `mui.tokens < mui.base < mui.theme`. Unlayered consumer CSS beats all
three, even when imported first.

The package copies these files during its build, exports them with the `./css/*` wildcard, and
marks CSS as a side effect so bundlers retain it.

## Consumption modes

Whole-theme convenience import:

```ts
import '@mui/material/css/themes/polished/index.css';
```

Granular imports for smaller CSS bundles:

```ts
import '@mui/material/css/themes/brutalist/button.css';
import '@mui/material/css/themes/brutalist/slider.css';
```

A custom theme imports Material UI's public tokens and component base files, then supplies only its
own `mui.theme` rules. See `src/consumer-theme/`.

## Demo pages

- `index.html`: Material UI Polished theme through its barrel.
- `brutalist.html`: Material UI Brutalist theme through granular imports.
- `consumer.html`: consumer-owned Ocean theme with no Material UI theme CSS.

All pages import `consumer-overrides.css` before the selected theme to demonstrate that unlayered
consumer overrides still win.

## Running and verification

From the repository root:

```bash
pnpm -F @mui-internal/multi-theme-vite-sandbox dev
pnpm -F @mui-internal/multi-theme-vite-sandbox build
```

The build runs `verify-build.mjs`, which fails unless:

1. exactly one generated CSS asset exists for each theme;
2. shared tokens, Button base, and Slider base each occur once per theme asset;
3. every asset contains its own theme signature and none from the other themes; and
4. every HTML entry references only its selected theme asset.

## Not covered yet

Production would generate these distribution files from component-colocated source CSS and add
flattened, minified `index.bundle.css` files for CDN consumers. Scoped runtime-switching builds are
a later extension.
