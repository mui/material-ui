---
filename: /packages/material-ui-lab/src/TreeView/TreeView.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TreeView API

<p class="description">The API documentation of the TreeView React component. Learn more about the properties and the CSS customization points.</p>

```js
import TreeView from '@material-ui/lab/TreeView';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">defaultCollapseIcon</span> | <span class="prop-type">node</span> |  | The default icon used to collapse the node. |
| <span class="prop-name">defaultEndIcon</span> | <span class="prop-type">node</span> |  | The default icon displayed next to a end node. This is applied to all tree nodes and can be overridden by the TreeItem `icon` prop. |
| <span class="prop-name">defaultExpanded</span> | <span class="prop-type">arrayOf</span> | <span class="prop-default">[]</span> | Expanded node ids. |
| <span class="prop-name">defaultExpandIcon</span> | <span class="prop-type">node</span> |  | The default icon used to expand the node. |
| <span class="prop-name">defaultParentIcon</span> | <span class="prop-type">node</span> |  | The default icon displayed next to a parent node. This is applied to all parent nodes and can be overridden by the TreeItem `icon` prop. |
| <span class="prop-name">onNodeToggle</span> | <span class="prop-type">func</span> |  | Callback fired when a `TreeItem` is expanded/collapsed.<br><br>**Signature:**<br>`function(nodeId: string, expanded: boolean) => void`<br>*nodeId:* The id of the toggled node.<br>*expanded:* The node status - If `true` the node was expanded. If `false` the node was collapsed. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` prop.
This prop accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root component.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/TreeView/TreeView.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiTreeView`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tree View](/components/tree-view/)

