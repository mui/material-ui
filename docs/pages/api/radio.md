---
filename: /packages/material-ui/src/Radio/Radio.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Radio API

<p class="description">The API documentation of the Radio React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Radio from '@material-ui/core/Radio';
// or
import { Radio } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--checked"></a><a href="#props--checked" title="link to the prop on this page" class="prop-name">checked</a> | <span class="prop-type">bool</span> |  | If `true`, the component is checked. |
| <a class="anchor-link" id="props--checkedIcon"></a><a href="#props--checkedIcon" title="link to the prop on this page" class="prop-name">checkedIcon</a> | <span class="prop-type">node</span> |  | The icon to display when the component is checked. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" title="link to the prop on this page" class="prop-name">color</a> | <span class="prop-type">'primary'<br>&#124;&nbsp;'secondary'<br>&#124;&nbsp;'default'</span> | <span class="prop-default">'secondary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the switch will be disabled. |
| <a class="anchor-link" id="props--disableRipple"></a><a href="#props--disableRipple" title="link to the prop on this page" class="prop-name">disableRipple</a> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" title="link to the prop on this page" class="prop-name">icon</a> | <span class="prop-type">node</span> |  | The icon to display when the component is unchecked. |
| <a class="anchor-link" id="props--id"></a><a href="#props--id" title="link to the prop on this page" class="prop-name">id</a> | <span class="prop-type">string</span> |  | The id of the `input` element. |
| <a class="anchor-link" id="props--inputProps"></a><a href="#props--inputProps" title="link to the prop on this page" class="prop-name">inputProps</a> | <span class="prop-type">object</span> |  | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. |
| <a class="anchor-link" id="props--inputRef"></a><a href="#props--inputRef" title="link to the prop on this page" class="prop-name">inputRef</a> | <span class="prop-type">ref</span> |  | Pass a ref to the `input` element. |
| <a class="anchor-link" id="props--name"></a><a href="#props--name" title="link to the prop on this page" class="prop-name">name</a> | <span class="prop-type">string</span> |  | Name attribute of the `input` element. |
| <a class="anchor-link" id="props--onChange"></a><a href="#props--onChange" title="link to the prop on this page" class="prop-name">onChange</a> | <span class="prop-type">func</span> |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value` (string). You can pull out the new checked state by accessing `event.target.checked` (boolean). |
| <a class="anchor-link" id="props--required"></a><a href="#props--required" title="link to the prop on this page" class="prop-name">required</a> | <span class="prop-type">bool</span> |  | If `true`, the `input` element will be required. |
| <a class="anchor-link" id="props--type"></a><a href="#props--type" title="link to the prop on this page" class="prop-name">type</a> | <span class="prop-type">string</span> |  | The input component prop `type`. |
| <a class="anchor-link" id="props--value"></a><a href="#props--value" title="link to the prop on this page" class="prop-name">value</a> | <span class="prop-type">any</span> |  | The value of the component. The DOM API casts this to a string. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([IconButton](/api/icon-button/)).

## CSS

- Style sheet name: `MuiRadio`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiRadio-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--checked"></a><a href="#css--checked" class="prop-name">checked</a> | <span class="prop-name">.Mui-checked</span> | Pseudo-class applied to the root element if `checked={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the root element if `disabled={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiRadio-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiRadio-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Radio/Radio.js) for more detail.

## Inheritance

The props of the [IconButton](/api/icon-button/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Demos

- [Radio Buttons](/components/radio-buttons/)

