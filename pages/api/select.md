<!--- This documentation is automatically generated, do not try to edit it. -->

# Select



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| MenuProps | Object |  | Properties applied to the `Menu` element. |
| <span style="color: #31a148">children *</span> | ChildrenArray |  | The option elements to populate the select with. Can be some `MenuItem` when `native` is false and `option` when `native` is true. |
| classes | Object |  | Useful to extend the style applied to components. |
| input | Element | <Input /> | An `Input` element. |
| multiple | boolean | false | If true, `value` must be an array and the menu will support multiple selections. |
| native | boolean | false | If `true`, the component will be using a native `select` element. |
| renderValue | Function |  | Render the selected value. It's only useful when the `native` property is not set to `true`. |
| value | union:&nbsp;Array<string<br>&nbsp;number><br>&nbsp;string<br>&nbsp;number<br> |  | The input value, required for a controlled component. |

Any other properties supplied will be [spread to the root element](/customization/api#spread).

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `select`
- `selectMenu`
- `disabled`
- `icon`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiSelect`.

## Inheritance

The properties of the [&lt;Input /&gt;](/api/input) component are also available.

## Demos

- [Selects](/demos/selects)

