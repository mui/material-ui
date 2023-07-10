# Theme colors

<p class="description">Learn about the default theme's color palette and how to customize it.</p>

## Default tokens

The table below lists all the default tokens and their values in light and dark color schemes.
Some tokens reuse values from other tokens using the [`var(--*)`](https://developer.mozilla.org/en-US/docs/Web/CSS/var) syntax.

{{"demo": "PaletteThemeViewer.js", "bg": "inline"}}

### Channel tokens

The default tokens ending with `Channel` are automatically generated for each palette.
These tokens are useful for creating translucent colors (`rgba`).

- `lightChannel`: is generated from the palette's `200` token.
- `mainChannel`: is generated from the palette's `500` token.
- `darkChannel`: is generated from the palette's `800` token.

The example usage is:

```js
import Typography from '@mui/joy/Typography';

<Typography
  sx={theme => ({
    color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.72)`,
  })}
>
```

### Global variant tokens

By default, Joy UI has four built-in [global variants](/joy-ui/main-features/global-variants/) tokens: `plain`, `outlined`, `soft`, and `solid`.

The global variant token is composed of three parts, in the format of **variant type | state | CSS property**.

For example:

- `solidBg` refers to the solid variant's background color in its initial state.
- `outlinedHoverBorder` refers to the outlined variant's border color in its hover state.

There are six palettes (`primary`, `neutral`, `danger`, `info`, `success`, and `warning`) that contain the global variant tokens as listed in the [table above](#default-tokens).

## Customizing the default palette

For each color scheme, the default colors are grouped within the `palette` node.

For example, the snippet below customizes the primary palette in dark mode:

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

## Customizing global variant tokens

We recommend using the [Button](/joy-ui/react-button/) component as a jumping-off point when customizing the global variants, because it gives you access to more of the interactive variants available than some other components.

As an example, let's customize Joy UI's Button so to match the style of [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#examples):

- Bootstrap's default buttons are comparable to Joy UI's `solid` variant.
- Bootstrap's `secondary` variant uses a grey color, similar to Joy UI's `neutral`.
- Bootstrap's `btn-light` is similar to Joy UI's button using the `soft` variant and `neutral` color palette.
- Joy UI's defaults don't include anything similar to Bootstrap's `btn-dark`.
  - We can recreate it using one of the three main customization approaches.

{{"demo": "BootstrapVariantTokens.js"}}

:::info
Customizing the global variant tokens affects all Joy UI components that support the `variant` prop.
:::

## Removing the default tokens

To remove any default token, use `undefined` as a value.
This removes it from the `theme` object and prevents the corresponding CSS variable from being generated.

For example, all default global variant tokens comes with styles for the `:active` pseudo class.
Here's how you'd remove it from the solid variant.

```jsx
// ⚠️ If the value is `undefined`, it should be `undefined` for all color schemes.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidActiveBg: undefined,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidActiveBg: undefined,
        },
      },
    },
  },
});
```

{{"demo": "RemoveActiveTokens.js"}}

## Adding more colors

Any custom tokens that you add to theme are available for use with both the `styled` and `sx` APIs.

```js
extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // Example of new color tokens.
        // We recommend to limit them to 3 levels deep－in this case:
        // `palette.gradient.primary`.
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

### TypeScript

When working in TypeScript, you must augment the theme's `Palette` interface to include the new tokens.

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

As an alternative, consider using [the `sx` prop](/joy-ui/customization/approaches/#sx-prop) for one-off customizations.
:::

## Adding more palettes

You can add your own palettes to your app's theme to pass custom color schemes to any components that accept the `color` prop.

:::warning
Adding a new palette increases the HTML bundle size. The more tokens you added to the palette, the bigger the bundle size.
:::

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

Then, you will be able to use `secondary` color on Joy UI components:

```js
<Button color="secondary">
<IconButton variant="outlined" color="secondary">
<Chip variant="soft" color="secondary">
```

### TypeScript

When working in TypeScript, you must augment the theme's interfaces to include the new palette.

```ts
// You can put this to any file that's included in your tsconfig
import type { PaletteRange } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface ColorPalettePropOverrides {
    // apply to all Joy UI components that support `color` prop
    secondary: true;
  }

  interface Palette {
    // this will make the node `secondary` configurable in `extendTheme`
    // and add `secondary` to the theme's palette.
    secondary: PaletteRange;
  }
}
```
