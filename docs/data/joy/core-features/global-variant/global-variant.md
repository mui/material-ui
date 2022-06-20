# Global variant

<p class="description">Learn how Joy enables consistent look and feel across all of its components.</p>

<!-- The intention of the page is to describe the overall feature like "what is it?", "what it looks like?", other topics like "The why", "How to customize" etc. should be in another page.  -->

Joy's Global variants are sets of styles that live inside the theme.
Both native and custom-created components can access those styles.
It mainly consists of three CSS properties, `color`, `background`, and `border`.
These are basically the properties where color is mostly applied and variants pull shades from the multiple palettes of the theme.

:::info
Updating the global variants can be painful given how broad their usage is. So make sure whenever you have to do it, you do it in small increments, keeping it strict.
:::

<!-- Add a link to read more detail why we limit to these 3 properties -->

## Types of variants

These four global variants seem to cover most of the design being used today in modern web applications.
Their names are supposed to be straightforward, meaning you should be able to assume how they look without looking at the screen.

<!-- A demo of buttons with all variants -->

{{"demo": "GlobalVariantComponents.js"}}

## Hierarchy of importance

Different variants convey different levels of importance.
In most cases, you'd want to use the `solid` variant for primary and most important actions given how high contrast and vivid it is.
`soft` and `outlined` are mostly used for secondary actions, using a light background and border color respectively to add contrast.
You should choose between each of them depending on your specific use case and personal preference.
Lastly, the `plain` variant, as it only contains text and no background, is usually used for tertiary, least important actions.

<!-- A demo of small UIs that use different components with variants to showcase -->

{{"demo": "LevelOfImportancy.js", "bg": true}}

Global variants are an easy and effortless way to create meaningful user interfaces.
Additionally, as a benefit, dark mode works without any modification to them.
Click on the Settings icon at the upper right hand corner and turn dark mode on if you haven't yet!

## Atomic tokens

The Global variants generation is made by looking at the theme palette tokens which are atomic, similar to how you'd do it in design tools.
You should be able to customize a specific CSS property of any given color scheme, variant, palette, and state at a global level.

Here are some of the theme's default `solid` variant tokens:

```js
{
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: 'var(--joy-palette-primary-600)',       // the initial background
          solidColor: '#fff',                              // the initial color
          solidHoverBg: 'var(--joy-palette-primary-700)',  // the :hover background
          solidActiveBg: 'var(--joy-palette-primary-800)', // the :active background
          // ...other tokens
        },
        neutral: {
          solidBg: 'var(--joy-palette-primary-700)',
          solidColor: '#fff',
          solidHoverBg: 'var(--joy-palette-primary-800)',
          solidActiveBg: 'var(--joy-palette-primary-900)',
          // ...other tokens
        },
        // ...other palettes
      }
    },
    dark: {
      palette: {
        // similar structure but different values
      }
    },
  }
}
```
