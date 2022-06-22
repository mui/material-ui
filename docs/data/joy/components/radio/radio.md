---
product: joy-ui
title: React Radio button component
githubLabel: 'component: radio'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/
---

# Radio

<p class="description">Radio buttons allow the user to select one option from a set.</p>

## Introduction

Use radio buttons when the user needs to see all available options.
If available options can be collapsed, consider using a `<select>` because it uses less space.

Radio buttons should have the most commonly used option selected by default.

{{"demo": "RadioUsage.js", "hideToolbar": true}}

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Radio group

`RadioGroup` is a helpful wrapper used to group `Radio` components that provides an easier API, and proper keyboard accessibility to the group. Then, use a text element to label the radio group.

{{"demo": "RadioButtonsGroup.js"}}

### Controlled

You can control the radio with the `value` and `onChange` props:

{{"demo": "ControlledRadioButtonsGroup.js"}}

### Focus outline

The focus outline, by default, wraps both the radio itself and its label.
To change that, target the `radioClasses.radio` class and add `position: 'relative'`.

{{"demo": "RadioFocus.js"}}

### Overlay

Use the `overlay` prop to make the entire surface of the non-static container clickable.

{{"demo": "OverlayRadio.js", "bg": true}}

:::info
Use the CSS variable `--Radio-action-radius` to control the border radius of the clickable area.
:::

### Icon

`Radio`, by default, comes without an unchecked component.
To add an icon to both uncheck and checked states, use the `uncheckedIcon` and `checkedIcon` props.

{{"demo": "IconsRadio.js"}}

### Without an icon

To rely only on variants to communicate the radio state change, use the `disableIcon` prop to remove the icon.

{{"demo": "IconlessRadio.js"}}

## Standalone radio buttons

`Radio` can also be used standalone, without the RadioGroup wrapper.

{{"demo": "RadioButtons.js"}}

## When to use

- [Checkboxes vs. Radio Buttons](https://www.nngroup.com/articles/checkboxes-vs-radio-buttons/)

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#radiobutton)

- All form controls should have labels, and this includes radio buttons, checkboxes, and switches. In most cases, this is done by using the `<label>` element ([FormControlLabel](/material-ui/api/form-control-label/)).
- When a label can't be used, it's necessary to add an attribute directly to the input component.
  In this case, you can apply the additional attribute (e.g. `aria-label`, `aria-labelledby`, `title`) via the `inputProps` property.

```jsx
<Radio
  value="radioA"
  componentsProps={{
    input: {
      'aria-label': 'Radio A',
    },
  }}
/>
```

## Common examples

### Payment channels

Leverage list components to create vertical or horizontal radio buttons divided by a separator.

{{"demo": "ExamplePaymentChannels.js"}}

### Radio position end

You can swap the radio icon and the label by using CSS `flex-direction: row-reverse`.

{{"demo": "ExampleRadioPosition.js"}}

### E-commerce product attributes

This example demonstrates complex customization using the `Sheet` component as a container for the radios. The focus outline is customized to be smaller and the color changes based on the value.

The check icon's color inherits from `solid` variant of the radio, so that we don't need to handpick the color to have enough contrast with the background.

{{"demo": "ExampleProductAttributes.js"}}
