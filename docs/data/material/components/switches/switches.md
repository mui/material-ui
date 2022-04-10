---
product: material-ui
title: React Switch component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
githubLabel: 'component: switch'
materialDesign: https://material.io/components/selection-controls#switches
unstyled: /base/react-switch/
---

# Switch

<p class="description">Switches toggle the state of a single setting on or off.</p>

Switches are the preferred way to adjust settings on mobile.
The option that the switch controls, as well as the state it's in,
should be made clear from the corresponding inline label.

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Basic switches

{{"demo": "BasicSwitches.js"}}

## Label

You can provide a label to the `Switch` thanks to the `FormControlLabel` component.

{{"demo": "SwitchLabels.js"}}

## Size

Use the `size` prop to change the size of the switch.

{{"demo": "SwitchesSize.js"}}

## Color

{{"demo": "ColorSwitches.js"}}

## Controlled

You can control the switch with the `checked` and `onChange` props:

{{"demo": "ControlledSwitches.js"}}

## Switches with FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API.
However, you are encouraged to use [Checkboxes](/material-ui/react-checkbox/) instead if multiple related controls are required. (See: [When to use](#when-to-use)).

{{"demo": "SwitchesGroup.js"}}

## Customization

Here are some examples of customizing the component.
You can learn more about this in the [overrides documentation page](/material-ui/customization/how-to-customize/).

{{"demo": "CustomizedSwitches.js"}}

🎨 If you are looking for inspiration, you can check [MUI Treasury's customization examples](https://mui-treasury.com/styles/switch/).

## Label placement

You can change the placement of the label:

{{"demo": "FormControlLabelPosition.js"}}

## When to use

- [Checkboxes vs. Switches](https://uxplanet.org/checkbox-vs-toggle-switch-7fc6e83f10b8)

## Accessibility

- It will render an element with the `checkbox` role not `switch` role since this
  role isn't widely supported yet. Please test first if assistive technology of your
  target audience supports this role properly. Then you can change the role with
  `<Switch inputProps={{ role: 'switch' }}>`
- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).
- When a label can't be used, it's necessary to add an attribute directly to the input component.
  In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` prop.

```jsx
<Switch value="checkedA" inputProps={{ 'aria-label': 'Switch A' }} />
```
