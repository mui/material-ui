---
product: joy-ui
title: React Radio Group component
githubLabel: 'component: radio'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/
---

# Radio Group

<p class="description">Radio buttons let users make one selection from a set of options.</p>

## Introduction

Radio buttons allow users to make a mututally exclusive choice (e.g., this or that). Only one selection is allowed from the available set of options.

To provide the user with multiple selection options, use `Checkbox` instead.

:::success
When should you use radio buttons rather than checkboxes or switches?

- Use checkboxes to give the user **multiple binary choices**--radio buttons are preferable when you need to restrict user selection to one mutually exclusive option from a series.
- Use a switch to provide the user with **a single binary choice**--radio buttons are preferable when you need to give the user multiple binary choices.
:::

{{"demo": "RadioUsage.js", "hideToolbar": true, "bg": "gradient"}}

:::info
To learn how to add more variants or sizes to the component, check out the [Themed components](/joy-ui/customization/themed-components/) page.
:::

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';

export default function MyApp() {
  return (
    <Box>
      <Radio value="Hello World" name="radio-buttons" />
    </Box>
  );
}
```

### Basic usage

The `Radio` component supports every Joy UI global variant and it comes with `outlined` set as the default one.

{{"demo": "RadioButtons.js"}}

### Label

Use `label` prop to label the radio buttons.

{{"demo": "RadioButtonLabel.js"}}

For complex layout, compose a radio button with `FormControl`, `FormLabel`, and `FormHelperText` (optional).

{{"demo": "RadioButtonControl.js"}}

### Position

To swap the label and radio position, use the CSS property `flex-direction: row-reverse`.

{{"demo": "RadioPositionEnd.js"}}

### Radio group

The `RadioGrop` component is the ideal wrapper for multiple `Radio` components as it provides a tailored API for radio button grouping and proper keyboard-navigation accessibility support.

{{"demo": "RadioButtonsGroup.js"}}

### Controlled

To control what the radio button is selecting, use the `value` and `onChange` props.

{{"demo": "ControlledRadioButtonsGroup.js"}}

### Focus outline

The focus outline, by default, wraps both the radio itself and its label.
To change that, target the `radioClasses.radio` class and add `position: 'relative'`.

{{"demo": "RadioFocus.js"}}

### Overlay

To make the whole container in which the radio button is in clickable, use the `overlay` prop.

You can also use it directly in the `RadioGroup` component as it will automatically be forwarded to every individual radio button inside of it.

{{"demo": "OverlayRadio.js"}}

:::info
Use the CSS variable `--Radio-action-radius` to control the border radius of the clickable area.
:::

### Icon

`Radio`, by default, comes without an unchecked component.
To add an icon to both unchecked and checked states, use the `uncheckedIcon` and `checkedIcon` props.

{{"demo": "IconsRadio.js"}}

### Without an icon

To communicate the checked and unchecked states with different artifacts, such as border or background color, use the `disableIcon` prop to remove the default icon.

{{"demo": "IconlessRadio.js"}}

## Accessibility

Here are a few tips to make sure you have an accessible radio button component:

- Every form control should have proper labels.
  This includes radio buttons, checkboxes, and switches.
  In most cases, this is done by using the `FormControl` and `FormLabel` element.
- When a label can't be used, make sure to add an attribute, such as `aria-label`, `aria-labelledby`, and/or `title`, directly on the input component.
  You can also use the `inputProps` prop to add them.

```jsx
<Radio
  value="radioA"
  slotProps={{
    input: {
      'aria-label': 'Radio A',
    },
  }}
/>
```

Visit the [WAI-ARIA documentation](https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/) for more details.

## Common examples

### Segmented controls

{{"demo": "ExampleSegmentedControls.js"}}

### Tiers

A clone of an [inspiration](https://dribbble.com/shots/11239824-Radio-button-groups) that demonstrate the composition of the components.

{{"demo": "ExampleTiers.js"}}

### Alignment buttons

Provide an icon as a label to the `Radio` to make the radio buttons concise. You need to provide `aria-label` to the input slot for users who rely on screen readers.

{{"demo": "ExampleAlignmentButtons.js"}}

### Payment methods

Mix radio buttons with the [`List`](/joy-ui/react-list/)-related components to create a commonly seen vertical or horizontal payment method list.

{{"demo": "ExamplePaymentChannels.js"}}

### E-commerce product attributes

This example demonstrates complex customization using the `Sheet` component as a container for the radios.
The focus outline is customized to be smaller, and the color changes based on the value.

The check icon's color inherits the radio button's `solid` variant, so that we don't need to handpick a color that has enough contrast with the background.

{{"demo": "ExampleProductAttributes.js"}}
