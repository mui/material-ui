---
filename: /packages/material-ui/src/Icon/Icon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Icon API

<p class="description">The API documentation of the Icon React component. Learn more about the properties and the CSS customization points.</p>

```js
import Icon from '@material-ui/core/Icon';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The name of the icon font ligature. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'inherit', 'primary', 'secondary', 'action', 'error', 'disabled'<br></span> | <span class="prop-default">'inherit'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'span'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">fontSize</span> | <span class="prop-type">enum:&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'default'&nbsp;&#124;<br>&nbsp;'small'&nbsp;&#124;<br>&nbsp;'large'<br></span> | <span class="prop-default">'default'</span> | The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <span class="prop-name">colorAction</span> | Styles applied to the root element if `color="action"`.
| <span class="prop-name">colorError</span> | Styles applied to the root element if `color="error"`.
| <span class="prop-name">colorDisabled</span> | Styles applied to the root element if `color="disabled"`.
| <span class="prop-name">fontSizeInherit</span> | 
| <span class="prop-name">fontSizeSmall</span> | Styles applied to the root element if `fontSize="small"`.
| <span class="prop-name">fontSizeLarge</span> | Styles applied to the root element if `fontSize="large"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Icon/Icon.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiIcon`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Icons](/components/icons/)

