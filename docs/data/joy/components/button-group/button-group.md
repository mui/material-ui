---
product: joy-ui
title: React Button Group component
components: Button, IconButton, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Button Group

<p class="description">The ButtonGroup component can be used to group related buttons.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic button group

The buttons can be grouped by wrapping them with the `ButtonGroup` component.
They need to be immediate children.

{{"demo": "BasicButtonGroup.js"}}

## Variants

All the standard button variants are supported.

{{"demo": "VariantButtonGroup.js"}}

## Colors

{{"demo": "ButtonGroupColors.js"}}

## Sizes

The `size` and `color` props can be used to control the appearance of the button group.

{{"demo": "GroupSizesColors.js"}}

## Vertical group

The button group can be displayed vertically using the `orientation` prop.

{{"demo": "GroupOrientation.js"}}

## Spacing

## Split button

`ButtonGroup` can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

{{"demo": "SplitButton.js"}}
