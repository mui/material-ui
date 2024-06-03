---
productId: joy-ui
title: React Textarea component
components: Textarea
githubLabel: 'component: TextareaAutosize'
unstyled: /base-ui/react-textarea-autosize/
---

# Textarea

<p class="description">Textarea component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.</p>

{{"component": "@mui/docs/ComponentLinkHeader", "design": false}}

## Introduction

Joy UI's textarea component is built on top of the Base UI [`TextareaAutoSize`](/base-ui/react-textarea-autosize/) component.

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

Standard form attributes are supported for example `required`, `disabled`, etc.

{{"demo": "TextareaFormProps.js"}}

### Focused ring

Provide these CSS variables to `sx` prop to control the focused ring appearance:

- `--Textarea-focusedInset`: the focused ring's **position**, either inside(`inset`) or outside(`var(--any, )`) of the Textarea.
- `--Textarea-focusedThickness`: the **size** of the focused ring.
- `--Textarea-focusedHighlight`: the **color** of the focused ring.

{{"demo": "FocusedRingTextarea.js"}}

:::success
To get full control of the focused ring, customize the `box-shadow` of the `::before` pseudo element directly

```js
<Textarea sx={{ '&:focus-within::before': { boxShadow: '...your custom value' } }} />
```

:::

#### Debugging the focus ring

To display the Textarea's focus ring by simulating user's focus, inspect the Textarea element and toggle the [pseudostate panel](https://developer.chrome.com/docs/devtools/css/#pseudostates).

- If you inspect the Textarea's root element, with `.MuiTextarea-root` class, you have to toggle on the `:focus-within` state.
- If you inspect the `<input>` element, you have to toggle on the `:focus` state.

### Triggering the focus ring

To trigger the focus ring programmatically, set the CSS variable `--Textarea-focused: 1`.

{{"demo": "TriggerFocusTextarea.js"}}

:::info
The focus ring still appear on focus even though you set `--Textarea-focused: 0`.
:::

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

### HTML textarea ref

Use the `slotProps.textarea` attribute to pass props to the `ref` and other [supported HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attributes) to the textarea element.

{{"demo": "TextareaRef.js"}}

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

### Focus outline

This example shows how to replace the default focus ring appearance with CSS outline.

{{"demo": "FocusOutlineTextarea.js"}}

### Floating label

To create a floating label textarea, a custom component (combination of `<textarea>` and `<label>`) is required to replace the default textarea slot.

{{"demo": "FloatingLabelTextarea.js"}}

### Underline input

{{"demo": "UnderlineTextarea.js"}}

### Comment box

{{"demo": "ExampleTextareaComment.js"}}
