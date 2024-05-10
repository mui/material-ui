---
productId: joy-ui
title: React Chip component
components: Chip, ChipDelete
githubLabel: 'component: chip'
---

# Chip

<p class="description">Chip generates a compact element that can represent an input, attribute, or action.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Chips are most frequently used in two main use cases: as pills of informative content or as filtering options.

{{"demo": "ChipUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Chip from '@mui/joy/Chip';

export default function MyApp() {
  return <Chip>My chip</Chip>;
}
```

### Basic usage

Chips comes with medium size, primary color, and solid variant set by default.

{{"demo": "BasicChip.js"}}

### Decorators

Use the `startDecorator` and/or `endDecorator` props to add supporting icons to the chip.

{{"demo": "ChipWithDecorators.js"}}

### Delete button

To add a delete action inside a chip, use the complementary `ChipDelete` component.

The `onDelete` callback is fired on `ChipDelete` either when:

- `Backspace`, `Enter` or `Delete` is pressed.
- The `ChipDelete` is clicked.

```jsx
import ChipDelete from '@mui/joy/ChipDelete';
```

{{"demo": "DeleteButtonChip.js"}}

### As a link

You can also use the chip component as a link by assigning a value of `a` to the `component` prop.
Since links are the most appropriate component for navigating through pages, that's useful when you want the same chip design for a link.

Doing so will automatically change the rendered HTML tag from `<div>` to `<a>`.

{{"demo": "LinkChip.js"}}

### Clickable

To make chips clickable, pass a function to the `onClick` prop.

{{"demo": "ClickableChip.js"}}

### Clickable and deletable

Use both the `onClick` prop and the complementary `ChipDelete` component to make a chip support two actions.

{{"demo": "ClickableAndDeletableChip.js"}}

### With radio

Common to filtering UIs, wrap the `Radio` component with the `Chip` to use them together.
Use radios when you want to enable single selection.

{{"demo": "RadioChip.js"}}

### With a checkbox

Similar to the above, wrap the `Checkbox` component with the `Chip` to use them together.
Use checkboxes when you want to enable multiple selection.

{{"demo": "CheckboxChip.js"}}

## CSS variables playground

Play around with all the CSS variables available in the slider component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "ChipVariables.js", "hideToolbar": true, "bg": "gradient"}}
