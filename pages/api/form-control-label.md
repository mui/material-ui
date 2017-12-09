---
filename: /src/Form/FormControlLabel.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# FormControlLabel

Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
Use this component if you want to display an extra label.

## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;bool&nbsp;&#124;<br>&nbsp;string<br> |  | If `true`, the component appears selected. |
| classes | object |  | Useful to extend the style applied to components. |
| control | element |  | A control element. For instance, it can be be a `Radio`, a `Switch` or a `Checkbox`. |
| disabled | bool |  | If `true`, the control will be disabled. |
| inputRef | func |  | Use that property to pass a ref callback to the native input component. |
| label | node |  | The text to be used in an enclosing label element. |
| name | string |  |  |
| onChange | func |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback<br>*checked:* The `checked` value of the switch |
| value | string |  | The value of the component. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `disabled`
- `label`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Form/FormControlLabel.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiFormControlLabel`.

## Demos

- [Selection Controls](/demos/selection-controls)

