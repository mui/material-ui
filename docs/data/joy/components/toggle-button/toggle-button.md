---
productId: joy-ui
title: React Toggle Button component
githubLabel: 'component: toggle button'
components: ToggleButtonGroup, Button, IconButton
---

# Toggle Button

<p class="description">A toggle is a two-state button that may be part of a group of mutually exclusive options.</p>

## Introduction

To emphasize groups of related toggle buttons,
a group should share a common container.
The `ToggleButtonGroup` controls the selected state of its child buttons when given its own `value` prop.

{{"demo": "ToggleGroupUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
```

### Toggle button

Joy UI does not provide a `ToggleButton` component. It's mainly because the Button or IconButton components can be used with `aria-pressed`, and according to [WAI ARIA pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/), it's a better option.

The demo below shows how to use a `Button` and a `IconButton` as a toggle.

{{"demo": "ToggleButtons.js"}}

### Toggle group

Provide a `value` as an array to ToggleButtonGroup. When the button is in pressed state, the ToggleButtonGroup's `onChange` prop is called with the new array.

The ToggleButtonGroup uses the same styles as the [ButtonGroup](/joy-ui/react-button-group/) component to connect each button together.

{{"demo": "ToggleGroup.js"}}

### Exclusive selection

When the `value` is not an array, the ToggleButtonGroup will render in exclusive selection mode. In this mode, only one button may be selected at a time.

{{"demo": "ExclusiveSelection.js"}}

## Customization

### Variants

The ToggleButtonGroup component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `outlined` (default), `plain`, `soft`, and `solid`.

{{"demo": "ToggleGroupVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The ToggleButtonGroup component comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "ToggleGroupSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.
Play around combining different colors with different variants.

{{"demo": "ToggleGroupColors.js"}}

### Spacing

When `spacing` is more than `0`, the buttons are disconnected with the given gap equals to `theme.spacing(<value>)`.

{{"demo": "ToggleGroupSpacing.js"}}

The value can be an object or an array to create responsive spacing.

```js
<ToggleButtonGroup spacing={{ xs: 0, md: 2, lg: 3 }}>…</ToggleButtonGroup>
```

## Common examples

### Editor toolbar

{{"demo": "ToggleGroupToolbar.js"}}

## Accessibility

### ARIA

- ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.
- For the toggle button, sets `aria-pressed="<bool>"` according to the button state. You should label an icon button with `aria-label`.

### Keyboard

At present, toggle buttons are in DOM order. Navigate between them with the tab key. The button behavior follows standard keyboard semantics.
