---
filename: /packages/material-ui/src/NativeSelect/NativeSelect.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# NativeSelect API

<p class="description">The API documentation of the NativeSelect React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import NativeSelect from '@material-ui/core/NativeSelect';
// or
import { NativeSelect } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

An alternative to `<Select native />` with a much smaller bundle size footprint.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The option elements to populate the select with. Can be some `<option>` elements. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--IconComponent"></a><a href="#props--IconComponent" title="link to the prop on this page" class="prop-name">IconComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">ArrowDropDownIcon</span> | The icon that displays the arrow. |
| <a class="anchor-link" id="props--input"></a><a href="#props--input" title="link to the prop on this page" class="prop-name">input</a> | <span class="prop-type">element</span> | <span class="prop-default">&lt;Input /></span> | An `Input` element; does not have to be a material-ui specific `Input`. |
| <a class="anchor-link" id="props--inputProps"></a><a href="#props--inputProps" title="link to the prop on this page" class="prop-name">inputProps</a> | <span class="prop-type">object</span> |  | Attributes applied to the `select` element. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" title="link to the prop on this page" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback function fired when a menu item is selected.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value` (string). |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name">value</a> | <span class="prop-type">any</span> |  | The input value. The DOM API casts this to a string. |
| <a class="anchor-link" id="props--variant"></a><a href="#props--variant" title="link to the prop on this page" class="prop-name">variant</a> | <span class="prop-type">'standard'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'filled'</span> |  | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Input](/api/input/)).

## CSS

- Style sheet name: `MuiNativeSelect`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiNativeSelect-root</span> | Styles applied to the select component `root` class.
| <a class="anchor-link" title="link to the rule name on this page" id="css--select"></a><a href="#css--select" class="prop-name">select</a> | <span class="prop-name">.MuiNativeSelect-select</span> | Styles applied to the select component `select` class.
| <a class="anchor-link" title="link to the rule name on this page" id="css--filled"></a><a href="#css--filled" class="prop-name">filled</a> | <span class="prop-name">.MuiNativeSelect-filled</span> | Styles applied to the select component if `variant="filled"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--outlined"></a><a href="#css--outlined" class="prop-name">outlined</a> | <span class="prop-name">.MuiNativeSelect-outlined</span> | Styles applied to the select component if `variant="outlined"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--selectMenu"></a><a href="#css--selectMenu" class="prop-name">selectMenu</a> | <span class="prop-name">.MuiNativeSelect-selectMenu</span> | Styles applied to the select component `selectMenu` class.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the select component `disabled` class.
| <a class="anchor-link" title="link to the rule name on this page" id="css--icon"></a><a href="#css--icon" class="prop-name">icon</a> | <span class="prop-name">.MuiNativeSelect-icon</span> | Styles applied to the icon component.
| <a class="anchor-link" title="link to the rule name on this page" id="css--iconOpen"></a><a href="#css--iconOpen" class="prop-name">iconOpen</a> | <span class="prop-name">.MuiNativeSelect-iconOpen</span> | Styles applied to the icon component if the popup is open.
| <a class="anchor-link" title="link to the rule name on this page" id="css--iconFilled"></a><a href="#css--iconFilled" class="prop-name">iconFilled</a> | <span class="prop-name">.MuiNativeSelect-iconFilled</span> | Styles applied to the icon component if `variant="filled"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--iconOutlined"></a><a href="#css--iconOutlined" class="prop-name">iconOutlined</a> | <span class="prop-name">.MuiNativeSelect-iconOutlined</span> | Styles applied to the icon component if `variant="outlined"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/NativeSelect/NativeSelect.js) for more detail.

## Inheritance

The props of the [Input](/api/input/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Selects](/components/selects/)

