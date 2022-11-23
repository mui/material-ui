---
product: joy-ui
title: React Text Field component
githubLabel: 'component: text field'
unstyled: /base/react-input/
---

# Text Field

<p class="description">Text fields let users enter and edit text.</p>

## Introduction

Text fields allow users to enter text into a UI.
They typically appear in forms and dialogs.

{{"demo": "TextFieldUsage.js", "hideToolbar": true, "bg": "gradient"}}

{{"component": "modules/components/ComponentLinkHeader.js"}}

## Component

After [installation](/joy-ui/getting-started/installation/), you can start building with this component using the following basic elements:

```jsx
import TextField from '@mui/joy/TextField';

export default function MyApp() {
  return <TextField placeholder="Search anything…" />;
}
```

### Composition

`TextField` is composed of smallar components－`FormControl`, `FormLabel`, `FormerHelperText`, and `Input`.
You can either use each one of them separately or plainly use the `TextField` itself.

{{"demo": "TextFieldComposition.js"}}

### Variants

The text field component supports the four global variants: `solid` (default), `soft`, `outlined`, and `plain`.

{{"demo": "TextFieldVariants.js"}}

### Sizes

The text field component comes with three sizes out of the box: `sm`, `md` (the default), and `lg`.

{{"demo": "TextFieldSizes.js"}}

### Colors

Toggle the palette that's being used to color the by text field by using the `color` prop.

{{"demo": "TextFieldColors.js"}}

### Form props

Standard form attributes are supported e.g. `required`, `disabled`, `type`, etc. as well as a `helperText` which is used to give context about a field's input, such as how the input will be used.

{{"demo": "TextFieldFormProps.js"}}

### Validation

To toggle the error state, use the `error` prop.
And, to provide feedback about the error to the user, use the `helperText` prop.

{{"demo": "TextFieldValidation.js"}}

### Input decorators

Use the `startDecorator` and/or `endDecorator` props to add supporting icons or elements to the text field.

{{"demo": "TextFieldDecorators.js"}}

### Full width

To make the text field take up the full width of its container, use the `fullWidth` prop.

{{"demo": "TextFieldFullwidth.js"}}
