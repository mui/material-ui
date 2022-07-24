---
product: joy-ui
title: React Text field component
githubLabel: 'component: text field'
unstyled: /base/react-input/
---

# Text field

<p class="description">Text fields let users enter and edit text.</p>

## Introduction

Text fields allow users to enter text into a UI.
They typically appear in forms and dialogs.

{{"demo": "TextFieldUsage.js"}}

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import TextField from '@mui/joy/TextField';

export default function MyApp() {
  return <TextField placeholder="Search anything…" />;
}
```

### Sizes

The text field component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "TextFieldSizes.tsx"}}

### Variants

The text field component supports the four global variants: solid (default), soft, outlined, and plain.

{{"demo": "TextFieldVariants.tsx"}}

### Form props

Standard form attributes are supported e.g. `required`, `disabled`, `type`, etc. as well as a `helperText` which is used to give context about a field's input, such as how the input will be used.

{{"demo": "TextFieldFormProps.tsx"}}

### Validation

To toggle the error state, use the `error` prop.
And, to provide feedback about the error to the user, use the `helperText` prop.

{{"demo": "TextFieldValidation.tsx"}}

### Input decorators

Use the `startDecorator` and/or `endDecorator` props to add supporting icons or elements to the text field.

{{"demo": "TextFieldDecorators.tsx"}}

### Full width

To make the text field take up the full width of its container, use the `fullWidth` prop.

{{"demo": "TextFieldFullwidth.tsx"}}
