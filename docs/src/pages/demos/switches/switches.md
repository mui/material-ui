---
title: Switch React component
components: Switch, FormControl, FormGroup, FormLabel, FormControlLabel
---

# Switches

<p class="description">Switches toggle the state of a single setting on or off.</p>

They are the preferred way to adjust settings on mobile.

The option that the switch controls, as well as the state it’s in,
should be made clear from the corresponding inline label.

{{"demo": "pages/demos/switches/Switches.js"}}

## Switches with FormControlLabel
`Switch` can also be used with a label description thanks to the `FormControlLabel` component.

{{"demo": "pages/demos/switches/SwitchLabels.js"}}

## Switches with FormGroup

`FormGroup` is a helpful wrapper used to group selection controls components that provides an easier API.
However, we encourage you to use a [Checkbox](#checkboxes) instead.

{{"demo": "pages/demos/switches/SwitchesGroup.js"}}

## Customized Switches

If you have been reading the [overrides documentation page](/customization/overrides/)
but you are not confident jumping in, here's an example of how you can change the color of a Switch, and an iOS style Switch.

⚠️ While the material design specification encourages theming, these examples are off the beaten path.

{{"demo": "pages/demos/switches/CustomizedSwitches.js"}}

## Label placement

You can change the placement of the label:

{{"demo": "pages/demos/switches/FormControlLabelPosition.js"}}

## Accessibility

All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).

When a label can't be used, it's necessary to add an attribute directly to the input component.
In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<Switch
  value="checkedA"
  inputProps={{ 'aria-label': 'Switch A' } }
/>
```
