---
title: Toggle Button React component
components: ToggleButton, ToggleButtonGroup
---

# Toggle Buttons

<p class="description">Toggle buttons can be used to group related options.</p>

To emphasize groups of related [Toggle buttons](https://material.io/design/components/buttons.html#toggle-button),
a group should share a common container.

The `ToggleButtonGroup` will control the selected state of its child buttons when
given its own `value` prop.

{{"demo": "pages/components/toggle-button/ToggleButtons.js"}}

## Sizes

Fancy larger or smaller buttons? Use the `size` property.

{{"demo": "pages/components/toggle-button/ToggleButtonSizes.js"}}

## Enforce value set

If you want to enforce at least one button to be active, you can adapt your handleChange
function.

```jsx
const handleFormat = (event, newFormats) => {
  if (newFormats.length) {
    setFormats(newFormats);
  }
};

const handleAlignment = (event, newAlignment) => {
  if (newAlignment !== null) {
    setAlignment(newAlignment);
  }
};
```

{{"demo": "pages/components/toggle-button/ToggleButtonNotEmpty.js"}}

## Standalone toggle button

{{"demo": "pages/components/toggle-button/StandaloneToggleButton.js"}}

## Customized toggle button

Here is an example of customizing the component. You can learn more about this in the
[overrides documentation page](/customization/components/).

{{"demo": "pages/components/toggle-button/CustomizedDividers.js", "bg": true}}

## Accessibility

ToggleButtonGroup has `role="group"`. You should provide an accessible label with `aria-label="label"`, `aria-labelledby="id"` or `<label>`.

ToggleButton sets `aria-pressed="<bool>"` according to the button state. You should label each button with `aria-label`.
