---
filename: /packages/material-ui/src/ListItemIcon/ListItemIcon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItemIcon API

<p class="description">The API documentation of the ListItemIcon React component. Learn more about the properties and the CSS customization points.</p>

```js
import ListItemIcon from '@material-ui/core/ListItemIcon';
```

A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children&nbsp;*</span> | <span class="prop-type">element</span> |  | The content of the component, normally `Icon`, `SvgIcon`, or a `@material-ui/icons` SVG icon element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |

Any other properties supplied will be spread to the root element (native element).

## CSS

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">root</span> | Styles applied to the root element.

Have a look at [overriding with classes](/customization/overrides/#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/ListItemIcon/ListItemIcon.js)
for more detail.

If using the `overrides` [key of the theme](/customization/themes/#css),
you need to use the following style sheet name: `MuiListItemIcon`.

## Demos

- [Lists](/demos/lists/)

