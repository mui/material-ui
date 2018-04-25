---
filename: /src/ToggleButton/ToggleButtonGroup.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# ToggleButtonGroup



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | node |  | The content of the button. |
| classes | object |  | Useful to extend the style applied to components. |
| exclusive | bool | false | If `true` only allow one of the child ToggleButton values to be selected. |
| onChange | func |  | Callback fired when the value changes.<br><br>**Signature:**<br>`function(event: object, value: number) => void`<br>*event:* The event source of the callback<br>*value:* of the selected buttons |
| selected | bool |  | If `true` render the group in a selected state. If `auto` render in a selected state if any of the child ToggleButtons are selected. |
| value | any |  | The currently selected value within the group or an array of selected values when `exclusive` is false. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `selected`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/ToggleButton/ToggleButtonGroup.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiToggleButtonGroup`.

## Demos

- [Buttons](/demos/buttons)

