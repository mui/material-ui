---
filename: /packages/material-ui/src/NativeSelect/NativeSelect.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# NativeSelect API

<p class="description">The API documentation of the NativeSelect React component. Learn more about the properties and the CSS customization points.</p>

```js
import NativeSelect from '@material-ui/core/NativeSelect';
```

An alternative to `<Select native />` with a much smaller bundle size footprint.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The option elements to populate the select with. Can be some `<option>` elements. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">IconComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">ArrowDropDownIcon</span> | The icon that displays the arrow. |
| <span class="prop-name">input</span> | <span class="prop-type">element</span> | <span class="prop-default">&lt;Input /></span> | An `Input` element; does not have to be a material-ui specific `Input`. |
| <span class="prop-name">inputProps</span> | <span class="prop-type">object</span> |  | Attributes applied to the `select` element. |
| <span class="prop-name">onChange</span> | <span class="prop-type">func</span> |  | Callback function fired when a menu item is selected.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. You can pull out the new value by accessing `event.target.value`. |
| <span class="prop-name">value</span> | <span class="prop-type">any</span> |  | The input value. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'standard'&nbsp;&#124;<br>&nbsp;'outlined'&nbsp;&#124;<br>&nbsp;'filled'<br></span> |  | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([Input](/api/input/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the `Input` component `root` class.
| <span class="prop-name">select</span> | Styles applied to the `Input` component `select` class.
| <span class="prop-name">filled</span> | Styles applied to the `Input` component if `variant="filled"`.
| <span class="prop-name">outlined</span> | Styles applied to the `Input` component if `variant="outlined"`.
| <span class="prop-name">selectMenu</span> | Styles applied to the `Input` component `selectMenu` class.
| <span class="prop-name">disabled</span> | Styles applied to the `Input` component `disabled` class.
| <span class="prop-name">icon</span> | Styles applied to the `Input` component `icon` class.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/NativeSelect/NativeSelect.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiNativeSelect`.

## Inheritance

The properties of the [Input](/api/input/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Selects](/components/selects/)

