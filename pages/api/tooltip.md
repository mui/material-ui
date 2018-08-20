---
filename: /packages/material-ui/src/Tooltip/Tooltip.js
title: Tooltip API
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tooltip

<p class="description">The API documentation of the Tooltip React component.</p>



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <span class="prop-name required">children *</span> | <span class="prop-type">element |   | Tooltip reference element. |
| <span class="prop-name">classes</span> | <span class="prop-type">object |   | Override or extend the styles applied to the component. See [CSS API](#css-api) below for more details. |
| <span class="prop-name">disableFocusListener</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Do not respond to focus events. |
| <span class="prop-name">disableHoverListener</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Do not respond to hover events. |
| <span class="prop-name">disableTouchListener</span> | <span class="prop-type">bool | <span class="prop-default">false</span> | Do not respond to long press touch events. |
| <span class="prop-name">enterDelay</span> | <span class="prop-type">number | <span class="prop-default">0</span> | The number of milliseconds to wait before showing the tooltip. This property won't impact the enter touch delay (`enterTouchDelay`). |
| <span class="prop-name">enterTouchDelay</span> | <span class="prop-type">number | <span class="prop-default">1000</span> | The number of milliseconds a user must touch the element before showing the tooltip. |
| <span class="prop-name">id</span> | <span class="prop-type">string |   | The relationship between the tooltip and the wrapper component is not clear from the DOM. This property is used with aria-describedby to solve the accessibility issue. If you don't provide this property. It fallback to a random generated id. |
| <span class="prop-name">leaveDelay</span> | <span class="prop-type">number | <span class="prop-default">0</span> | The number of milliseconds to wait before hiding the tooltip. This property won't impact the leave touch delay (`leaveTouchDelay`). |
| <span class="prop-name">leaveTouchDelay</span> | <span class="prop-type">number | <span class="prop-default">1500</span> | The number of milliseconds after the user stops touching an element before hiding the tooltip. |
| <span class="prop-name">onClose</span> | <span class="prop-type">func |   | Callback fired when the tooltip requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">onOpen</span> | <span class="prop-type">func |   | Callback fired when the tooltip requests to be open.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback |
| <span class="prop-name">open</span> | <span class="prop-type">bool |   | If `true`, the tooltip is shown. |
| <span class="prop-name">placement</span> | <span class="prop-type">enum:&nbsp;'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top'<br> | <span class="prop-default">'bottom'</span> | Tooltip placement. |
| <span class="prop-name">PopperProps</span> | <span class="prop-type">object |   | Properties applied to the [`Popper`](/api/popper) element. |
| <span class="prop-name required">title *</span> | <span class="prop-type">node |   | Tooltip title. Zero-length titles string are never displayed. |
| <span class="prop-name">TransitionComponent</span> | <span class="prop-type">union:&nbsp;string&nbsp;&#124;<br>&nbsp;func&nbsp;&#124;<br>&nbsp;object<br> | <span class="prop-default">Grow</span> | Transition component. |
| <span class="prop-name">TransitionProps</span> | <span class="prop-type">object |   | Properties applied to the `Transition` element. |

Any other properties supplied will be spread to the root element (native element).

## CSS API

You can override all the class names injected by Material-UI thanks to the `classes` property.
This property accepts the following keys:


| Name | Description |
|:-----|:------------|
| <span class="prop-name">popper</span> | Styles applied to the Popper component.
| <span class="prop-name">tooltip</span> | Styles applied to the tooltip (label wrapper) element.
| <span class="prop-name">touch</span> | Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch.
| <span class="prop-name">tooltipPlacementLeft</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "left".
| <span class="prop-name">tooltipPlacementRight</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "right".
| <span class="prop-name">tooltipPlacementTop</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "top".
| <span class="prop-name">tooltipPlacementBottom</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom".

Have a look at [overriding with classes](/customization/overrides#overriding-with-classes) section
and the [implementation of the component](https://github.com/mui-org/material-ui/tree/master/packages/material-ui/src/Tooltip/Tooltip.js)
for more detail.

If using the `overrides` key of the theme as documented
[here](/customization/themes#customizing-all-instances-of-a-component-type),
you need to use the following style sheet name: `MuiTooltip`.

## Demos

- [Tooltips](/demos/tooltips)

