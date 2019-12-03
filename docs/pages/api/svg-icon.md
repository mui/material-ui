---
filename: /packages/material-ui/src/SvgIcon/SvgIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# SvgIcon API

<p class="description">The API documentation of the SvgIcon React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import SvgIcon from '@material-ui/core/SvgIcon';
// or
import { SvgIcon } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | Node passed into the SVG element. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--color"></a><a href="#props--color" class="prop-name">color</a> | <span class="prop-type">'action'<br>&#124;&nbsp;'disabled'<br>&#124;&nbsp;'error'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'</span> | <span class="prop-default">'inherit'</span> | The color of the component. It supports those theme colors that make sense for this component. You can use the `htmlColor` prop to apply a color attribute to the SVG element. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'svg'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--fontSize"></a><a href="#props--fontSize" class="prop-name">fontSize</a> | <span class="prop-type">'default'<br>&#124;&nbsp;'inherit'<br>&#124;&nbsp;'large'<br>&#124;&nbsp;'small'</span> | <span class="prop-default">'default'</span> | The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size. |
| <a class="anchor-link" id="props--htmlColor"></a><a href="#props--htmlColor" class="prop-name">htmlColor</a> | <span class="prop-type">string</span> |  | Applies a color attribute to the SVG element. |
| <a class="anchor-link" id="props--shapeRendering"></a><a href="#props--shapeRendering" class="prop-name">shapeRendering</a> | <span class="prop-type">string</span> |  | The shape-rendering attribute. The behavior of the different options is described on the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering). If you are having issues with blurry icons you should investigate this property. |
| <a class="anchor-link" id="props--titleAccess"></a><a href="#props--titleAccess" class="prop-name">titleAccess</a> | <span class="prop-type">string</span> |  | Provides a human-readable title for the element that contains it. https://www.w3.org/TR/SVG-access/#Equivalent |
| <a class="anchor-link" id="props--viewBox"></a><a href="#props--viewBox" class="prop-name">viewBox</a> | <span class="prop-type">string</span> | <span class="prop-default">'0 0 24 24'</span> | Allows you to redefine what the coordinates without units mean inside an SVG element. For example, if the SVG element is 500 (width) by 200 (height), and you pass viewBox="0 0 50 20", this means that the coordinates inside the SVG will go from the top left corner (0,0) to bottom right (50,20) and each unit will be worth 10px. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiSvgIcon`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiSvgIcon-root</span> | Styles applied to the root element.
| <a class="anchor-link" id="css--colorPrimary"></a><a href="#css--colorPrimary" class="prop-name">colorPrimary</a> | <span class="prop-name">.MuiSvgIcon-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <a class="anchor-link" id="css--colorSecondary"></a><a href="#css--colorSecondary" class="prop-name">colorSecondary</a> | <span class="prop-name">.MuiSvgIcon-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.
| <a class="anchor-link" id="css--colorAction"></a><a href="#css--colorAction" class="prop-name">colorAction</a> | <span class="prop-name">.MuiSvgIcon-colorAction</span> | Styles applied to the root element if `color="action"`.
| <a class="anchor-link" id="css--colorError"></a><a href="#css--colorError" class="prop-name">colorError</a> | <span class="prop-name">.MuiSvgIcon-colorError</span> | Styles applied to the root element if `color="error"`.
| <a class="anchor-link" id="css--colorDisabled"></a><a href="#css--colorDisabled" class="prop-name">colorDisabled</a> | <span class="prop-name">.MuiSvgIcon-colorDisabled</span> | Styles applied to the root element if `color="disabled"`.
| <a class="anchor-link" id="css--fontSizeInherit"></a><a href="#css--fontSizeInherit" class="prop-name">fontSizeInherit</a> | <span class="prop-name">.MuiSvgIcon-fontSizeInherit</span> | Styles applied to the root element if `fontSize="inherit"`.
| <a class="anchor-link" id="css--fontSizeSmall"></a><a href="#css--fontSizeSmall" class="prop-name">fontSizeSmall</a> | <span class="prop-name">.MuiSvgIcon-fontSizeSmall</span> | Styles applied to the root element if `fontSize="small"`.
| <a class="anchor-link" id="css--fontSizeLarge"></a><a href="#css--fontSizeLarge" class="prop-name">fontSizeLarge</a> | <span class="prop-name">.MuiSvgIcon-fontSizeLarge</span> | Styles applied to the root element if `fontSize="large"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/SvgIcon/SvgIcon.js) for more detail.

## Demos

- [Icons](/components/icons/)
- [Material Icons](/components/material-icons/)

