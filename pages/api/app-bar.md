---
filename: /packages/material-ui/src/AppBar/AppBar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# AppBar API

<p class="description">The API documentation of the AppBar React component. Learn more about the properties and the CSS customization points.</p>

```js
import AppBar from '@material-ui/core/AppBar';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">enum:&nbsp;'inherit'&nbsp;&#124;<br>&nbsp;'primary'&nbsp;&#124;<br>&nbsp;'secondary'&nbsp;&#124;<br>&nbsp;'default'<br></span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">position</span> | <span class="prop-type">enum:&nbsp;'fixed', 'absolute', 'sticky', 'static', 'relative'<br></span> | <span class="prop-default">'fixed'</span> | The positioning type. The behavior of the different options is described [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning). Note: `sticky` is not universally supported and will fall back to `static` when unavailable. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">positionFixed</span> | Styles applied to the root element if `position="fixed"`.
| <span class="prop-name">positionAbsolute</span> | Styles applied to the root element if `position="absolute"`.
| <span class="prop-name">positionSticky</span> | Styles applied to the root element if `position="sticky"`.
| <span class="prop-name">positionStatic</span> | Styles applied to the root element if `position="static"`.
| <span class="prop-name">positionRelative</span> | Styles applied to the root element if `position="relative"`.
| <span class="prop-name">colorDefault</span> | Styles applied to the root element if `color="default"`.
| <span class="prop-name">colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | Styles applied to the root element if `color="secondary"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/AppBar/AppBar.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiAppBar`.

## Inheritance

The properties of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [App Bar](/components/app-bar/)

