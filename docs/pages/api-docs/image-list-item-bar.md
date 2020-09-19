---
filename: /packages/material-ui/src/ImageListItemBar/ImageListItemBar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ImageListItemBar API

<p class="description">The API documentation of the ImageListItemBar React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
// or
import { ImageListItemBar } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Component name

The `MuiImageListItemBar` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">actionIcon</span> | <span class="prop-type">node</span> |  | An IconButton element to be used as secondary action target (primary action target is the item itself). |
| <span class="prop-name">actionPosition</span> | <span class="prop-type">'left'<br>&#124;&nbsp;'right'</span> | <span class="prop-default">'right'</span> | Position of secondary action IconButton. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">position</span> | <span class="prop-type">'bottom'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'bottom'</span> | Position of the title bar. |
| <span class="prop-name">subtitle</span> | <span class="prop-type">node</span> |  | String or element serving as subtitle (support text). |
| <span class="prop-name">title</span> | <span class="prop-type">node</span> |  | Title to be displayed on item. |
| ~~<span class="prop-name">titlePosition</span>~~ | <span class="prop-type">oneOf(['bottom'</span> |  | *Deprecated*. Use the `position` prop instead.<br><br>Position of the title bar. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiImageListItemBar-root</span> | Styles applied to the root element.
| <span class="prop-name">positionBottom</span> | <span class="prop-name">.MuiImageListItemBar-positionBottom</span> | Styles applied to the root element if `position="bottom"`.
| <span class="prop-name">positionTop</span> | <span class="prop-name">.MuiImageListItemBar-positionTop</span> | Styles applied to the root element if `position="top"`.
| <span class="prop-name">rootSubtitle</span> | <span class="prop-name">.MuiImageListItemBar-rootSubtitle</span> | Styles applied to the root element if a `subtitle` is provided.
| <span class="prop-name">titleWrap</span> | <span class="prop-name">.MuiImageListItemBar-titleWrap</span> | Styles applied to the title and subtitle container element.
| <span class="prop-name">titleWrapActionPosLeft</span> | <span class="prop-name">.MuiImageListItemBar-titleWrapActionPosLeft</span> | Styles applied to the container element if `actionPosition="left"`.
| <span class="prop-name">titleWrapActionPosRight</span> | <span class="prop-name">.MuiImageListItemBar-titleWrapActionPosRight</span> | Styles applied to the container element if `actionPosition="right"`.
| <span class="prop-name">title</span> | <span class="prop-name">.MuiImageListItemBar-title</span> | Styles applied to the title container element.
| <span class="prop-name">subtitle</span> | <span class="prop-name">.MuiImageListItemBar-subtitle</span> | Styles applied to the subtitle container element.
| <span class="prop-name">actionIcon</span> | <span class="prop-name">.MuiImageListItemBar-actionIcon</span> | Styles applied to the actionIcon if supplied.
| <span class="prop-name">actionIconActionPosLeft</span> | <span class="prop-name">.MuiImageListItemBar-actionIconActionPosLeft</span> | Styles applied to the actionIcon if `actionPosition="left"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ImageListItemBar/ImageListItemBar.js) for more detail.

## Demos

- [Image List](/components/image-list/)

