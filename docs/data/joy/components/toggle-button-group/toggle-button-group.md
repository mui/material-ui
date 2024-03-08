---
productId: joy-ui
title: React Toggle Button Group component
githubLabel: 'component: toggle button'
components: ToggleButtonGroup, Button, IconButton
---

# Toggle Button Group

<p class="description">A group of mutually exclusive buttons.</p>

## Introduction

Toggle Button Group provides a way to get mutually exclusive actions closer together by sharing a common container.
It controls the selected state of its child buttons when given its own `value` prop.

{{"demo": "ToggleGroupUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Basics

```jsx
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
```

Note that Joy UI doesn't provide a Toggle Button component but rather a Toggle Button Group container component. The reason for that is that according to the [WAI ARIA pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/), it's better to use `aria-pressed` on the Button or Icon Button component instead.

{{"demo": "ToggleButtons.js"}}

That said, when using the Toggle Button Group component, pass a value as an array.
When a button within the group is pressed, the Toggle Button Group component triggers the `onChange` prop of it and passes the updated array as a parameter.

The Toggle Button Group component uses the same styles as the [Button Group](/joy-ui/react-button-group/) component to ensure a consistent visual connection between all of the Joy UI buttons.

{{"demo": "ToggleGroup.js"}}

### Exclusive selection

When the value provided to the Toggle Button Group component is not an array, it operates in the exclusive selection mode, which means that only one button can be selected at a single time within the group.

{{"demo": "ExclusiveSelection.js"}}

## Customization

### Variants

The Toggle Button Group component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `outlined` (default), `plain`, `soft`, and `solid`.

{{"demo": "ToggleGroupVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The Toggle Button Group component comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "ToggleGroupSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the color prop.

{{"demo": "ToggleGroupColors.js"}}

### Spacing

By default, there's no spacing between the buttons within a Toggle Button Group.
Use the `spacing` prop with a value greater than 0 to separate each button.

The spacing is applied using the `gap` CSS property and its value is determined on the theme `theme.spacing(<value>)`).

{{"demo": "ToggleGroupSpacing.js"}}

To create a responsive spacing scale, the `<value>` can be an object or an array.

```js
<ToggleButtonGroup spacing={{ xs: 0, md: 2, lg: 3 }}>…</ToggleButtonGroup>
```

## Common examples

### Figma-like toggle group

Use the CSS variable `--ButtonGroup-connected` to control when border radius of the buttons in-between should be removed.

To create a Figma-like button group where the buttons are connected when users hover on any of the buttons, set the `--ButtonGroup-connected` to `0` and change to `1` on hover.

{{"demo": "FigmaButtonGroup.js"}}

### Editor toolbar

{{"demo": "ToggleGroupToolbar.js"}}

## Accessibility

### ARIA

- The Toggle Button Group component has `role="group"`. Make sure to provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.
- For the toggle button, set `aria-pressed="<bool>"` according to the button state. Make sure to label an icon button with `aria-label`.

### Keyboard

Buttons within a Toggle Button Group component are in the same order as in the DOM.
Use the tab key to navigate them.
