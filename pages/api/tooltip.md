---
filename: /src/Tooltip/Tooltip.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tooltip



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span style="color: #31a148">children *</span> | element |  | Tooltip reference element. |
| classes | object |  | Useful to extend the style applied to components. |
| disableTriggerFocus | bool | false | Do not respond to focus events. |
| disableTriggerHover | bool | false | Do not respond to hover events. |
| disableTriggerTouch | bool | false | Do not respond to long press touch events. |
| enterDelay | number | 0 | The number of milliseconds to wait before showing the tooltip. |
| id | string |  | The relationship between the tooltip and the wrapper component is not clear from the DOM. By providing this property, we can use aria-describedby to solve the accessibility issue. |
| leaveDelay | number | 0 | The number of milliseconds to wait before hidding the tooltip. |
| onClose | func |  | Callback fired when the tooltip requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| onOpen | func |  | Callback fired when the tooltip requests to be open.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| open | bool |  | If `true`, the tooltip is shown. |
| placement | enum:&nbsp;'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'<br> | 'bottom' | Tooltip placement |
| PopperProps | object |  | Properties applied to the `Popper` element. |
| <span style="color: #31a148">title *</span> | node |  | Tooltip title. Zero-length titles string are never displayed. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `popper`
- `popperClose`
- `tooltip`
- `tooltipLeft`
- `tooltipRight`
- `tooltipTop`
- `tooltipBottom`
- `tooltipOpen`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Tooltip/Tooltip.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTooltip`.

## Demos

- [Tooltips](/demos/tooltips)

