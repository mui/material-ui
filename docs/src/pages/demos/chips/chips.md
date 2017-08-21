---
components: Chip
---

# Chips

[Chips](https://www.google.com/design/spec/components/chips.html)
represent complex entities in small blocks, such as a contact.

While included here as a standalone component, the most common use will
be in some form of input, so some of the behaviour demonstrated here is
not shown in context.

## Chip

Examples of Chips, using an image Avatar, SVG Icon Avatar, "Letter"
and (string) Avatar.
- Chips with the `onClick` property defined change appearance on focus,
hover, and click.
- Chips with the `onRequestDelete` property defined will display a delete
icon which changes appearance on hover.

{{demo='pages/demos/chips/Chips.js'}}

## Chip array
An example of rendering multiple Chips from an array of values.
Deleting a chip removes it from the array. Note that since no
`onClick` property is defined, the Chip can be focused, but does not
gain depth while clicked or touched.

{{demo='pages/demos/chips/ChipsArray.js'}}
