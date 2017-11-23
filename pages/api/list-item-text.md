---
filename: /src/List/ListItemText.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ListItemText



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| classes | Object |  | Useful to extend the style applied to components. |
| disableTypography | boolean | false | If `true`, the children won't be wrapped by a typography component. For instance, that can be useful to can render an h4 instead of a |
| inset | boolean | false | If `true`, the children will be indented. This should be used if there is no left avatar or left icon. |
| primary | Node | false |  |
| secondary | Node | false |  |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `inset`
- `dense`
- `text`
- `textDense`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/List/ListItemText.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiListItemText`.

## Demos

- [Lists](/demos/lists)

