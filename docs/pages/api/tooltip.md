---
filename: /packages/material-ui/src/Tooltip/Tooltip.js
---

<!--- This documentation is automatically generated, do not try to edit it. -->

# Tooltip API

<p class="description">The API documentation of the Tooltip React component. Learn more about the props and the CSS customization points.</p>

## Import

```js
import Tooltip from '@material-ui/core/Tooltip';
// or
import { Tooltip } from '@material-ui/core';
```

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).



## Props

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| <a class="anchor-link" id="props--arrow"></a><a href="#props--arrow" class="prop-name">arrow</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | If `true`, adds an arrow to the tooltip. |
| <a class="anchor-link" id="props--children"></a><a href="#props--children" class="prop-name required">children&nbsp;*</a> | <span class="prop-type">element</span> |  | Tooltip reference element.<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs). |
| <a class="anchor-link" id="props--classes"></a><a href="#props--classes" class="prop-name">classes</a> | <span class="prop-type">object</span> |  | Override or extend the styles applied to the component. See [CSS API](#css) below for more details. |
| <a class="anchor-link" id="props--disableFocusListener"></a><a href="#props--disableFocusListener" class="prop-name">disableFocusListener</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to focus events. |
| <a class="anchor-link" id="props--disableHoverListener"></a><a href="#props--disableHoverListener" class="prop-name">disableHoverListener</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to hover events. |
| <a class="anchor-link" id="props--disableTouchListener"></a><a href="#props--disableTouchListener" class="prop-name">disableTouchListener</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Do not respond to long press touch events. |
| <a class="anchor-link" id="props--enterDelay"></a><a href="#props--enterDelay" class="prop-name">enterDelay</a> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The number of milliseconds to wait before showing the tooltip. This prop won't impact the enter touch delay (`enterTouchDelay`). |
| <a class="anchor-link" id="props--enterTouchDelay"></a><a href="#props--enterTouchDelay" class="prop-name">enterTouchDelay</a> | <span class="prop-type">number</span> | <span class="prop-default">700</span> | The number of milliseconds a user must touch the element before showing the tooltip. |
| <a class="anchor-link" id="props--id"></a><a href="#props--id" class="prop-name">id</a> | <span class="prop-type">string</span> |  | This prop is used to help implement the accessibility logic. If you don't provide this prop. It falls back to a randomly generated id. |
| <a class="anchor-link" id="props--interactive"></a><a href="#props--interactive" class="prop-name">interactive</a> | <span class="prop-type">bool</span> | <span class="prop-default">false</span> | Makes a tooltip interactive, i.e. will not close when the user hovers over the tooltip before the `leaveDelay` is expired. |
| <a class="anchor-link" id="props--leaveDelay"></a><a href="#props--leaveDelay" class="prop-name">leaveDelay</a> | <span class="prop-type">number</span> | <span class="prop-default">0</span> | The number of milliseconds to wait before hiding the tooltip. This prop won't impact the leave touch delay (`leaveTouchDelay`). |
| <a class="anchor-link" id="props--leaveTouchDelay"></a><a href="#props--leaveTouchDelay" class="prop-name">leaveTouchDelay</a> | <span class="prop-type">number</span> | <span class="prop-default">1500</span> | The number of milliseconds after the user stops touching an element before hiding the tooltip. |
| <a class="anchor-link" id="props--onClose"></a><a href="#props--onClose" class="prop-name">onClose</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be closed.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <a class="anchor-link" id="props--onOpen"></a><a href="#props--onOpen" class="prop-name">onOpen</a> | <span class="prop-type">func</span> |  | Callback fired when the component requests to be open.<br><br>**Signature:**<br>`function(event: object) => void`<br>*event:* The event source of the callback. |
| <a class="anchor-link" id="props--open"></a><a href="#props--open" class="prop-name">open</a> | <span class="prop-type">bool</span> |  | If `true`, the tooltip is shown. |
| <a class="anchor-link" id="props--placement"></a><a href="#props--placement" class="prop-name">placement</a> | <span class="prop-type">'bottom-end'<br>&#124;&nbsp;'bottom-start'<br>&#124;&nbsp;'bottom'<br>&#124;&nbsp;'left-end'<br>&#124;&nbsp;'left-start'<br>&#124;&nbsp;'left'<br>&#124;&nbsp;'right-end'<br>&#124;&nbsp;'right-start'<br>&#124;&nbsp;'right'<br>&#124;&nbsp;'top-end'<br>&#124;&nbsp;'top-start'<br>&#124;&nbsp;'top'</span> | <span class="prop-default">'bottom'</span> | Tooltip placement. |
| <a class="anchor-link" id="props--PopperProps"></a><a href="#props--PopperProps" class="prop-name">PopperProps</a> | <span class="prop-type">object</span> |  | Props applied to the [`Popper`](/api/popper/) element. |
| <a class="anchor-link" id="props--title"></a><a href="#props--title" class="prop-name required">title&nbsp;*</a> | <span class="prop-type">node</span> |  | Tooltip title. Zero-length titles string are never displayed. |
| <a class="anchor-link" id="props--TransitionComponent"></a><a href="#props--TransitionComponent" class="prop-name">TransitionComponent</a> | <span class="prop-type">elementType</span> | <span class="prop-default">Grow</span> | The component used for the transition. |
| <a class="anchor-link" id="props--TransitionProps"></a><a href="#props--TransitionProps" class="prop-name">TransitionProps</a> | <span class="prop-type">object</span> |  | Props applied to the `Transition` element. |

The `ref` is forwarded to the root element.

Any other props supplied will be provided to the root element (native element).

## CSS

- Style sheet name: `MuiTooltip`.
- Style sheet details:

| Rule name | Global class | Description |
|:-----|:-------------|:------------|
| <a class="anchor-link" id="css--popper"></a><a href="#css--popper" class="prop-name">popper</a> | <span class="prop-name">.MuiTooltip-popper</span> | Styles applied to the Popper component.
| <a class="anchor-link" id="css--popperInteractive"></a><a href="#css--popperInteractive" class="prop-name">popperInteractive</a> | <span class="prop-name">.MuiTooltip-popperInteractive</span> | Styles applied to the Popper component if `interactive={true}`.
| <a class="anchor-link" id="css--popperArrow"></a><a href="#css--popperArrow" class="prop-name">popperArrow</a> | <span class="prop-name">.MuiTooltip-popperArrow</span> | Styles applied to the Popper component if `arrow={true}`.
| <a class="anchor-link" id="css--tooltip"></a><a href="#css--tooltip" class="prop-name">tooltip</a> | <span class="prop-name">.MuiTooltip-tooltip</span> | Styles applied to the tooltip (label wrapper) element.
| <a class="anchor-link" id="css--tooltipArrow"></a><a href="#css--tooltipArrow" class="prop-name">tooltipArrow</a> | <span class="prop-name">.MuiTooltip-tooltipArrow</span> | Styles applied to the tooltip (label wrapper) element if `arrow={true}`.
| <a class="anchor-link" id="css--arrow"></a><a href="#css--arrow" class="prop-name">arrow</a> | <span class="prop-name">.MuiTooltip-arrow</span> | Styles applied to the arrow element.
| <a class="anchor-link" id="css--touch"></a><a href="#css--touch" class="prop-name">touch</a> | <span class="prop-name">.MuiTooltip-touch</span> | Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch.
| <a class="anchor-link" id="css--tooltipPlacementLeft"></a><a href="#css--tooltipPlacementLeft" class="prop-name">tooltipPlacementLeft</a> | <span class="prop-name">.MuiTooltip-tooltipPlacementLeft</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "left".
| <a class="anchor-link" id="css--tooltipPlacementRight"></a><a href="#css--tooltipPlacementRight" class="prop-name">tooltipPlacementRight</a> | <span class="prop-name">.MuiTooltip-tooltipPlacementRight</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "right".
| <a class="anchor-link" id="css--tooltipPlacementTop"></a><a href="#css--tooltipPlacementTop" class="prop-name">tooltipPlacementTop</a> | <span class="prop-name">.MuiTooltip-tooltipPlacementTop</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "top".
| <a class="anchor-link" id="css--tooltipPlacementBottom"></a><a href="#css--tooltipPlacementBottom" class="prop-name">tooltipPlacementBottom</a> | <span class="prop-name">.MuiTooltip-tooltipPlacementBottom</span> | Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom".

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [`classes` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [`overrides` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Tooltip/Tooltip.js) for more detail.

## Demos

- [Tooltips](/components/tooltips/)

