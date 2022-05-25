# Theme tokens

<p class="description">Learn how to customize the theme tokens.</p>

<!-- This page should answer: -->
<!-- What's the structure -->
<!-- How to override, and how to augment the type -->
<!-- (optional) live playground -->

## Override default tokens

To customize the default theme tokens, you have to use `extendTheme` API to create a theme and then pass it to `CssVarsProvider`.

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {}, // color tokens for light mode
    dark: {}, // color tokens for dark mode
  },
  fontSize: {}, // T-shirt font sizes
  fontFamily: {}, // font configuration
  fontWeight: {}, // T-shirt font weights
  lineHeight: {}, // T-shirt line heights
  letterSpacing: {}, // T-shirt letter spacings
  radius: {}, // T-shirt border radii
  fontWeight: {}, // T-shirt font weights
  shadow: {}, // T-shirt box shadows
});

function App() {
  return <CssVarsProvider theme={theme}>...</CssVarsProvider>;
}
```

The specified tokens will be deeply merged with the default values. The value can also be a CSS variable that reference to another one:

```js
extendTheme({
  colorSchemes: {
    light: {
      palette: {
        background: {
          // palette.neutral.50 is the default token
          body: 'var(--joy-palette-neutral-50)',
        },
      },
    },
  },
});
```

:::info
**Note**: Joy will add the prefix (default as `joy`) to all CSS variables. If you want to change the prefix, simply do `<CssVarsProvider prefix="brand">`. The generated CSS variables will be:

```css
--brand-palette-primary-50: /* color */ ;
--brand-palette-primary-100: /* color */ ;
...
```

:::

## Add your own tokens

You can add any custom tokens to the theme and you will be able to use those tokens in APIs like `styled` and `sx` prop.

```ts
// The values are valid CSS colors. https://www.w3.org/wiki/CSS/Properties/color/keywords
extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // This is the new node. We recommend to limit to 3 levels deep, in this case `palette.brand.primary`.
        brand: {
          primary: 'green',
          secondary: 'red',
        },
      },
    },
  },
});
```

For typescript user, you need to augment the theme structure to include the new tokens.

```ts
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

declare module '@mui/joy/styles' {
  interface Palette {
    brand: {
      primary: string;
      secondary: string;
    };
  }
}
```

For more details about the interfaces, take a look at the specific structure below.

## Structure

If you want to have different values for light and dark mode, specify the tokens in the `colorSchemes` node. The rest of the structure does not change between modes.

### Color schemes

It contains the supported color schemes of the application (`light` and `dark` are the default nodes). We recommend putting all of the color related tokens inside the `palette` node to leverage short-hand syntax via the `sx` prop.

**Example**:

```ts
extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          // overriding default tokens
          // colors are taken from https://github.com/tailwindlabs/tailwindcss/blob/master/src/public/colors.js#L76
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          // new tokens
          gradient: 'linear-gradient(45deg, var(--joy-palette-primary-800), var(--joy-palette-primary-500))',
        },
        background: {
          // new tokens
          header: 'var(--joy-palette-neutral-100)',
        }
      },
      // new tokens
      opacity: {
        placeholder: '0.5',
      }
    };
    dark: {
      // use the same structure to customize the tokens for dark mode
    },
  }
})

// For typescript, you need module augmentation to add the new tokens to the theme interface.
declare module '@mui/joy/styles' {
  interface PalettePrimary {
    gradient: string;
  }

  interface PaletteBackground {
    header: string;
  }

  interface ColorSystem {
    opacity: {
      placeholder: string;
    }
  }
}
```

You can check the [ColorSystem interface](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/colorSystem.ts#L142) to see all of the available interfaces.

:::warning
Adding too much tokens will increase the stylesheet bundle size and might create maintenance cost for your project. To style the component without introducing new tokens, check out the [one-off styling](/joy-ui/customization/one-off-styling) page.
:::

#### Channel tokens

The tokens ended with `Channel` are automatically generated from the provided theme unless you explicitly specify them. These tokens are useful for creating translucent(alpha) colors. The usage in the component looks like this:

```js
import Typography from '@mui/joy/Typography';

