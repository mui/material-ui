---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
---

# Toggle Buttons

<p class="description">Toggle buttons can be used to group related options.</p>

To emphasize groups of related [Toggle buttons](https://material.io/design/components/buttons.html#toggle-button), a group should share a common container.

The `ToggleButtonGroup` will control the selected state of its child buttons when given its own `value` prop.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Размеры

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Standalone toggle button

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

Ниже находится пример кастомизации компонента. You can learn more about this in the [overrides documentation page](/customization/components/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Доступность

ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.

ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.