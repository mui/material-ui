<!--- This documentation is automatically generated, do not try to edit it. -->

# FormLabel



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| children | Element |  | The content of the component. |
| classes | Object |  | Useful to extend the style applied to components. |
| component | union:&nbsp;string<br>&nbsp;Function<br> | 'label' | The component used for the root node. Either a string to use a DOM element or a component. |
| disabled | boolean |  | If `true`, the label should be displayed in a disabled state. |
| error | boolean |  | If `true`, the label should be displayed in an error state. |
| focused | boolean |  | If `true`, the input of this label is focused (used by `FormGroup` components). |
| required | boolean |  | If `true`, the label will indicate that the input is required. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `focused`
- `error`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormLabel`.

## Demos

- [Selection Controls](/demos/selection-controls)

