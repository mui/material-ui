---
product: joy-ui
title: React Input component
unstyled: /base/react-input/
---

# Input

<p class="description">An input is a UI element that accepts text data from the user.</p>

## Introduction

The Input component replaces the native HTML `<input>` tag, and offers expanded customization and accessibility features.

{{"demo": "InputUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Basics

```jsx
import Input from '@mui/joy/Input';
```

{{"demo": "BasicInput.js"}}

## Customization

### Variants

The input component supports the four global variants: solid (default), soft, outlined, and plain.

{{"demo": "InputVariants.js"}}

:::info
To learn how to add more variants to the component, check out [Themed components—Extend variants](/joy-ui/customization/themed-components/#extend-variants).
:::

### Sizes

The input component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "InputSizes.js"}}

:::info
To learn how to add more sizes to the component, check out [Themed components—Extend sizes](/joy-ui/customization/themed-components/#extend-sizes).
:::

### Colors

Toggle the palette that's being used to color the by text field by using the `color` prop.

{{"demo": "InputColors.js"}}

### Form props

Standard form attributes are supported e.g. `required`, `disabled`, etc.

{{"demo": "InputFormProps.js"}}

### Validation

To toggle the error state, use the `error` prop.

{{"demo": "InputValidation.js"}}

Note that using the `color` prop with danger as value gets the same result:

```js
<Input color="danger" />
```

### Decorators

Use the `startDecorator` and/or `endDecorator` props to add supporting icons or elements to the input.

It's usually more common to see input components using decorators at the top and bottom.

{{"demo": "InputDecorators.js"}}

## Inner HTML input

To pass any props to the inner HTML `<input>`, use `slotProps={{ input: { ...props } }}`.

{{"demo": "InputSlotProps.js"}}

## Common examples

### Newsletter Subscription

{{"demo": "InputSubscription.js"}}

## CSS variables

Play around with all the CSS variables available in the input component to see how the design changes.

You can use those to customize the component on both the `sx` prop and the theme.

{{"demo": "InputVariables.js", "hideToolbar": true}}

## Accessibility

In order for the input to be accessible, **it should be linked to a label**.

The `FormControl` automatically generates a unique id that links the input with the `FormLabel` and `FormHelperText` components:

{{"demo": "InputField.js"}}

Alternatively, you can do it manually by targeting the input slot:

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
