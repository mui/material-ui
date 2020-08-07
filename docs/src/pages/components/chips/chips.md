---
title: Chip React component
components: Chip
---

# Chip

<p class="description">Chips are compact elements that represent an input, attribute, or action.</p>

[Chips](https://material.io/design/components/chips.html) allow users to enter information, make selections, filter content, or trigger actions.

While included here as a standalone component, the most common use will
be in some form of input, so some of the behaviour demonstrated here is
not shown in context.

## Chip

Examples of Chips, using an image Avatar, SVG Icon Avatar, "Letter"
and (string) Avatar.

- Chips with the `onClick` property defined change appearance on focus,
  hover, and click.
- Chips with the `onDelete` property defined will display a delete
  icon which changes appearance on hover.

{{"demo": "pages/components/chips/Chips.js"}}

### Outlined Chips

Outlined chips offer an alternative style.

{{"demo": "pages/components/chips/OutlinedChips.js"}}

## Chip array

An example of rendering multiple Chips from an array of values.
Deleting a chip removes it from the array. Note that since no
`onClick` property is defined, the Chip can be focused, but does not
gain depth while clicked or touched.

{{"demo": "pages/components/chips/ChipsArray.js", "bg": true}}

## Small Chip

You can use the `size` prop to define a small Chip.

### Default variant

{{"demo": "pages/components/chips/SmallChips.js"}}

### Outlined variant

{{"demo": "pages/components/chips/SmallOutlinedChips.js"}}

## Chip Playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideToolbar": true}}

## Accessibility

If the Chip is deletable or clickable then it is a button in tab order. When the Chip is focused (e.g. when tabbing) releasing (`keyup` event) `Backspace` or `Delete` will call the `onDelete` handler while releasing `Escape` will blur the Chip.
