---
product: joy-ui
title: React Input component
unstyled: /base/react-input/
---

# Input

<p class="description">The Input component facilitates the entry of text data from the user.</p>

## Introduction

The Input component enhances the functionality of the native HTML `<input>` tag by providing expanded customization options and accessibilty features.

{{"demo": "InputUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basics

```jsx
import Input from '@mui/joy/Input';
```

The Input component provides a customizable input field that can be used to collect user information, such as name, email, password, or other types of data.

{{"demo": "BasicInput.js"}}

## Customization

### Variants

The input component supports the four global variants: solid (default), soft, outlined, and plain.

{{"demo": "InputVariants.js"}}

:::info
To learn how to add more variants to the component, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
:::

### Sizes

The input component comes with three sizes: `sm`, `md` (default), and `lg`.

{{"demo": "InputSizes.js"}}

:::info
To learn how to add more sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Every palette included in the theme is available via the `color` prop.

{{"demo": "InputColors.js"}}

### Form props

Standard form attributes, such as `required` and `disabled`, can be added to the input component.

{{"demo": "InputFormProps.js"}}

### Validation

The error state can be toggled using the `error` prop.

{{"demo": "InputValidation.js"}}

:::info
Using the `color` prop with danger as value gets the same result:

```js
<Input color="danger" />
```

:::

### Decorators

The `startDecorator` and `endDecorator` props can be used to add supporting icons or elements to the input.
However with input components, decorators are typically located at the top and bottom of the input field.

{{"demo": "InputDecorators.js"}}

### Inner HTML input

Should you need to pass props to the inner HTML `<input>`, use `slotProps={{ input: { ...props } }}`.
These props may include HTML attributes such as `min`, `max`, and `autocomplete`.

{{"demo": "InputSlotProps.js"}}

## Common examples

### Newsletter Subscription

{{"demo": "InputSubscription.js"}}

## CSS variables

Play around with all the CSS variables available in the input component to see how the design changes.
You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "InputVariables.js", "hideToolbar": true}}

## Accessibility

All inputs should have a descriptive label linked to help users understand its purpose.

The `FormControl` automatically generates a unique id that links the input with the `FormLabel` and `FormHelperText` components:

{{"demo": "InputField.js"}}

Alternatively, it can do it manually by targeting the input slot by accessing the [inner HTML input](#inner-html-input) :

```jsx
<label htmlFor="unique-id">Label</label>
<Input
  slotProps={{
    input: {
      id: 'unique-id',
    }
  }}
/>
```

## Anatomy

The Input component is composed of a root `<div>` with an input `<input>` nested inside.

```html
<div class="JoyInput-root">
  <input class="JoyInput-input" />
</div>
```
