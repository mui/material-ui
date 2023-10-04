# Color inversion

<p class="description">Joy UI components can invert their colors to match with the parent's variant.</p>

## Motivation

The Joy UI [global variants feature](/joy-ui/main-features/global-variants/) provides a consistent set of values for the `variant` prop.
However, depending on the design, they may not fit perfectly, like in the right-hand side example, where the Card parent variant overlaps with its child components.

{{"demo": "ColorInversionMotivation.js"}}

- On the left, the Button variant is `solid`. Given the Card wrapper hasn't a specifically defined variant value, it renders its default one, which is `outlined`, making the design work well.
- On the right, the Card uses `solid`, disrupting the design's hierarchy and contrast.

The color inversion feature tackles precisely this type of situation conveniently, preserving the meaningfulness of each global variant.

## Overview

When color inversion is enabled on the parent component, all children components will invert their styles regardless of their color prop to match the parent's background by keeping the same hierarchy of importance based on their variants.

{{"demo": "ColorInversionOverview.js"}}

:::info
The color inversion feature is only available for `soft` and `solid` variants because the rest of the global variants don't have background by default.
:::

### Benefits

- Color inversion reduces a significant amount of styling effort. It handles all of the visual states (hover, active, and focus) on all the children.
- It makes your interface scalable. New components added to the area will just work.
- It works for both client-side and server-side rendering.
- It works for both light and dark mode.
- It can be disabled at any time without impacting the structure of the components.
- It is an opt-in feature. If you don't use it, the extra CSS variables won't be included in the production style sheet.
- Some children can be excluded from the color inversion, see ["skip color inversion on a child"](#skip-color-inversion-on-a-child) section.

### Trade-offs

- If the surface component contains just a few components, the style sheet size of the CSS variables might be bigger than customizing the styles of each child.
- It doesn't work with browsers that don't support [CSS variables](https://caniuse.com/css-variables).

## Usage

### Supported components

All the surface components, including others like the Alert, Card, Drawer, Modal Dialog, Menu, and Sheet, accept the `invertedColors` prop for their `solid` and `soft` variants.

{{"demo": "ColorInversionSurface.js"}}

### Portal popup

Color inversion does not affect the popup slot of the Autocomplete, Menu, and Tooltip components by default.
To enable it, on the `slotProps` prop of these components, set `disablePortal` to true.

{{"demo": "ColorInversionPopup.js"}}

### Turning it off on a specific child

Add the `data-skip-inverted-colors` attribute to the child component you want to turn color inversion off within an inverted container.

{{"demo": "ColorInversionSkip.js"}}

### Apply color inversion to any parent

```js
import { applySolidInversion, applySoftInversion } from '@mui/joy/colorInversion';
```

Use the `applySolidInversion` or `applySoftInversion` utilities to add color inversion to any parent component.
The Card component, for example, already uses it internally if containing the `invertedColors` prop.

The examples below show how to use it with either the `sx` prop or the `styled` API:

#### With the sx prop

{{"demo": "ColorInversionAnyParent.js"}}

#### With the styled API

{{"demo": "ColorInversionAnyParentStyled.js"}}

## How it works

Color inversion adds CSS variables to the component using the `invertedColors` prop or the apply utilities. There's no [React context](https://react.dev/learn/passing-data-deeply-with-context) involved in this feature.

```jsx
<Sheet invertedColors variant="solid" color="neutral">

// The parent's style sheet
{
  // the values of these variables depends on the parent's variant and color.
  --variant-softColor: …;
  --variant-softBg: …;
  --variant-softHoverColor: …;
  --variant-softHoverBg: …;
  --variant-softActiveBg: …;
  … // other variants
  --joy-palette-text-primary: …;
  --joy-palette-text-secondary: …;
  --joy-palette-text-tertiary: …;
  --joy-palette-background-surface: …;
  … // other theme palette tokens
}
```

As a result, the children will use these CSS variables instead of the theme:

```jsx
// The children style sheet
// The values of these variables are inherited from the parent.
{
  color: var(--joy-palette-text-primary);
  background: var(--joy-palette-background-surface);
  …
}
```

## Common examples

### Header

{{"demo": "ColorInversionHeader.js"}}

### Footer

{{"demo": "ColorInversionFooter.js"}}

### Side navigation

{{"demo": "ColorInversionNavigation.js"}}

### Marketing section

{{"demo": "ColorInversionMarketing.js"}}
