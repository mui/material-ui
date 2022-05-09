# Global variant

<p class="description">Enabling consistent look and feel to all components.</p>

<!-- The intention of the page is to describe the overall feature like "what is it?", "what it looks like?", other topics like "The why", "How to customize" etc. should be in another page.  -->

Joy's Global variants are sets of styles that live inside the theme. Built-in or custom components can access to those styles to create consistent user interfaces that represent your branding.

However, updating the global variants can be a nightmare if it is not strict enough, that's why the global variants by default contain three CSS properties, the `color`, `background`, and `border`. These properties represent most of the visual colors of the interfaces so when any component wants to use a global variant it has to always specify a color from the theme palette.

<!-- Add a link to read more detail why we limit to these 3 properties -->

## Types of variants

Since the global variants include only a few properties, there are 4 values that we believe they cover most of the modern design nowadays.

<!-- A demo of buttons, chips, and links with all variants -->

We name them in a way that it is easy to guest the appearance without looking at the screen.

## Level of importancy

The global variants convey the level of importancy when they are used together. The highest importancy variant is `solid` because of its high contrast/vivid background. The medium importancy variants are `soft` and `outlined` which can be used interchangebly based on the circumstance. The `soft` variant has a background that create a subtle constrast from the parent. Similarly, the `outlined` uses border to create the constrast. Lastly, the `plain` variant uses only text color to provide the least importancy among other variants.

<!-- A demo of small UIs that use different components with variants to showcase -->

As you can see from the demo above that global variants let you create meaningful user intefaces with least effort.

## Atomic tokens

Joy generates a global variant style by looking at the theme palette tokens. The tokens are atomic as if they are translated from the design tool to make customization easier. Developers can customize a specific CSS property of a given color scheme, variant, palette and state at a global level.

Here is an example of the default `solid` variant tokens:

```js
// the defaul theme
{
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidBg: 'var(--joy-palette-primary-600)',
          solidColor: '#fff',
          solidHoverBg: 'var(--joy-palette-primary-700)',
          solidActiveBg: 'var(--joy-palette-primary-800)',
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
