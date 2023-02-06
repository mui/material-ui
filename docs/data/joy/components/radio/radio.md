---
product: joy-ui
title: React Radio Group component
githubLabel: 'component: radio'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/
---

# Radio Group

<p class="description">The Radio Group enables the user to select one option from a set.</p>

## Introduction

Radio buttons allow users to make a mututally exclusive choice (e.g., this or that). Only one selection is allowed from the available set of options.

To provide the user with multiple selection options, use Checkbox instead.

If available options can be collapsed, consider using a Select component to conserve space.

Radio buttons should have the most commonly used option selected by default.

:::success
When should you use radio buttons rather than checkboxes or switches?

- Use checkboxes to give the user **multiple binary choices**—radio buttons are preferable when you need to restrict user selection to one mutually exclusive option from a series.
- Use a switch to provide the user with **a single binary choice**—radio buttons are preferable when you need to give the user multiple binary choices.
  :::

{{"demo": "RadioUsage.js", "hideToolbar": true, "bg": "gradient"}}

:::info
To learn how to add more variants or sizes to the component, check out the [Themed components](/joy-ui/customization/themed-components/) page.
:::

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basics

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

The Radio component supports every Joy UI global variant and it comes with `outlined` set as the default one.

{{"demo": "RadioButtons.js"}}

## Customization

### Label

Use `label` prop to label the radio buttons.

{{"demo": "RadioButtonLabel.js"}}

For more complex layouts, compose a radio button with Form Control, Form Label, and Form Helper Text (optional).

{{"demo": "RadioButtonControl.js"}}

### Position

To swap the label and radio position, use the CSS property `flex-direction: row-reverse`.

{{"demo": "RadioPositionEnd.js"}}

### Radio group

The Radio Group component is the ideal wrapper for multiple Radio components as it provides a tailored API for radio button grouping and proper keyboard navigation accessibility support.

{{"demo": "RadioButtonsGroup.js"}}

### Controlled

To control what the radio button is selecting, use the `value` and `onChange` props.

{{"demo": "ControlledRadioButtonsGroup.js"}}

### Focus outline

The focus outline, by default, wraps both the radio and its label.
To change that, target the `radioClasses.radio` class and add `position: 'relative'`.

{{"demo": "RadioFocus.js"}}

### Overlay

To make the radio button's container clickable, use the `overlay` prop.

Applying `overlay` to the parent Radio Group component will pass the prop to each child radio button inside the Radio Group.

{{"demo": "OverlayRadio.js"}}

:::info
Use the CSS variable `--Radio-action-radius` to control the border radius of the clickable area.
:::

### Icon

Radio, by default, comes without an unchecked component.
To add an icon to both unchecked and checked states, use the `uncheckedIcon` and `checkedIcon` props.

{{"demo": "IconsRadio.js"}}

### Without an icon

To communicate the checked and unchecked states with different properties, such as border or background color, use the `disableIcon` prop to remove the default icon.

{{"demo": "IconlessRadio.js"}}

## Common examples

### Segmented controls

{{"demo": "ExampleSegmentedControls.js"}}

### Tiers

A clone of an [inspiration](https://dribbble.com/shots/11239824-Radio-button-groups) that demonstrate the composition of the components.

{{"demo": "ExampleTiers.js"}}

### Alignment buttons

Provide an icon as a label to the Radio to make the radio buttons concise. You need to provide `aria-label` to the input slot for users who rely on screen readers.

{{"demo": "ExampleAlignmentButtons.js"}}

### Payment methods

Mix radio buttons with the [List](/joy-ui/react-list/)-related components to create a commonly seen vertical or horizontal payment method list.

{{"demo": "ExamplePaymentChannels.js"}}

### E-commerce product attributes

This example demonstrates complex customization using the Sheet component as a container for the radios.
The focus outline is customized to be smaller, and the color changes based on the value.

The check icon's color inherits the radio button's `solid` variant, so that we don't need to handpick a color that has enough contrast with the background.

{{"demo": "ExampleProductAttributes.js"}}

## Accessibility

Here are a few tips to make sure you have an accessible Radio button component:

- Every Form Control should have proper labels.
  This includes radio buttons, checkboxes, and switches.
  In most cases, this is done by using the Form Control and Form Label element.
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

## Anatomy

The Radio Group component is composed of a root `<div>` element that can wrap multiple Radio components.

```html
<div class="JoyRadioGroup-root">
  <!-- radio components here -->
</div>
```

The Radio component is composed of a root `<span>`, with further nested `<span>` for the radio, icon, action (with a nested `<input>`), and its associated `<label>`.

```html
  <span class="JoyRadio-root">
    <span class="JoyRadio-radio">
      <span class="JoyRadio-icon"></span>
      <span class="JoyRadio-action">
        <input class="JoyRadio-input">
      </span>
    </span>
    <label class="JoyRadio-label">
  </span>
```
