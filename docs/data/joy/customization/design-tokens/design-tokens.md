# Design tokens

<p class="description">Learn their structure in the theme and how to customize them.</p>

<!-- This page should answer: -->
<!-- What's the structure -->
<!-- How to override, and how to augment the type -->
<!-- (optional) live playground -->

## Structure

Arguably the most important part of the theme is the design tokens.
As the [W3C Community Group](https://github.com/design-tokens/community-group) defines it: _"Design tokens are indivisible pieces of a design system such as colors, spacing, typography scale."_

Joy UI's default theme has three main categories of design tokens that defines the look and feel you get out-of-the-box:

1. Color
2. Typography
3. Shape-related

### Color

The first theme node within the color category is `colorSchemes`.
It houses by default the `light` and `dark` nodes, and inside each one of them, there is the `palette` node, containing the [global variant values](/joy-ui/customization/global-variants) adjusted for both modes.

```js
colorSchemes: {
  light: {
    palette: {
      primary: {
        plainColor: 'valid CSS color',
        plainHoverBg: 'valid CSS color',
        plainActiveBg: 'valid CSS color',
      },
      neutral: {...},
      ...
    },
  },
  dark: {
    palette: {
      primary: {
        plainColor: 'valid CSS color',
        plainHoverBg: 'valid CSS color',
        plainActiveBg: 'valid CSS color',
      },
      neutral: {...},
      ...
    },
  },
}
```

#### Channel tokens

The tokens ended with `Channel` are automatically generated from the provided theme unless you explicitly specify them.
These tokens are useful for creating translucent (alpha) colors.

```js
import Typography from '@mui/joy/Typography';

<Typography
  sx={theme => ({
    color: `rgba(${theme.vars.palette.primary.mainChannel} / 0.72)`,
  })}
>
```

### Typography

There are two levels for typography-related nodes:

#### Low-level tokens

These map out to common CSS typography properties.

```js
fontSize: {...},
fontFamily: {...},
fontWeight: {...},
lineHeight: {...},
letterSpacing: {...},
```

#### Typographic scale

It refers to the opinionated typographic scale using the low-level tokens defined above.

```js
typography: {
  h1: {
    fontFamily: 'var(--joy-fontFamily-display)',
    fontWeight: 'var(--joy-fontWeight-lg)' as CSSProperties['fontWeight'],
    fontSize: 'var(--joy-fontSize-xl4)',
    lineHeight: 'var(--joy-lineHeight-sm)',
    letterSpacing: 'var(--joy-letterSpacing-sm)',
    color: 'var(--joy-palette-text-primary)',
  },
  h2: {...},
  h3: {...},
  ...
}
```

### Shape

The two main theme nodes related to shape elements are:

```js
radius: {...},
shadow: {...},
```

## Overriding the default design tokens

To customize the theme's default design tokens, use the `extendTheme` API to create a new theme and then pass it to the `CssVarsProvider`.
The specified tokens will be deeply merged into the default values.

```js
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
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

function App() {
  return <CssVarsProvider theme={theme}>...</CssVarsProvider>;
}
```

:::info
**Note**: Joy will add the prefix (default as `joy`) to all CSS variables. If you want to change that, do `<CssVarsProvider prefix="myproduct">`.
The generated CSS variables will then be:

```diff
- --joy-palette-primary-50: /* color */ ;
+ --myproduct-palette-primary-50: /* color */ ;
```

:::

## Adding your own tokens

You can add any custom tokens to the theme and still be able to use them in APIs like `styled` and `sx` prop.

```ts
extendTheme({
  colorSchemes: {
    light: {
      palette: {
        // Example of new color tokens.
        // We recommend to limit them to 3 levels deep－in this case `palette.brand.primary`.
        brand: {
          primary: 'green',
          secondary: 'red',
        },
      },
    },
  },
});
```

For **TypeScript**, you need to augment the theme structure to include the new tokens.

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

After that, you can use those tokens in the `styled` function or the `sx` prop:

```jsx
// sx prop
<Button sx={{ color: 'brand.primary' }} />;

// styled function
const Text = styled('p')(({ theme }) => ({
  color: theme.vars.palette.brand.primary,
}));
```

:::warning
**Note:** Adding too many tokens will increase the stylesheet bundle size and add up maintenance costs for your project.
To style components without introducing new tokens, check out the [one-off styling](/joy-ui/customization/one-off-styling) page.
:::
