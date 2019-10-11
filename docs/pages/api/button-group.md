---
filename: /packages/material-ui/src/ButtonGroup/ButtonGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ButtonGroup API

<p class="description">The API documentation of the ButtonGroup React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ButtonGroup from '@material-ui/core/ButtonGroup';
// or
import { ButtonGroup } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The content of the button group. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'default'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'div'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the buttons will be disabled. |
| <span class="prop-name">disableFocusRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button keyboard focus ripple will be disabled. `disableRipple` must also be true. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the button ripple effect will be disabled. |
| <span class="prop-name">fullWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the buttons will take up the full width of its container. |
| <span class="prop-name">size</span> | <span class="prop-type">'small'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'large'</span> | <span class="prop-default">'medium'</span> | The size of the button. `small` is equivalent to the dense button styling. |
| <span class="prop-name">variant</span> | <span class="prop-type">'text'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'contained'</span> | <span class="prop-default">'outlined'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiButtonGroup`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiButtonGroup-root</span> | Styles applied to the root element.
| <span class="prop-name">contained</span> | <span class="prop-name">MuiButtonGroup-contained</span> | Styles applied to the root element if `variant="contained"`.
| <span class="prop-name">fullWidth</span> | <span class="prop-name">MuiButtonGroup-fullWidth</span> | Styles applied to the root element if `fullWidth={true}`.
| <span class="prop-name">grouped</span> | <span class="prop-name">MuiButtonGroup-grouped</span> | Styles applied to the children.
| <span class="prop-name">groupedText</span> | <span class="prop-name">MuiButtonGroup-groupedText</span> | Styles applied to the children if `variant="text"`.
| <span class="prop-name">groupedTextPrimary</span> | <span class="prop-name">MuiButtonGroup-groupedTextPrimary</span> | Styles applied to the children if `variant="text"` and `color="primary"`.
| <span class="prop-name">groupedTextSecondary</span> | <span class="prop-name">MuiButtonGroup-groupedTextSecondary</span> | Styles applied to the children if `variant="text"` and `color="secondary"`.
| <span class="prop-name">groupedOutlined</span> | <span class="prop-name">MuiButtonGroup-groupedOutlined</span> | Styles applied to the children if `variant="outlined"`.
| <span class="prop-name">groupedOutlinedPrimary</span> | <span class="prop-name">MuiButtonGroup-groupedOutlinedPrimary</span> | Styles applied to the children if `variant="outlined"` and `color="primary"`.
| <span class="prop-name">groupedOutlinedSecondary</span> | <span class="prop-name">MuiButtonGroup-groupedOutlinedSecondary</span> | Styles applied to the children if `variant="outlined"` and `color="secondary"`.
| <span class="prop-name">groupedContained</span> | <span class="prop-name">MuiButtonGroup-groupedContained</span> | Styles applied to the children if `variant="contained"`.
| <span class="prop-name">groupedContainedPrimary</span> | <span class="prop-name">MuiButtonGroup-groupedContainedPrimary</span> | Styles applied to the children if `variant="contained"` and `color="primary"`.
| <span class="prop-name">groupedContainedSecondary</span> | <span class="prop-name">MuiButtonGroup-groupedContainedSecondary</span> | Styles applied to the children if `variant="contained"` and `color="secondary"`.
| <span class="prop-name">disabled</span> | <span class="prop-name">Mui-disabled</span> | Pseudo-class applied to child elements if `disabled={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ButtonGroup/ButtonGroup.js) for more detail.

## Demos

- [Buttons](/components/buttons/)

