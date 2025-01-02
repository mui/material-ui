---
productId: material-ui
title: React Button Group component
components: Button, ButtonGroup, LoadingButton
githubLabel: 'component: ButtonGroup'
githubSource: packages/mui-material/src/ButtonGroup
---

# Button Group

<p class="description">The ButtonGroup component can be used to group related buttons.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Basic button group

The buttons can be grouped by wrapping them with the `ButtonGroup` component.
They need to be immediate children.

{{"demo": "BasicButtonGroup.js"}}

## Button variants

All the standard button variants are supported.

{{"demo": "VariantButtonGroup.js"}}

## Sizes and colors

The `size` and `color` props can be used to control the appearance of the button group.

{{"demo": "GroupSizesColors.js"}}

## Vertical group

The button group can be displayed vertically using the `orientation` prop.

{{"demo": "GroupOrientation.js"}}

## Split button

`ButtonGroup` can also be used to create a split button. The dropdown can change the button action (as in this example) or be used to immediately trigger a related action.

{{"demo": "SplitButton.js"}}

## Disabled elevation

You can remove the elevation with the `disableElevation` prop.

{{"demo": "DisableElevation.js"}}

## Experimental APIs

### Loading button

You can use the [`<LoadingButton />`](/material-ui/react-button/#loading-button) from [`@mui/lab`](/material-ui/about-the-lab/) in the button group.

{{"demo": "LoadingButtonGroup.js"}}
