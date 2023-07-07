# Migrating to the new theme

<p class="description">This guide explains what's news in the default theme and how to migrate to it</p>

## Color

### The info color palette has been removed

We recommend to switch the `info` to `neutral`, for example:

```diff
- <Chip variant="soft" color="info">
+ <Chip variant="soft" color="neutral">
```

However, if you want to keep the info color palette, you can do so by adding the following to your theme:

```js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        info: {
          50: '#FDF7FF',
          100: '#F4EAFF',
          200: '#E1CBFF',
          300: '#C69EFF',
          400: '#A374F9',
          500: '#814DDE',
          600: '#5F35AE',
          700: '#452382',
          800: '#301761',
          900: '#1D0A42',
          plainColor: `var(--joy-palette-info-600)`,
          plainHoverBg: `var(--joy-palette-info-100)`,
          plainActiveBg: `var(--joy-palette-info-200)`,
          plainDisabledColor: `var(--joy-palette-info-200)`,
          outlinedColor: `var(--joy-palette-info-500)`,
          outlinedBorder: `var(--joy-palette-info-200)`,
          outlinedHoverBg: `var(--joy-palette-info-100)`,
          outlinedHoverBorder: `var(--joy-palette-info-300)`,
          outlinedActiveBg: `var(--joy-palette-info-200)`,
          outlinedDisabledColor: `var(--joy-palette-info-100)`,
          outlinedDisabledBorder: `var(--joy-palette-info-100)`,
          softColor: `var(--joy-palette-info-600)`,
          softBg: `var(--joy-palette-info-100)`,
          softHoverBg: `var(--joy-palette-info-200)`,
          softActiveBg: `var(--joy-palette-info-300)`,
          softDisabledColor: `var(--joy-palette-info-300)`,
          softDisabledBg: `var(--joy-paletteinfo}-50)`,
          solidColor: '#fff',
          solidBg: `var(--joy-palette-info-500)`,
          solidHoverBg: `var(--joy-palette-info-600)`,
          solidActiveBg: `var(--joy-palette-info-700)`,
          solidDisabledColor: `#fff`,
          solidDisabledBg: `var(--joy-palette-info-200)`,
        },
      },
    },
    dark: {
      palette: {
        info: {
          50: '#FDF7FF',
          100: '#F4EAFF',
          200: '#E1CBFF',
          300: '#C69EFF',
          400: '#A374F9',
          500: '#814DDE',
          600: '#5F35AE',
          700: '#452382',
          800: '#301761',
          900: '#1D0A42',
          plainColor: `var(--joy-palette-info-300)`,
          plainHoverBg: `var(--joy-palette-info-800)`,
          plainActiveBg: `var(--joy-palette-info-700)`,
          plainDisabledColor: `var(--joy-palette-info-800)`,
          outlinedColor: `var(--joy-palette-info-200)`,
          outlinedBorder: `var(--joy-palette-info-700)`,
          outlinedHoverBg: `var(--joy-palette-info-800)`,
          outlinedHoverBorder: `var(--joy-palette-info-600)`,
          outlinedActiveBg: `var(--joy-palette-info-900)`,
          outlinedDisabledColor: `var(--joy-palette-info-800)`,
          outlinedDisabledBorder: `var(--joy-palette-info-800)`,
          softColor: `var(--joy-palette-info-200)`,
          softBg: `var(--joy-palette-info-900)`,
          softHoverBg: `var(--joy-palette-info-800)`,
          softActiveBg: `var(--joy-palette-info-700)`,
          softDisabledColor: `var(--joy-palette-info-800)`,
          softDisabledBg: `var(--joy-palette-info-900)`,
          solidColor: `#fff`,
          solidBg: `var(--joy-palette-info-600)`,
          solidHoverBg: `var(--joy-palette-info-700)`,
          solidActiveBg: `var(--joy-palette-info-800)`,
          solidDisabledColor: `var(--joy-palette-info-700)`,
          solidDisabledBg: `var(--joy-palette-info-900)`,
        },
      },
    },
  },
});

function App() {
  return <CssVarsProvider theme={theme}>…</CssVarsProvider>;
}
```

#### TypeScript

You have add the `info` to the theme's palette types via module augmentation:

```ts
// You can put this to any file that's included in your tsconfig
import type { PaletteRange } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    // apply to all Joy UI components that support `color` prop
    info: true;
  }

  interface Palette {
    // this will make the node `info` configurable in `extendTheme`
    // and add `info` to the theme's palette.
    info: PaletteRange;
  }
}
```

:::info
When we started applying color palettes into contexts, and fleshing out the components, we realized that there was an overlap between neutral state and info state. For this reason, we decided to remove the info palette, and instead start using the neutral colors as an info state, since it fits better with the semantic of an informational state.
:::

## Typography

### Font family

### Font size

### Font weight

### Line height

### Letter spacing

## Shadow

## Components

### Tabs
