---
filename: /packages/material-ui-lab/src/TreeNode/TreeNode.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TreeNode API

<p class="description">The API documentation of the TreeNode React component. Learn more about the properties and the CSS customization points.</p>

```js
import TreeNode from '@material-ui/lab/TreeNode';
```



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">collapseIcon</span> | <span class="prop-type">node</span> |  | The icon used to collapse the node. |
| <span class="prop-name">expandIcon</span> | <span class="prop-type">node</span> |  | The icon used to expand the node. |
| <span class="prop-name">icon</span> | <span class="prop-type">node</span> |  | The icon to display next to the tree node's label. |
| <span class="prop-name">label</span> | <span class="prop-type">node</span> |  | The tree node label. |
| <span class="prop-name required">nodeId&nbsp;*</span> | <span class="prop-type">string</span> |  | The id of the node. |

The component cannot hold a ref.

Any other properties supplied will be provided to the root element (native element).

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tree View](/components/tree-view/)

