---
product: joy-ui
title: React Checkbox component
components: Checkbox
githubLabel: 'component: checkbox'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
---

# Checkbox

<p class="description">Checkboxes allow the user to select one or more items from a set.</p>

## Introduction

The `Checkbox` component is the one to be used when you want to allow users to select multiple options. For toggling between on and off or single option selection, consider using a switch or radio button, respectively.

{{"demo": "CheckboxUsage.js", "hideToolbar": true}}

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

When unchecked, the checkbox component uses the `outlined` variant. When checked, the variant changes to `solid`.

{{"demo": "BasicCheckbox.js"}}

### Icon

`Checkbox`, by default, comes without an unchecked component. To add an icon to both uncheck and checked states, use the `uncheckedIcon` and `checkedIcon` props.

{{"demo": "IconsCheckbox.js"}}

#### Appear on hover

Target the icon by using the `svg` selector and then use `opacity` to show the unchecked icon when hovering the checkbox.

{{"demo": "HoverCheckbox.js"}}

#### Without an icon

To rely only on variants to communicate the checkbox state change, use the `disableIcon` prop to remove the icon.

{{"demo": "IconlessCheckbox.js"}}

### Focus outline

The focus outline, by default, wraps both the checkbox itself and its label. To change that, target the `checkboxClasses.checkbox` class and add `position: 'relative'`.

{{"demo": "FocusCheckbox.js"}}

### Indeterminate

Technically, the checkbox component only has two states: checked or unchecked. However, visually, there is a third state called _indeterminate_.

It's common to find it in tables where you have one checkbox that selects every table row. Use the `indeterminate` prop to circle around these states.

:::warning
**⚠️ Keep in mind:** When the indeterminate state is set, the value of the `checked` prop only impacts the form submitted values. It has no accessibility or UX implications.
:::

{{"demo": "IndeterminateCheckbox.js"}}

### Group

To group multiple checkboxes, use `role="group"` on the wrapper component.

Combine with the [`List`](/joy-ui/react-list/) component to ensure consistent spacing and enable screen readers to interpret the checkbox group as a list. Learn more about checkbox accessible design patters [in the W3C documentation](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/).

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
