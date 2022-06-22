# Theme tokens

<p class="description">Learn about the two categories of tokens within Joy UI's default theme and how to customize them.</p>

The [W3C Community Group](https://github.com/design-tokens/community-group) defines design tokens as: _"...indivisible pieces of a design system such as colors, spacing, typography scale."_
Joy UI builds up on this concept to develop its theme, consisting of two categories: low-level and global variant tokens.

## Low-level tokens

Low-level tokens refer to the smallest units of style that defines the look and feel Joy UI has out-of-the-box.
They're labeled as _low-level_ because they can be used to compose larger tokens, such as the typography scale.

### Structure

Joy UI's default theme has three main categories of low-level design tokens:

1. Color
2. Typography
3. Shape-related

#### Color

The first theme node within the color category is `colorSchemes`.
It houses the `light` and `dark` nodes, and inside each one of them, there is a `palette` node, containing the [global variant tokens](#global-variant-tokens) adjusted for both modes.

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

Visit the [ColorSystem interface](https://github.com/mui/material-ui/blob/master/packages/mui-joy/src/styles/types/colorSystem.ts#L142) to see all of the available interfaces.

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

#### Typography

Within the typography-related tokens, there are first the ones that map out to common CSS typography properties:

```js
fontSize: {...},
fontFamily: {...},
fontWeight: {...},
lineHeight: {...},
letterSpacing: {...},
```

They're then used to build up Joy UI's typographic scale:

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

#### Shape

The two main theme nodes related to shape elements are:

```js
radius: {...},
shadow: {...},
```

### Overriding low-level tokens

To customize the theme's low-level design tokens, use the `extendTheme` API to create a new theme and then pass it to the `CssVarsProvider`.
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
**Note**: Joy UI will add the prefix (default as `joy`) to all CSS variables.
To change it, use `<CssVarsProvider prefix="myproduct">` and the generated CSS variables will then be:

```diff
- --joy-palette-primary-50: /* color */ ;
+ --myproduct-palette-primary-50: /* color */ ;
```

:::

### Adding low-level tokens

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
**Note:** Adding new tokens is worth it when you know that a large number of components will use them. That's because doing so increases stylesheet bundle size, plus the added maintenance costs.

If you're not sure about it yet, we recommend using [the `sx` prop](/joy-ui/customization/approaches/#sx-prop) for one-off customizations.
:::

## Global variant tokens

By default, Joy UI has four built-in [global variants](/joy-ui/main-features/global-variant/) tokens: `plain`, `outlined`, `soft`, and `solid`.

### Structure

The colors for each variant are defined inside the `palette` node.
The variant name is composed of three parts, in the format of **variant type | state | CSS property**.

For example:

- `solidBg` refers to the solid variant's initial state (as there is none specified) background color.
- `outlinedHoverBorder` refers to the outlined variant's hovered border color.

```js
// theme
{
  colorSchemes: {
    light: {
      palette: {
        primary: {
          plainColor: 'valid CSS color',
          plainHoverBg: 'valid CSS color',
          plainActiveBg: 'valid CSS color',
          // ...other variant tokens
        },
        neutral: {
          plainColor: 'valid CSS color',
          plainHoverBg: 'valid CSS color',
          plainActiveBg: 'valid CSS color',
          // ...other variant tokens
        },
        danger: {
          plainColor: 'valid CSS color',
          plainHoverBg: 'valid CSS color',
          plainActiveBg: 'valid CSS color',
          // ...other variant tokens
        },
        info: {
          plainColor: 'valid CSS color',
          plainHoverBg: 'valid CSS color',
          plainActiveBg: 'valid CSS color',
          // ...other variant tokens
        },
        success: {
          plainColor: 'valid CSS color',
          plainHoverBg: 'valid CSS color',
          plainActiveBg: 'valid CSS color',
          // ...other variant tokens
        },
        warning: {
          plainColor: 'valid CSS color',
          plainHoverBg: 'valid CSS color',
          plainActiveBg: 'valid CSS color',
          // ...other variant tokens
        },
      }
    },
    dark: {
      // ...same structure with different values
    }
  }
}
```

### Overriding global variant tokens

To customize the global variants, we recommend to start from the Button component as it tends to have the larger amount of interactive variants when compared to other components.

As an example, let's customize Joy UI's [`Button`](/joy-ui/react-button/) so they look like the ones from [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#examples):

- Bootstrap's default buttons are comparable to Joy UI's `solid` variant.
- Bootstrap's `secondary` variant uses a grey color, similar to Joy UI's `neutral`.
- Bootstrap's `btn-light` is similar to Joy UI's button using the `soft` variant and `neutral` color palette.
- Joy UI doesn't have anything similar, out-of-the-box, to Bootstrap's `btn-dark`.
  - We could achieve that using one of the tree main customization approaches.

{{"demo": "BootstrapVariantTokens.js"}}

:::warning
**⚠️ Keep in mind:** Make sure that every color schemes have the same set of global variant tokens, otherwise, their styles will be inconsistent, causing problems for server-side rendering.

```js
extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBorder: '#0d6efd',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidBorder: '#111',
        },
      },
    },
  },
});
```

:::

### Removing global variants tokens

To remove a global variant token, use `undefined` as a value.

For example, all default global variant tokens comes with styles for the `:active` pseudo class.
Here's how you'd remove it from the solid Button variant.

```jsx
// ⚠️ If the value is `undefined`, it should be `undefined` for other color schemes as well.
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

### Custom global variant token styles

You can apply custom styles to each global variant via the `variants` node.
They can also be applied to a specific palette, which will therefore be merged to the styles generated from the global variant tokens.

```jsx
const theme = extendTheme({
  variants: {
    solid: {
      primary: {
        boxShadow: '0 2px 6px 0 rgba(0,0,0,0.3)',
      },
    },
    solidHover: {
      primary: {
        '&:hover': {
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.4)',
        },
      },
    },
  },
});
```

{{"demo": "CustomVariantStyle.js"}}

:::warning
**Keep in mind:** changing styles for the solid variant means that every component solid variant will have them. To customize how a specific component look like, use the [themed components](/joy-ui/customization/themed-components/) approach instead.
:::
