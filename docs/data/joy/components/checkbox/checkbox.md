---
productId: joy-ui
title: React Checkbox component
components: Checkbox
githubLabel: 'component: checkbox'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
---

# Checkbox

<p class="description">Checkboxes give users binary choices when presented with multiple options in a series.</p>

{{"component": "@mui/docs/ComponentLinkHeader"}}

## Introduction

Checkboxes provide users with a graphical representation of a binary choice (yes or no, on or off).
They are most commonly presented in a series, giving the user multiple choices to make.

The Joy UI Checkbox component replaces the native HTML `<input type="checkbox">` element and offers expanded options for styling and accessibility.

{{"demo": "CheckboxUsage.js", "hideToolbar": true, "bg": "gradient"}}

:::success
When should you use checkboxes rather than switches or radio buttons?

- Use a switch to provide the user with **a single binary choice**—checkboxes are preferable when you need to give the user multiple binary choices.
- Use radio buttons to give the user **mutually exclusive options**—checkboxes are preferable when you need to let the user select one, some, all, or none from a series of options.

  :::

## Basics

```jsx
import Checkbox from '@mui/joy/Checkbox';
```

The basic Checkbox component is a single input set to the unchecked state.
Use the `label` prop to provide text, and add `defaultChecked` when the input should be checked by default.

{{"demo": "BasicCheckbox.js"}}

## Customization

### Variants

The Checkbox component supports Joy UI's four [global variants](/joy-ui/main-features/global-variants/): `solid`, `soft`, `outlined`, and `plain`. By default, when unchecked, the Checkbox is set to `outlined`;
when checked, the variant changes to `solid`.

Adding the `variant` prop to your Checkbox overrides this default behavior. Try checking and unchecking the Checkboxes in the demo below to see the differences:

{{"demo": "CheckboxVariants.js"}}

:::info
To learn how to add your own variants, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
Note that you lose the global variants when you add custom variants.
:::

### Sizes

The Checkbox component comes in three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "CheckboxSizes.js"}}

:::info
To learn how to add custom sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.

{{"demo": "CheckboxColors.js"}}

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

### Clickable container

Use the `overlay` prop to shift the focus outline from the Checkbox to its container, making the entire container clickable to toggle the state of the Checkbox.
This works with any wrapper element with [positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/position#types_of_positioning)—the demo below uses [Sheet](/joy-ui/react-sheet/) (by default, it has `relative` position):

{{"demo": "OverlayCheckbox.js"}}

### Indeterminate

The default Checkbox is _dual-state:_ the user can toggle between checked and unchecked.

There is also the option for a _tri-state_ or indeterminate Checkbox that supports a state known as "partially checked."

This indeterminate state is often used to communicate the fact that only some out of a set of Checkboxes are checked.
As such, it's usually reserved for parent Checkboxes that can control the states of their children.

The demo below shows how to implement the `indeterminate` prop on a parent Checkbox that watches for the checked state in its children.
If only one child is checked, then the parent displays the indeterminate state.
Clicking on the parent Checkbox toggles selecting and deselecting all children.

:::warning
When the indeterminate state is set, the value of the `checked` prop only impacts form-submitted values.
It has no accessibility or UX implications.
:::

{{"demo": "IndeterminateCheckbox.js"}}

### Helper text

```jsx
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
```

Use the Form Control and Form Helper Text components add a description to the Checkbox.
The Checkbox will be linked to the helper text via the `aria-describedby` attribute.

{{"demo": "HelperTextCheckbox.js"}}

### Group

To group multiple Checkboxes, wrap them in a container component like Box with `role="group"`.

Combine with the [List](/joy-ui/react-list/) component to ensure consistent spacing and enable screen readers to interpret the Checkbox group as a list.
Learn more about accessible design patterns for checkboxes [in the W3C documentation](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/).

{{"demo": "GroupCheckboxes.js"}}

## Common examples

### Sign-up checkbox

To use an interactive element together with a Checkbox, you can wrap it with a FormControl and FormHelperText.

{{"demo": "ExampleSignUpCheckbox.js"}}

:::info
It is recommended that the interactive elements such as link should be placed outside of the checkbox's label.
To learn more, [visit HTML label](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#accessibility_concerns) from Mozilla.
:::

### Filtering status

This example uses variants and colors available to the List Item and Checkbox components to communicate state changes.

{{"demo": "ExampleFilterStatusCheckbox.js"}}

### Filtering members

This example uses the CSS `flexDirection: 'rowReverse'` property to position the label and icon.
Don't forget to use the `label` prop to ensure proper Checkbox accessibility.

{{"demo": "ExampleFilterMemberCheckbox.js"}}

### Choice chips

You can use Checkbox to recreate a kind of [Chip](/joy-ui/react-chip/) component, which is commonly implemented in the form of a group of filtering options.

{{"demo": "ExampleChoiceChipCheckbox.js"}}

### Viewport checklist

{{"demo": "ExampleButtonCheckbox.js"}}

## Anatomy

The Checkbox component is composed of a root `<span>` that wraps the input and `<label>` (if present).
Note that the actual `<input type="checkbox">` is doubly nested within `<span>` elements that represent the `checkbox` and `action` slots, respectively.

```html
<span class="MuiCheckbox-root">
  <span class="MuiCheckbox-checkbox">
    <span class="MuiCheckbox-action">
      <input type="checkbox" class="MuiCheckbox-input" value />
    </span>
  </span>
  <label class="MuiCheckbox-label">
    <!-- label text -->
  </label>
</span>
```
