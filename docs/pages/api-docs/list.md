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



## Component name

The `MuiList` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'ul'</span> | The component used for the root node. Either a string to use a HTML element or a component. |
| <span class="prop-name">dense</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, compact vertical padding designed for keyboard and mouse input will be used for the list and list items. The prop is available to descendant components as the `dense` context. |
| <span class="prop-name">disablePadding</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, vertical padding will be removed from the list. |
| <span class="prop-name">subheader</span> | <span class="prop-type">node</span> |  | The content of the subheader, normally `ListSubheader`. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiList-root</span> | Styles applied to the root element.
| <span class="prop-name">padding</span> | <span class="prop-name">.MuiList-padding</span> | Styles applied to the root element if `disablePadding={false}`.
| <span class="prop-name">dense</span> | <span class="prop-name">.MuiList-dense</span> | Styles applied to the root element if dense.
| <span class="prop-name">subheader</span> | <span class="prop-name">.MuiList-subheader</span> | Styles applied to the root element if a `subheader` is provided.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/List/List.js) for more detail.

## Demos

- [Lists](/components/lists/)
- [Transfer List](/components/transfer-list/)

