---
filename: /packages/material-ui/src/Switch/Switch.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Switch API

<p class="description">The API documentation of the Switch React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Switch from '@material-ui/core/Switch';
// or
import { Switch } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiSwitch` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">checked</span> | <span class="prop-type">bool</span> |  | If `true`, the component is checked. |
| <span class="prop-name">checkedIcon</span> | <span class="prop-type">node</span> |  | The icon to display when the component is checked. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'default'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'secondary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the switch will be disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">edge</span> | <span class="prop-type">'end'<br>&#124;&nbsp;'start'<br>&#124;&nbsp;false</span> | <span class="prop-default">false</span> | If given, uses a negative margin to counteract the padding on one side (this is often helpful for aligning the left or right side of the icon with content above or below, without ruining the border size and shape). |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon to display when the component is unchecked. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | The id of the `input` element. |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object</span> |  | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. |
| <span class="prop-name">inputRef</span> | <span class="prop-type">ref</span> |  | Pass a ref to the `input` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value` (string). You can pull out the new checked state by accessing `event.target.checked` (boolean). |
| <span class="prop-name">required</span> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be required. |
| <span class="prop-name">size</span> | <span class="prop-type">'medium'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'medium'</span> | The size of the switch. `small` is equivalent to the dense switch styling. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the component. The DOM API casts this to a string. The browser uses "on" as the default value. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([IconButton](/api/icon-button/)).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiSwitch-root</span> | Styles applied to the root element.
| <span class="prop-name">edgeStart</span> | <span class="prop-name">.MuiSwitch-edgeStart</span> | Styles applied to the root element if `edge="start"`.
| <span class="prop-name">edgeEnd</span> | <span class="prop-name">.MuiSwitch-edgeEnd</span> | Styles applied to the root element if `edge="end"`.
| <span class="prop-name">switchBase</span> | <span class="prop-name">.MuiSwitch-switchBase</span> | Styles applied to the internal `SwitchBase` component's `root` class.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">.MuiSwitch-colorPrimary</span> | Styles applied to the internal SwitchBase component's root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">.MuiSwitch-colorSecondary</span> | Styles applied to the internal SwitchBase component's root element if `color="secondary"`.
| <span class="prop-name">sizeSmall</span> | <span class="prop-name">.MuiSwitch-sizeSmall</span> | Styles applied to the root element if `size="small"`.
| <span class="prop-name">checked</span> | <span class="prop-name">.Mui-checked</span> | Pseudo-class applied to the internal `SwitchBase` component's `checked` class.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the internal SwitchBase component's disabled class.
| <span class="prop-name">input</span> | <span class="prop-name">.MuiSwitch-input</span> | Styles applied to the internal SwitchBase component's input element.
| <span class="prop-name">thumb</span> | <span class="prop-name">.MuiSwitch-thumb</span> | Styles used to create the thumb passed to the internal `SwitchBase` component `icon` prop.
| <span class="prop-name">track</span> | <span class="prop-name">.MuiSwitch-track</span> | Styles applied to the track element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Switch/Switch.js) for more detail.

## Inheritance

The props of the [IconButton](/api/icon-button/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Switches](/components/switches/)
- [Transfer List](/components/transfer-list/)

