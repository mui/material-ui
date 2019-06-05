---
filename: /packages/material-ui/src/GridListTileBar/GridListTileBar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridListTileBar API

<p class="description">The API documentation of the GridListTileBar React component. Learn more about the properties and the CSS customization points.</p>

```js
import GridListTileBar from '@material-ui/core/GridListTileBar';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">actionIcon</span> | <span class="prop-type">node</span> |  | An IconButton element to be used as secondary action target (primary action target is the tile itself). |
| <span class="prop-name">actionPosition</span> | <span class="prop-type">enum:&nbsp;'left'&nbsp;&#124;<br>&nbsp;'right'<br></span> | <span class="prop-default">'right'</span> | Position of secondary action IconButton. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">subtitle</span> | <span class="prop-type">node</span> |  | String or element serving as subtitle (support text). |
| <span class="prop-name">title</span> | <span class="prop-type">node</span> |  | Title to be displayed on tile. |
| <span class="prop-name">titlePosition</span> | <span class="prop-type">enum:&nbsp;'top'&nbsp;&#124;<br>&nbsp;'bottom'<br></span> | <span class="prop-default">'bottom'</span> | Position of the title bar. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">titlePositionBottom</span> | Styles applied to the root element if `titlePosition="bottom"`.
| <span class="prop-name">titlePositionTop</span> | Styles applied to the root element if `titlePosition="top"`.
| <span class="prop-name">rootSubtitle</span> | Styles applied to the root element if a `subtitle` is provided.
| <span class="prop-name">titleWrap</span> | Styles applied to the title and subtitle container element.
| <span class="prop-name">titleWrapActionPosLeft</span> | Styles applied to the container element if `actionPosition="left"`.
| <span class="prop-name">titleWrapActionPosRight</span> | Styles applied to the container element if `actionPosition="right"`.
| <span class="prop-name">title</span> | Styles applied to the title container element.
| <span class="prop-name">subtitle</span> | Styles applied to the subtitle container element.
| <span class="prop-name">actionIcon</span> | Styles applied to the actionIcon if supplied.
| <span class="prop-name">actionIconActionPosLeft</span> | Styles applied to the actionIcon if `actionPosition="left"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/GridListTileBar/GridListTileBar.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiGridListTileBar`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Grid List](/components/grid-list/)

