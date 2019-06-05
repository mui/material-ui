---
title: Radio buttons React component
components: Radio, RadioGroup, FormControl, FormLabel, FormControlLabel
---

# Radio buttons

<p class="description">Radio buttons allow the user to select one option from a set.</p>

Use [radio buttons](https://material.io/design/components/selection-controls.html#radio-buttons) when the user needs to see all available options. If available options can be collapsed, consider using a dropdown menu because it uses less space.

Radio buttons should have the most commonly used option selected by default.

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group.

{{"demo": "pages/components/radio-buttons/RadioButtonsGroup.js"}}

## Standalone Radio Buttons

`Radio` can also be used standalone, without the wrapper.

{{"demo": "pages/components/radio-buttons/RadioButtons.js"}}

## Label placement

You can change the placement of the label:

{{"demo": "pages/components/radio-buttons/FormControlLabelPosition.js"}}

## Accessibility

All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/api/form-control-label/)).

When a label can't be used, it's necessary to add an attribute directly to the input component. In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<RadioButton
  value="radioA"
  inputProps={{ 'aria-label': 'Radio A' } }
/>
```

## Guidance

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)