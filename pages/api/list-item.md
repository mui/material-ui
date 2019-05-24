---
filename: /packages/material-ui/src/ListItem/ListItem.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItem API

<p class="description">The API documentation of the ListItem React component. Learn more about the properties and the CSS customization points.</p>

```js
import ListItem from '@material-ui/core/ListItem';
```

Uses an additional container component if `ListItemSecondaryAction` is the last child.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name">alignItems</span> | <span class="prop-type">enum:&nbsp;'flex-start'&nbsp;&#124;<br>&nbsp;'center'<br></span> | <span class="prop-default">'center'</span> | Defines the `align-items` style property. |
| <span class="prop-name">autoFocus</span> | <span class="prop-type">bool</span> |  | If `true`, the list item will be focused during the first mount. Focus will also be triggered if the value changes from false to true. |
| <span class="prop-name">button</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list item will be a button (using `ButtonBase`). |
| <span class="prop-name">children</span> | <span class="prop-type">node</span> |  | The content of the component. If a `ListItemSecondaryAction` is used it must be the last child. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <span class="prop-name">component</span> | <span class="prop-type">elementType</span> |  | The component used for the root node. Either a string to use a DOM element or a component. By default, it's a `li` when `button` is `false` and a `div` when `button` is `true`. |
| <span class="prop-name">ContainerComponent</span> | <span class="prop-type">elementType</span> | <span class="prop-default">'li'</span> | The container component used when a `ListItemSecondaryAction` is the last child. |
| <span class="prop-name">ContainerProps</span> | <span class="prop-type">object</span> | <span class="prop-default">{}</span> | Properties applied to the container component if used. |
| <span class="prop-name">dense</span> | <span class="prop-type">bool</span> |  | If `true`, compact vertical padding designed for keyboard and mouse input will be used. |
| <span class="prop-name">disabled</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the list item will be disabled. |
| <span class="prop-name">disableGutters</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, the left and right padding is removed. |
| <span class="prop-name">divider</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, a 1px light border is added to the bottom of the list item. |
| <span class="prop-name">selected</span> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Use to apply selected styling. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the (normally root) `component` element. May be wrapped by a `container`.
| <span class="prop-name">container</span> | Styles applied to the `container` element if `children` includes `ListItemSecondaryAction`.
| <span class="prop-name">focusVisible</span> | Styles applied to the `component`'s `focusVisibleClassName` property if `button={true}`.
| <span class="prop-name">dense</span> | Styles applied to the `component` element if dense.
| <span class="prop-name">alignItemsFlexStart</span> | Styles applied to the `component` element if `alignItems="flex-start"`.
| <span class="prop-name">disabled</span> | Styles applied to the inner `component` element if `disabled={true}`.
| <span class="prop-name">divider</span> | Styles applied to the inner `component` element if `divider={true}`.
| <span class="prop-name">gutters</span> | Styles applied to the inner `component` element if `disableGutters={false}`.
| <span class="prop-name">button</span> | Styles applied to the inner `component` element if `button={true}`.
| <span class="prop-name">secondaryAction</span> | Styles applied to the `component` element if `children` includes `ListItemSecondaryAction`.
| <span class="prop-name">selected</span> | Styles applied to the root element if `selected={true}`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItem/ListItem.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiListItem`.

## Notes

The component can cause issues in [StrictMode](https://reactjs.org/docs/strict-mode.html).

## Demos

- [Lists](/components/lists/)
- [Transfer List](/components/transfer-list/)

