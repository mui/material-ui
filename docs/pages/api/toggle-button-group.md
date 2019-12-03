---
filename: /packages/material-ui-lab/src/ToggleButtonGroup/ToggleButtonGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ToggleButtonGroup API

<p class="description">The API documentation of the ToggleButtonGroup React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
// or
import { ToggleButtonGroup } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the button. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--exclusive"></a><a href="#props--exclusive" class="prop-name">exclusive</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, only allow one of the child ToggleButton values to be selected. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: any) => void`<br>*event:* The event source of the callback.<br>*value:* of the selected buttons. When `exclusive` is true this is a single value; when false an array of selected values. If no value is selected and `exclusive` is true the value is null; when false an empty array. |
| <a class="anchor-link" id="props--size"></a><a href="#props--size" class="prop-name">size</a> | <span class="prop-type">'large'<br>&#124;&nbsp;'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the buttons. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" class="prop-name">value</a> | <span class="prop-type">any</span> |  | The currently selected value within the group or an array of selected values when `exclusive` is false. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiToggleButtonGroup`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiToggleButtonGroup-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--grouped"></a><a href="#css--grouped" class="prop-name">grouped</a> | <span class="prop-name">.MuiToggleButtonGroup-grouped</span> | Styles applied to the children.
| <a class="anchor-link" id="css--groupedSizeSmall"></a><a href="#css--groupedSizeSmall" class="prop-name">groupedSizeSmall</a> | <span class="prop-name">.MuiToggleButtonGroup-groupedSizeSmall</span> | Styles applied to the children if `size="small"`.
| <a class="anchor-link" id="css--groupedSizeLarge"></a><a href="#css--groupedSizeLarge" class="prop-name">groupedSizeLarge</a> | <span class="prop-name">.MuiToggleButtonGroup-groupedSizeLarge</span> | Styles applied to the children if `size="large"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/ToggleButtonGroup/ToggleButtonGroup.js) for more detail.

## Demos

- [Toggle Button](/components/toggle-button/)

