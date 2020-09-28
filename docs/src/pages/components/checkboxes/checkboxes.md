---
title: React Checkbox component
components: Checkbox, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Checkbox

<p class="description">Checkboxes allow the user to select one or more items from a set.</p>

[Checkboxes](https://material.io/design/components/selection-controls.html#checkboxes) can be used to turn an option on or off.

If you have multiple options appearing in a list,
you can preserve space by using checkboxes instead of on/off switches.
If you have a single option, avoid using a checkbox and use an on/off switch instead.

## Basic checkboxes

{{"demo": "pages/components/checkboxes/Checkboxes.js"}}

## Checkbox with FormControlLabel

`Checkbox` can be provided with a label thanks to the `FormControlLabel` component.

{{"demo": "pages/components/checkboxes/CheckboxLabels.js"}}

## Checkboxes with FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API.

{{"demo": "pages/components/checkboxes/CheckboxesGroup.js"}}

## Label placement

You can change the placement of the label:

{{"demo": "pages/components/checkboxes/FormControlLabelPosition.js"}}

## Customized checkbox

Here is an example of customizing the component. You can learn more about this in the
[overrides documentation page](/customization/components/).

{{"demo": "pages/components/checkboxes/CustomizedCheckbox.js", "defaultCodeOpen": false}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/checkbox).

## When to use

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)
- [Checkboxes vs. Switches](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#checkbox)

- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).
- When a label can't be used, it's necessary to add an attribute directly to the input component.
In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>
```
