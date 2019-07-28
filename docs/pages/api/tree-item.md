---
filename: /packages/material-ui-lab/src/TreeItem/TreeItem.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# TreeItem API

<p class="description">The API documentation of the TreeItem React component. Learn more about the properties and the CSS customization points.</p>

```js
import TreeItem from '@material-ui/lab/TreeItem';
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

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` prop.
This prop accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">group</span> | Styles applied to the `role="group"` element.
| <span class="prop-name">content</span> | Styles applied to the tree node content.
| <span class="prop-name">iconContainer</span> | Styles applied to the tree node icon and collapse/expand icon.
| <span class="prop-name">label</span> | Styles applied to the label element.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/TreeItem/TreeItem.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiTreeItem`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Tree View](/components/tree-view/)

