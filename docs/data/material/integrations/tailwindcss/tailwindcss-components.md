# Using the @mui/tailwind package

<p class="description">The @mui/tailwind package provides a Tailwind CSS preset, plugin, and v4 CSS file that wire MUI's design tokens and component state classes into Tailwind.</p>

## Installation

```bash
npm install @mui/tailwind
```

## Setup

### Tailwind v4

Import the CSS file in your global stylesheet after your `@import "tailwindcss"` line:

```css title="global.css"
@layer theme, base, mui.default, components, utilities;
@import 'tailwindcss';
@import '@mui/tailwind/v4.css';
```

`v4.css` adds three things:

1. **Token mapping** — maps `--mui-palette-*`, `--mui-shadows-*`, and other MUI CSS variables to Tailwind theme tokens so utilities like `text-primary`, `bg-error/20`, and `shadow-8` work out of the box (requires `CssVarsProvider`)
2. **State variants** — adds `mui-{state}:` and `mui-not-{state}:` modifier classes for every MUI component state class
3. **MUI-aligned breakpoints** — sets `sm=600px`, `md=900px`, `lg=1200px`, `xl=1536px`

### Tailwind v3

Add the preset to `tailwind.config.js`:

```js title="tailwind.config.js"
module.exports = {
  presets: [require('@mui/tailwind')],
};
```

The preset extends the Tailwind theme with MUI color tokens (using channel variables for opacity modifier support) and includes the plugin automatically.

If you only need the state variant plugin without the full preset:

```js title="tailwind.config.js"
module.exports = {
  plugins: [require('@mui/tailwind/plugin')],
};
```

## State variants

The `@mui/tailwind` plugin adds `mui-{state}:` modifier classes that target MUI component state classes (`Mui-disabled`, `Mui-selected`, `Mui-error`, etc.).

| Variant              | Targets             |
| :------------------- | :------------------ |
| `mui-disabled:`      | `.Mui-disabled`     |
| `mui-selected:`      | `.Mui-selected`     |
| `mui-error:`         | `.Mui-error`        |
| `mui-focused:`       | `.Mui-focused`      |
| `mui-focus-visible:` | `.Mui-focusVisible` |
| `mui-checked:`       | `.Mui-checked`      |
| `mui-expanded:`      | `.Mui-expanded`     |
| `mui-active:`        | `.Mui-active`       |
| `mui-readonly:`      | `.Mui-readOnly`     |
| `mui-required:`      | `.Mui-required`     |
| `mui-completed:`     | `.Mui-completed`    |

Every variant has a `mui-not-{state}:` counterpart that matches when the class is absent.

## Viewing the demos

Start the docs dev server:

```bash
pnpm docs:dev
```

### Filter chips with `mui-selected`

The following demo shows `mui-selected:` styling applied to a `ToggleButtonGroup`.
MUI adds the `Mui-selected` class to each `ToggleButton` when it is active,
and the Tailwind variant applies the indigo styles only to those elements.

{{"demo": "TailwindFilterChips.js"}}

### Disabled state with `mui-disabled`

`mui-disabled:` targets elements where MUI has applied the `Mui-disabled` class.
Because the variant selector is specific to the disabled state, the modifier
applies only to the disabled component, leaving the enabled one untouched.

{{"demo": "TailwindDisabledState.js"}}

## Styling components with `className` and `slotProps`

Use `className` to apply Tailwind utilities to a component's root element.
Use `slotProps.{slot}.className` to reach interior elements.

The following demo builds a job-listing card using only Tailwind utilities
for visual design while keeping MUI components for structure and accessibility.

{{"demo": "TailwindCard.js"}}

## Layer ordering

For Tailwind utilities to override MUI component styles **without `!important`**, MUI's styles must be inside a CSS layer with lower priority than Tailwind's `utilities` layer.

With the Emotion-based setup, enable `enableCssLayer` to put MUI styles in `@layer mui`:

```css title="global.css"
@layer theme, base, mui, components, utilities;
@import 'tailwindcss';
```

```tsx title="app/layout.tsx (Next.js App Router)"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

With the CSS-based setup (`@mui/styled-engine-noop`), MUI component styles are already in `@layer mui.default`, so the layer ordering is automatic — Tailwind utilities win without any `!important`.
