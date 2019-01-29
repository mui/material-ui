---
title: Chip React component
components: Chip
---
# Chips (Navios)

<p class="description">Chips são elementos compactos que representam uma entrada, atributo ou ação.</p>

[Chips](https://material.io/design/components/chips.html) allow users to enter information, make selections, filter content, or trigger actions.

Embora incluído aqui como um componente independente, o uso mais comum será em alguma forma de entrada, portanto, alguns dos comportamentos demonstrados aqui são não mostrados no contexto.

## Chip

Examples of Chips, using an image Avatar, SVG Icon Avatar, "Letter" and (string) Avatar.

- Chips with the `onClick` property defined change appearance on focus, hover, and click.
- Chips with the `onDelete` property defined will display a delete icon which changes appearance on hover.

{{"demo": "pages/demos/chips/Chips.js"}}

### Outlined Chips

Outlined chips offer an alternative style.

{{"demo": "pages/demos/chips/OutlinedChips.js"}}

## Chip array

An example of rendering multiple Chips from an array of values. Deleting a chip removes it from the array. Note that since no `onClick` property is defined, the Chip can be focused, but does not gain depth while clicked or touched.

{{"demo": "pages/demos/chips/ChipsArray.js"}}

## Chip Playground

{{"demo": "pages/demos/chips/ChipsPlayground.js"}}