# Global variant tokens

<p class="description">Learn how to customize the global variant tokens.</p>

## How it works

By default, Joy UI has four built-in global variants: `plain, `outlined`, `soft`, and `solid`.
Check the [Global variants](/joy-ui/core-features/global-variant/) page within the Core features folder to learn more about it.

The colors for each variant are defined inside the `palette` node, a [color-related design token](joy-ui/customization/design-tokens/#color) from the theme.
The variant's color token name is composed of three parts, in the format of **variant | state | CSS property**.

For example:

- `solidBg` refers to the solid variant initial state (as there is none specified) background color.
- `outlinedHoverBorder` refers to the outlined variant border color when hovered.

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

## Overriding the default global variants

If you want to customize the global variants, we recommend to start from the Button component as it tends to have the larger amount of interactive variants when compared to other components.

As an example, let's customize Joy's [`Button`](/joy-ui/react-button/) so they look like the ones from [Bootstrap](https://getbootstrap.com/docs/5.2/components/buttons/#examples):

- Bootstrap's default buttons are comparable to Joy's `solid` variant.
- Bootstrap's `secondary` variant uses a grey color, similar to Joy's `neutral`.
- Bootstrap's `btn-light` is similar to Joy's button using the `soft` variant and `neutral` color palette.
- Joy doesn't have anything similar, out-of-the-box, to Bootstrap's `btn-dark`.
  - We could achieve that using one of the tree main customization approaches.

{{"demo": "BootstrapVariantTokens.js"}}

:::warning
⚠️ Make sure that every color schemes have the same set of global variant tokens, otherwise, their styles will be inconsistent. It can also cause problems for server-side rendering.

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

## Removing a global variant token

To remove a global variant token, use `undefined` as a value.

For example, all default global variant tokens comes with the `active` state.
If you don't want to have the style for the `:active` pseudo class you can do this:

{{"demo": "RemoveActiveTokens.js", "defaultCodeOpen": true}}

## Custom global variant styles

You can apply custom styles to each global variant via the `variants` node.
They can also be applied to a specific palette, which will therefore be merged to the styles generated from the global variant tokens.

{{"demo": "CustomVariantStyle.js", "defaultCodeOpen": true}}

:::warning
Note that the custom styles will be applied to every component using the specific variant and color.
If you want to apply styles for a specific set of components, use the [theme components](/joy-ui/customization/theme-components/) approach instead.
:::
