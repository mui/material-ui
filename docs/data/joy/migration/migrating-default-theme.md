# Migrating to the new theme

<p class="description">This guide walks through recent Joy UI default theme upgrades and how to update to it.</p>

With the introduction of Joy UI's v5.0.0-beta.0, its default theme went under some significant restructuring and polish.
Several changes were made, including renaming, removing, and adding new tokens.
This guide walks through each and every one of them and provides instructions for a smooth migration process.

## Color & Typography

### Purple palette removed

The purple palette has been removed as we updated the primary color.
In case you want to continue using it, copy the snippet below to your project:

```js
const purple = {
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
};
```

### Info palette removed

The info palette has been removed to simplify the color set.
We've realized that, in most cases, the neutral palette is used for info-related components and use cases.
Additionally, we noticed a strong overlap between `info` and `neutral`, which motivated further this change.

```diff
- <Chip color="info" variant="soft">
+ <Chip color="neutral" variant="soft">
```

If you want to continue using it, add the palette directly to the theme object file:

```js
import { extendTheme } from '@mui/joy/styles';

const info = {
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
};

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        info: {
          ...info,
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
          ...info,
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
```

Then provide the `theme` to the `CssVarsProvider`:

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({ … });

function App() {
  return <CssVarsProvider theme={theme}>…</CssVarsProvider>;
}
```

#### TypeScript

If working with TypeScript, add the `info` palette to the theme's palette types via module augmentation:

```ts
// You can put this to any file that's included in your tsconfig
import type { PaletteRange } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    // apply to all Joy UI components that support `color` prop
    info: true;
  }

  interface Palette {
    // this will make the node `info` configurable in `extendTheme`
    // and add `info` to the theme's palette.
    info: PaletteRange;
  }
}
```

### Other palettes

Each and every color of all palettes have been refined for better contrast ratios, vibrance, and personality.
Here's a before and after:

{{"demo": "PaletteChanges.js"}}

#### Keep the old colors

To keep using the old colors, add them to your theme:

<details>
<summary>Primary</summary>

```js
const primary = {
  50: '#F4FAFF',
  100: '#DDF1FF',
  200: '#ADDBFF',
  300: '#6FB6FF',
  400: '#3990FF',
  500: '#096BDE',
  600: '#054DA7',
  700: '#02367D',
  800: '#072859',
  900: '#00153C',
};

extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          ...primary,
          plainColor: `var(--joy-palette-primary-600)`,
          plainHoverBg: `var(--joy-palette-primary-100)`,
          plainActiveBg: `var(--joy-palette-primary-200)`,
          plainDisabledColor: `var(--joy-palette-primary-200)`,

          outlinedColor: `var(--joy-palette-primary-500)`,
          outlinedBorder: `var(--joy-palette-primary-200)`,
          outlinedHoverBg: `var(--joy-palette-primary-100)`,
          outlinedHoverBorder: `var(--joy-palette-primary-300)`,
          outlinedActiveBg: `var(--joy-palette-primary-200)`,
          outlinedDisabledColor: `var(--joy-palette-primary-100)`,
          outlinedDisabledBorder: `var(--joy-palette-primary-100)`,

          softColor: `var(--joy-palette-primary-600)`,
          softBg: `var(--joy-palette-primary-100)`,
          softHoverBg: `var(--joy-palette-primary-200)`,
          softActiveBg: `var(--joy-palette-primary-300)`,
          softDisabledColor: `var(--joy-palette-primary-300)`,
          softDisabledBg: `var(--joy-palette-primary}-)50`,

          solidColor: '#fff',
          solidBg: `var(--joy-palette-primary-500)`,
          solidHoverBg: `var(--joy-palette-primary-600)`,
          solidActiveBg: `var(--joy-palette-primary-700)`,
          solidDisabledColor: `#fff`,
          solidDisabledBg: `var(--joy-palette-primary-200)`,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          ...primary,
          plainColor: `var(--joy-palette-primary-300)`,
          plainHoverBg: `var(--joy-palette-primary-800)`,
          plainActiveBg: `var(--joy-palette-primary-700)`,
          plainDisabledColor: `var(--joy-palette-primary-800)`,

          outlinedColor: `var(--joy-palette-primary-200)`,
          outlinedBorder: `var(--joy-palette-primary-700)`,
          outlinedHoverBg: `var(--joy-palette-primary-800)`,
          outlinedHoverBorder: `var(--joy-palette-primary-600)`,
          outlinedActiveBg: `var(--joy-palette-primary-900)`,
          outlinedDisabledColor: `var(--joy-palette-primary-800)`,
          outlinedDisabledBorder: `var(--joy-palette-primary-800)`,

          softColor: `var(--joy-palette-primary-200)`,
          softBg: `var(--joy-palette-primary-900)`,
          softHoverBg: `var(--joy-palette-primary-800)`,
          softActiveBg: `var(--joy-palette-primary-700)`,
          softDisabledColor: `var(--joy-palette-primary-800)`,
          softDisabledBg: `var(--joy-palette-primary-900)`,

          solidColor: `#fff`,
          solidBg: `var(--joy-palette-primary-600)`,
          solidHoverBg: `var(--joy-palette-primary-700)`,
          solidActiveBg: `var(--joy-palette-primary-800)`,
          solidDisabledColor: `var(--joy-palette-primary-700)`,
          solidDisabledBg: `var(--joy-palette-primary-900)`,
        },
      },
    },
  },
});
```

</details>

<details>
<summary>Neutral</summary>

```js
const neutral = {
  50: '#F7F7F8',
  100: '#EBEBEF',
  200: '#D8D8DF',
  300: '#B9B9C6',
  400: '#8F8FA3',
  500: '#73738C',
  600: '#5A5A72',
  700: '#434356',
  800: '#25252D',
  900: '#131318',
};

