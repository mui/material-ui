---
filename: /packages/material-ui/src/Checkbox/Checkbox.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Checkbox API

<p class="description">The API documentation of the Checkbox React component. Learn more about the properties and the CSS customization points.</p>

```js
import Checkbox from '@material-ui/core/Checkbox';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">checked</span> | <span class="prop-type">bool</span> |  | If `true`, the component is checked. |
| <span class="prop-name">checkedIcon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;CheckBoxIcon /></span> | The icon to display when the component is checked. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'&nbsp;&#124;<br>&nbsp;'default'<br></span> | <span class="prop-default">'secondary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> |  | If `true`, the switch will be disabled. |
| <span class="prop-name">disableRipple</span> | <span class="prop-type">bool</span> |  | If `true`, the ripple effect will be disabled. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;CheckBoxOutlineBlankIcon /></span> | The icon to display when the component is unchecked. |
| <span class="prop-name">id</span> | <span class="prop-type">string</span> |  | The id of the `input` element. |
| <span class="prop-name">indeterminate</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the component appears indeterminate. This does not set the native input element to indeterminate due to inconsistent behavior across browsers. However, we set a `data-indeterminate` attribute on the input. |
| <span class="prop-name">indeterminateIcon</span> | <span class="prop-type">node</span> | <span class="prop-default">&lt;IndeterminateCheckBoxIcon /></span> | The icon to display when the component is indeterminate. |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object</span> |  | [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element. |
| <span class="prop-name">inputRef</span> | <span class="prop-type">union:&nbsp;func&nbsp;&#124;<br>&nbsp;object<br></span> |  | This property can be used to pass a ref callback to the `input` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.checked`.<br>*checked:* The `checked` value of the switch |
| <span class="prop-name">type</span> | <span class="prop-type">string</span> |  | The input component property `type`. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The value of the component. The DOM API casts this to a string. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([IconButton](/api/icon-button/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">checked</span> | Styles applied to the root element if `checked={true}`.
| <span class="prop-name">disabled</span> | Styles applied to the root element if `disabled={true}`.
| <span class="prop-name">indeterminate</span> | Styles applied to the root element if `indeterminate={true}`.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Checkbox/Checkbox.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiCheckbox`.

## Inheritance

The properties of the [IconButton](/api/icon-button/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Checkboxes](/components/checkboxes/)
- [Transfer List](/components/transfer-list/)

