---
productId: joy-ui
title: React Radio Button component
components: Radio, RadioGroup
githubLabel: 'component: radio'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
---

# Radio

<p class="description">Radio buttons enable the user to select one option from a set.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Radio buttons let users make a mutually exclusive choice (for example: "this" or "that").
Only one selection is allowed from the available set of options.

Radio buttons should have the most commonly used option selected by default.

{{"demo": "RadioUsage.js", "hideToolbar": true, "bg": "gradient"}}

:::success
When should you use radio buttons rather than checkboxes, switches, or selects?

- Use checkboxes to give the user **multiple binary choices**—radio buttons are preferable when you need to restrict user selection to one mutually exclusive option from a series.
- Use a switch to provide the user with **a single binary choice**—radio buttons are preferable when you need to give the user multiple binary choices.
- Consider using a select if it's not important for the user to be able to see all options.
- If available options can be collapsed, consider using a Select component to conserve space.

  :::

## Basics

```jsx
import Radio from '@mui/joy/Radio';
```

The Joy UI Radio button behaves similar to the native HTML `<input type="radio">`, so it accepts props like `checked`, `value` and `onChange`.

{{"demo": "RadioButtons.js"}}

## Customization

### Variants

The Radio component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `outlined` (default), `soft` , `solid` , and `plain`.

{{"demo": "RadioVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The Radio component comes in three sizes: `sm`, `md` (default), and `lg`:

{{"demo": "RadioSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.

{{"demo": "RadioColors.js"}}

### Label

Use the `label` prop to add a label to a Radio button.

{{"demo": "RadioButtonLabel.js"}}

For more complex layouts, compose a Radio button with Form Control, Form Label, and Form Helper Text (optional), as shown below:

{{"demo": "RadioButtonControl.js"}}

### Position

To swap the positions of a Radio and its label, use the CSS property `flex-direction: row-reverse`.

{{"demo": "RadioPositionEnd.js"}}

## Usage with Radio Group

```jsx
import RadioGroup from '@mui/joy/RadioGroup';
```

The Radio Group component is the ideal wrapper for multiple Radio components as it provides a tailored API for grouping and better keyboard navigation accessibility.

{{"demo": "RadioButtonsGroup.js"}}

### Controlled

Use the `value` and `onChange` props to control the actions performed by the Radio buttons.
For example, the Radio buttons in the demo below update the state to reflect the selected option:

{{"demo": "ControlledRadioButtonsGroup.js"}}

### Focus outline

By default, the focus outline wraps both the Radio button and its label.
If you need to focus to omit the label, target the `radioClasses.radio` class and add `position: 'relative'`.

{{"demo": "RadioFocus.js"}}

### Overlay

To make the Radio button's container clickable, use the `overlay` prop.

You can also apply this prop directly to a Radio Group when present, which will pass the prop to each individual Radio button nested within.

{{"demo": "OverlayRadio.js"}}

:::info
Use the CSS variable `--Radio-actionRadius` to control the border radius of the clickable area.
:::

### Custom icons

Use the `checkedIcon` and `uncheckedIcon` props to add custom icons to the Radio button that correspond to each state, respectively.
The demo below shows how to apply a custom `checkedIcon` to the Radio button that sits on the corner of each Sheet:

{{"demo": "IconsRadio.js"}}

### No icon

Use the `disableIcon` prop to remove the Radio button's icon.
In this case, you'll need to use CSS properties like border and background color to communicate the state of the Radio button, as shown in the demo below:

{{"demo": "IconlessRadio.js"}}

## Common examples

### Segmented controls

{{"demo": "ExampleSegmentedControls.js"}}

### Tiers

This example demonstrates the composition of the components, and was inspired by [this Dribbble shot from Tailwind Labs](https://dribbble.com/shots/11239824-Radio-button-groups).

{{"demo": "ExampleTiers.js"}}

### Alignment buttons

This example uses icons as labels for a group of Radio buttons to recreate the form and function of [Toggle Buttons](https://mui.com/material-ui/react-toggle-button/).
In this case, you must provide an `aria-label` to the input slot for users who rely on screen readers.

{{"demo": "ExampleAlignmentButtons.js"}}

### Payment methods

Mix Radio buttons with the [List](/joy-ui/react-list/) components to create a vertical or horizontal payment method list.

{{"demo": "ExamplePaymentChannels.js"}}

### E-commerce product attributes

This example demonstrates complex customization using the Sheet component as a container for the Radio buttons.
The focus outline is customized to be smaller, and the color changes based on the value.

The check icon's color inherits the Radio button's `solid` variant, so you don't need to handpick a color that contrasts enough with the background.

{{"demo": "ExampleProductAttributes.js"}}

## Accessibility

Here are a few tips to make sure you have an accessible Radio button component:

- Every Form Control should have proper labels.
  This includes Radio buttons, Checkboxes, and Switches.
  In most cases, this is done by using the Form Control and Form Label element.
- When a label can't be used, make sure to add an attribute, such as `aria-label`, `aria-labelledby`, and/or `title`, directly on the input component.
  You can also use the `slotProps.input` prop to add them.

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

Visit the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for more details.

## Anatomy

The Radio Group component is composed of a root `<div>` element that can wrap multiple Radio components.

```html
<div class="MuiRadioGroup-root">
  <!-- Radio components here -->
</div>
```

The Radio component is composed of a root `<span>`, with further nested `<span>` elements for the radio button, icon, action (with a nested `<input>`), and its associated `<label>`.

```html
  <span class="MuiRadio-root">
    <span class="MuiRadio-radio">
      <span class="MuiRadio-icon"></span>
      <span class="MuiRadio-action">
        <input class="MuiRadio-input">
      </span>
    </span>
    <label class="MuiRadio-label">
  </span>
```
