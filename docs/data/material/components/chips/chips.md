---
productId: material-ui
title: React Chip component
components: Chip, ChipButton, ChipLink, ChipDelete
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

## Basic chips

The `Chip` component supports `'outlined'` and `'filled'` variants.

{{"demo": "BasicChips.js"}}

### Colors

Use the `color` prop to assign a color from the theme palette.

{{"demo": "ChipColors.js"}}

### Sizes

Use the `size` prop to control the size.

{{"demo": "ChipSizes.js"}}

## Adornments

You can add ornaments like icons or `<Avatar>` to the beginning or end of the component using the `startAdornment` and `endAdornment` props:

{{"demo": "ChipAdornments.js"}}

### Delete button

Use `<ChipDelete>` as an adornment to add an accessible delete button. A `onDelete` callback is provided that runs when `<ChipDelete>` is clicked, and additionally when the `Backspace` or `Delete` keys are pressed while focused.

{{"demo": "DeletableChips.js"}}

## Actions

Pass `<ChipButton>` or `<ChipLink>` to the `action` prop to create interactive chips.

### ChipButton

Use `<ChipButton>` for triggering actions:

{{"demo": "ChipButtons.js"}}

### ChipLink

Use `<ChipLink>` to navigate to a URL:

{{"demo": "ChipLinks.js"}}

### ChipDelete

`<ChipDelete>` cam be used to make interactive chips deletable. Both the `action` component and the delete button are discrete tab stops.

{{"demo": "DeletableActionChips.js"}}

### Disabled state

Both `<ChipButton>` and `<ChipDelete>` can receive focus normally when disabled to remain discoverable to assistive technology, which typically ignores disabled elements. Only `focus` and `blur` events will run. This can be individually disabled by with `focusableWhenDisabled={false}`.

{{"demo": "DisabledChips.js"}}
