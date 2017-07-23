---
components: FormControl, FormGroup, FormLabel, FormControlLabel, RadioGroup, Checkbox, Radio, Switch
---

# Selection Controls

[Selection controls](https://material.google.com/components/selection-controls.html) allow the user to select options.

Three types of selection controls are covered in this guidance:

- **Checkboxes** allow the selection of multiple options from a set.
- **Radio buttons** allow the selection of a single option from a set.
- **Switches** allow a selection to be turned on or off.

## Checkboxes

Checkboxes allow the user to select multiple options from a set.

If you have multiple options appearing in a list, you can preserve space by using checkboxes instead of on/off switches.

If you have a single option, avoid using a checkbox and use an on/off switch instead.

{{demo='pages/component-demos/selection-controls/Checkboxes.js'}}

## Radio Buttons

Radio buttons allow the user to select one option from a set. Use radio buttons for exclusive selection if you think that the user needs to see all available options side-by-side.

Otherwise, consider a dropdown, which uses less space than displaying all options.

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{demo='pages/component-demos/selection-controls/RadioButtonsGroup.js'}}

`Radio` can also be used standalone, without the wrapper.

{{demo='pages/component-demos/selection-controls/RadioButtons.js'}}

## Switches

On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label.

{{demo='pages/component-demos/selection-controls/Switches.js'}}

`Switch` can also be used with a `label`.
{{demo='pages/component-demos/selection-controls/SwitchLabels.js'}}

