---
filename: /src/Icon/Icon.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Icon



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The name of the icon font ligature. |
| classes | object |  | Useful to extend the style applied to components. |
| color | enum:&nbsp;'inherit', 'secondary', 'action', 'disabled', 'error', 'primary'<br> | 'inherit' | The color of the component. It's using the theme palette when that makes sense. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `colorPrimary`
- `colorSecondary`
- `colorAction`
- `colorDisabled`
- `colorError`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Icon/Icon.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiIcon`.

## Demos

- [Icons](/style/icons)

