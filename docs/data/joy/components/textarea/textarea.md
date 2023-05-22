---
product: joy-ui
title: React Textarea component
components: Textarea
githubLabel: 'component: TextareaAutosize'
unstyled: /base/react-textarea-autosize/
---

# Textarea

<p class="description">Textarea component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Introduction

Joy UI's textarea component is built on top of the Base UI [`TextareaAutoSize`](/base/react-textarea-autosize/) component.

{{"demo": "TextareaUsage.js", "hideToolbar": true, "bg": "gradient"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import Textarea from '@mui/joy/Textarea';

export default function MyApp() {
  return <Textarea placeholder="Type anything…" />;
}
```

### Variants

The textarea component supports the four global variants: solid (default), soft, outlined, and plain.

{{"demo": "TextareaVariants.js"}}

### Sizes

The textarea component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "TextareaSizes.js"}}

### Colors

Toggle the palette that's being used to color the by text field by using the `color` prop.

{{"demo": "TextareaColors.js"}}

### Form props

Standard form attributes are supported e.g. `required`, `disabled`, etc.

{{"demo": "TextareaFormProps.js"}}

### Validation

To toggle the error state, use the `error` prop.

{{"demo": "TextareaValidation.js"}}

Note that using the `color` prop with danger as value gets the same result:

```js
<Textarea color="danger" />
```

### Rows

Use the `minRows` to set the minimum number of lines to show and `maxRows` to limit the number of lines that users will see.

{{"demo": "TextareaRows.js"}}

### Decorators

Use the `startDecorator` and/or `endDecorator` props to add supporting icons or elements to the textarea.
It's usually more common to see textarea components using decorators at the top and bottom.

{{"demo": "TextareaDecorators.js"}}

## Accessibility

In order for the textarea to be accessible, **it should be linked to a label**.

The `FormControl` automatically generates a unique id that links the textarea with the `FormLabel` component:

{{"demo": "TextareaField.js"}}

Alternatively, you can do it manually by targeting the textarea slot:

```jsx
<label htmlFor="unique-id">Label</label>
<Textarea
  slotProps={{
    textarea: {
      id: 'unique-id',
    }
  }}
/>
```

## Common examples

### Comment box

{{"demo": "ExampleTextareaComment.js"}}
