---
title: React ButtonGroup component
components: Button, ButtonGroup
githubLabel: 'component: ButtonGroup'
---

# Button group

<p class="description">The ButtonGroup component can be used to group related buttons.</p>

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic button group

The standard Button variants are supported.

{{"demo": "pages/components/button-group/BasicButtonGroup.js"}}

## Sizes and colors

The `size` and `color` props can be used to control the appearance of the ButtonGroup.

{{"demo": "pages/components/button-group/GroupSizesColors.js"}}

## Vertical group

The ButtonGroup can be displayed veritcally using the `orientation` prop.

{{"demo": "pages/components/button-group/GroupOrientation.js"}}

## Split button

`ButtonGroup` can also be used to create a split button. The dropdown can change the button action (as in this example), or be used to immediately trigger a related action.

{{"demo": "pages/components/button-group/SplitButton.js"}}

## Disabled elevation

You can remove the elevation with the `disableElevation` prop.

{{"demo": "pages/components/button-group/DisableElevation.js"}}

## Limitations

### IconButton

The `ButtonGroup` passes `ButtonProps` down to its children. `IconButton` does not accept `fullWidth` and `disabledElevation` props and will trigger a warning.

If you wish to only have an icon button, you can implement something like this:

  ```jsx
  <ButtonGroup size="small" aria-label="Small outlined button group">
    <Button>
      <ArrowLeft />
    </Button>
    <Button>
      <ArrowRight />
    </Button>
  </ButtonGroup>
  ```
