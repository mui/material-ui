# Global variant tokens

<p class="description">Learn how to customize the global variant tokens.</p>

## Prerequisite

- Read the [global variant concept](/joy-ui/core-features/global-variant/) page.
- Read the [theme tokens](/joy-ui/customization/theme-tokens/) page.
- (optional) Completed [the tutorial](/joy-ui/getting-started/tutorial/).

## How it works

Joy has four built-in global variants, `plain` `outlined` `soft` and `solid`. The styles generated for each variant comes from the global variant tokens inside the theme palette. The tokens are composed of three parts in the format of `[variant][state][CSS property]`.

For example, the `solidBg` refers to the **background** when the variant is **solid** at **initial** state.

Another example, the `outlinedHoverBorder` refers to the **border color** when the variant is **outlined** at **hover** state.

Since the values of these tokens are related to colors, they live inside the palettes so that they are configurable between color schemes:

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

## Override default tokens

We recommend to use **button** as a starting point to customize the global variants because it tends to have the most variants with interaction compared to other components.

Let's style the Joy button to look like [twitter bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#examples):

- The default bootstrap button is comparable to Joy `solid` variant.
- Bootstrap use `secondary` color (grey) which is similar to `neutral` color in Joy.
- The `btn-light` in bootstrap is the combination of `soft` variant and `neutral` color in Joy.
- The bootstrap dark button is a special case for Joy. There are several ways to achieve the style but it is not covered in this section for simplicity.

{{"demo": "BootstrapVariantTokens.js"}}

:::warning
⚠️ All color schemes need to have the same set of global variant tokens, otherwise the style will be inconsistent which causes the problem for server-side rendering.

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

## Remove default tokens

If you want to remove a global variant token, use `undefined` as a value. For example, the default global variant tokens come with the `active` state. If you don't want to have the style for the `:active` pseudo class you can do this:

{{"demo": "RemoveActiveTokens.js"}}

## Custom variant style

Joy lets you apply custom styles to each variant via the `variants` node. The custom style can also be applied to a specific palette which will be merged to the style generated from the global variant tokens.

{{"demo": "CustomVariantStyle.js"}}

:::warning
The custom style will be applied to all components with the specific variant and color. If you want to apply the style for a set of components, you should look at [theme components](/joy-ui/customization/theme-components/) instead.
:::
