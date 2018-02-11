---
filename: /src/Select/Select.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Select



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| autoWidth | bool | false | If true, the width of the popover will automatically be set according to the items inside the menu, otherwise it will be at least the width of the select input. |
| children | node |  | The option elements to populate the select with. Can be some `MenuItem` when `native` is false and `option` when `native` is true. |
| classes | object |  | Useful to extend the style applied to components. |
| displayEmpty | bool | false | If `true`, the selected item is displayed even if its value is empty. You can only use it when the `native` property is `false` (default). |
| input | element | &lt;Input /> | An `Input` element; does not have to be a material-ui specific `Input`. |
| inputProps | object |  | Properties applied to the `input` element. When `native` is `true`, the properties are applied on the `select` element. |
| MenuProps | object |  | Properties applied to the `Menu` element. |
| multiple | bool | false | If true, `value` must be an array and the menu will support multiple selections. You can only use it when the `native` property is `false` (default). |
| native | bool | false | If `true`, the component will be using a native `select` element. |
| onChange | func |  | Callback function fired when a menu item is selected.<br><br>**Signature:**<br>`function(event: object, child: object) => void`<br>*event:* The event source of the callback<br>*child:* The react element that was selected |
| onClose | func |  | Callback fired when the component requests to be closed. Useful in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| onOpen | func |  | Callback fired when the component requests to be opened. Useful in controlled mode (see open).<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| open | bool |  | Control `select` open state. You can only use it when the `native` property is `false` (default). |
| renderValue | func |  | Render the selected value. You can only use it when the `native` property is `false` (default). |
| value | union:&nbsp;string&nbsp;&#124;<br>&nbsp;number&nbsp;&#124;<br>&nbsp;{name?: undefined, value?: undefined}<br> |  | The input value, required for a controlled component. |

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

The properties of the [Input](/api/input) component are also available.

## Demos

- [Selects](/demos/selects)