extendTheme({
  colorSchemes: {
    light: {
      palette: {
        neutral: {
          ...neutral,
          plainColor: `var(--joy-palette-neutral-800)`,
          plainHoverColor: `var(--joy-palette-neutral-900)`,
          plainHoverBg: `var(--joy-palette-neutral-100)`,
          plainActiveBg: `var(--joy-palette-neutral-200)`,
          plainDisabledColor: `var(--joy-palette-neutral-300)`,

          outlinedColor: `var(--joy-palette-neutral-800)`,
          outlinedBorder: `var(--joy-palette-neutral-200)`,
          outlinedHoverColor: `var(--joy-palette-neutral-900)`,
          outlinedHoverBg: `var(--joy-palette-neutral-100)`,
          outlinedHoverBorder: `var(--joy-palette-neutral-300)`,
          outlinedActiveBg: `var(--joy-palette-neutral-200)`,
          outlinedDisabledColor: `var(--joy-palette-neutral-300)`,
          outlinedDisabledBorder: `var(--joy-palette-neutral-100)`,

          softColor: `var(--joy-palette-neutral-800)`,
          softBg: `var(--joy-palette-neutral-100)`,
          softHoverColor: `var(--joy-palette-neutral-900)`,
          softHoverBg: `var(--joy-palette-neutral-200)`,
          softActiveBg: `var(--joy-palette-neutral-300)`,
          softDisabledColor: `var(--joy-palette-neutral-300)`,
          softDisabledBg: `var(--joy-palette-neutral-50)`,
          solidColor: `var(--joy-palette-common-white)`,
          solidBg: `var(--joy-palette-neutral-600)`,
          solidHoverBg: `var(--joy-palette-neutral-700)`,
          solidActiveBg: `var(--joy-palette-neutral-800)`,
          solidDisabledColor: `var(--joy-palette-neutral-300)`,
          solidDisabledBg: `var(--joy-palette-neutral-50)`,
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        text: {
          secondary: 'var(--joy-palette-neutral-600)',
          tertiary: 'var(--joy-palette-neutral-500)',
        },
        background: {
          body: 'var(--joy-palette-common-white)',
          tooltip: 'var(--joy-palette-neutral-800)',
          backdrop: 'rgba(255 255 255 / 0.5)',
        },
      },
    },
    dark: {
      palette: {
        neutral: {
          ...neutral,
          plainColor: `var(--joy-palette-neutral-200)`,
          plainHoverColor: `var(--joy-palette-neutral-50)`,
          plainHoverBg: `var(--joy-palette-neutral-800)`,
          plainActiveBg: `var(--joy-palette-neutral-700)`,
          plainDisabledColor: `var(--joy-palette-neutral-700)`,

          outlinedColor: `var(--joy-palette-neutral-200)`,
          outlinedBorder: `var(--joy-palette-neutral-800)`,
          outlinedHoverColor: `var(--joy-palette-neutral-50)`,
          outlinedHoverBg: `var(--joy-palette-neutral-800)`,
          outlinedHoverBorder: `var(--joy-palette-neutral-700)`,
          outlinedActiveBg: `var(--joy-palette-neutral-800)`,
          outlinedDisabledColor: `var(--joy-palette-neutral-800)`,
          outlinedDisabledBorder: `var(--joy-palette-neutral-800)`,

          softColor: `var(--joy-palette-neutral-200)`,
          softBg: `var(--joy-palette-neutral-800)`,
          softHoverColor: `var(--joy-palette-neutral-50)`,
          softHoverBg: `var(--joy-palette-neutral-700)`,
          softActiveBg: `var(--joy-palette-neutral-600)`,
          softDisabledColor: `var(--joy-palette-neutral-700)`,
          softDisabledBg: `var(--joy-palette-neutral-900)`,

          solidColor: `var(--joy-palette-common-white)`,
          solidBg: `var(--joy-palette-neutral-600)`,
          solidHoverBg: `var(--joy-palette-neutral-700)`,
          solidActiveBg: `var(--joy-palette-neutral-800)`,
          solidDisabledColor: `var(--joy-palette-neutral-700)`,
          solidDisabledBg: `var(--joy-palette-neutral-900)`,
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        background: {
          body: 'var(--joy-palette-neutral-900)',
          surface: 'var(--joy-palette-common-black)',
          popup: 'var(--joy-palette-neutral-900)',
          level1: 'var(--joy-palette-neutral-800)',
          level2: 'var(--joy-palette-neutral-700)',
          level3: 'var(--joy-palette-neutral-600)',
        },
      },
    },
  },
});
```

</details>

<details>
<summary>Danger</summary>

```js
const danger = {
  50: '#FFF8F6',
  100: '#FFE9E8',
  200: '#FFC7C5',
  300: '#FF9192',
  400: '#FA5255',
  500: '#D3232F',
  600: '#A10E25',
  700: '#77061B',
  800: '#580013',
  900: '#39000D',
};

extendTheme({
  colorSchemes: {
    light: {
      palette: {
        danger: {
          ...danger,
          plainColor: `var(--joy-palette-danger-600)`,
          plainHoverBg: `var(--joy-palette-danger-100)`,
          plainActiveBg: `var(--joy-palette-danger-200)`,
          plainDisabledColor: `var(--joy-palette-danger-200)`,

          outlinedColor: `var(--joy-palette-danger-500)`,
          outlinedBorder: `var(--joy-palette-danger-200)`,
          outlinedHoverBg: `var(--joy-palette-danger-100)`,
          outlinedHoverBorder: `var(--joy-palette-danger-300)`,
          outlinedActiveBg: `var(--joy-palette-danger-200)`,
          outlinedDisabledColor: `var(--joy-palette-danger-100)`,
          outlinedDisabledBorder: `var(--joy-palette-danger-100)`,

          softColor: `var(--joy-palette-danger-600)`,
          softBg: `var(--joy-palette-danger-100)`,
          softHoverBg: `var(--joy-palette-danger-200)`,
          softActiveBg: `var(--joy-palette-danger-300)`,
          softDisabledColor: `var(--joy-palette-danger-300)`,
          softDisabledBg: `var(--joy-palette-danger}-)50`,

          solidColor: '#fff',
          solidBg: `var(--joy-palette-danger-500)`,
          solidHoverBg: `var(--joy-palette-danger-600)`,
          solidActiveBg: `var(--joy-palette-danger-700)`,
          solidDisabledColor: `#fff`,
          solidDisabledBg: `var(--joy-palette-danger-200)`,
        },
      },
    },
    dark: {
      palette: {
        danger: {
          ...danger,
          plainColor: `var(--joy-palette-danger-300)`,
          plainHoverBg: `var(--joy-palette-danger-800)`,
          plainActiveBg: `var(--joy-palette-danger-700)`,
          plainDisabledColor: `var(--joy-palette-danger-800)`,

          outlinedColor: `var(--joy-palette-danger-200)`,
          outlinedBorder: `var(--joy-palette-danger-700)`,
          outlinedHoverBg: `var(--joy-palette-danger-800)`,
          outlinedHoverBorder: `var(--joy-palette-danger-600)`,
          outlinedActiveBg: `var(--joy-palette-danger-900)`,
          outlinedDisabledColor: `var(--joy-palette-danger-800)`,
          outlinedDisabledBorder: `var(--joy-palette-danger-800)`,

          softColor: `var(--joy-palette-danger-200)`,
          softBg: `var(--joy-palette-danger-900)`,
          softHoverBg: `var(--joy-palette-danger-800)`,
          softActiveBg: `var(--joy-palette-danger-700)`,
          softDisabledColor: `var(--joy-palette-danger-800)`,
          softDisabledBg: `var(--joy-palette-danger-900)`,

          solidColor: `#fff`,
          solidBg: `var(--joy-palette-danger-600)`,
          solidHoverBg: `var(--joy-palette-danger-700)`,
          solidActiveBg: `var(--joy-palette-danger-800)`,
          solidDisabledColor: `var(--joy-palette-danger-700)`,
          solidDisabledBg: `var(--joy-palette-danger-900)`,
        },
      },
    },
  },
});
```

</details>

<details>
<summary>Success</summary>

```js
const success = {
  50: '#F3FEF5',
  100: '#D7F5DD',
  200: '#77EC95',
  300: '#4CC76E',
  400: '#2CA24D',
  500: '#1A7D36',
  600: '#0F5D26',
  700: '#034318',
  800: '#002F0F',
  900: '#001D09',
};

extendTheme({
  colorSchemes: {
    light: {
      palette: {
        success: {
          ...success,
          plainColor: `var(--joy-palette-success-600)`,
          plainHoverBg: `var(--joy-palette-success-100)`,
          plainActiveBg: `var(--joy-palette-success-200)`,
          plainDisabledColor: `var(--joy-palette-success-200)`,

          outlinedColor: `var(--joy-palette-success-500)`,
          outlinedBorder: `var(--joy-palette-success-200)`,
          outlinedHoverBg: `var(--joy-palette-success-100)`,
          outlinedHoverBorder: `var(--joy-palette-success-300)`,
          outlinedActiveBg: `var(--joy-palette-success-200)`,
          outlinedDisabledColor: `var(--joy-palette-success-100)`,
          outlinedDisabledBorder: `var(--joy-palette-success-100)`,

          softColor: `var(--joy-palette-success-600)`,
          softBg: `var(--joy-palette-success-100)`,
          softHoverBg: `var(--joy-palette-success-200)`,
          softActiveBg: `var(--joy-palette-success-300)`,
          softDisabledColor: `var(--joy-palette-success-300)`,
          softDisabledBg: `var(--joy-palette-success}-)50`,

          solidColor: '#fff',
          solidBg: `var(--joy-palette-success-500)`,
          solidHoverBg: `var(--joy-palette-success-600)`,
          solidActiveBg: `var(--joy-palette-success-700)`,
          solidDisabledColor: `#fff`,
          solidDisabledBg: `var(--joy-palette-success-200)`,
        },
      },
    },
    dark: {
      palette: {
        success: {
          ...success,
          plainColor: `var(--joy-palette-success-300)`,
          plainHoverBg: `var(--joy-palette-success-800)`,
          plainActiveBg: `var(--joy-palette-success-700)`,
          plainDisabledColor: `var(--joy-palette-success-800)`,

          outlinedColor: `var(--joy-palette-success-200)`,
          outlinedBorder: `var(--joy-palette-success-700)`,
          outlinedHoverBg: `var(--joy-palette-success-800)`,
          outlinedHoverBorder: `var(--joy-palette-success-600)`,
          outlinedActiveBg: `var(--joy-palette-success-900)`,
          outlinedDisabledColor: `var(--joy-palette-success-800)`,
          outlinedDisabledBorder: `var(--joy-palette-success-800)`,

          softColor: `var(--joy-palette-success-200)`,
          softBg: `var(--joy-palette-success-900)`,
          softHoverBg: `var(--joy-palette-success-800)`,
          softActiveBg: `var(--joy-palette-success-700)`,
          softDisabledColor: `var(--joy-palette-success-800)`,
          softDisabledBg: `var(--joy-palette-success-900)`,

          solidColor: '#fff',
          solidBg: `var(--joy-palette-success-600)`,
          solidHoverBg: `var(--joy-palette-success-700)`,
          solidActiveBg: `var(--joy-palette-success-800)`,
          solidDisabledColor: `var(--joy-palette-success-700)`,
          solidDisabledBg: `var(--joy-palette-success-900)`,
        },
      },
    },
  },
});
```

</details>

<details>
<summary>Warning</summary>

```js
const warning = {
  50: '#FFF8C5',
  100: '#FAE17D',
  200: '#EAC54F',
  300: '#D4A72C',
  400: '#BF8700',
  500: '#9A6700',
  600: '#7D4E00',
  700: '#633C01',
  800: '#4D2D00',
  900: '#3B2300',
};

extendTheme({
  colorSchemes: {
    light: {
      palette: {
        warning: {
          ...warning,
          plainColor: `var(--joy-palette-warning-800)`,
          plainHoverBg: `var(--joy-palette-warning-50)`,
          plainActiveBg: `var(--joy-palette-warning-200)`,
          plainDisabledColor: `var(--joy-palette-warning-200)`,

          outlinedColor: `var(--joy-palette-warning-800)`,
          outlinedBorder: `var(--joy-palette-warning-200)`,
          outlinedHoverBg: `var(--joy-palette-warning-50)`,
          outlinedHoverBorder: `var(--joy-palette-warning-300)`,
          outlinedActiveBg: `var(--joy-palette-warning-200)`,
          outlinedDisabledColor: `var(--joy-palette-warning-100)`,
          outlinedDisabledBorder: `var(--joy-palette-warning-100)`,

          softColor: `var(--joy-palette-warning-800)`,
          softBg: `var(--joy-palette-warning-50)`,
          softHoverBg: `var(--joy-palette-warning-100)`,
          softActiveBg: `var(--joy-palette-warning-200)`,
          softDisabledColor: `var(--joy-palette-warning-200)`,
          softDisabledBg: `var(--joy-palette-warning-50)`,

          solidColor: `var(--joy-palette-warning-800)`,
          solidBg: `var(--joy-palette-warning-200)`,
          solidHoverBg: `var(--joy-palette-warning-300)`,
          solidActiveBg: `var(--joy-palette-warning-400)`,
          solidDisabledColor: `var(--joy-palette-warning-200)`,
          solidDisabledBg: `var(--joy-palette-warning-50)`,
        },
      },
    },
    dark: {
      palette: {
        warning: {
          ...warning,
          plainColor: `var(--joy-palette-warning-300)`,
          plainHoverBg: `var(--joy-palette-warning-800)`,
          plainActiveBg: `var(--joy-palette-warning-700)`,
          plainDisabledColor: `var(--joy-palette-warning-800)`,

          outlinedColor: `var(--joy-palette-warning-200)`,
          outlinedBorder: `var(--joy-palette-warning-700)`,
          outlinedHoverBg: `var(--joy-palette-warning-800)`,
          outlinedHoverBorder: `var(--joy-palette-warning-600)`,
          outlinedActiveBg: `var(--joy-palette-warning-900)`,
          outlinedDisabledColor: `var(--joy-palette-warning-800)`,
          outlinedDisabledBorder: `var(--joy-palette-warning-800)`,

          softColor: `var(--joy-palette-warning-200)`,
          softBg: `var(--joy-palette-warning-900)`,
          softHoverBg: `var(--joy-palette-warning-800)`,
          softActiveBg: `var(--joy-palette-warning-700)`,
          softDisabledColor: `var(--joy-palette-warning-800)`,
          softDisabledBg: `var(--joy-palette-warning-900)`,

          solidColor: `var(--joy-palette-common-black)`,
          solidBg: `var(--joy-palette-warning-300)`,
          solidHoverBg: `var(--joy-palette-warning-400)`,
          solidActiveBg: `var(--joy-palette-warning-500)`,
          solidDisabledColor: `var(--joy-palette-warning-700)`,
          solidDisabledBg: `var(--joy-palette-warning-900)`,
        },
      },
    },
  },
});
```

</details>

### Font family

The default theme typeface has been changed to [`Inter`](https://fonts.google.com/specimen/Inter?query=inter).
Follow the [installation guide](/joy-ui/getting-started/installation/#inter-font) to install it.

To keep the old font family, add the following to your theme:

```js
extendTheme({
  fontFamily: {
    display: '"Public Sans", var(--joy-fontFamily-fallback)',
    body: '"Public Sans", var(--joy-fontFamily-fallback)',
  },
});
```

### Font size

The font size scale has been reduced to:

```diff
 {
-  xl7: '4.5rem',
-  xl6: '3.75rem',
-  xl5: '3rem',
   xl4: '2.25rem',
   xl3: '1.875rem',
   xl2: '1.5rem',
   xl: '1.25rem',
   lg: '1.125rem',
   md: '1rem',
   sm: '0.875rem',
   xs: '0.75rem',
-  xs2: '0.625rem',
-  xs3: '0.5rem',
 }
```

To keep the old font size scale, add the following to your theme:

```js
extendTheme({
  fontSize: {
    xl7: '4.5rem',
    xl6: '3.75rem',
    xl5: '3rem',
    xs2: '0.625rem',
    xs3: '0.5rem',
  },
});
```

#### TypeScript

If working with TypeScript, add the old font size scale to the theme's type via module augmentation:

```ts
// You can put this to any file that's included in your tsconfig
declare module '@mui/joy/styles' {
  interface FontSizeOverrides {
    xl7: true;
    xl6: true;
    xl5: true;
    xs2: true;
    xs3: true;
  }
}
```

### Font weight

The font weight scale has been reduced to:

```diff
 {
-  xs: 200,
   sm: 300,
   md: 500,
   lg: 600,
   xl: 700,
-  xl2: 800,
-  xl3: 900,
 }
```

To keep the old font weight scale, add the following to your theme:

```js
extendTheme({
  fontWeight: {
    xs: 200,
    xl2: 800,
    xl3: 900,
  },
});
```

#### TypeScript

If working with TypeScript, add the old font weight scale to the theme's type via module augmentation:

```ts
// You can put this to any file that's included in your tsconfig
declare module '@mui/joy/styles' {
  interface FontWeightOverrides {
    xs: true;
    xl2: true;
    xl3: true;
  }
}
```

### Line height

The font size scale has been changed to:

```diff
 {
-  sm: 1.25,
-  md: 1.5,
-  lg: 1.7,
+  xs: 1.33334, // largest font sizes for h1, h2
+  sm: 1.42858, // normal font sizes
+  md: 1.5, // normal font sizes
+  lg: 1.55556, // large font sizes for components
+  xl: 1.66667, // smallest font sizes
 }
```

### Letter spacing

The letter spacing scale has been removed.
To add it back, add the following to your theme:

```js
extendTheme({
  letterSpacing: {
    sm: '-0.01em',
    md: '0.083em',
    lg: '0.125em',
  },
});
```

#### TypeScript

If working with TypeScript, add the old letter spacing scale to the theme's type via module augmentation:

```ts
// You can put this to any file that's included in your tsconfig
declare module '@mui/joy/styles' {
  interface ThemeScales {
    letterSpacing: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
```

### Level

The default typography level scale (`theme.typography.*`) has been restructured to:

```diff
  h1
  h2
  h3
  h4
+ title-lg
+ title-md
+ title-sm
+ body-lg
+ body-md
+ body-sm
+ body-xs
- display1
- display2
- h5 // recommend to use `title-lg` instead
- h6 // recommend to use `title-md` instead
- body1 // recommend to use `body-md` instead
- body2 // recommend to use `body-sm` instead
- body3 // recommend to use `body-xs` instead
- body4
- body5
```

The reason behind this restructure is to make the levels more consistent and easier to use.
The `h1` through `h4` levels are intended to be used for page headings, while the `title-*` and `body-*` levels are intended to be used as page paragraphs and as component texts.

The `title-*` and `body-*` levels are designed to be composable which align perfectly with each size of the `SvgIcon` component:

{{"demo": "TitleBodyIconExample.js"}}

### Shadow

The shadow scale remains the same but all values have been changed.

To keep the old shadow scale, add the following to your theme:

```js
extendTheme({
  shadow: {
    xs: `var(--joy-shadowRing, 0 0 #000),
        0 1px 2px 0 rgba(var(--joy-shadowChannel, 187 187 187) / 0.12)`,
    sm: `var(--joy-shadowRing, 0 0 #000),
        0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.11),
        0.5px 1.3px 1.8px -0.6px rgba(var(--joy-shadowChannel, 187 187 187) / 0.18),
        1.1px 2.7px 3.8px -1.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.26)`,
    md: `var(--joy-shadowRing, 0 0 #000),
        0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.12),
        1.1px 2.8px 3.9px -0.4px rgba(var(--joy-shadowChannel, 187 187 187) / 0.17),
        2.4px 6.1px 8.6px -0.8px rgba(var(--joy-shadowChannel, 187 187 187) / 0.23),
        5.3px 13.3px 18.8px -1.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.29)`,
    lg: `var(--joy-shadowRing, 0 0 #000),
        0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.11),
        1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.13),
        3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel, 187 187 187) / 0.16),
        4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel, 187 187 187) / 0.19),
        7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel, 187 187 187) / 0.21)`,
    xl: `var(--joy-shadowRing, 0 0 #000),
        0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.11), 
        1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.13), 
        3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel, 187 187 187) / 0.16), 
        4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel, 187 187 187) / 0.19), 
        7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel, 187 187 187) / 0.21), 
        10.2px 25.5px 36px -0.9px rgba(var(--joy-shadowChannel, 187 187 187) / 0.24), 
        14.8px 36.8px 52.1px -1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.27), 21px 52.3px 74px -1.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.29)`,
  },
});
```

## Components

### Alert

The default variant has been changed to `outlined` and the default color has been changed to `neutral`.

To keep the old default variant and color, add the following to your theme:

```js
extendTheme({
  components: {
    JoyAlert: {
      defaultProps: {
        variant: 'soft',
        color: 'primary',
      },
    },
  },
});
```

### Autocomplete

The variant and color are now the same for `input` and `listbox` slots.

If you want to use a different variant for a specific slot, use `slotProps`. In the following example, the `listbox` slot uses the `plain` variant:

```js
<Autocomplete
  variant="plain"
  slotProps={{
    listbox: {
      variant: 'plain',
    }
  }}
>
```

### Chip

The default variant has been changed to `soft` and the default color has been changed to `neutral`.

To keep the old default variant and color, add the following to your theme:

```js
extendTheme({
  components: {
    JoyChip: {
      defaultProps: {
        variant: 'solid',
        color: 'primary',
      },
    },
  },
});
```

### ChipDelete

The default variant has been changed to `plain` and the default color has been changed to `neutral`.

To keep the old default variant and color, add the following to your theme:

```js
extendTheme({
  components: {
    JoyChipDelete: {
      defaultProps: {
        variant: 'solid',
        color: 'primary',
      },
    },
  },
});
```

### IconButton

The default variant has been changed to `plain` and the default color has been changed to `neutral`.

To keep the old default variant and color, add the following to your theme:

```js
extendTheme({
  components: {
    JoyIconButton: {
      defaultProps: {
        variant: 'soft',
        color: 'primary',
      },
    },
  },
});
```

### Tabs

The [Tabs](/joy-ui/react-tabs/) component has been redesigned following feedback we've received on [this GitHub issue](https://github.com/mui/material-ui/issues/36782).

{{"demo": "../components/tabs/TabsBasic.js"}}

To keep the old Tabs design, add the following to your theme:

```js
extendTheme({
  components: {
    JoyTabList: {
      defaultProps: {
        variant: 'soft',
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          gap: '0.25rem',
          padding: '0.25rem',
          '--List-padding': '0.25rem',
          borderRadius: 'var(--joy-radius-xl)',
          '--List-radius': 'var(--joy-radius-xl)',
        },
      },
    },
    JoyTab: {
      defaultProps: {
        disableIndicator: true,
      },
      styleOverrides: {
        root: {
          '&[aria-selected="true"]': {
            boxShadow: 'var(--joy-shadow-sm)',
            backgroundColor: 'var(--joy-palette-background-surface)',
          },
        },
      },
    },
  },
});
```

### Select

The variant and color are now the same for `button` and `listbox` slots.

If you want to use a different variant for a specific slot, use `slotProps`. In the following example, the `listbox` slot uses the `plain` variant:

```js
<Select
  variant="plain"
  slotProps={{
    listbox: {
      variant: 'plain',
    }
  }}
>
```
