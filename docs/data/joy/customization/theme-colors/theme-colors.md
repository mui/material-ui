# Theme colors

<p class="description">Learn about the default theme's color palette and how to customize it.</p>

## Default color tokens

Joy UI's default theme includes 5 built-in semantic color palettes, with light and dark mapping, to help you build great looking UIs quickly.

{{"demo": "PaletteThemeViewer.js", "bg": "inline"}}

:::info
Some tokens reuse color values from others using the [`var(--*)`](https://developer.mozilla.org/en-US/docs/Web/CSS/var) syntax.
:::

### Global variant tokens

One of Joy UI's main features is the four [global variants](/joy-ui/main-features/global-variants/) that are available in every component. They use the built-in color palettes following the format of **variant type | state | CSS property**. For example:

- `solidBg` refers to the solid variant's background color in its initial state.
- `outlinedHoverBorder` refers to the outlined variant's border color in its hover state.

### Channel tokens

The channel tokens helps creating translucent colors using (`rgba`).
The ones ending with `Channel` are automatically generated for each palette.

- `lightChannel`: is generated from the palette's `200` token.
- `mainChannel`: is generated from the palette's `500` token.
- `darkChannel`: is generated from the palette's `800` token.

The code snippet below shows how to use them:

```js
import Typography from '@mui/joy/Typography';

<Typography
  sx={theme => ({
    color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.72)`,
  })}
>
```

## Customizations

### Changing the default values

To change the HEX code for each color while still following the palette pattern, extend the theme by accessing them through the `palette` node on the target mode (light or dark):

```js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: '#C0CCD9',
          100: '#A5B8CF',
          200: '#6A96CA',
          300: '#4886D0',
          400: '#2178DD',
          500: '#096BDE',
          600: '#1B62B5',
          700: '#265995',
          800: '#2F4968',
          900: '#2F3C4C',
        },
      },
    },
  },
});

// Then, pass it to `<CssVarsProvider theme={theme}>`.
```

### Changing the global variant tokens

A good way to start changing how color looks like with the built-in variants is by using the Button component as a jumping-off point.
For example, here's how you'd make the Joy UI Button match the colors of another system, such as [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#examples):

{{"demo": "BootstrapVariantTokens.js"}}

- Bootstrap's default buttons are comparable to Joy UI's `solid` variant.
- Bootstrap's `secondary` variant uses a gray color, similar to Joy UI's `neutral`.
- Bootstrap's `btn-light` is similar to Joy UI's button using the `soft` variant and `neutral` color palette.
- Joy UI's defaults don't include anything similar to Bootstrap's `btn-dark`.
  - We can recreate it using one of the three main customization approaches.

### Adding color tokens

To make any new color available through the `color` prop, insert them in the `colorSchemes` key of the extended theme.
You'll also be able to access them with both the `styled` and `sx` APIs.

```js
extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // `gradient` is a new color token
        gradient: {
          primary: 'linear-gradient(to top, var(--joy-palette-primary-main), #000)',
        },
      },
    },
  },
});

// `sx` prop usage example:
<Button sx={{ background: (theme) => theme.vars.palette.gradient.primary }} />;
```

:::success
We recommend to limit them to 3 levels deep－in this case: `palette.gradient.primary`.
:::

#### TypeScript

Augment the theme's `Palette` interface, when working in TypeScript, to include the new tokens.

```ts
// You can put this to any file that's included in your tsconfig
declare module '@mui/joy/styles' {
  interface Palette {
    gradient: {
      primary: string;
    };
  }
}
```

:::success
Adding custom tokens increases your stylesheet's bundle size, and adds an extra set of maintenance costs to your app.
These tradeoffs mean that adding new tokens is usually only worthwhile when you know that they'll be used by many components.

As an alternative, consider using [the `sx` prop](/joy-ui/customization/approaches/#the-sx-prop) for one-off customizations.
:::

### Adding new palettes

To add entirely new color palettes, with any type of scale, and make them available through the `color` prop, insert them in the `colorSchemes` key of the extended theme.

The snippet below adds a custom `secondary` palette to the theme.

```js
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        secondary: {
          // Credit:
          // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          // Adjust the global variant tokens as you'd like.
          // The tokens should be the same for all color schemes.
          solidBg: 'var(--joy-palette-secondary-400)',
          solidActiveBg: 'var(--joy-palette-secondary-500)',
          outlinedBorder: 'var(--joy-palette-secondary-500)',
          outlinedColor: 'var(--joy-palette-secondary-700)',
          outlinedActiveBg: 'var(--joy-palette-secondary-100)',
          softColor: 'var(--joy-palette-secondary-800)',
          softBg: 'var(--joy-palette-secondary-200)',
          softActiveBg: 'var(--joy-palette-secondary-300)',
          plainColor: 'var(--joy-palette-secondary-700)',
          plainActiveBg: 'var(--joy-palette-secondary-100)',
        },
      },
    },
    dark: {
      palette: {
        secondary: {
          // Credit:
          // https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          // Adjust the global variant tokens as you'd like.
          // The tokens should be the same for all color schemes.
          solidBg: 'var(--joy-palette-secondary-400)',
          solidActiveBg: 'var(--joy-palette-secondary-500)',
          outlinedBorder: 'var(--joy-palette-secondary-700)',
          outlinedColor: 'var(--joy-palette-secondary-600)',
          outlinedActiveBg: 'var(--joy-palette-secondary-900)',
          softColor: 'var(--joy-palette-secondary-500)',
          softBg: 'var(--joy-palette-secondary-900)',
          softActiveBg: 'var(--joy-palette-secondary-800)',
          plainColor: 'var(--joy-palette-secondary-500)',
          plainActiveBg: 'var(--joy-palette-secondary-900)',
        },
      },
    },
  },
});

// Then, pass it to `<CssVarsProvider theme={theme}>`.
```

Then, you will be able to use `secondary` color on Joy UI components:

```js
<Button color="secondary">
<IconButton variant="outlined" color="secondary">
<Chip variant="soft" color="secondary">
```

#### TypeScript

When working in TypeScript, you must augment the theme's interfaces to include the new palette.

```ts
// You can put this to any file that's included in your tsconfig
import type { PaletteRange } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    // apply to all Joy UI components that support `color` prop
    secondary: true;
  }

  interface Palette {
    // this will make the node `secondary` configurable in `extendTheme`
    // and add `secondary` to the theme's palette.
    secondary: PaletteRange;
  }
}
```

:::warning
Note that adding new palettes increases the HTML bundle size.
:::

### Removing the default tokens

To remove any default token, use `undefined` as a value within the extended theme.
This removes them from the `theme` object and prevents the corresponding CSS variable from being generated.

For example, all default global variant color tokens comes with styles for the `:active` pseudo class.
Here's how you'd remove it from the solid variant.

{{"demo": "RemoveActiveTokens.js", "defaultCodeOpen": true}}
