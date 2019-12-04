---
filename: /packages/material-ui-lab/src/TreeItem/TreeItem.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TreeItem API

<p class="description">The API documentation of the TreeItem React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import TreeItem from '@material-ui/lab/TreeItem';
// or
import { TreeItem } from '@material-ui/lab';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--collapseIcon"></a><a href="#props--collapseIcon" title="link to the prop on this page" class="prop-name">collapseIcon</a> | <span class="prop-type">node</span> |  | The icon used to collapse the node. |
| <a class="anchor-link" id="props--endIcon"></a><a href="#props--endIcon" title="link to the prop on this page" class="prop-name">endIcon</a> | <span class="prop-type">node</span> |  | The icon displayed next to a end node. |
| <a class="anchor-link" id="props--expandIcon"></a><a href="#props--expandIcon" title="link to the prop on this page" class="prop-name">expandIcon</a> | <span class="prop-type">node</span> |  | The icon used to expand the node. |
| <a class="anchor-link" id="props--icon"></a><a href="#props--icon" title="link to the prop on this page" class="prop-name">icon</a> | <span class="prop-type">node</span> |  | The icon to display next to the tree node's label. |
| <a class="anchor-link" id="props--label"></a><a href="#props--label" title="link to the prop on this page" class="prop-name">label</a> | <span class="prop-type">node</span> |  | The tree node label. |
| <a class="anchor-link" id="props--nodeId"></a><a href="#props--nodeId" title="link to the prop on this page" class="prop-name required">nodeId&nbsp;*</a> | <span class="prop-type">string</span> |  | The id of the node. |
| <a class="anchor-link" id="props--TransitionComponent"></a><a href="#props--TransitionComponent" title="link to the prop on this page" class="prop-name">TransitionComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Collapse</span> | The component used for the transition. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTreeItem`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiTreeItem-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--expanded"></a><a href="#css--expanded" class="prop-name">expanded</a> | <span class="prop-name">.Mui-expanded</span> | Pseudo-class applied to the root element when expanded.
| <a class="anchor-link" title="link to the rule name on this page" id="css--group"></a><a href="#css--group" class="prop-name">group</a> | <span class="prop-name">.MuiTreeItem-group</span> | Styles applied to the `role="group"` element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--content"></a><a href="#css--content" class="prop-name">content</a> | <span class="prop-name">.MuiTreeItem-content</span> | Styles applied to the tree node content.
| <a class="anchor-link" title="link to the rule name on this page" id="css--iconContainer"></a><a href="#css--iconContainer" class="prop-name">iconContainer</a> | <span class="prop-name">.MuiTreeItem-iconContainer</span> | Styles applied to the tree node icon and collapse/expand icon.
| <a class="anchor-link" title="link to the rule name on this page" id="css--label"></a><a href="#css--label" class="prop-name">label</a> | <span class="prop-name">.MuiTreeItem-label</span> | Styles applied to the label element.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/TreeItem/TreeItem.js) for more detail.

## Demos

- [Tree View](/components/tree-view/)

