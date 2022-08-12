---
product: base
title: Unstyled React Input component and hook
components: InputUnstyled
githubLabel: 'component: input'
---

# Unstyled input

<p class="description">The <code>Input</code> component provides users with a field to enter and edit text.</p>

Features:

- ✨ Supports start and end adornments
- 🚀 Can be transformed to `<textarea>` using the `multiline` prop
- ♿️ Adds the appropriate ARIA roles automatically

## Basic input

```js
import InputUnstyled from '@mui/base/InputUnstyled';
```

{{"demo": "UnstyledInputBasic.js", "defaultCodeOpen": false}}

## Adornments

You can use the `startAdornment` and `endAdornment` props to add a prefix, suffix, or an action to an input. Common use cases of adornments include:

- when an input receives a specific unit of measure (like kilograms or currency)
- when an icon button toggles hiding/showing a password

{{"demo": "InputAdornments.js", "defaultCodeOpen": false}}

## Multiline

The `multiline` prop transforms the `<input>` field into a `<textarea>` element.

{{"demo": "InputMultiline.js"}}

If you want the `<textarea>` to grow with the content, you can use the [`TextareaAutosize`](/base/react-textarea-autosize/) component. When using `TextareaAutoresize`, the height of the `<textarea>` element dynamically matches its content, unless the `row` prop is set. To set minimum and maximum sizes, add the 'minRows`and`maxRows` props.

{{"demo": "InputMultilineAutosize.js"}}

## The useInput hook

```js
import { useInput } from '@mui/base/InputUnstyled';
```

The `useInput` hook lets you use the functionality of `InputUnstyled` in other components. It returns props to be placed on a custom input and root elements, along with fields representing the internal state of the input.

{{"demo": "UseInput.js", "defaultCodeOpen": false}}
