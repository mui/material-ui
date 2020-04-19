---
filename: /packages/material-ui/src/ListItem/ListItem.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItem API

<p class="description">The API documentation of the ListItem React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import ListItem from '@material-ui/core/ListItem';
// or
import { ListItem } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).

Uses an additional container component if `ListItemSecondaryAction` is the last child.

## Component name

The `MuiListItem` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">alignItems</span> | <span class="prop-type">'flex-start'<br>&#124;&nbsp;'center'</span> | <span class="prop-default">'center'</span> | Defines the `align-items` style property. |
| <span class="prop-name">autoFocus</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list item will be focused during the first mount. Focus will also be triggered if the value changes from false to true. |
| <span class="prop-name">button</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list item will be a button (using `ButtonBase`). Props intended for `ButtonBase` can then be applied to `ListItem`. |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. If a `ListItemSecondaryAction` is used it must be the last child. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a HTML element or a component. By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`. |
| <span class="prop-name">ContainerComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The container component used when a `ListItemSecondaryAction` is the last child. |
| <span class="prop-name">ContainerProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the container component if used. |
| <span class="prop-name">dense</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, compact vertical padding designed for keyboard and mouse input will be used. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list item will be disabled. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the left and right padding is removed. |
| <span class="prop-name">divider</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, a 1px light border is added to the bottom of the list item. |
| <span class="prop-name">selected</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Use to apply selected styling. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <span class="prop-name">root</span> | <span class="prop-name">.MuiListItem-root</span> | Styles applied to the (normally root) `component` element. May be wrapped by a `container`.
| <span class="prop-name">container</span> | <span class="prop-name">.MuiListItem-container</span> | Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`.
| <span class="prop-name">focusVisible</span> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`.
| <span class="prop-name">dense</span> | <span class="prop-name">.MuiListItem-dense</span> | Styles applied to the `component` element if dense.
| <span class="prop-name">alignItemsFlexStart</span> | <span class="prop-name">.MuiListItem-alignItemsFlexStart</span> | Styles applied to the `component` element if `alignItems="flex-start"`.
| <span class="prop-name">disabled</span> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the inner `component` element if `disabled={true}`.
| <span class="prop-name">divider</span> | <span class="prop-name">.MuiListItem-divider</span> | Styles applied to the inner `component` element if `divider={true}`.
| <span class="prop-name">gutters</span> | <span class="prop-name">.MuiListItem-gutters</span> | Styles applied to the inner `component` element if `disableGutters={false}`.
| <span class="prop-name">button</span> | <span class="prop-name">.MuiListItem-button</span> | Styles applied to the inner `component` element if `button={true}`.
| <span class="prop-name">secondaryAction</span> | <span class="prop-name">.MuiListItem-secondaryAction</span> | Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`.
| <span class="prop-name">selected</span> | <span class="prop-name">.Mui-selected</span> | Pseudo-class applied to the root element if `selected={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItem/ListItem.js) for more detail.

## Demos

- [Lists](/components/lists/)
- [Transfer List](/components/transfer-list/)

