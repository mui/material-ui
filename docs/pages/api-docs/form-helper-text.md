---
filename: /packages/material-ui/src/FormHelperText/FormHelperText.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormHelperText API

<p class="description">The API documentation of the FormHelperText React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import FormHelperText from '@material-ui/core/FormHelperText';
// or
import { FormHelperText } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiFormHelperText` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component.<br>If `' '` is provided, the component reserves one line height for displaying a future message. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'p'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the helper text should be displayed in a disabled state. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> |  | If `true`, helper text should be displayed in an error state. |
| <span class="prop-name">filled</span> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use filled classes key. |
| <span class="prop-name">focused</span> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use focused classes key. |
| <span class="prop-name">margin</span> | <span class="prop-type">'dense'</span> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> |  | If `true`, the helper text should use required classes key. |
| <span class="prop-name">variant</span> | <span class="prop-type">'filled'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'standard'</span> |  | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiFormHelperText-root</span> | Styles applied to the root element.
| <span class="prop-name">error</span> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element if `error={true}`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">marginDense</span> | <span class="prop-name">.MuiFormHelperText-marginDense</span> | Styles applied to the root element if `margin="dense"`.
| <span class="prop-name">contained</span> | <span class="prop-name">.MuiFormHelperText-contained</span> | Styles applied to the root element if `variant="filled"` or `variant="outlined"`.
| <span class="prop-name">focused</span> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if `focused={true}`.
| <span class="prop-name">filled</span> | <span class="prop-name">.MuiFormHelperText-filled</span> | Pseudo-class applied to the root element if `filled={true}`.
| <span class="prop-name">required</span> | <span class="prop-name">.Mui-required</span> | Pseudo-class applied to the root element if `required={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormHelperText/FormHelperText.js) for more detail.

## Demos

- [Text Fields](/components/text-fields/)

