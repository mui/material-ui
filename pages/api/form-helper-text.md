---
filename: /src/Form/FormHelperText.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormHelperText



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | node |  | The content of the component. |
| classes | object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string&nbsp;&#124;<br>&nbsp;func<br> | 'p' | The component used for the root node. Either a string to use a DOM element or a component. |
| disabled | bool |  | If `true`, the helper text should be displayed in a disabled state. |
| error | bool |  | If `true`, helper text should be displayed in an error state. |
| margin | enum:&nbsp;'dense'<br> |  | If `dense`, will adjust vertical spacing. This is normally obtained via context from FormControl. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `dense`
- `error`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Form/FormHelperText.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormHelperText`.

## Demos

- [Text Fields](/demos/text-fields)

