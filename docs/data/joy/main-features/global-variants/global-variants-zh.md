# Global variants

<p class="description">Joy UI enables consistent look and feel across all components by using global variants.</p>

Every Joy UI component has the same set of 4 global variants. All of them are pulling styles from the same place, ensuring then that each variant looks the same across both "native" and custom components. That way, you get a consistent look and feel throughout your design system.

The different design of each variant is mostly achieve using different combination of values for the `color`, `background`, and `border` CSS properties.

## Types of variants

These four global variants seem to cover most of the design being used today in modern web applications. Their names are supposed to be straightforward, meaning you should be able to assume how they look without looking at the screen.

{{"demo": "GlobalVariantComponents.js"}}

## Hierarchy of importance

Each variant conveys a different level of importance in the UI. In most cases, the `solid` variant will be used for primary and generally very important actions on the page. Alternatively, `soft`, `outlined`, or `plain` is used for secondary and/or tertiary types of actions. Their usage is heavily dependent on context but it's a good rule of thumb to keep the hiearchy of importance in mind.

{{"demo": "LevelOfImportancy.js"}}

## Atomic tokens

Global variants build off of the atomic tokens from the palette within the theme. You can customize each CSS property as a CSS variable. Here are some of the theme's default `solid` variant tokens:

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
