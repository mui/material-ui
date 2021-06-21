# Extend Props

<p class="description">You can add more colors, sizes, variants to components and apply across the application.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

It can be done by adding new variant to component theme. Let's add new variant called `tinted` to `Chip`.

```tsx
// themeSetup.ts or the file contains application theme

import { ThemeProvider, createTheme, alpha } from '@material-ui/core/styles';

let theme = createTheme();

theme = createTheme({
  components: {
    MuiChip: {
      variants: [
        {
          props: { variant: 'tinted', color: 'primary' },
          style: {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
            fontWeight: 500,
          },
        }
      ],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Chip variant="tinted" color="primary" label="Tinted Primary">
    </ThemeProvider>
  )
}
```

As a result `<Chip variant="tinted" color="primary" />` will display light primary background. See the [full demo](/guides/extend-props/#tinted-chip-variant) at the bottom of the page.

> For **Typescript** project, you need to extend the props via module augmentation.

```ts
// themeSetup.ts

declare module '@material-ui/core/Chip' {
  interface ChipPropsVariantOverrides {
    tinted: true;
  }
}
```

Let's take a step further and extending `color`, `size` to `Chip` component. For color, we need to extend the color palette for the new color.

```tsx
// themeSetup.ts

import {
  ThemeProvider,
  createTheme,
  alpha,
  SimplePaletteColorOptions,
} from '@material-ui/core/styles';

declare module '@material-ui/core/styles' {
  interface Palette {
    blueGrey: SimplePaletteColorOptions;
  }
  interface PaletteOptions {
    blueGrey: SimplePaletteColorOptions;
  }
}
```

This will allow us to create the theme with `blueGrey` color key without typescript error, also it is type-safe when accessing `theme.palette.blueGrey` in other places.

```tsx
theme = createTheme({
  palette: {
    blueGrey: {
      main: blueGrey[700],
      light: blueGrey[400],
      dark: blueGrey[900],
      contrastText: '#fff',
    },
  },
  // ...components
});
```

Next, extend the `color` and `size` of `Chip`.

```tsx
// themeSetup.ts

declare module '@material-ui/core/Chip' {
  interface ChipPropsVariantOverrides {
    tinted: true;
  }

  interface ChipPropsColorOverrides {
    blueGrey: true;
  }

  interface ChipPropsSizeOverrides {
    large: true;
  }
}

theme = createTheme({
  components: {
    MuiChip: {
      variants: [
        // ...tinted variant
        {
          props: { size: 'large' },
          style: {
            height: 40,
            borderRadius: 20,
            fontSize: '1rem',
            fontWeight: 'bold',
            letterSpacing: 0,
          },
        },
      ],
    },
  },
});
```

## Tinted chip variant

Let's take a look at the result!

{{"demo": "pages/guides/extend-props/TintedChip.js"}}
