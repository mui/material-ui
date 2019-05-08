---
title: Chip React component
components: Chip
---

# Chips

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

{{"demo": "pages/components/chips/ChipsArray.js"}}

## Chip Playground

{{"demo": "pages/components/chips/ChipsPlayground.js", "hideHeader": true}}
