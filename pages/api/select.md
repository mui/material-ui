---
filename: /src/Select/Select.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Select



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| MenuProps | Object |  | Properties applied to the `Menu` element. |
| autoWidth | boolean | false | If true, the width of the popover will automatically be set according to the items inside the menu, otherwise it will be at least the width of the select input. |
| <span style="color: #31a148">children *</span> | $ReadOnlyArray |  | The option elements to populate the select with. Can be some `MenuItem` when `native` is false and `option` when `native` is true. |
| classes | Object |  | Useful to extend the style applied to components. |
| displayEmpty | boolean | false | If `true`, the selected item is displayed even if its value is empty. You can only use it when the `native` property is `false` (default). |
| input | Element | &lt;Input /> | An `Input` element; does not have to be a material-ui specific `Input`. |
| multiple | boolean | false | If true, `value` must be an array and the menu will support multiple selections. You can only use it when the `native` property is `false` (default). |
| native | boolean | false | If `true`, the component will be using a native `select` element. |
| renderValue | Function |  | Render the selected value. You can only use it when the `native` property is `false` (default). |
| value | union:&nbsp;$ReadOnlyArray&lt;string&nbsp;&#124;<br>&nbsp;number>&nbsp;&#124;<br>&nbsp;string&nbsp;&#124;<br>&nbsp;number<br> |  | The input value, required for a controlled component. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `select`
- `selectMenu`
- `disabled`
- `icon`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Select/Select.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSelect`.

## Inheritance

The properties of the [&lt;Input /&gt;](/api/input) component are also available.

## Demos

- [Selects](/demos/selects)

