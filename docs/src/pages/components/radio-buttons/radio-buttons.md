---
title: Radio buttons React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Radio

<p class="description">Radio buttons allow the user to select one option from a set.</p>

Use [radio buttons](https://material.io/design/components/selection-controls.html#radio-buttons) when the user needs to see all available options.
If available options can be collapsed, consider using a dropdown menu because it uses less space.

Radio buttons should have the most commonly used option selected by default.

## RadioGroup

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

To lay out the buttons horizontally, set the `row` prop: `<RadioGroup row />`.

## Standalone radio buttons

`Radio` can also be used standalone, without the RadioGroup wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Label placement

You can change the placement of the label with the `FormControlLabel` component's `labelPlacement` prop:

{{"demo": "pages/components/radio-buttons/FormControlLabelPlacement.js"}}

## Show error

In general, radio buttons should have a value selected by default. If this is not the case, you can display an error if no value is selected when the form is submitted:

{{"demo": "pages/components/radio-buttons/ErrorRadios.js"}}

## Customized radios

Here is an example of customizing the component. You can learn more about this in the
[overrides documentation page](/customization/components/).

{{"demo": "pages/components/radio-buttons/CustomizedRadios.js"}}

## When to use

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).
- When a label can't be used, it's necessary to add an attribute directly to the input component.
In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' }}
/>
```
