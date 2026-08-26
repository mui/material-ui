# Multi-theme static CSS sandbox

This PoC renders real Material UI `Button` and `Slider` components while moving their styles
out of JavaScript. Their CSS-in-JS style bodies are empty, and Vite maps
`@mui/styled-engine` to a no-op so other Material UI internals cannot inject styles.

It follows the RFC's v1 model: one theme is selected per page/build. Runtime switching is not tested.

## How the CSS is organized

Material UI publishes CSS through `@mui/material/css/*`:

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
- The package build flattens each barrel into a minified `index.bundle.css` and source map.

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

The Brutalist fixture imports two self-contained component files through separate modules. Both
files import the same token file, while the final page must still load each shared rule once.

No-bundler/CDN consumption uses the generated flattened file:

```html
<link rel="stylesheet" href="@mui/material/css/themes/polished/index.bundle.css" />
```

A no-bundler page can also link one granular file directly. Its native `@import` dependencies work,
but the flattened rollup avoids request waterfalls and is the recommended CDN path.

A custom theme imports Material UI's public tokens and component base files, then supplies only its
own `mui.theme` rules. See `src/consumer-theme/`.

## Demo pages

- `index.html`: Material UI Polished theme through its barrel.
- `brutalist.html`: Material UI Brutalist theme through granular imports.
- `consumer.html`: consumer-owned Ocean theme with no Material UI theme CSS.
- `cdn.html`: plain HTML linked directly to the built Polished bundle, with no JavaScript.
- `cdn-granular.html`: plain HTML linked to one self-contained Brutalist component file.

The three Vite pages import `consumer-overrides.css` before the selected theme to demonstrate that
unlayered consumer overrides still win.

## Running and verification

From the repository root:

```bash
pnpm -F @mui-internal/multi-theme-vite-sandbox dev
pnpm -F @mui-internal/multi-theme-vite-sandbox build
```

The dev server covers the three Vite pages. After building, open either `cdn*.html` file directly
or serve the repository root as static files; those pages are deliberately not Vite inputs.

The sandbox build first builds Material UI, including the CDN artifacts, and then runs
`verify-build.mjs`. It fails unless:

1. exactly one theme-specific CSS asset exists for each Vite page;
2. each page's complete loaded stylesheet set contains tokens and component base rules once;
3. every page contains its own theme signature and none from the other themes; and
4. each CDN bundle has no `@import`, contains one foundation copy, and has a source map; and
5. both no-bundler pages use one valid CSS graph through `<link>` and have no script entry.

## Not covered yet

Production would generate the source distribution files from component-colocated CSS. A second
tier-1 bundler fixture and scoped runtime-switching builds remain later extensions.
