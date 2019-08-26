---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
---

# Toggle Buttons

<p class="description">Toggle buttons can be used standalone or as a group.</p>

## Standalone Toggle Button

To implement a standalone Toggle button:

{{"demo": "pages/components/toggle-button/ToggleButton.js"}}

## Toggle Button Group

To emphasize groups of related [Toggle buttons](https://material.io/design/components/buttons.html#toggle-button),
a group should share a common container.

The `ToggleButtonGroup` will control the selected state of its child buttons when
given its own `value` prop.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Sizes

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}
