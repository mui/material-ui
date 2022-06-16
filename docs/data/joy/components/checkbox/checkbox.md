---
product: joy-ui
title: React Checkbox component
githubLabel: 'component: checkbox'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
---

# Checkbox

<p class="description">Checkboxes allow the user to select one or more items from a set.</p>

Checkboxes can be used to turn an option on or off.

If you have multiple options appearing in a list,
you can preserve space by using checkboxes instead of on/off switches.
If you have a single option, avoid using a checkbox and use an on/off switch instead.

{{"component": "modules/components/ComponentLinkHeader.js"}}

{{"demo": "CheckboxUsage.js"}}

## Checked

By default, the `Checkbox` has `outlined` variant when it is unchecked. When checked, it changes to `solid` variant.

{{"demo": "BasicCheckbox.js"}}

## Focus

By default, the focus outline fills the icon and checkbox. If you want to scope the outline to the icon, add `position: 'relative'` to the checkbox slot.

{{"demo": "FocusCheckbox.js"}}

## Label

## Icon

The `Checkbox` does not have unchecked icon by default. You can add icons for both states via `uncheckedIcon` and `checkedIcon` props.

{{"demo": "IconsCheckbox.js"}}

### Appear on hover

You can combine the unchecked icon with opacity to show the icon when it is hovered or focused.

{{"demo": "HoverCheckbox.js"}}

## Indeterminate

A checkbox input can only have two states in a form: checked or unchecked.
It either submits its value or doesn't.
Visually, there are **three** states a checkbox can be in: checked, unchecked, or indeterminate.

{{"demo": "IndeterminateCheckbox.js"}}

:::warning
⚠️ When indeterminate is set, the value of the `checked` prop only impacts the form submitted values.
It has no accessibility or UX implications.
:::

## Group

The checkboxes should be wrapped in a `role="group"` labeled by a text (could be a heading as well). In combination with [`List`](/joy-ui/react-list/) components to create consistent spacing and to enable screen readers to perceive the set of checkboxes as a list. For more details about accesibility, check out the [checkbox design pattern](https://www.w3.org/WAI/ARIA/apg/example-index/checkbox/checkbox.html).

{{"demo": "GroupCheckboxes.js"}}

## Overlay

Use `overlay` prop to expand the checkbox interaction area to fill the parent.

{{"demo": "OverlayCheckbox.js"}}

### Without icon

The `disableIcon` prop is useful when you want to hide the icon and use the global variant style to fill the parent.

{{"demo": "IconlessCheckbox.js"}}

## Common examples

### Filter status

This example demonstrates the mix of variants and colors on `ListItem` and `Checkbox`.

{{"demo": "ExampleFilterStatusCheckbox.js"}}

### Filter member

To make the checkbox accessible, it has to be labeled (in this example via the `label` prop). The position of the label and the icon are swapped with CSS `flex-direction: row-reverse`.

{{"demo": "ExampleFilterMemberCheckbox.js"}}

### Choice chips

Using checkbox to create chip choices is recommended. The custom icon can be used by hiding the checkbox default icon via [`disableIcon`](#without-icon) prop.

{{"demo": "ExampleChoiceChipCheckbox.js"}}
