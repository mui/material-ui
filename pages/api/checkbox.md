---
filename: /src/Checkbox/Checkbox.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Checkbox



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| checked | union:&nbsp;boolean&nbsp;&#124;<br>&nbsp;string<br> |  | If `true`, the component is checked. |
| checkedIcon | Node |  | The icon to display when the component is checked. If a string is provided, it will be used as a font ligature. |
| classes | Object |  | Useful to extend the style applied to components. |
| disableRipple | boolean |  | If `true`, the ripple effect will be disabled. |
| disabled | boolean |  | If `true`, the switch will be disabled. |
| icon | Node |  | The icon to display when the component is unchecked. If a string is provided, it will be used as a font ligature. |
| indeterminate | boolean | false | If `true`, the component appears indeterminate. |
| indeterminateIcon | Node | &lt;IndeterminateCheckBoxIcon /> | The icon to display when the component is indeterminate. If a string is provided, it will be used as a font ligature. |
| inputProps | Object |  | Properties applied to the `input` element. |
| inputRef | Function |  | Use that property to pass a ref callback to the native input component. |
| name | string |  |  |
| onChange | Function |  | Callback fired when the state is changed.<br><br>**Signature:**<br>`function(event: object, checked: boolean) => void`<br>*event:* The event source of the callback<br>*checked:* The `checked` value of the switch |
| value | string |  | The value of the component. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `default`
- `checked`
- `disabled`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Checkbox/Checkbox.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiCheckbox`.

## Demos

- [Selection Controls](/demos/selection-controls)

