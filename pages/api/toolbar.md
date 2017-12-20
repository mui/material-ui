---
filename: /src/Toolbar/Toolbar.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Toolbar



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`. |
| classes | object |  | Useful to extend the style applied to components. |
| disableGutters | bool | false | If `true`, disables gutter padding. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `gutters`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Toolbar/Toolbar.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiToolbar`.

## Demos

- [App Bar](/demos/app-bar)

