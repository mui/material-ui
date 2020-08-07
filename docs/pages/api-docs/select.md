---
filename: /packages/material-ui/src/Select/Select.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Select API

<p class="description">The API documentation of the Select React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Select from '@material-ui/core/Select';
// or
import { Select } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiSelect` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">autoWidth</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the width of the popover will automatically be set according to the items inside the menu, otherwise it will be at least the width of the select input. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The option elements to populate the select with. Can be some `MenuItem` when `native` is false and `option` when `native` is true.<br>⚠️The `MenuItem` elements **must** be direct descendants when `native` is false. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">defaultValue</span> | <span class="prop-type">any</span> |  | The default element value. Use when the component is not controlled. |
| <span class="prop-name">displayEmpty</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, a value is displayed even if no items are selected.<br>In order to display a meaningful value, a function should be passed to the `renderValue` prop which returns the value to be displayed when no items are selected. You can only use it when the `native` prop is `false` (default). |
| <span class="prop-name">IconComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">ArrowDropDownIcon</span> | The icon that displays the arrow. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | The `id` of the wrapper element or the `select` element when `native`. |
| <span class="prop-name">input</span> | <span class="prop-type">element</span> |  | An `Input` element; does not have to be a material-ui specific `Input`. |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object</span> |  | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. When `native` is `true`, the attributes are applied on the `select` element. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | See [OutlinedInput#label](/api/outlined-input/#props) |
| <span class="prop-name">labelId</span> | <span class="prop-type">string</span> |  | The ID of an element that acts as an additional label. The Select will be labelled by the additional label and the selected value. |
| <span class="prop-name">labelWidth</span> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | See [OutlinedInput#label](/api/outlined-input/#props) |
| <span class="prop-name">MenuProps</span> | <span class="prop-type">object</span> |  | Props applied to the [`Menu`](/api/menu/) element. |
| <span class="prop-name">multiple</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, `value` must be an array and the menu will support multiple selections. |
| <span class="prop-name">native</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component will be using a native `select` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback function fired when a menu item is selected.<br><br>**Signature:**<br>`function(event: object, child?: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value` (any).<br>*child:* The react element that was selected when `native` is `false` (default). |
| <span class="prop-name">onClose</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be opened. Use in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <span class="prop-name">open</span> | <span class="prop-type">bool</span> |  | Control `select` open state. You can only use it when the `native` prop is `false` (default). |
| <span class="prop-name">renderValue</span> | <span class="prop-type">func</span> |  | Render the selected value. You can only use it when the `native` prop is `false` (default).<br><br>**Signature:**<br>`function(value: any) => ReactNode`<br>*value:* The `value` provided to the component. |
| <span class="prop-name">SelectDisplayProps</span> | <span class="prop-type">object</span> |  | Props applied to the clickable div element. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The input value. Providing an empty string will select no options. This prop is required when the `native` prop is `false` (default). Set to an empty string `''` if you don't want any of the available options to be selected.<br>If the value is an object it must have reference equality with the option in order to be selected. If the value is not an object, the string representation must match with the string representation of the option in order to be selected. |
| <span class="prop-name">variant</span> | <span class="prop-type">'filled'<br>&#124;&nbsp;'outlined'<br>&#124;&nbsp;'standard'</span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Input](/api/input/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiSelect-root</span> | Styles applied to the select component `root` class.
| <span class="prop-name">select</span> | <span class="prop-name">.MuiSelect-select</span> | Styles applied to the select component `select` class.
| <span class="prop-name">filled</span> | <span class="prop-name">.MuiSelect-filled</span> | Styles applied to the select component if `variant="filled"`.
| <span class="prop-name">outlined</span> | <span class="prop-name">.MuiSelect-outlined</span> | Styles applied to the select component if `variant="outlined"`.
| <span class="prop-name">selectMenu</span> | <span class="prop-name">.MuiSelect-selectMenu</span> | Styles applied to the select component `selectMenu` class.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the select component `disabled` class.
| <span class="prop-name">icon</span> | <span class="prop-name">.MuiSelect-icon</span> | Styles applied to the icon component.
| <span class="prop-name">iconOpen</span> | <span class="prop-name">.MuiSelect-iconOpen</span> | Styles applied to the icon component if the popup is open.
| <span class="prop-name">iconFilled</span> | <span class="prop-name">.MuiSelect-iconFilled</span> | Styles applied to the icon component if `variant="filled"`.
| <span class="prop-name">iconOutlined</span> | <span class="prop-name">.MuiSelect-iconOutlined</span> | Styles applied to the icon component if `variant="outlined"`.
| <span class="prop-name">nativeInput</span> | <span class="prop-name">.MuiSelect-nativeInput</span> | Styles applied to the underlying native input component.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Select/Select.js) for more detail.

## Inheritance

The props of the [Input](/api/input/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Selects](/components/selects/)

