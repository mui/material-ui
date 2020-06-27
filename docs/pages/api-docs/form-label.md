---
filename: /packages/material-ui/src/FormLabel/FormLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormLabel API

<p class="description">The API documentation of the FormLabel React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import FormLabel from '@material-ui/core/FormLabel';
// or
import { FormLabel } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiFormLabel` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'</span> |  | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'label'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the label should be displayed in a disabled state. |
| <span class="prop-name">error</span> | <span class="prop-type">bool</span> |  | If `true`, the label should be displayed in an error state. |
| <span class="prop-name">filled</span> | <span class="prop-type">bool</span> |  | If `true`, the label should use filled classes key. |
| <span class="prop-name">focused</span> | <span class="prop-type">bool</span> |  | If `true`, the input of this label is focused (used by `FormGroup` components). |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> |  | If `true`, the label will indicate that the input is required. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiFormLabel-root</span> | Styles applied to the root element.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiFormLabel-colorSecondary</span> | Styles applied to the root element if the color is secondary.
| <span class="prop-name">focused</span> | <span class="prop-name">.Mui-focused</span> | Pseudo-class applied to the root element if `focused={true}`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <span class="prop-name">error</span> | <span class="prop-name">.Mui-error</span> | Pseudo-class applied to the root element if `error={true}`.
| <span class="prop-name">filled</span> | <span class="prop-name">.MuiFormLabel-filled</span> | Pseudo-class applied to the root element if `filled={true}`.
| <span class="prop-name">required</span> | <span class="prop-name">.Mui-required</span> | Pseudo-class applied to the root element if `required={true}`.
| <span class="prop-name">asterisk</span> | <span class="prop-name">.MuiFormLabel-asterisk</span> | Styles applied to the asterisk element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/FormLabel/FormLabel.js) for more detail.

## Demos

- [Checkboxes](/components/checkboxes/)
- [Radio Buttons](/components/radio-buttons/)
- [Switches](/components/switches/)

