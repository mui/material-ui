---
filename: /src/Tooltip/Tooltip.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tooltip



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">element |  | Tooltip reference element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |  | Useful to extend the style applied to components. |
| <span class="prop-name">disableTriggerFocus</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Do not respond to focus events. |
| <span class="prop-name">disableTriggerHover</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Do not respond to hover events. |
| <span class="prop-name">disableTriggerTouch</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Do not respond to long press touch events. |
| <span class="prop-name">enterDelay</span> | <span class="prop-type">number | <span class="prop-default">0</span> | The number of milliseconds to wait before showing the tooltip. This property won't impact the enter touch delay (`enterTouchDelay`). |
| <span class="prop-name">enterTouchDelay</span> | <span class="prop-type">number | <span class="prop-default">1000</span> | The number of milliseconds a user must touch the element before showing the tooltip. |
| <span class="prop-name">id</span> | <span class="prop-type">string |  | The relationship between the tooltip and the wrapper component is not clear from the DOM. By providing this property, we can use aria-describedby to solve the accessibility issue. |
| <span class="prop-name">leaveDelay</span> | <span class="prop-type">number | <span class="prop-default">0</span> | The number of milliseconds to wait before hiding the tooltip. This property won't impact the leave touch delay (`leaveTouchDelay`). |
| <span class="prop-name">leaveTouchDelay</span> | <span class="prop-type">number | <span class="prop-default">1500</span> | The number of milliseconds after the user stops touching an element before hiding the tooltip. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func |  | Callback fired when the tooltip requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func |  | Callback fired when the tooltip requests to be open.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">open</span> | <span class="prop-type">bool |  | If `true`, the tooltip is shown. |
| <span class="prop-name">placement</span> | <span class="prop-type">enum:&nbsp;'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'<br> | <span class="prop-default">'bottom'</span> | Tooltip placement |
| <span class="prop-name">PopperProps</span> | <span class="prop-type">object |  | Properties applied to the `Popper` element. |
| <span class="prop-name required">title *</span> | <span class="prop-type">node |  | Tooltip title. Zero-length titles string are never displayed. |

Any other properties supplied will be [spread to the root element](/guides/api#spread).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:
- `root`
- `popper`
- `popperClose`
- `tooltip`
- `tooltipPlacementLeft`
- `tooltipPlacementRight`
- `tooltipPlacementTop`
- `tooltipPlacementBottom`
- `tooltipOpen`

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/v1-beta/src/Tooltip/Tooltip.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTooltip`.

## Demos

- [Tooltips](/demos/tooltips)

