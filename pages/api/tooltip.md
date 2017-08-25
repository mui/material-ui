<!--- This documentation is automatically generated, do not try to edit it. -->

# Tooltip



## Props
| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | Node |  | Tooltip reference component |
| classes | Object |  | Useful to extend the style applied to components. |
| <span style="color: #31a148">label *</span> | string |  | Tooltip label. |
| onRequestClose | Function |  | Callback fired when the tooltip requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| onRequestOpen | Function |  | Callback fired when the tooltip requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| open | boolean |  | If `true`, the tooltip is shown. |
| placement | union:&nbsp;, 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'<br> | 'bottom' | Tooltip placement |

Any other properties supplied will be spread to the root element.

## CSS API

You can overrides all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `popper`
- `tooltip`
- `tooltipLeft`
- `tooltipRight`
- `tooltipTop`
- `tooltipBottom`
- `tooltipOpen`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes)
section for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTooltip`.

## Demos

- [Tooltips](/demos/tooltips)