<Typography
  sx={theme => ({
    color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.72)`,
  })}
>
```

### Font size

All the font sizes are listed [here](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/typography.ts#L4). Customizing the values, especially `sm` and `md`, will affect the default look and feel of the components that can render a text.

**Example**:

```js
extendTheme({
  fontSize: {
    // default token
    md: '14px', // `rem` also work

    // new token
    label: '0.75rem',
  },
});

// For typescript, you need module augmentation to add the new tokens to the theme interface.
declare module '@mui/joy/styles' {
  interface FontSize {
    label: string;
  }
}
```

### Font family

All the font family values are listed [here](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/typography.ts#L17).

**Example**:

```js
extendTheme({
  fontFamily: {
    // default token
    body: 'Inter, var(--joy-fontFamily-fallback)', // we recommend to append the fallback font.

    // new token
    writing: "'Satisfy', cursive",
  },
});

// For typescript, you need module augmentation to add the new tokens to the theme interface.
declare module '@mui/joy/styles' {
  interface FontFamily {
    writing: string;
  }
}
```

### Font weight

All the font weights are listed [here](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/typography.ts#L24).

**Example**:

```js
extendTheme({
  fontWeight: {
    // default token
    md: '600',

    // new token
    xl2: "900",
  },
});

// For typescript, you need module augmentation to add the new tokens to the theme interface.
declare module '@mui/joy/styles' {
  interface FontFamily {
    xl2: string;
  }
}
```

### Line height

All the line heights are listed [here](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/typography.ts#L32).

**Example**:

```js
extendTheme({
  lineHeight: {
    // default token
    md: '1.5',

    // new token
    xl: '2',
  },
});

// For typescript, you need module augmentation to add the new tokens to the theme interface.
declare module '@mui/joy/styles' {
  interface LineHeight {
    xl: string;
  }
}
```

### Letter spacing

All the letter spacings are listed [here](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/typography.ts#L32).

**Example**:

```js
extendTheme({
  lineHeight: {
    // default token
    lg: '0.15em',

    // new token
    xl: '0.2em',
  },
});

// For typescript, you need module augmentation to add the new tokens to the theme interface.
declare module '@mui/joy/styles' {
  interface LetterSpacing {
    xl: string;
  }
}
```

### Radius

All the radii are listed [here](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/radius.ts).

**Example**:

```js
extendTheme({
  radius: {
    // default tokens
    xs: '4px',
    sm: '6px',
    md: '12px',

    // new token
    xl2: '24px',
  },
});

// For typescript, you need module augmentation to add the new tokens to the theme interface.
declare module '@mui/joy/styles' {
  interface Radius {
    xl2: string;
  }
}
```

### Shadow

All the shadows are listed [here](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/shadow.ts). We recommend to use `var(--joy-shadowRing)` and `var(--joy-shadowChannel)` for creating shadows because it lets the shadow color to be customized on the component.

**Example**:

```js
extendTheme({
  radius: {
    // default tokens
    xs: 'var(--joy-shadowRing), 0 1px 2px 0 rgba(var(--joy-shadowChannel) / 0.12), 0 1px 4px 0 rgba(var(--joy-shadowChannel) / 0.08)',

    // new token
    xl2: 'var(--joy-shadowRing), 0 1px 4px 0 rgba(var(--joy-shadowChannel) / 0.2), 0 1px 6px 0 rgba(var(--joy-shadowChannel) / 0.12), 0 4px 20px 0 rgba(var(--joy-shadowChannel) / 0.1)',
  },
});

// For typescript, you need module augmentation to add the new tokens to the theme interface.
declare module '@mui/joy/styles' {
  interface Shadow {
    xl2: string;
  }
}
```
