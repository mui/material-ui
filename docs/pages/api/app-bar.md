---
filename: /packages/material-ui/src/AppBar/AppBar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# AppBar API

<p class="description">The API documentation of the AppBar React component. Learn more about the props and the CSS customization points.</p>

```js
import AppBar from '@material-ui/core/AppBar';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">color</span> | <span class="prop-type">'inherit'<br>&#124;&nbsp;'primary'<br>&#124;&nbsp;'secondary'<br>&#124;&nbsp;'default'</span> | <span class="prop-default">'primary'</span> | The color of the component. It supports those theme colors that make sense for this component. |
| <span class="prop-name">position</span> | <span class="prop-type">'fixed'<br>&#124;&nbsp;'absolute'<br>&#124;&nbsp;'sticky'<br>&#124;&nbsp;'static'<br>&#124;&nbsp;'relative'</span> | <span class="prop-default">'fixed'</span> | The positioning type. The behavior of the different options is described [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning). Note: `sticky` is not universally supported and will fall back to `static` when unavailable. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element ([Paper](/api/paper/)).

## CSS

- Style sheet name: `MuiAppBar`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiAppBar-root</span> | Styles applied to the root element.
| <span class="prop-name">positionFixed</span> | <span class="prop-name">MuiAppBar-positionFixed</span> | Styles applied to the root element if `position="fixed"`.
| <span class="prop-name">positionAbsolute</span> | <span class="prop-name">MuiAppBar-positionAbsolute</span> | Styles applied to the root element if `position="absolute"`.
| <span class="prop-name">positionSticky</span> | <span class="prop-name">MuiAppBar-positionSticky</span> | Styles applied to the root element if `position="sticky"`.
| <span class="prop-name">positionStatic</span> | <span class="prop-name">MuiAppBar-positionStatic</span> | Styles applied to the root element if `position="static"`.
| <span class="prop-name">positionRelative</span> | <span class="prop-name">MuiAppBar-positionRelative</span> | Styles applied to the root element if `position="relative"`.
| <span class="prop-name">colorDefault</span> | <span class="prop-name">MuiAppBar-colorDefault</span> | Styles applied to the root element if `color="default"`.
| <span class="prop-name">colorPrimary</span> | <span class="prop-name">MuiAppBar-colorPrimary</span> | Styles applied to the root element if `color="primary"`.
| <span class="prop-name">colorSecondary</span> | <span class="prop-name">MuiAppBar-colorSecondary</span> | Styles applied to the root element if `color="secondary"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/AppBar/AppBar.js) for more detail.

## Inheritance

The props of the [Paper](/api/paper/) component are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [App Bar](/components/app-bar/)

