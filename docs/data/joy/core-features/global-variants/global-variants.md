# Global variants

<p class="description">Joy UI enables consistent look and feel across all components by using global variants.</p>

<!-- The intention of the page is to describe the overall feature like "what is it?", "what it looks like?", other topics like "The why", "How to customize" etc. should be in another page.  -->

It enables every component across the library to have the same set of variants. That way, both "native" and custom components can access those styles.

Global variants mostly consist of different CSS values for the `color`, `background`, and `border` properties.

:::info
**Keep in mind:** when updating or customizing the global variants, make sure to do it in small increments given how broad their usage is. That way, you reduce the risk of affecting every component at once.
:::

<!-- Add a link to read more detail why we limit to these 3 properties -->

## Types of variants

These four global variants seem to cover most of the design being used today in modern web applications.
Their names are supposed to be straightforward, meaning you should be able to assume how they look without looking at the screen.

<!-- A demo of buttons with all variants -->

{{"demo": "GlobalVariantComponents.js"}}

## Hierarchy of importance

Each variant conveys a different level of importance in the UI.
In most cases, the `solid` variant will be used for primary and generally very important actions on the page.
Alternatively, `soft`, `outlined`, or `plain` is used for secondary and/or tertiary types of actions.
Their usage is heavily dependent on context but it's a good rule of thumb to keep the hiearchy of importance in mind.

<!-- A demo of small UIs that use different components with variants to showcase -->

{{"demo": "LevelOfImportancy.js"}}

## Atomic tokens

Global variants build off of the atomic tokens from the palette within the theme.
You can customize each CSS property as a CSS variable.
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
