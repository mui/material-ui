---
productId: material-ui
title: React Chip component
components: Chip
githubLabel: 'scope: chip'
materialDesign: https://m2.material.io/components/chips
githubSource: packages/mui-material/src/Chip
---

# Chip

<p class="description">Chips are compact elements that represent an input, attribute, or action.</p>

Chips allow users to enter information, make selections, filter content, or trigger actions.

While included here as a standalone component, the most common use will
be in some form of input, so some of the behavior demonstrated here is
not shown in context.

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Basic chip

The `Chip` component supports outlined and filled styling.

{{"demo": "BasicChips.js"}}

## Chip actions

You can use the following actions.

- Chips with the `onClick` prop defined change appearance on focus, hover, and click.
- Chips with the `onDelete` prop defined will display a delete icon which changes appearance on hover.

### Clickable

{{"demo": "ClickableChips.js"}}

### Deletable

{{"demo": "DeletableChips.js"}}

### Clickable and deletable

{{"demo": "ClickableAndDeletableChips.js"}}

### Clickable link

{{"demo": "ClickableLinkChips.js"}}

### Custom delete icon

{{"demo": "CustomDeleteIconChips.js"}}

## Chip adornments

You can add ornaments to the beginning of the component.

Use the `avatar` prop to add an avatar or use the `icon` prop to add an icon.

### Avatar chip

{{"demo": "AvatarChips.js"}}

### Icon chip

{{"demo": "IconChips.js"}}

## Color chip

You can use the `color` prop to define a color from theme palette.

{{"demo": "ColorChips.js"}}

## Sizes chip

You can use the `size` prop to define a small Chip.

{{"demo": "SizesChips.js"}}

## Multiline chip

By default, Chips displays labels only in a single line.
To have them support multiline content, use the `sx` prop to add `height:auto` to the Chip component, and `whiteSpace: normal` to the `label` styles.

{{"demo": "MultilineChips.js"}}

## Chip array

An example of rendering multiple chips from an array of values.
Deleting a chip removes it from the array. Note that since no
`onClick` prop is defined, the `Chip` can be focused, but does not
gain depth while clicked or touched.

{{"demo": "ChipsArray.js"}}

## Chip playground

{{"demo": "ChipsPlayground.js", "hideToolbar": true}}

## Accessibility

If the Chip is deletable or clickable then it is a button in tab order. When the Chip is focused (for example when tabbing) releasing (`keyup` event) `Backspace` or `Delete` will call the `onDelete` handler while releasing `Escape` will blur the Chip.
