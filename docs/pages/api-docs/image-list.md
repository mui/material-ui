---
filename: /packages/material-ui/src/ImageList/ImageList.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ImageList API

<p class="description">The API documentation of the ImageList React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ImageList from '@material-ui/core/ImageList';
// or
import { ImageList } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiImageList` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children<abbr title="required">*</abbr></span> | <span class="prop-type">node</span> |  | Items that will be in the image list. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">cols</span> | <span class="prop-type">number</span> | <span class="prop-default">2</span> | Number of columns. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'ul'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">gap</span> | <span class="prop-type">number</span> | <span class="prop-default">4</span> | The gap between items in px. |
| <span class="prop-name">rowHeight</span> | <span class="prop-type">'auto'<br>&#124;&nbsp;number</span> | <span class="prop-default">'auto'</span> | The height of one row in px. |
| <span class="prop-name">variant</span> | <span class="prop-type">'masonry'<br>&#124;&nbsp;'quilted'<br>&#124;&nbsp;'standard'<br>&#124;&nbsp;'woven'<br>&#124;&nbsp;string</span> | <span class="prop-default">'standard'</span> | The variant to use. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiImageList-root</span> | Styles applied to the root element.
| <span class="prop-name">masonry</span> | <span class="prop-name">.MuiImageList-masonry</span> | Styles applied to the root element if `variant="masonry"`.
| <span class="prop-name">quilted</span> | <span class="prop-name">.MuiImageList-quilted</span> | Styles applied to the root element if `variant="quilted"`.
| <span class="prop-name">standard</span> | <span class="prop-name">.MuiImageList-standard</span> | Styles applied to the root element if `variant="standard"`.
| <span class="prop-name">woven</span> | <span class="prop-name">.MuiImageList-woven</span> | Styles applied to the root element if `variant="woven"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/ImageList/ImageList.js) for more detail.

## Demos

- [Image List](/components/image-list/)

