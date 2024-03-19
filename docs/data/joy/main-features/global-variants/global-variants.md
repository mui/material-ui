# Global variants

<p class="description">Joy UI provides a set of global variants to ensure consistency across your app.</p>

All Joy UI components accept four global variants: `solid`, `soft`, `outlined`, and `plain`. These variants are intended to cover the majority of use cases in modern web design.

The demo below shows how the variants look and feel across several Joy UI components:

{{"demo": "GlobalVariantComponents.js"}}

Global variants pull their styles from a single source, helping you to ensure a consistent look and feel across both pre-built Joy UI components and any custom components you build.

Under the hood, the variants are primarily differentiated by the values for their `color`, `background`, and `border` CSS properties.

## Hierarchy of importance

Each variant conveys a different level of importance in the user interface:

- `solid` is best suited for primary elements and the most important actions on the page
- `soft`, `outlined`, and `plain` are better for secondary and tertiary actions

Which variant you should choose largely depends on the context within the design, but it's important to keep this hierarchy in mind for a balanced UI.

The demo below illustrates a well-balanced design using multiple variants:

{{"demo": "LevelOfImportance.js"}}

## Customizing global variants

Global variants build off of the atomic tokens from the palettes, which live within your app's themes.
You can use standard CSS or CSS variables to customize these properties.

Here's an example of some of the default `solid` variant tokens:

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
