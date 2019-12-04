---
filename: /packages/material-ui/src/List/List.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# List API

<p class="description">The API documentation of the List React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import List from '@material-ui/core/List';
// or
import { List } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'ul'</span> | The component used for the root node. Either a string to use a DOM element or a component. |
| <a class="anchor-link" id="props--dense"></a><a href="#props--dense" title="link to the prop on this page" class="prop-name">dense</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, compact vertical padding designed for keyboard and mouse input will be used for the list and list items. The prop is available to descendant components as the `dense` context. |
| <a class="anchor-link" id="props--disablePadding"></a><a href="#props--disablePadding" title="link to the prop on this page" class="prop-name">disablePadding</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, vertical padding will be removed from the list. |
| <a class="anchor-link" id="props--subheader"></a><a href="#props--subheader" title="link to the prop on this page" class="prop-name">subheader</a> | <span class="prop-type">node</span> |  | The content of the subheader, normally `ListSubheader`. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiList`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiList-root</span> | Styles applied to the root element.
| <a class="anchor-link" title="link to the rule name on this page" id="css--padding"></a><a href="#css--padding" class="prop-name">padding</a> | <span class="prop-name">.MuiList-padding</span> | Styles applied to the root element if `disablePadding={false}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dense"></a><a href="#css--dense" class="prop-name">dense</a> | <span class="prop-name">.MuiList-dense</span> | Styles applied to the root element if dense.
| <a class="anchor-link" title="link to the rule name on this page" id="css--subheader"></a><a href="#css--subheader" class="prop-name">subheader</a> | <span class="prop-name">.MuiList-subheader</span> | Styles applied to the root element if a `subheader` is provided.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/List/List.js) for more detail.

## Demos

- [Lists](/components/lists/)
- [Transfer List](/components/transfer-list/)

