---
filename: /packages/material-ui/src/GridList/GridList.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# GridList API

<p class="description">The API documentation of the GridList React component. Learn more about the properties and the CSS customization points.</p>

```js
import { GridList } from '@material-ui/core';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">cellHeight</span> | <span class="prop-type">union:&nbsp;number&nbsp;&#124;<br>&nbsp;enum:&nbsp;'auto'<br><br></span> | <span class="prop-default">180</span> | Number of px for one cell height. You can set `'auto'` if you want to let the children determine the height. |
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">node</span> |  | Grid Tiles that will be in Grid List. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">cols</span> | <span class="prop-type">number</span> | <span class="prop-default">2</span> | Number of columns. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'ul'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <span class="prop-name">spacing</span> | <span class="prop-type">number</span> | <span class="prop-default">4</span> | Number of px for the spacing between tiles. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiGridList`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">MuiGridList-root</span> | Styles applied to the root element.

You can override the style of the component thanks to one of these customizability points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If it's not enough, you can find the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/GridList/GridList.js) for more detail.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Grid List](/components/grid-list/)

