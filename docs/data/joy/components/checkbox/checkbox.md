---
product: joy-ui
title: React Checkbox component
githubLabel: 'component: checkbox'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
---

# Checkbox

<p class="description">Checkboxes give users binary choices when presented with multiple options in a series.</p>

## Introduction

Checkboxes provide users with a graphical representation of a binary choice (yes or no, on or off).
They are most commonly presented in a series, giving the user multiple choices to make.

The Joy UI Checkbox component replaces the native HTML `<input type="checkbox">` element, and offers expanded options for styling and accessibility.

:::success
When should you use checkboxes rather than switches or radio buttons?

- Use a switch to provide the user with **a single binary choice**—checkboxes are preferable when you need to give the user multiple binary choices.
- Use radio buttons to give the user **mutually exclusive options**—checkboxes are preferable when you need to let the user select one, some, all, or none from a series of options.
  :::

{{"demo": "CheckboxUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basics

```jsx
import Checkbox from '@mui/joy/Checkbox';
```

The basic Checkbox component is a single input set to the unchecked state.
Use the `label` prop to provide text, and add `defaultChecked` when the input should be checked by default.

{{"demo": "BasicCheckbox.js"}}

## Customization

### Variants

When unchecked, the checkbox component uses the `outlined` variant.
When checked, the variant changes to `solid`. See [Variants](#variants) for more details.

### Sizes

### Colors

### Icons

By default, the Checkbox component is empty when unchecked.
Use the `uncheckedIcon` prop to add a custom icon for the unchecked state.
You can also use `checkedIcon` to customize the checked state.

{{"demo": "IconsCheckbox.js"}}

#### Appear on hover

You can use the `uncheckedIcon` as a "preview" of the checked state by making it appear when the user hovers over the empty Checkbox.

The demo below shows how to target the icon by using the `svg` selector and apply `opacity` for a smooth effect:

{{"demo": "HoverCheckbox.js"}}

#### No icons

Use the `disableIcon` prop to remove the icon entirely.
In this case, the state of the Checkbox is communicated through the type of variant applied to the label.
Try clicking on the Checkbox labels in the demo below to see how this works:

{{"demo": "IconlessCheckbox.js"}}

### Focus outline

By default, the focus outline wraps both the Checkbox input and its label.
To set the focus outline so that it only wraps the input, target the `checkboxClasses.checkbox` class and add `position: 'relative'`, as shown in the demo below:

{{"demo": "FocusCheckbox.js"}}

### Indeterminate

Technically, the checkbox component only has two states: checked or unchecked.
However, visually, there is a third state called _indeterminate_.

It's common to find it in tables where you have one checkbox that selects every table row.
Use the `indeterminate` prop to circle around these states.

:::warning
When the indeterminate state is set, the value of the `checked` prop only impacts the form submitted values.
It has no accessibility or UX implications.
:::

{{"demo": "IndeterminateCheckbox.js"}}

### Helper text

To add a description to the checkbox, use `FormControl` and `FormHelperText`. The checkbox will be linked to the helper text via `aria-describedby` attribute.

{{"demo": "HelperTextCheckbox.js"}}

### Group

To group multiple checkboxes, use `role="group"` on the wrapper component.

Combine with the [`List`](/joy-ui/react-list/) component to ensure consistent spacing and enable screen readers to interpret the checkbox group as a list.
Learn more about checkbox accessible design patters [in the W3C documentation](https://www.w3.org/WAI/ARIA/apg/example-index/checkbox/checkbox.html).

{{"demo": "GroupCheckboxes.js"}}

### Overlay

Use the `overlay` prop to make the entire surface of the wrapper container the checkbox is in clickable.

{{"demo": "OverlayCheckbox.js"}}

## Common examples

### Filtering status

In this example, we're using variants _and_ colors, within the `ListItem` and `Checkbox` component, to communicate state changes

{{"demo": "ExampleFilterStatusCheckbox.js"}}

### Filtering members

Note that in this example, we're using the CSS `flexDirection: 'rowReverse'` property to properly position the label and icon.

Don't forget to use the `label` prop to ensure proper checkbox accessibility.

{{"demo": "ExampleFilterMemberCheckbox.js"}}

### Choice chips

You can use checkboxes to create a chip alike design, most often used to filter between different options.

{{"demo": "ExampleChoiceChipCheckbox.js"}}

### Viewport checklist

{{"demo": "ExampleButtonCheckbox.js"}}
