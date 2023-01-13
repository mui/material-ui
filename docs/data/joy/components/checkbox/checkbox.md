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

:::info
To learn how to add more variants or sizes to the component, check out the [Themed components](/joy-ui/customization/themed-components/) page.
:::

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

export default function MyApp() {
  return (
    <Box>
      <Checkbox label="Hello world!" />
    </Box>
  );
}
```

### Checked

When unchecked, the checkbox component uses the `outlined` variant.
When checked, the variant changes to `solid`.

{{"demo": "BasicCheckbox.js"}}

### Icon

`Checkbox`, by default, comes without an unchecked component.
To add an icon to both uncheck and checked states, use the `uncheckedIcon` and `checkedIcon` props.

{{"demo": "IconsCheckbox.js"}}

#### Appear on hover

Target the icon by using the `svg` selector and then use `opacity` to show the unchecked icon when hovering the checkbox.

{{"demo": "HoverCheckbox.js"}}

#### Without an icon

To rely only on variants to communicate the checkbox state change, use the `disableIcon` prop to remove the icon.

{{"demo": "IconlessCheckbox.js"}}

### Focus outline

The focus outline, by default, wraps both the checkbox itself and its label.
To change that, target the `checkboxClasses.checkbox` class and add `position: 'relative'`.

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
