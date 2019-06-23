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
| <span class="prop-name">defaultChildIcon</span> | <span class="prop-type">node</span> |  | The default icon displayed next to a child node. This is applied to all tree nodes and can be overridden by the TreeNode `icon` prop. |
| <span class="prop-name">defaultCollapseIcon</span> | <span class="prop-type">node</span> |  | The default icon used to collapse the node. |
| <span class="prop-name">defaultEndIcon</span> | <span class="prop-type">node</span> |  | The default icon displayed next to a end node. This is applied to all tree nodes and can be overridden by the TreeNode `icon` prop. |
| <span class="prop-name">defaultExpandIcon</span> | <span class="prop-type">node</span> |  | The default icon used to expand the node. |

The component cannot hold a ref.

Any other properties supplied will be provided to the root element (native element).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tree View](/components/tree-view/)

