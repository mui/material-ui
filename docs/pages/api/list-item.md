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

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--alignItems"></a><a href="#props--alignItems" title="link to the prop on this page" class="prop-name">alignItems</a> | <span class="prop-type">'flex-start'<br>&#124;&nbsp;'center'</span> | <span class="prop-default">'center'</span> | Defines the `align-items` style property. |
| <a class="anchor-link" id="props--autoFocus"></a><a href="#props--autoFocus" title="link to the prop on this page" class="prop-name">autoFocus</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list item will be focused during the first mount. Focus will also be triggered if the value changes from false to true. |
| <a class="anchor-link" id="props--button"></a><a href="#props--button" title="link to the prop on this page" class="prop-name">button</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list item will be a button (using `ButtonBase`). Props intended for `ButtonBase` can then be applied to `ListItem`. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" title="link to the prop on this page" class="prop-name">children</a> | <span class="prop-type">node</span> |  | The content of the component. If a `ListItemSecondaryAction` is used it must be the last child. |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" title="link to the prop on this page" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--component"></a><a href="#props--component" title="link to the prop on this page" class="prop-name">component</a> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a DOM element or a component. By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`. |
| <a class="anchor-link" id="props--ContainerComponent"></a><a href="#props--ContainerComponent" title="link to the prop on this page" class="prop-name">ContainerComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The container component used when a `ListItemSecondaryAction` is the last child. |
| <a class="anchor-link" id="props--ContainerProps"></a><a href="#props--ContainerProps" title="link to the prop on this page" class="prop-name">ContainerProps</a> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Props applied to the container component if used. |
| <a class="anchor-link" id="props--dense"></a><a href="#props--dense" title="link to the prop on this page" class="prop-name">dense</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, compact vertical padding designed for keyboard and mouse input will be used. |
| <a class="anchor-link" id="props--disabled"></a><a href="#props--disabled" title="link to the prop on this page" class="prop-name">disabled</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list item will be disabled. |
| <a class="anchor-link" id="props--disableGutters"></a><a href="#props--disableGutters" title="link to the prop on this page" class="prop-name">disableGutters</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the left and right padding is removed. |
| <a class="anchor-link" id="props--divider"></a><a href="#props--divider" title="link to the prop on this page" class="prop-name">divider</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, a 1px light border is added to the bottom of the list item. |
| <a class="anchor-link" id="props--selected"></a><a href="#props--selected" title="link to the prop on this page" class="prop-name">selected</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Use to apply selected styling. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiListItem`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" title="link to the rule name on this page" id="css--root"></a><a href="#css--root" class="prop-name">root</a> | <span class="prop-name">.MuiListItem-root</span> | Styles applied to the (normally root) `component` element. May be wrapped by a `container`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--container"></a><a href="#css--container" class="prop-name">container</a> | <span class="prop-name">.MuiListItem-container</span> | Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--focusVisible"></a><a href="#css--focusVisible" class="prop-name">focusVisible</a> | <span class="prop-name">.Mui-focusVisible</span> | Pseudo-class applied to the `component`'s `focusVisibleClassName` prop if `button={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--dense"></a><a href="#css--dense" class="prop-name">dense</a> | <span class="prop-name">.MuiListItem-dense</span> | Styles applied to the `component` element if dense.
| <a class="anchor-link" title="link to the rule name on this page" id="css--alignItemsFlexStart"></a><a href="#css--alignItemsFlexStart" class="prop-name">alignItemsFlexStart</a> | <span class="prop-name">.MuiListItem-alignItemsFlexStart</span> | Styles applied to the `component` element if `alignItems="flex-start"`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--disabled"></a><a href="#css--disabled" class="prop-name">disabled</a> | <span class="prop-name">.Mui-disabled</span> | Pseudo-class applied to the inner `component` element if `disabled={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--divider"></a><a href="#css--divider" class="prop-name">divider</a> | <span class="prop-name">.MuiListItem-divider</span> | Styles applied to the inner `component` element if `divider={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--gutters"></a><a href="#css--gutters" class="prop-name">gutters</a> | <span class="prop-name">.MuiListItem-gutters</span> | Styles applied to the inner `component` element if `disableGutters={false}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--button"></a><a href="#css--button" class="prop-name">button</a> | <span class="prop-name">.MuiListItem-button</span> | Styles applied to the inner `component` element if `button={true}`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--secondaryAction"></a><a href="#css--secondaryAction" class="prop-name">secondaryAction</a> | <span class="prop-name">.MuiListItem-secondaryAction</span> | Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`.
| <a class="anchor-link" title="link to the rule name on this page" id="css--selected"></a><a href="#css--selected" class="prop-name">selected</a> | <span class="prop-name">.Mui-selected</span> | Pseudo-class applied to the root element if `selected={true}`.

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItem/ListItem.js) for more detail.

## Demos

- [Lists](/components/lists/)
- [Transfer List](/components/transfer-list/)

