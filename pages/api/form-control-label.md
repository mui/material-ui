<!--- This documentation is automatically generated, do not try to edit it. -->

# FormControlLabel



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;boolean<br>&nbsp;string<br> |  | If `true`, the component appears selected. |
| classes | Object |  | Useful to extend the style applied to components. |
| <span style="color: #31a148">control *</span> | Element |  | A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`. |
| disabled | boolean | false | If `true`, the control will be disabled. |
| inputRef | Function |  | Use that property to pass a ref callback to the native input component. |
| <span style="color: #31a148">label *</span> | node |  | The text to be used in an enclosing label element. |
| name | string |  |  |
| onChange | Function |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback<br>*checked:* The `checked` value of the switch |
| value | string |  | The value of the component. |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `disabled`
- `label`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormControlLabel`.

## Demos

- [Selection Controls](/demos/selection-controls)

