---
filename: /packages/material-ui/src/GridListTileBar/GridListTileBar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridListTileBar API

<p class="description">The API documentation of the GridListTileBar React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import GridListTileBar from '@material-ui/core/GridListTileBar';
// or
import { GridListTileBar } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--actionIcon"></a><a href="#props--actionIcon" title="link to the prop on this page" class="prop-name">actionIcon</a> | <span class="prop-type">node</span> |  | An IconButton element to be used as secondary action target (primary action target is the tile itself). |
| <a class="anchor-link" id="props--actionPosition"></a><a href="#props--actionPosition" title="link to the prop on this page" class="prop-name">actionPosition</a> | <span class="prop-type">'left'<br>&#124;&nbsp;'right'</span> | <span class="prop-default">'right'</span> | Position of secondary action IconButton. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--subtitle"></a><a href="#props--subtitle" title="link to the prop on this page" class="prop-name">subtitle</a> | <span class="prop-type">node</span> |  | String or element serving as subtitle (support text). |
| <a class="anchor-link" id="props--title"></a><a href="#props--title" title="link to the prop on this page" class="prop-name">title</a> | <span class="prop-type">node</span> |  | Title to be displayed on tile. |
| <a class="anchor-link" id="props--titlePosition"></a><a href="#props--titlePosition" title="link to the prop on this page" class="prop-name">titlePosition</a> | <span class="prop-type">'top'<br>&#124;&nbsp;'bottom'</span> | <span class="prop-default">'bottom'</span> | Position of the title bar. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiGridListTileBar`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiGridListTileBar-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--titlePositionBottom"></a><a href="#css--titlePositionBottom" class="prop-name">titlePositionBottom</a> | <span class="prop-name">.MuiGridListTileBar-titlePositionBottom</span> | Styles applied to the root element if `titlePosition="bottom"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--titlePositionTop"></a><a href="#css--titlePositionTop" class="prop-name">titlePositionTop</a> | <span class="prop-name">.MuiGridListTileBar-titlePositionTop</span> | Styles applied to the root element if `titlePosition="top"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--rootSubtitle"></a><a href="#css--rootSubtitle" class="prop-name">rootSubtitle</a> | <span class="prop-name">.MuiGridListTileBar-rootSubtitle</span> | Styles applied to the root element if a `subtitle` is provided.
| <a class="anchor-link" title="link to the rule name on this page" id="css--titleWrap"></a><a href="#css--titleWrap" class="prop-name">titleWrap</a> | <span class="prop-name">.MuiGridListTileBar-titleWrap</span> | Styles applied to the title and subtitle container element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--titleWrapActionPosLeft"></a><a href="#css--titleWrapActionPosLeft" class="prop-name">titleWrapActionPosLeft</a> | <span class="prop-name">.MuiGridListTileBar-titleWrapActionPosLeft</span> | Styles applied to the container element if `actionPosition="left"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--titleWrapActionPosRight"></a><a href="#css--titleWrapActionPosRight" class="prop-name">titleWrapActionPosRight</a> | <span class="prop-name">.MuiGridListTileBar-titleWrapActionPosRight</span> | Styles applied to the container element if `actionPosition="right"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--title"></a><a href="#css--title" class="prop-name">title</a> | <span class="prop-name">.MuiGridListTileBar-title</span> | Styles applied to the title container element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--subtitle"></a><a href="#css--subtitle" class="prop-name">subtitle</a> | <span class="prop-name">.MuiGridListTileBar-subtitle</span> | Styles applied to the subtitle container element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--actionIcon"></a><a href="#css--actionIcon" class="prop-name">actionIcon</a> | <span class="prop-name">.MuiGridListTileBar-actionIcon</span> | Styles applied to the actionIcon if supplied.
| <a class="anchor-link" title="link to the rule name on this page" id="css--actionIconActionPosLeft"></a><a href="#css--actionIconActionPosLeft" class="prop-name">actionIconActionPosLeft</a> | <span class="prop-name">.MuiGridListTileBar-actionIconActionPosLeft</span> | Styles applied to the actionIcon if `actionPosition="left"`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/GridListTileBar/GridListTileBar.js) for more detail.

## Demos

- [Grid List](/components/grid-list/)

