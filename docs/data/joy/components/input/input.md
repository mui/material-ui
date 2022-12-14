---
product: joy-ui
title: React Input component
unstyled: /base/react-input/
---

# Input

<p class="description">Input component gives you a input HTML element that automatically adjusts its height to match the length of the content within.</p>

## Introduction

{{"demo": "InputUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Input from '@mui/joy/Input';

export default function MyApp() {
  return <Input placeholder="Type anything…" />;
}
```

### Variants

The input component supports the four global variants: solid (default), soft, outlined, and plain.

{{"demo": "InputVariants.js"}}

### Sizes

The input component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "InputSizes.js"}}

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

## Accessibility

In order for the input to be accessible, **it should be linked to a label**.

The `FormControl` automatically generates a unique id that links the input with the `FormLabel` component:

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
