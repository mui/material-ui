---
filename: /packages/material-ui-lab/src/TreeView/TreeView.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TreeView API

<p class="description">The API documentation of the TreeView React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TreeView from '@material-ui/lab/TreeView';
// or
import { TreeView } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--defaultCollapseIcon"></a><a href="#props--defaultCollapseIcon" class="prop-name">defaultCollapseIcon</a> | <span class="prop-type">node</span> |  | The default icon used to collapse the node. |
| <a class="anchor-link" id="props--defaultEndIcon"></a><a href="#props--defaultEndIcon" class="prop-name">defaultEndIcon</a> | <span class="prop-type">node</span> |  | The default icon displayed next to a end node. This is applied to all tree nodes and can be overridden by the TreeItem `icon` prop. |
| <a class="anchor-link" id="props--defaultExpanded"></a><a href="#props--defaultExpanded" class="prop-name">defaultExpanded</a> | <span class="prop-type">Array&lt;string&gt;</span> | <span class="prop-default">[]</span> | Expanded node ids. (Uncontrolled) |
| <a class="anchor-link" id="props--defaultExpandIcon"></a><a href="#props--defaultExpandIcon" class="prop-name">defaultExpandIcon</a> | <span class="prop-type">node</span> |  | The default icon used to expand the node. |
| <a class="anchor-link" id="props--defaultParentIcon"></a><a href="#props--defaultParentIcon" class="prop-name">defaultParentIcon</a> | <span class="prop-type">node</span> |  | The default icon displayed next to a parent node. This is applied to all parent nodes and can be overridden by the TreeItem `icon` prop. |
| <a class="anchor-link" id="props--expanded"></a><a href="#props--expanded" class="prop-name">expanded</a> | <span class="prop-type">Array&lt;string&gt;</span> |  | Expanded node ids. (Controlled) |
| <a class="anchor-link" id="props--onNodeToggle"></a><a href="#props--onNodeToggle" class="prop-name">onNodeToggle</a> | <span class="prop-type">func</span> |  | Callback fired when tree items are expanded/collapsed.<br><br>**Signature:**<br>`function(event: object, nodeIds: array) => void`<br>*event:* The event source of the callback<br>*nodeIds:* The ids of the expanded nodes. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTreeView`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiTreeView-root</span> | Styles applied to the root element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/TreeView/TreeView.js) for more detail.

## Demos

- [Tree View](/components/tree-view/)

