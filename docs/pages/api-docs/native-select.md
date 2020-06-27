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

## Component name

The `MuiNativeSelect` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The option elements to populate the select with. Can be some `<option>` elements. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">IconComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">ArrowDropDownIcon</span> | The icon that displays the arrow. |
| <span class="prop-name">input</span> | <span class="prop-type">element</span> | <span class="prop-default">&lt;Input /></span> | An `Input` element; does not have to be a material-ui specific `Input`. |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object</span> |  | Attributes applied to the `select` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback function fired when a menu item is selected.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value` (string). |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The input value. The DOM API casts this to a string. |
| <span class="prop-name">variant</span> | <span class="prop-type">'filled'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'standard'</span> |  | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Input](/api/input/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiNativeSelect-root</span> | Styles applied to the select component `root` class.
| <span class="prop-name">select</span> | <span class="prop-name">.MuiNativeSelect-select</span> | Styles applied to the select component `select` class.
| <span class="prop-name">filled</span> | <span class="prop-name">.MuiNativeSelect-filled</span> | Styles applied to the select component if `variant="filled"`.
| <span class="prop-name">outlined</span> | <span class="prop-name">.MuiNativeSelect-outlined</span> | Styles applied to the select component if `variant="outlined"`.
| <span class="prop-name">selectMenu</span> | <span class="prop-name">.MuiNativeSelect-selectMenu</span> | Styles applied to the select component `selectMenu` class.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the select component `disabled` class.
| <span class="prop-name">icon</span> | <span class="prop-name">.MuiNativeSelect-icon</span> | Styles applied to the icon component.
| <span class="prop-name">iconOpen</span> | <span class="prop-name">.MuiNativeSelect-iconOpen</span> | Styles applied to the icon component if the popup is open.
| <span class="prop-name">iconFilled</span> | <span class="prop-name">.MuiNativeSelect-iconFilled</span> | Styles applied to the icon component if `variant="filled"`.
| <span class="prop-name">iconOutlined</span> | <span class="prop-name">.MuiNativeSelect-iconOutlined</span> | Styles applied to the icon component if `variant="outlined"`.
| <span class="prop-name">nativeInput</span> | <span class="prop-name">.MuiNativeSelect-nativeInput</span> | Styles applied to the underlying native input component.

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

