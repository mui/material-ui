---
filename: /packages/material-ui/src/GridList/GridList.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridList API

<p class="description">The API documentation of the GridList React component. Learn more about the properties and the CSS customization points.</p>

```js
import GridList from '@material-ui/core/GridList';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">cellHeight</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br></span> | <span class="prop-default">180</span> | Number of px for one cell height. You can set `'auto'` if you want to let the children determine the height. |
| <span class="prop-name required">children *</span> | <span class="prop-type">node</span> |   | Grid Tiles that will be in Grid List. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |   | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">cols</span> | <span class="prop-type">number</span> | <span class="prop-default">2</span> | Number of columns. |
| <span class="prop-name">component</span> | <span class="prop-type">element type</span> | <span class="prop-default">'ul'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">spacing</span> | <span class="prop-type">number</span> | <span class="prop-default">4</span> | Number of px for the spacing between tiles. |

Any other properties supplied will be spread to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/GridList/GridList.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiGridList`.

## Demos

- [Grid List](/demos/grid-list/)

