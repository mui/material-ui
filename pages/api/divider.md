---
filename: /packages/material-ui/src/Divider/Divider.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Divider API

<p class="description">The API documentation of the Divider React component. Learn more about the properties and the CSS customization points.</p>

```js
import Divider from '@material-ui/core/Divider';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">absolute</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Absolutely position the element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'hr'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">light</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the divider will have a lighter color. |
| <span class="prop-name">variant</span> | <span class="prop-type">enum:&nbsp;'fullWidth'&nbsp;&#124;<br>&nbsp;'inset'&nbsp;&#124;<br>&nbsp;'middle'<br></span> | <span class="prop-default">'fullWidth'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">absolute</span> | Styles applied to the root element if `absolute={true}`.
| <span class="prop-name">inset</span> | Styles applied to the root element if `variant="inset"`.
| <span class="prop-name">light</span> | Styles applied to the root element if `light={true}`.
| <span class="prop-name">middle</span> | Styles applied to the root element if `variant="middle"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Divider/Divider.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiDivider`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Dividers](/components/dividers/)
- [Lists](/components/lists/)

