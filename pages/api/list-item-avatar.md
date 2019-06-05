---
filename: /packages/material-ui/src/ListItemAvatar/ListItemAvatar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItemAvatar API

<p class="description">The API documentation of the ListItemAvatar React component. Learn more about the properties and the CSS customization points.</p>

```js
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
```

A simple wrapper to apply `List` styles to an `Avatar`.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">element</span> |  | The content of the component – normally `Avatar`. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

The `ref` is forwarded to the root element.

Any other properties supplied will be provided to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.
| <span class="prop-name">alignItemsFlexStart</span> | Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`.

Have a look at the [overriding styles with classes](/customization/components/#overriding-styles-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/ListItemAvatar/ListItemAvatar.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiListItemAvatar`.

## Notes

The component is fully [StrictMode](https://reactjs.org/docs/strict-mode.html) compatible.

## Demos

- [Lists](/components/lists/)

