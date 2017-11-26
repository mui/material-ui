---
filename: /src/Form/FormLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormLabel



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Node |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | ElementType | 'label' | The component used for the root node. Either a string to use a DOM element or a component. |
| disabled | boolean |  | If `true`, the label should be displayed in a disabled state. |
| error | boolean |  | If `true`, the label should be displayed in an error state. |
| focused | boolean |  | If `true`, the input of this label is focused (used by `FormGroup` components). |
| required | boolean |  | If `true`, the label will indicate that the input is required. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `focused`
- `error`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Form/FormLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormLabel`.

## Demos

- [Selection Controls](/demos/selection-controls)

