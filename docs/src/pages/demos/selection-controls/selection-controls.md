---
title: Checkbox, Radio, Switch React component
components: FormControl, FormGroup, FormLabel, FormControlLabel, RadioGroup, Checkbox, Radio, Switch
---

# Selection Controls

<p class="description">Selection controls allow the user to select options.</p>

[Selection controls](https://material.io/design/components/selection-controls.html) allow users to complete tasks that involve making choices such as selecting options, or switching settings on or off. Selection controls are found on screens that ask users to make decisions or declare preferences such as settings or dialogs.

Three types of selection controls are covered in this section:

- **[Radio Buttons](#radio-buttons)** allow the selection of a single option from a set.
- **[Checkboxes](#checkboxes)** allow the selection of multiple options from a set.
- **[Switches](#switches)** allow a selection to be turned on or off.

## Radio Buttons

[Radio buttons](https://material.io/design/components/selection-controls.html#radio-buttons)
allow the user to select one option from a set.
Use radio buttons when the user needs to see all available options.
If available options can be collapsed, consider using a dropdown menu because it uses less space.

Radio buttons should have the most commonly used option selected by default.

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{"demo": "pages/demos/selection-controls/RadioButtonsGroup.js"}}

### Standalone Radio Buttons

`Radio` can also be used standalone, without the wrapper.

{{"demo": "pages/demos/selection-controls/RadioButtons.js"}}

## Checkboxes

[Checkboxes](https://material.io/design/components/selection-controls.html#checkboxes)
allow the user to select one or more items from a set.
Checkboxes can be used to turn an option on or off.

If you have multiple options appearing in a list,
you can preserve space by using checkboxes instead of on/off switches.
If you have a single option, avoid using a checkbox and use an on/off switch instead.

{{"demo": "pages/demos/selection-controls/Checkboxes.js"}}

`Checkbox` can also be used with a label description thanks to the `FormControlLabel` component.

{{"demo": "pages/demos/selection-controls/CheckboxLabels.js"}}

## Checkboxes with FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API.

{{"demo": "pages/demos/selection-controls/CheckboxesGroup.js"}}

## Switches

[Switches](https://material.io/design/components/selection-controls.html#switches)
toggle the state of a single setting on or off.
They are the preferred way to adjust settings on mobile.

The option that the switch controls, as well as the state it’s in,
should be made clear from the corresponding inline label.

{{"demo": "pages/demos/selection-controls/Switches.js"}}

### Switches with FormControlLabel
`Switch` can also be used with a label description thanks to the `FormControlLabel` component.

{{"demo": "pages/demos/selection-controls/SwitchLabels.js"}}

### Switches with FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API.
However, we encourage you to use a [Checkbox](#checkboxes) instead.

{{"demo": "pages/demos/selection-controls/SwitchesGroup.js"}}

### Customized Switches

If you have been reading the [overrides documentation page](/customization/overrides/)
but you are not confident jumping in, here's an example of how you can change the color of a Switch, and an iOS style Switch.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/selection-controls/CustomizedSwitches.js"}}

## Label placement

You can change the placement of the label:

{{"demo": "pages/demos/selection-controls/FormControlLabelPosition.js"}}

## Accessibility

All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).

When a label can't be used, it's necessary to add an attribute directly to the input component.
In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' } }
/>
```
