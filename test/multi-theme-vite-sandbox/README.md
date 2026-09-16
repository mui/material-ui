# Multi-theme static CSS Vite PoC

This sandbox verifies that real Material UI `Button` and `Slider` components can keep their markup
and behavior while receiving all visual styles from static CSS.

## What it demonstrates

- A page loads one theme without downloading CSS from another theme.
- Whole-theme and per-component CSS imports both work with Vite.
- Shared tokens and component base CSS occur once after bundling overlapping granular imports.
- A consumer can build a custom theme from Material UI tokens and base CSS.
- Cascade layers guarantee `consumer overrides > theme > base > tokens`, regardless of import order.
- Flattened rollups and self-contained granular files work without JavaScript or a CSS bundler.

## Scenarios

| Page                | CSS selection                                               | Purpose                            |
| :------------------ | :---------------------------------------------------------- | :--------------------------------- |
| `index.html`        | `themes/polished/index.css`                                 | Material UI whole-theme import     |
| `brutalist.html`    | `themes/brutalist/{button,slider}.css`                      | Material UI granular imports       |
| `consumer.html`     | `tokens.css`, component base CSS, and `src/consumer-theme/` | Consumer-owned theme               |
| `cdn.html`          | generated `themes/polished/index.bundle.css`                | No-bundler whole-theme consumption |
| `cdn-granular.html` | `themes/brutalist/button.css` and its native CSS `@import`s | No-bundler granular consumption    |

The three Vite pages import `consumer-overrides.css` before the selected theme. Because the
override is unlayered, it still wins over Material UI's layered CSS.

## How it works

Material UI supplies:

```text
css/tokens.css
css/base/{button,slider}.css
css/themes/{polished,brutalist}/{button,slider,index}.css
```

Each granular theme file imports the shared tokens and its component base file before defining the
component's `mui.theme` rules. The Brutalist entry imports its Button and Slider CSS directly,
exercising Vite's deduplication of their shared token dependency.

The components' CSS-in-JS style bodies are empty. Vite also aliases `@mui/styled-engine` to
`src/noopStyledEngine.tsx`, preventing other Material UI internals from injecting runtime styles.

The Material UI package build copies the authored CSS and uses Lightning CSS to generate a
minified, import-free `index.bundle.css` and source map for every theme directory. The sandbox build
then runs Vite and `verify-build.mjs`.

## Run it

From the repository root:

```bash
pnpm -F @mui-internal/multi-theme-vite-sandbox dev
pnpm -F @mui-internal/multi-theme-vite-sandbox build:with-deps
```

`build:with-deps` uses Lerna/Nx to build dependencies first. `build` runs only Vite and the verifier
against existing package output; the repository-wide `pnpm build` schedules dependencies itself.
This avoids concurrent rebuilds of the shared Material UI output.

The dev server exposes `/`, `/brutalist.html`, and `/consumer.html`. After building, open either
`cdn*.html` file directly or serve the repository root as static files; those pages are deliberately
not Vite inputs.

The production build fails unless:

1. every Vite page references only its selected theme;
2. its complete stylesheet set contains one token contract and one copy of each component base;
3. the generated theme bundles contain no `@import`, include source maps, and remain isolated; and
4. both no-bundler pages resolve the expected CSS graph without a script entry.
