---
filename: /src/Input/InputLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# InputLabel



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The contents of the `InputLabel`. |
| classes | object |  | Useful to extend the style applied to components. |
| disableAnimation | bool | false | If `true`, the transition animation is disabled. |
| disabled | bool | false | If `true`, apply disabled class. |
| error | bool |  | If `true`, the label will be displayed in an error state. |
| focused | bool |  | If `true`, the input of this label is focused. |
| FormControlClasses | object |  | `classes` property applied to the `FormControl` element. |
| margin | enum:&nbsp;'dense'<br> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |
| required | bool |  | if `true`, the label will indicate that the input is required. |
| shrink | bool |  | If `true`, the label is shrunk. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `formControl`
- `labelDense`
- `shrink`
- `animated`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Input/InputLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiInputLabel`.

## Demos

- [Text Fields](/demos/text-fields)

