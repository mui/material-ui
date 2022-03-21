---
product: base
title: React Input unstyled component and hook
components: InputUnstyled
githubLabel: 'component: input'
packageName: '@mui/base'
---

# Input

<p class="description">The `Input` component allows users to enter and edit text.</p>

## Basic usage

```js
import InputUnstyled from '@mui/base/InputUnstyled';
```

{{"demo": "UnstyledInputBasic.js", "defaultCodeOpen": false}}

## Adornments

Sometimes it is useful to add some kind of prefix, a suffix, or an action to an input.
You can achieve this by using the adornment props.
For instance, you can use an icon button to hide or reveal the password.

{{"demo": "InputAdornments.js", "defaultCodeOpen": false}}

## useInput hook

```js
import { useInput } from '@mui/base/InputUnstyled';
```

The `useInput` hook lets you use the functionality of `InputUnstyled` in other components.
It returns props to be placed on a custom input element, along with fields representing the internal state of the button.

The `useButton` hook requires the `ref` of the element it's used on.
Additionally, you need to provide the `component` prop (unless you intend to use the plain `button`).

{{"demo": "UseInput.js", "defaultCodeOpen": false}}
