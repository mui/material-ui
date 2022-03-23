---
product: base
title: React Input unstyled component and hook
components: InputUnstyled
githubLabel: 'component: input'
packageName: '@mui/base'
---

# Unstyled input

<p class="description">The `Input` component provides users with a field to enter and edit text.</p>

Features:

- ✨ Supports start and end adornments.
- 🚀 Can be transformed to textarea using the `multiline` prop.
- ♿️ Adds the appropriate ARIA roles automatically.

## Basic input

```js
import InputUnstyled from '@mui/base/InputUnstyled';
```

{{"demo": "UnstyledInputBasic.js", "defaultCodeOpen": false}}

## Adornments

You can use the `startAdornment` and `endAdornment` props to add a prefix, suffix, or an action to an input.
Common use cases of adornments include:

- when an input receives a specific unit of measure (like kilograms or currency)
- when an icon button toggles hiding/showing a password

{{"demo": "InputAdornments.js", "defaultCodeOpen": false}}

## Multiline

The `multiline` prop transforms the `input` field into a `textarea` element.

{{"demo": "InputMultiline.js"}}

If you want the textarea to grow with the content, you can use the [TextareaAutosize](/components/textarea-autosize/) component.
Unless the `rows` prop is set, the height of the textarea dynamically matches its content (using [TextareaAutosize](/components/textarea-autosize/)).
You can use the `minRows` and `maxRows` props to bound it.

{{"demo": "InputMultilineAutosize.js"}}

## useInput hook

```js
import { useInput } from '@mui/base/InputUnstyled';
```

The `useInput` hook lets you use the functionality of `InputUnstyled` in other components.
It returns props to be placed on a custom input and root elements, along with fields representing the internal state of the input.

{{"demo": "UseInput.js", "defaultCodeOpen": false}}
