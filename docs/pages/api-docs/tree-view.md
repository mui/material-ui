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



## Component name

The `MuiTreeView` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">defaultCollapseIcon</span> | <span class="prop-type">node</span> |  | The default icon used to collapse the node. |
| <span class="prop-name">defaultEndIcon</span> | <span class="prop-type">node</span> |  | The default icon displayed next to a end node. This is applied to all tree nodes and can be overridden by the TreeItem `icon` prop. |
| <span class="prop-name">defaultExpanded</span> | <span class="prop-type">Array&lt;string&gt;</span> | <span class="prop-default">[]</span> | Expanded node ids. (Uncontrolled) |
| <span class="prop-name">defaultExpandIcon</span> | <span class="prop-type">node</span> |  | The default icon used to expand the node. |
| <span class="prop-name">defaultParentIcon</span> | <span class="prop-type">node</span> |  | The default icon displayed next to a parent node. This is applied to all parent nodes and can be overridden by the TreeItem `icon` prop. |
| <span class="prop-name">defaultSelected</span> | <span class="prop-type">Array&lt;string&gt;<br>&#124;&nbsp;string</span> | <span class="prop-default">[]</span> | Selected node ids. (Uncontrolled) When `multiSelect` is true this takes an array of strings; when false (default) a string. |
| <span class="prop-name">disableSelection</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true` selection is disabled. |
| <span class="prop-name">expanded</span> | <span class="prop-type">Array&lt;string&gt;</span> |  | Expanded node ids. (Controlled) |
| <span class="prop-name">multiSelect</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If true `ctrl` and `shift` will trigger multiselect. |
| <span class="prop-name">onNodeSelect</span> | <span class="prop-type">func</span> |  | Callback fired when tree items are selected/unselected.<br><br>**Signature:**<br>`function(event: object, value: array \| string) => void`<br>*event:* The event source of the callback<br>*value:* of the selected nodes. When `multiSelect` is true this is an array of strings; when false (default) a string. |
| <span class="prop-name">onNodeToggle</span> | <span class="prop-type">func</span> |  | Callback fired when tree items are expanded/collapsed.<br><br>**Signature:**<br>`function(event: object, nodeIds: array) => void`<br>*event:* The event source of the callback.<br>*nodeIds:* The ids of the expanded nodes. |
| <span class="prop-name">selected</span> | <span class="prop-type">Array&lt;string&gt;<br>&#124;&nbsp;string</span> |  | Selected node ids. (Controlled) When `multiSelect` is true this takes an array of strings; when false (default) a string. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

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

