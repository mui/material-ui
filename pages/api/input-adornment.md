---
filename: /src/Input/InputAdornment.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# InputAdornment



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Node |  | The content of the component, normally an `IconButton` or string. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | ElementType | 'div' | The component used for the root node. Either a string to use a DOM element or a component. |
| disableTypography | boolean | false | If children is a string then disable wrapping in a Typography component. |
| <span style="color: #31a148">position *</span> | union:&nbsp;'start'&nbsp;&#124;<br>&nbsp;'end'<br> |  | The position this adornment should appear relative to the `Input`. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `positionStart`
- `positionEnd`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Input/InputAdornment.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiInputAdornment`.

## Demos

- [Text Fields](/demos/text-fields)

