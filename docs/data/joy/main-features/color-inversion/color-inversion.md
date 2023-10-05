# Color inversion

<p class="description">Joy UI components can invert their colors to match with the parent's variant.</p>

## Motivation

[Global variants](/joy-ui/main-features/global-variants/) provide a consistent `variant` prop that lets you control the hierarchy of importance within a group of Joy UI components. However, they are not working as expected when global variants are used in multiple layers.

The example below (on your right-hand side) shows the problem when the interface has more than one layer that applies the global variants:

{{"demo": "ColorInversionMotivation.js"}}

On the **left**, the Button's variant is `solid`, which is the highest emphasis level compared to other components.
This conforms to the visual appearance on the screen.

On the **right**, the problem arises when the container's variant becomes `solid`.
The Button is no longer the highest emphasis element because it has the same background as the container.
Also, the text and the icon button don't contrast enough with the parent's background.

The color inversion is implemented to solve this issue, keeping the global variants meaningful when multiple layers of global variants are composed together.

## Overview

When color inversion is enabled on the parent component, all of Joy UI children will invert their styles regardless of its color prop to match the parent's background by keeping the same hierarchy of importance based on their variants.

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

- If the surface component contains just a few components, the style sheet size of the CSS variables might be **bigger** than customizing the styles of each individual child.
- It doesn't work with browsers that don't support [CSS variables](https://caniuse.com/css-variables).

## Usage

### Surface components

Surface components, including the Alert, Card, Drawer, ModalDialog, Menu, and Sheet, have the `invertedColors` prop to enable color inversion for `solid` and `soft` variants.

{{"demo": "ColorInversionSurface.js"}}

### Portal popup

By default, color inversion has no effect on the popup slot of the Autocomplete, Menu, and Tooltip components.
To enable it, set `disablePortal` to true on the `slotProps`.

:::info
The popup slot of the Select component has `disablePortal` set to true by default.
:::

{{"demo": "ColorInversionPopup.js"}}

### Skip color inversion on a child

To skip color inversion on a specific child, set `data-skip-inverted-colors` attribute to the component.

The component with `data-skip-inverted-colors` and its children will be excluded from the color inversion.

{{"demo": "ColorInversionSkip.js"}}

### Apply color inversion to any parent

Use `applySolidInversion` or `applySoftInversion` utilities to apply color inversion to any parent component.

They are used internally by the surface components, e.g. [Card](/joy-ui/react-card/#inverted-colors), when `invertedColors` prop is set to true.

```js
import { applySolidInversion, applySoftInversion } from '@mui/joy/colorInversion';
```

Example usage for `sx` prop and `styled` API:

- `sx` prop

  ```js
  import { applySolidInversion } from '@mui/joy/colorInversion';

  <Box
    sx={[
      (theme) => ({
        display: 'flex',
        alignItems: 'center',
        background: theme.vars.palette.neutral[900],
      }),
      applySolidInversion('neutral'),
    ]}
  >
    …
  </Box>;
  ```

- `styled` API

  ```js
  import { styled } from '@mui/joy/styles';
  import { applySoftInversion } from '@mui/joy/colorInversion';

  const StyledBox = styled(Box)(
    ({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      ...theme.variants.soft.primary,
    }),
    applySoftInversion('primary'),
  );
  ```

{{"demo": "ColorInversionAnyParent.js"}}

## How it works

When `invertedColors` is set to true or the utility is used on the parent component, a set of CSS variables is applied to it. There is no [React context](https://react.dev/learn/passing-data-deeply-with-context) involved in this feature.

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

As a result, the children will use those CSS variables instead of the theme.

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
